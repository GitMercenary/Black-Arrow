-- ADMIN USER MANAGEMENT ENHANCEMENTS
-- Adds allowed_regions and is_super_admin columns to admin_users
-- Run this in Supabase SQL Editor

-- Add new columns
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS allowed_regions TEXT[] DEFAULT '{UK,UAE,IND}';
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT false;

-- Set super admin
UPDATE admin_users SET is_super_admin = true WHERE email = 'mohamed.jaffar@blackarrowtechnologies.com';

-- RLS: Super admin can manage all admin users
DROP POLICY IF EXISTS "Super admin can insert admin_users" ON admin_users;
CREATE POLICY "Super admin can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_super_admin = true)
  );

DROP POLICY IF EXISTS "Super admin can update admin_users" ON admin_users;
CREATE POLICY "Super admin can update admin_users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_super_admin = true)
  );

DROP POLICY IF EXISTS "Super admin can delete admin_users" ON admin_users;
CREATE POLICY "Super admin can delete admin_users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_super_admin = true)
  );

-- All authenticated admins can read admin_users list
DROP POLICY IF EXISTS "Admins can read admin_users" ON admin_users;
CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);
