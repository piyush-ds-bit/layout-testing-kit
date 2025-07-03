
-- Fix infinite recursion in RLS policies by updating the contact messages policies
-- Remove problematic policies that cause recursion
DROP POLICY IF EXISTS "Allow admins to manage contact messages" ON public.contact_messages;

-- Create simplified policies that don't cause recursion
-- Allow anyone to insert contact messages (for the contact form)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT 
  WITH CHECK (true);

-- Allow users to view their own messages (if they have a user_id)
CREATE POLICY "Users can view their own messages" ON public.contact_messages
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow admins to view all messages using the security definer function
CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
  FOR SELECT 
  USING (public.is_admin());

-- Allow admins to update messages (mark as read, etc.)
CREATE POLICY "Admins can update contact messages" ON public.contact_messages
  FOR UPDATE 
  USING (public.is_admin());

-- Allow admins to delete messages
CREATE POLICY "Admins can delete contact messages" ON public.contact_messages
  FOR DELETE 
  USING (public.is_admin());
