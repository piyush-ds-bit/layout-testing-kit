-- Fix contact form submission by removing problematic HTTP functions and triggers

-- Drop the triggers first
DROP TRIGGER IF EXISTS notify_contact_message_trigger ON public.contact_messages;
DROP TRIGGER IF EXISTS notify_visitor_log_trigger ON public.visitor_logs;

-- Drop the problematic functions that use http_post (which doesn't exist)
DROP FUNCTION IF EXISTS public.notify_new_contact_message();
DROP FUNCTION IF EXISTS public.notify_new_visitor_log();

-- The contact_messages table will now work without the webhook notifications