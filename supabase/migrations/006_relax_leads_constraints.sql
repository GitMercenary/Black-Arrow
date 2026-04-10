-- RELAX CONSTRAINTS ON LEADS TABLE
-- Allows simplified forms (Hero/AI Audit) to work while keeping required fields for Full Contact form.
-- Run this in Supabase SQL Editor

-- 1. Make message nullable
ALTER TABLE leads ALTER COLUMN message DROP NOT NULL;

-- 2. Make budget_range nullable
ALTER TABLE leads ALTER COLUMN budget_range DROP NOT NULL;

-- 3. Make region_id nullable (as a fallback)
ALTER TABLE leads ALTER COLUMN region_id DROP NOT NULL;

-- 4. Ensure we have the latest column naming if needed (schema already has 'name')
-- No change needed as name is already 'name' in 001_initial_schema.sql
