
-- 1. Ensure SECURITY DEFINER on the is_admin() function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Drop all problematic/duplicate RLS policies first for a clean setup

-- BLOG_POSTS
DROP POLICY IF EXISTS "Users can manage their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;

-- PROFILES
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- SECTIONS
DROP POLICY IF EXISTS "Admins can manage sections" ON public.sections;
DROP POLICY IF EXISTS "Users can view sections" ON public.sections;

-- CONTACT_MESSAGES
DROP POLICY IF EXISTS "Users can manage their own messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete all messages" ON public.contact_messages;

-- STORAGE (Hero and Contact uploads)
DROP POLICY IF EXISTS "Admins can manage hero images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage contact uploads" ON storage.objects;

-- 3. Recreate correct policies:

-- BLOG_POSTS
CREATE POLICY "Users can manage their own blog posts" ON public.blog_posts
  FOR ALL USING (user_id::uuid = auth.uid());
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin());

-- PROFILES
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- SECTIONS
CREATE POLICY "Admins can manage sections" ON public.sections
  FOR ALL USING (public.is_admin());
CREATE POLICY "Users can view sections" ON public.sections
  FOR SELECT USING (true);

-- CONTACT_MESSAGES
CREATE POLICY "Users can manage their own messages" ON public.contact_messages
  FOR ALL USING (user_id::uuid = auth.uid());
CREATE POLICY "Admins can view all messages" ON public.contact_messages
  FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update all messages" ON public.contact_messages
  FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete all messages" ON public.contact_messages
  FOR DELETE USING (public.is_admin());

-- STORAGE
CREATE POLICY "Admins can manage hero images" ON storage.objects
  FOR ALL USING (bucket_id = 'hero-images' AND public.is_admin());
CREATE POLICY "Admins can manage contact uploads" ON storage.objects
  FOR ALL USING (bucket_id = 'contact-uploads' AND public.is_admin());
