-- Fix RLS policies more carefully by dropping and recreating only if needed

-- Ensure experiences table exists with proper structure
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for experiences (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'experiences' AND policyname = 'Anyone can view experiences') THEN
    CREATE POLICY "Anyone can view experiences" ON public.experiences FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'experiences' AND policyname = 'Admins can manage experiences') THEN
    CREATE POLICY "Admins can manage experiences" ON public.experiences FOR ALL USING (public.is_admin());
  END IF;
END $$;