
-- Ensure we have all the necessary tables with proper structure
-- First, let's make sure the experiences table exists with the right structure
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

-- Ensure projects table has all necessary fields
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '[]'::jsonb;

-- Enable RLS on all tables
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for experiences
DROP POLICY IF EXISTS "Anyone can view experiences" ON public.experiences;
DROP POLICY IF EXISTS "Admins can manage experiences" ON public.experiences;

CREATE POLICY "Anyone can view experiences" ON public.experiences
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage experiences" ON public.experiences
  FOR ALL USING (public.is_admin());

-- Create RLS policies for projects
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (public.is_admin());

-- Create RLS policies for skills
DROP POLICY IF EXISTS "Anyone can view skills" ON public.skills;
DROP POLICY IF EXISTS "Admins can manage skills" ON public.skills;

CREATE POLICY "Anyone can view skills" ON public.skills
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage skills" ON public.skills
  FOR ALL USING (public.is_admin());

-- Create RLS policies for skill categories
DROP POLICY IF EXISTS "Anyone can view skill categories" ON public.skill_categories;
DROP POLICY IF EXISTS "Admins can manage skill categories" ON public.skill_categories;

CREATE POLICY "Anyone can view skill categories" ON public.skill_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage skill categories" ON public.skill_categories
  FOR ALL USING (public.is_admin());
