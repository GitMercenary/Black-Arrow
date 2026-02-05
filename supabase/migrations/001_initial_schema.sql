-- BLACK ARROW TECHNOLOGIES - DATABASE SCHEMA
-- Phase 1 Initial Migration
-- Run this in Supabase SQL Editor

-- ======================
-- 1. REGIONS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL CHECK (code IN ('UK', 'UAE', 'IND')),
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  currency TEXT DEFAULT 'GBP',
  timezone TEXT DEFAULT 'Europe/London',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_regions_code ON regions(code);

-- RLS Policies
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view regions" ON regions;
CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view regions" ON regions;
CREATE POLICY "Authenticated users can view regions"
  ON regions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update regions" ON regions;
CREATE POLICY "Admins can update regions"
  ON regions FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Seed Data
INSERT INTO regions (code, name, phone, address, currency, timezone) VALUES
('UK', 'United Kingdom', '+44 20 1234 5678', '123 Tech Street, London, UK', 'GBP', 'Europe/London'),
('UAE', 'United Arab Emirates', '+971 4 123 4567', 'Dubai Silicon Oasis, Dubai, UAE', 'AED', 'Asia/Dubai'),
('IND', 'India', '+91 80 1234 5678', 'Koramangala, Bangalore, India', 'INR', 'Asia/Kolkata')
ON CONFLICT (code) DO NOTHING;

-- ======================
-- 2. ADMIN_USERS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  default_region TEXT DEFAULT 'UK',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- RLS Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Do NOT use recursive policies like "auth.uid() IN (SELECT id FROM admin_users)"
-- on the admin_users table itself - it causes infinite recursion and 500 errors.
-- Instead, use simple "auth.uid() = id" which allows users to read/update their own record.

DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can read own admin record" ON admin_users;
CREATE POLICY "Users can read own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update their own profile" ON admin_users;
DROP POLICY IF EXISTS "Users can update own admin record" ON admin_users;
CREATE POLICY "Users can update own admin record"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- ======================
-- 3. LEADS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE RESTRICT,

  -- Contact Information
  name TEXT NOT NULL CHECK (char_length(name) >= 2),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT,
  company TEXT,

  -- Lead Details
  message TEXT NOT NULL CHECK (char_length(message) >= 10),
  service_interest TEXT,
  budget_range TEXT NOT NULL,

  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  assigned_to UUID REFERENCES admin_users(id),
  notes TEXT,

  -- Metadata
  source TEXT DEFAULT 'website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_region ON leads(region_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all leads" ON leads;
CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can update leads" ON leads;
CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ======================
-- 4. POSTS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  title TEXT NOT NULL CHECK (char_length(title) >= 10),
  slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9-]+$'),
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT CHECK (char_length(meta_description) <= 160),

  -- Regional Targeting
  region_tags TEXT[] DEFAULT '{UK,UAE,IND}',

  -- Publishing
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,

  -- Authoring
  author_id UUID REFERENCES admin_users(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_region_tags ON posts USING GIN(region_tags);

-- RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published posts" ON posts;
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can view published posts" ON posts;
CREATE POLICY "Authenticated users can view published posts"
  ON posts FOR SELECT
  TO authenticated
  USING (published = true OR auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can manage all posts" ON posts;
CREATE POLICY "Admins can manage all posts"
  ON posts FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ======================
-- 5. STATS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view stats" ON stats;
CREATE POLICY "Public can view stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view stats" ON stats;
CREATE POLICY "Authenticated users can view stats"
  ON stats FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update stats" ON stats;
CREATE POLICY "Admins can update stats"
  ON stats FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Seed Data
INSERT INTO stats (key, value, label) VALUES
('projects_delivered', '147', 'Projects Delivered'),
('client_retention', '98%', 'Client Retention'),
('active_markets', '3', 'Active Markets')
ON CONFLICT (key) DO NOTHING;

-- ======================
-- UTILITY FUNCTIONS
-- ======================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_regions_updated_at ON regions;
CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stats_updated_at ON stats;
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
