
-- Make is_admin() a SECURITY DEFINER to avoid RLS recursion:
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- ---------- RLS Policy Updates ----------

-- BLOG_POSTS
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin());

-- PROFILES
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- SECTIONS
DROP POLICY IF EXISTS "Admins can manage sections" ON public.sections;
CREATE POLICY "Admins can manage sections" ON public.sections
  FOR ALL USING (public.is_admin());

-- CONTACT_MESSAGES
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
CREATE POLICY "Admins can view all messages" ON public.contact_messages
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update all messages" ON public.contact_messages;
CREATE POLICY "Admins can update all messages" ON public.contact_messages
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete all messages" ON public.contact_messages;
CREATE POLICY "Admins can delete all messages" ON public.contact_messages
  FOR DELETE USING (public.is_admin());

-- STORAGE (Hero and Contact uploads)
DROP POLICY IF EXISTS "Admins can manage hero images" ON storage.objects;
CREATE POLICY "Admins can manage hero images" ON storage.objects
  FOR ALL USING (bucket_id = 'hero-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can manage contact uploads" ON storage.objects;
CREATE POLICY "Admins can manage contact uploads" ON storage.objects
  FOR ALL USING (bucket_id = 'contact-uploads' AND public.is_admin());
