-- Fix chatbot_conversations RLS policy to restrict access to admins only
DROP POLICY IF EXISTS "Allow authenticated users to view chatbot_conversations" ON public.chatbot_conversations;

CREATE POLICY "Only admins can view chatbot_conversations" 
ON public.chatbot_conversations 
FOR SELECT 
TO authenticated
USING (is_admin());

-- Fix chatbot_analytics RLS policy with the same restriction
DROP POLICY IF EXISTS "Allow authenticated users to view chatbot_analytics" ON public.chatbot_analytics;

CREATE POLICY "Only admins can view chatbot_analytics" 
ON public.chatbot_analytics 
FOR SELECT 
TO authenticated
USING (is_admin());