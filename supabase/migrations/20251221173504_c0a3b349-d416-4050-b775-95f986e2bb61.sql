-- Add CHECK constraints for contact_messages table to enforce server-side validation
-- Using a validation trigger instead of CHECK constraints for better flexibility

-- Create a validation function for contact_messages
CREATE OR REPLACE FUNCTION public.validate_contact_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate name length (1-100 characters)
  IF length(NEW.name) < 1 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 1 and 100 characters';
  END IF;
  
  -- Validate email length (1-255 characters)
  IF length(NEW.email) < 1 OR length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be between 1 and 255 characters';
  END IF;
  
  -- Validate phone_number length if provided (max 20 characters)
  IF NEW.phone_number IS NOT NULL AND length(NEW.phone_number) > 20 THEN
    RAISE EXCEPTION 'Phone number must be 20 characters or less';
  END IF;
  
  -- Validate message length (1-5000 characters)
  IF length(NEW.message) < 1 OR length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be between 1 and 5000 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to validate before insert or update
DROP TRIGGER IF EXISTS validate_contact_message_trigger ON public.contact_messages;

CREATE TRIGGER validate_contact_message_trigger
  BEFORE INSERT OR UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_message();