-- Fix infinite recursion in contact form by cleaning up RLS policies

-- 1. Drop all problematic policies on contact_messages table
DROP POLICY IF EXISTS "Admins can delete all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to manage contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Users can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Users can manage their own messages" ON public.contact_messages;

-- 2. Drop recursive policies on profiles table
DROP POLICY IF EXISTS "Admin access to all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can do anything" ON public.profiles;

-- 3. Create clean, simple policies for contact_messages
-- Allow anyone (anonymous or authenticated) to submit contact messages
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT 
  WITH CHECK (true);

-- Allow admins to view all contact messages using is_admin() function
CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
  FOR SELECT 
  USING (public.is_admin());

-- Allow admins to update and delete contact messages using is_admin() function
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
  FOR ALL 
  USING (public.is_admin());

-- 4. Keep simple, non-recursive policies for profiles (these should already exist)
-- Users can view their own profile - keeping existing policy
-- Users can update their own profile - keeping existing policy  
-- Admins can view all profiles - keeping existing policy that uses is_admin()
-- Admins can update all profiles - keeping existing policy that uses is_admin()