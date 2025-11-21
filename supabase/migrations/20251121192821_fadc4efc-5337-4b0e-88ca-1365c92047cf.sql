-- Create chatbot conversations table
CREATE TABLE public.chatbot_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  context_used JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster session lookups
CREATE INDEX idx_chatbot_conversations_session ON public.chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_conversations_created_at ON public.chatbot_conversations(created_at DESC);

-- Create chatbot analytics table
CREATE TABLE public.chatbot_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  question_type TEXT,
  visitor_action TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for analytics
CREATE INDEX idx_chatbot_analytics_session ON public.chatbot_analytics(session_id);
CREATE INDEX idx_chatbot_analytics_created_at ON public.chatbot_analytics(created_at DESC);

-- Enable RLS (optional - for privacy)
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access (you can view conversations)
CREATE POLICY "Allow public insert on chatbot_conversations" 
ON public.chatbot_conversations 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Allow public insert on chatbot_analytics" 
ON public.chatbot_analytics 
FOR INSERT 
TO public
WITH CHECK (true);

-- Only authenticated users can view (admin only)
CREATE POLICY "Allow authenticated users to view chatbot_conversations" 
ON public.chatbot_conversations 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to view chatbot_analytics" 
ON public.chatbot_analytics 
FOR SELECT 
TO authenticated
USING (true);