-- Fix contact_messages table security vulnerability
-- The current policies are permissive which can allow unintended access
-- We need restrictive policies to properly secure sensitive contact data

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Create restrictive policies for proper security
-- Only admins can view contact messages (contains sensitive data)
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated
USING (is_admin());

-- Only admins can update contact messages (mark as read, etc.)
CREATE POLICY "Only admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated
USING (is_admin());

-- Only admins can delete contact messages
CREATE POLICY "Only admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
TO authenticated
USING (is_admin());

-- Allow anyone (authenticated or not) to submit contact messages
-- This is necessary for the contact form to work for visitors
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
TO public
WITH CHECK (true);

-- Also fix visitor_logs table security while we're at it
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow authenticated users to view visitor logs" ON public.visitor_logs;

-- Create restrictive policy for visitor logs (only admins should see tracking data)
CREATE POLICY "Only admins can view visitor logs" 
ON public.visitor_logs 
FOR SELECT 
TO authenticated
USING (is_admin());