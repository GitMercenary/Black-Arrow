# 📊 BLACK ARROW TECHNOLOGIES - DATA MODEL

**Version:** 1.0
**Last Updated:** 2026-01-27
**Database:** Supabase (PostgreSQL 15)

---

## 🎯 DATABASE PHILOSOPHY

This data model is designed for:
1. **Simplicity:** Minimal tables, maximum clarity
2. **Security:** Row-Level Security (RLS) on every table. Your data is siloed and secured by enterprise-grade protocols.
3. **Scalability:** Supports 10K+ leads/month
4. **Regional Routing:** Multi-region lead management

**Golden Rule:** If a table isn't needed in Phase 1-3, it doesn't exist yet.

---

## 📋 TABLE SCHEMAS

### 1. `regions` Table
**Purpose:** Store regional contact information (phone, address) for UK, UAE, and India.

```sql
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL CHECK (code IN ('UK', 'UAE', 'IND')),
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  currency TEXT DEFAULT 'GBP', -- GBP, AED, INR
  timezone TEXT DEFAULT 'Europe/London',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_regions_code ON regions(code);

-- RLS Policies
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view regions"
  ON regions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admins can update regions"
  ON regions FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

**Seed Data:**
```sql
INSERT INTO regions (code, name, phone, address, currency, timezone) VALUES
('UK', 'United Kingdom', '+44 20 1234 5678', '123 Tech Street, London, UK', 'GBP', 'Europe/London'),
('UAE', 'United Arab Emirates', '+971 4 123 4567', 'Dubai Silicon Oasis, Dubai, UAE', 'AED', 'Asia/Dubai'),
('IND', 'India', '+91 80 1234 5678', 'Koramangala, Bangalore, India', 'INR', 'Asia/Kolkata');
```

---

### 2. `leads` Table
**Purpose:** Capture contact form submissions from public website.

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE RESTRICT,

  -- Contact Information
  name TEXT NOT NULL CHECK (char_length(name) >= 2),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT,
  company TEXT,

  -- Lead Details
  message TEXT NOT NULL CHECK (char_length(message) >= 10),
  service_interest TEXT, -- 'ecommerce', 'ads', 'automation', 'seo', 'other'
  budget_range TEXT NOT NULL, -- Dynamic by region: UK='£5,000+', UAE='AED 20,000+', IND='₹5L+'

  -- Lead Management
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  assigned_to UUID REFERENCES admin_users(id), -- (Phase 3+ feature)
  notes TEXT, -- Admin notes (Phase 3)

  -- Metadata
  source TEXT DEFAULT 'website', -- 'website', 'referral', 'linkedin'
  utm_source TEXT, -- Google Analytics UTM params
  utm_medium TEXT,
  utm_campaign TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_region ON leads(region_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email); -- For duplicate detection

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

**Sample Data:**
```sql
-- Example lead from India
INSERT INTO leads (region_id, name, email, company, message, service_interest, status)
VALUES (
  (SELECT id FROM regions WHERE code = 'IND'),
  'Rajesh Kumar',
  'rajesh@techstartup.in',
  'Tech Startup India',
  'We need an eCommerce platform for our electronics business. Looking for AI-powered recommendations.',
  'ecommerce',
  'new'
);
```

**Regional Budget Range Logic:**
The `budget_range` field stores region-specific values displayed to users:
- **UK:** `£1,500+`, `£5,000+`, `£10,000+`, `£25,000+`
- **UAE:** `AED 5,000+`, `AED 20,000+`, `AED 40,000+`, `AED 100,000+`
- **India:** `₹1.5L+`, `₹5L+`, `₹10L+`, `₹25L+`

Frontend forms will dynamically show budget options based on detected region.

---

### 3. `posts` Table
**Purpose:** Blog content management with regional tagging.

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content
  title TEXT NOT NULL CHECK (char_length(title) >= 10),
  slug TEXT UNIQUE NOT NULL CHECK (slug ~* '^[a-z0-9-]+$'),
  excerpt TEXT, -- Short summary for cards
  content TEXT NOT NULL, -- Full markdown content
  featured_image TEXT, -- Supabase Storage URL

  -- SEO
  meta_title TEXT,
  meta_description TEXT CHECK (char_length(meta_description) <= 160),

  -- Regional Targeting
  region_tags TEXT[] DEFAULT '{UK,UAE,IND}', -- Show on all regions by default

  -- Publishing
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,

  -- Authoring
  author_id UUID REFERENCES admin_users(id),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published, published_at DESC);
CREATE INDEX idx_posts_region_tags ON posts USING GIN(region_tags); -- Array search

-- RLS Policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admins can manage all posts"
  ON posts FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

**Sample Data:**
```sql
INSERT INTO posts (title, slug, excerpt, content, region_tags, published, published_at, author_id)
VALUES (
  'How AI is Transforming E-Commerce in 2026',
  'ai-ecommerce-2026',
  'Discover how AI-powered recommendations increase conversion rates by 35%.',
  '# How AI is Transforming E-Commerce in 2026\n\nArtificial intelligence is revolutionizing online retail...',
  '{UK,UAE,IND}', -- Show globally
  true,
  NOW(),
  (SELECT id FROM admin_users LIMIT 1)
);
```

---

### 4. `admin_users` Table
**Purpose:** Admin authentication and role management.

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),

  -- Preferences
  default_region TEXT DEFAULT 'UK', -- Filter dashboard by region

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- RLS Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can update their own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
```

**Seed Data (Manual):**
```sql
-- After creating Supabase user via Dashboard:
-- 1. Sign up admin user in Supabase Auth
-- 2. Copy their UUID from auth.users table
-- 3. Insert into admin_users:

INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  '<UUID_FROM_SUPABASE_AUTH>',
  'admin@blackarrowtechnologies.com',
  'Admin User',
  'admin'
);
```

---

### 5. `stats` Table
**Purpose:** Store dynamic "Trust-Engine" numbers (e.g., Projects Delivered) to be displayed on the frontend.

```sql
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL, -- e.g., 'projects_delivered', 'revenue_generated'
  value TEXT NOT NULL, -- e.g., '147', '₹50L+'
  label TEXT NOT NULL, -- e.g., 'Projects Delivered'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view stats"
  ON stats FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admins can update stats"
  ON stats FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

**Seed Data:**
```sql
INSERT INTO stats (key, value, label) VALUES
('projects_delivered', '147', 'Projects Delivered'),
('client_retention', '98%', 'Client Retention'),
('active_markets', '3', 'Active Markets');
```

---

## 🔗 RELATIONSHIPS DIAGRAM

```
┌──────────────────┐
│     regions      │
│  (UK, UAE, IND)  │
└────────┬─────────┘
         │ 1
         │
         │ N
┌────────▼─────────┐         ┌──────────────────┐
│      leads       │         │   admin_users    │
│                  │         │                  │
│ • region_id (FK) │         │ • id (PK)        │
│ • assigned_to ───┼────────►│ • email          │
│ • name           │         │ • role           │
│ • email          │         └────────┬─────────┘
│ • status         │                  │ 1
└──────────────────┘                  │
                                      │ N
                             ┌────────▼─────────┐
                             │      posts       │
                             │                  │
                             │ • author_id (FK) │
                             │ • region_tags[]  │
                             │ • published      │
                             └──────────────────┘
```

---

## 📊 QUERY PATTERNS (Common Use Cases)

### 1. Get All Leads for a Region
```sql
SELECT
  l.id,
  l.name,
  l.email,
  l.company,
  l.status,
  r.name AS region_name,
  l.created_at
FROM leads l
JOIN regions r ON l.region_id = r.id
WHERE r.code = 'IND'
ORDER BY l.created_at DESC;
```

### 2. Get Published Posts for UAE Region
```sql
SELECT
  title,
  slug,
  excerpt,
  published_at
FROM posts
WHERE published = true
  AND 'UAE' = ANY(region_tags)
ORDER BY published_at DESC
LIMIT 10;
```

### 3. Count Leads by Status (Admin Dashboard)
```sql
SELECT
  r.name AS region,
  l.status,
  COUNT(*) AS count
FROM leads l
JOIN regions r ON l.region_id = r.id
GROUP BY r.name, l.status
ORDER BY r.name, l.status;
```

### 4. Get Regional Contact Info
```sql
SELECT phone, address
FROM regions
WHERE code = 'UK';
```

---

## 🔒 SECURITY POLICIES SUMMARY

| Table | Anonymous (Public) | Authenticated (Admin) |
|-------|-------------------|----------------------|
| **regions** | SELECT only | SELECT + UPDATE |
| **leads** | INSERT only | SELECT + UPDATE |
| **posts** | SELECT (published only) | ALL operations |
| **admin_users** | None | SELECT + UPDATE (own profile) |

**Critical:** Enable RLS on ALL tables before deploying to production.

---

## 🗄️ STORAGE BUCKETS (Supabase Storage)

### `case-study-images` Bucket
**Purpose:** Store case study thumbnails and project images.

```sql
-- Public bucket (anyone can view)
-- Admins can upload

-- RLS Policies:
INSERT POLICY: authenticated users only
SELECT POLICY: public
```

**File Naming Convention:**
```
case-studies/
├── ecommerce-luxury-watches.jpg
├── ads-real-estate-dubai.jpg
├── automation-healthcare-india.jpg
└── seo-fintech-london.jpg
```

### `blog-images` Bucket
**Purpose:** Store blog post featured images and inline content images.

```
blog/
├── ai-ecommerce-2026.jpg
├── google-ads-mistakes-2026.jpg
└── automation-tools-comparison.jpg
```

---

## 🧪 DATABASE MIGRATIONS (Future)

**Phase 1-3:** Use Supabase Dashboard SQL Editor to create tables manually.

**Phase 4+:** Consider migration tools:
- Supabase CLI migrations
- Prisma ORM (if TypeScript schema needed)

---

## 🚨 DATA VALIDATION RULES

### Leads Table
- **Name:** Min 2 characters
- **Email:** Valid email format (regex checked)
- **Message:** Min 10 characters
- **Status:** Enum values only (`new`, `contacted`, `qualified`, `converted`, `lost`)

### Posts Table
- **Title:** Min 10 characters
- **Slug:** Lowercase, alphanumeric + hyphens only
- **Meta Description:** Max 160 characters (SEO)

### Regions Table
- **Code:** Must be `UK`, `UAE`, or `IND` (constraint enforced)

---

## 📈 SCALABILITY NOTES

### Current Limits (Supabase Free Tier)
- **Database Size:** 500 MB (enough for ~100K leads)
- **Storage:** 1 GB (enough for ~500 case study images)
- **Monthly Active Users:** Unlimited (public site has no user accounts)

### When to Upgrade (Supabase Pro)
- Database > 500 MB (~50K leads)
- Need daily backups
- Want point-in-time recovery

---

## ✅ PHASE 1 DATABASE SETUP CHECKLIST

- [ ] Create Supabase project
- [ ] Run `regions` table SQL
- [ ] Run `admin_users` table SQL
- [ ] Run `leads` table SQL
- [ ] Run `posts` table SQL
- [ ] Enable RLS on all tables
- [ ] Seed `regions` table with UK, UAE, IND data
- [ ] Create first admin user account
- [ ] Test lead insertion from public form
- [ ] Verify RLS policies block anonymous reads on `leads`

---

**Next Steps:** Create `brand.md`, then get approval to implement Phase 1 code.
