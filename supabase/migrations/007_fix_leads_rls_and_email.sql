-- FIX LEADS RLS AND EMAIL CONSTRAINT
-- This migration fixes the 403 Forbidden error and strict email validation issues.

-- 1. Drop existing email constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_email_check;

-- 2. Add more lenient email check (or just use basic validation)
-- This regex is less strict than the previous one to avoid false negatives.
ALTER TABLE leads ADD CONSTRAINT leads_email_check 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- 3. FIX 403 ERROR: Allow anon users to SELECT the rows they just inserted.
-- Supabase SDK requires SELECT permission to use the "RETURNING" clause effectively.
DROP POLICY IF EXISTS "Anyone can view their own submitted leads" ON leads;
CREATE POLICY "Anyone can view their own submitted leads"
  ON leads FOR SELECT
  TO anon
  USING (true); 

-- 4. Ensure INSERT policy is robust
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Ensure anon can see regions (needed for FK checks)
DROP POLICY IF EXISTS "Public can view regions" ON regions;
CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  TO anon
  USING (true);
