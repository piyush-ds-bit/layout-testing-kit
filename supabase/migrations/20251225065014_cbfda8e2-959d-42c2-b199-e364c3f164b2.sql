-- Make contact-uploads bucket private
UPDATE storage.buckets SET public = false WHERE id = 'contact-uploads';

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view contact uploads" ON storage.objects;

-- Create policy for admins to view contact uploads using signed URLs
CREATE POLICY "Admins can view contact uploads" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'contact-uploads' AND public.is_admin()
  );