
-- 1. Update profile of known admin so that their role is 'admin'
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'piyushjuly04@gmail.com';

-- 2. (Optional) Ensure no other user has the 'admin' role unless intended (limited to this fix)
-- You may want to review other user roles manually for accidental admins.

-- 3. Verify that the `is_admin()` function is able to validate roles as 'admin'.
-- No change is needed for the function code itself, but you can test with:
-- SELECT is_admin();
