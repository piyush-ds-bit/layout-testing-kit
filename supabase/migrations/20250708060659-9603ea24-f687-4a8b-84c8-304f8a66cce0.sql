-- Fix contact messages RLS policies and ensure proper table structure
-- First, drop problematic recursive policies on contact_messages
DROP POLICY IF EXISTS "Users can manage their own messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to manage contact messages" ON public.contact_messages;

-- Create simple, non-recursive policies for contact messages
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update contact messages" ON public.contact_messages
  FOR UPDATE USING (public.is_admin());

-- Ensure experiences table exists with proper structure
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for experiences
CREATE POLICY "Anyone can view experiences" ON public.experiences
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage experiences" ON public.experiences
  FOR ALL USING (public.is_admin());

-- Update RLS policies for projects
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (public.is_admin());

-- Update RLS policies for skills
DROP POLICY IF EXISTS "Anyone can view skills" ON public.skills;
DROP POLICY IF EXISTS "Admins can manage skills" ON public.skills;

CREATE POLICY "Anyone can view skills" ON public.skills
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage skills" ON public.skills
  FOR ALL USING (public.is_admin());

-- Update RLS policies for skill categories
DROP POLICY IF EXISTS "Anyone can view skill categories" ON public.skill_categories;
DROP POLICY IF EXISTS "Admins can manage skill categories" ON public.skill_categories;

CREATE POLICY "Anyone can view skill categories" ON public.skill_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage skill categories" ON public.skill_categories
  FOR ALL USING (public.is_admin());