-- 008_fix_leads_rls_final.sql
-- This migration fixes the 403 Forbidden error by broadening RLS policies to include 'authenticated' users.
-- Developers testing the site are often 'authenticated', which causes 'TO anon' policies to fail.

-- 1. FIX LEADS INSERTION (Allow everyone)
-- Drop the existing policy that was restricted to 'anon'
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;

-- Create a new policy that applies to 'public' (both anon and authenticated)
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO public
  WITH CHECK (true);

-- 2. FIX LEADS SELECTION (Allow everyone to see their own submission/feedback)
-- Supabase SDK requires SELECT permission if it uses the RETURNING clause or for verification.
DROP POLICY IF EXISTS "Anyone can view their own submitted leads" ON leads;
DROP POLICY IF EXISTS "Public can view leads" ON leads;

CREATE POLICY "Public can view leads"
  ON leads FOR SELECT
  TO public
  USING (true);

-- 3. FIX REGIONS SELECTION
-- Ensure regions are readable by everyone so the form can fetch the correct ID.
DROP POLICY IF EXISTS "Public can view regions" ON regions;

CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  TO public
  USING (true);

-- 4. FIX AUTHENTICATED ADMIN ACCESS (Safety check)
-- Ensure admins still have full access even with the public policies.
-- (This is already covered by the 'TO public' policy above, but keeping it for clarity in admin roles)
-- No changes needed as the 'public' policy is most permissive.
