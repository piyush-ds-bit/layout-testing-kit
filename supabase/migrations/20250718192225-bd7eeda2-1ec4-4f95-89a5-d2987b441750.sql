-- Fix contact form submission by removing problematic HTTP functions and triggers with CASCADE

-- Drop the functions with CASCADE to remove dependent triggers
DROP FUNCTION IF EXISTS public.notify_new_contact_message() CASCADE;
DROP FUNCTION IF EXISTS public.notify_new_visitor_log() CASCADE;