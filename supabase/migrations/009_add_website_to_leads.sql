-- ADD WEBSITE COLUMN TO LEADS TABLE
-- This column is required for the AI Audit form to save the user's website URL.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS website TEXT;

-- Add a comment for documentation
COMMENT ON COLUMN leads.website IS 'The URL of the website the lead wants audited.';
