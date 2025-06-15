
-- 1. Add phone_number (text, nullable) and submitted_at (timestamp, not null, default: now())
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS phone_number text;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone NOT NULL DEFAULT now();

-- 2. Backfill submitted_at for any existing rows (if needed)
UPDATE public.contact_messages SET submitted_at = created_at WHERE submitted_at IS NULL;

-- 3. (Optional, for clarity and historic consistency) If you're not using created_at anymore, you can leave it for compatibility.

-- 4. Allow regular users (not admin) to insert into contact_messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Users can submit contact messages'
      AND tablename = 'contact_messages'
  ) THEN
    CREATE POLICY "Users can submit contact messages" ON public.contact_messages
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
  END IF;
END$$;
