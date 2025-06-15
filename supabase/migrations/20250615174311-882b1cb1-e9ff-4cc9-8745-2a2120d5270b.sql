
-- 1. Add a 'details' column to the projects table for detailed description/sections (JSONB for flexibility)
ALTER TABLE public.projects
ADD COLUMN details jsonb DEFAULT '[]'::jsonb;

-- 2. Update existing categories to match new UI categories: 'Deployed' and 'In Development'
-- Previously used: 'app', 'web', 'python'
UPDATE public.projects SET category = 'Deployed' WHERE category IN ('app', 'web');
UPDATE public.projects SET category = 'In Development' WHERE category = 'python';

-- (Optional: you can also remap other possible values if there are any.)

-- NOTE: The project admin panel ("Manage Projects") and frontend app should now be updated to use only these values for 'category':
--   'Deployed', 'In Development'

-- No index needed on 'details' column, since it's just for editing/display.
