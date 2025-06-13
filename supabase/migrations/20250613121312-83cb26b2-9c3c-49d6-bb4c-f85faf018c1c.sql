
-- Drop existing storage policies that might conflict
DROP POLICY IF EXISTS "Anyone can view hero images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload hero images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update hero images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete hero images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view contact uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload contact files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update contact files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete contact files" ON storage.objects;

-- Create storage buckets for hero images and contact uploads (if they don't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('hero-images', 'hero-images', true),
  ('contact-uploads', 'contact-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for hero-images bucket
CREATE POLICY "Anyone can view hero images" ON storage.objects
FOR SELECT USING (bucket_id = 'hero-images');

CREATE POLICY "Authenticated users can upload hero images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'hero-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update hero images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'hero-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete hero images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'hero-images' AND 
  auth.role() = 'authenticated'
);

-- Create storage policies for contact-uploads bucket
CREATE POLICY "Anyone can view contact uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'contact-uploads');

CREATE POLICY "Authenticated users can upload contact files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'contact-uploads' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update contact files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'contact-uploads' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete contact files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'contact-uploads' AND 
  auth.role() = 'authenticated'
);

-- Drop existing problematic policies on profiles table if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create proper RLS policies for profiles table using security definer functions
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON public.profiles
FOR UPDATE USING (public.is_admin());

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on sections table if they exist
DROP POLICY IF EXISTS "Anyone can view sections" ON public.sections;
DROP POLICY IF EXISTS "Admins can manage sections" ON public.sections;

-- Create RLS policies for sections table (for hero section)
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sections" ON public.sections
FOR SELECT USING (true);

CREATE POLICY "Admins can manage sections" ON public.sections
FOR ALL USING (public.is_admin());

-- Drop existing policies on contact_messages table if they exist
DROP POLICY IF EXISTS "Users can view own messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete all messages" ON public.contact_messages;

-- Create RLS policies for contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON public.contact_messages
FOR SELECT USING (auth.uid() = user_id::uuid);

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all messages" ON public.contact_messages
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all messages" ON public.contact_messages
FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete all messages" ON public.contact_messages
FOR DELETE USING (public.is_admin());
