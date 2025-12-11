-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Certificate',
  event_name TEXT,
  date DATE,
  image_url TEXT,
  file_url TEXT,
  file_type TEXT DEFAULT 'image',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Anyone can view achievements (public portfolio)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- Only admins can manage achievements
CREATE POLICY "Admins can manage achievements" ON public.achievements
  FOR ALL USING (is_admin());

-- Create storage bucket for achievement files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('achievements', 'achievements', true);

-- Storage policies for achievements bucket
CREATE POLICY "Anyone can view achievement files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'achievements');

CREATE POLICY "Admins can upload achievement files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'achievements' AND is_admin());

CREATE POLICY "Admins can update achievement files" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'achievements' AND is_admin());

CREATE POLICY "Admins can delete achievement files" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'achievements' AND is_admin());