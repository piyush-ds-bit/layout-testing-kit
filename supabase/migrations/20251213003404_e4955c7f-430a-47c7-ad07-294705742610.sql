-- Step 1: Drop the dependent RLS policy on sections table
DROP POLICY IF EXISTS "Admins can do everything with sections" ON public.sections;

-- Step 2: Recreate the policy using is_admin() instead of profiles.role
CREATE POLICY "Admins can do everything with sections"
ON public.sections
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Step 3: Now safely remove role column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;