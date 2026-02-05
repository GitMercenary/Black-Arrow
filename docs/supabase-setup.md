# Supabase Setup & Health Check

## Overview

Black Arrow Technologies uses Supabase as the backend database and authentication provider for the website. This document covers the complete setup, database schema, Row Level Security (RLS) policies, and health check procedures.

---

## Initial Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a **strong database password** (store in password manager)
3. Select region closest to primary user base:
   - **Europe (West)** - for UK users
   - **Middle East** - for UAE users (if available)
   - **Asia Pacific (Mumbai)** - for India users
4. Wait for project provisioning (~2 minutes)

### 2. Configure Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Security Note**: The `anon` key is safe to expose in client-side code. RLS policies protect data access.

### 3. Install Supabase Client

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Already installed in this project - see [package.json](../package.json).

---

## Database Schema

### Tables Overview

| Table | Purpose | RLS Enabled | Public Insert | Public Read |
|-------|---------|-------------|---------------|-------------|
| `leads` | Contact form submissions | ✅ | ✅ | ❌ |
| `stats` | Homepage statistics | ✅ | ❌ | ✅ |
| `blog_posts` | Blog content | ✅ | ❌ | ✅ (published only) |
| `newsletter_subscribers` | Email list | ✅ | ✅ | ❌ |

---

### Leads Table

Stores all inbound leads from AI Audit popup, contact forms, and chatbot.

```sql
-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  company TEXT NOT NULL,
  website TEXT,
  phone TEXT,

  -- Lead context
  region TEXT NOT NULL CHECK (region IN ('UK', 'UAE', 'IND')),
  budget_range TEXT,
  service_interest TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL CHECK (source IN ('ai_audit_popup', 'contact_form', 'chatbot', 'newsletter')),

  -- Lead scoring (computed server-side)
  lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),
  score_tier TEXT CHECK (score_tier IN ('hot', 'warm', 'cold', 'unqualified')),

  -- Lead status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost')),
  assigned_to TEXT,
  contacted_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(email, created_at) -- Prevent duplicate submissions within same second
);

-- Indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_region ON leads(region);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_score ON leads(lead_score DESC NULLS LAST);
CREATE INDEX idx_leads_email ON leads(email);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE leads IS 'Contact form submissions and lead tracking';
COMMENT ON COLUMN leads.lead_score IS 'Automated score 0-100 based on budget, service, company maturity, engagement';
COMMENT ON COLUMN leads.source IS 'Where the lead came from: ai_audit_popup, contact_form, chatbot, newsletter';
```

#### Row Level Security Policies

```sql
-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can INSERT new leads (public form submissions)
CREATE POLICY "Anyone can insert leads"
ON leads
FOR INSERT
WITH CHECK (true);

-- Policy 2: Only authenticated users can SELECT leads
CREATE POLICY "Authenticated users can view all leads"
ON leads
FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy 3: Only authenticated users can UPDATE leads
CREATE POLICY "Authenticated users can update leads"
ON leads
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Only authenticated users can DELETE leads (soft delete preferred)
CREATE POLICY "Authenticated users can delete leads"
ON leads
FOR DELETE
USING (auth.role() = 'authenticated');
```

---

### Stats Table

Stores homepage statistics (projects completed, revenue generated, etc.)

```sql
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL, -- e.g., 'projects_completed', 'revenue_generated'
  value TEXT NOT NULL, -- e.g., '500+', '£2.5M+'
  label TEXT NOT NULL, -- e.g., 'Projects Completed', 'Revenue Generated'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_stats_display_order ON stats(display_order);

-- Seed data
INSERT INTO stats (key, value, label, display_order) VALUES
  ('projects_completed', '500+', 'Projects Completed', 1),
  ('revenue_generated', '£2.5M+', 'Revenue Generated', 2),
  ('client_satisfaction', '98%', 'Client Satisfaction', 3)
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stats"
ON stats
FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can modify stats"
ON stats
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

---

### Blog Posts Table

Stores blog articles with support for drafts and scheduled publishing.

```sql
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Content
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,

  -- Metadata
  author_name TEXT NOT NULL DEFAULT 'Black Arrow Team',
  author_image TEXT,
  category TEXT CHECK (category IN ('SEO', 'E-commerce', 'Automation', 'Marketing', 'Development')),
  tags TEXT[],
  reading_time INTEGER, -- minutes

  -- Publishing
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,

  -- Stats
  view_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED
);

-- Indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_search_vector ON blog_posts USING gin(search_vector);

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts only
CREATE POLICY "Anyone can view published posts"
ON blog_posts
FOR SELECT
USING (status = 'published' AND published_at <= NOW());

-- Authenticated users can do everything
CREATE POLICY "Authenticated users have full access"
ON blog_posts
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

---

### Newsletter Subscribers Table

```sql
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  name TEXT,
  region TEXT CHECK (region IN ('UK', 'UAE', 'IND')),
  source TEXT DEFAULT 'newsletter_popup',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert newsletter subscriptions"
ON newsletter_subscribers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view all subscribers"
ON newsletter_subscribers
FOR SELECT
USING (auth.role() = 'authenticated');
```

---

## Database Functions

### Lead Score Calculation

```sql
CREATE OR REPLACE FUNCTION calculate_lead_score(
  budget TEXT,
  service TEXT,
  region TEXT
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  budget_score INTEGER := 0;
  service_score INTEGER := 0;
BEGIN
  -- Budget scoring
  CASE region
    WHEN 'UK' THEN
      CASE budget
        WHEN '£25,000+' THEN budget_score := 100;
        WHEN '£10,000+' THEN budget_score := 80;
        WHEN '£5,000+' THEN budget_score := 60;
        WHEN '£1,500+' THEN budget_score := 40;
        ELSE budget_score := 20;
      END CASE;
    WHEN 'UAE' THEN
      CASE budget
        WHEN 'AED 100,000+' THEN budget_score := 100;
        WHEN 'AED 40,000+' THEN budget_score := 80;
        WHEN 'AED 20,000+' THEN budget_score := 60;
        WHEN 'AED 5,000+' THEN budget_score := 40;
        ELSE budget_score := 20;
      END CASE;
    WHEN 'IND' THEN
      CASE budget
        WHEN '₹25L+' THEN budget_score := 100;
        WHEN '₹10L+' THEN budget_score := 80;
        WHEN '₹5L+' THEN budget_score := 60;
        WHEN '₹1.5L+' THEN budget_score := 40;
        ELSE budget_score := 20;
      END CASE;
  END CASE;

  -- Service scoring
  CASE service
    WHEN 'ecommerce' THEN service_score := 100;
    WHEN 'ads' THEN service_score := 90;
    WHEN 'automation' THEN service_score := 90;
    WHEN 'seo' THEN service_score := 80;
    ELSE service_score := 40;
  END CASE;

  -- Weighted average (budget 60%, service 40%)
  score := (budget_score * 0.6 + service_score * 0.4)::INTEGER;

  RETURN score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Auto-calculate score on insert
CREATE OR REPLACE FUNCTION auto_score_lead()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := calculate_lead_score(NEW.budget_range, NEW.service_interest, NEW.region);

  -- Set score tier
  CASE
    WHEN NEW.lead_score >= 80 THEN NEW.score_tier := 'hot';
    WHEN NEW.lead_score >= 60 THEN NEW.score_tier := 'warm';
    WHEN NEW.lead_score >= 40 THEN NEW.score_tier := 'cold';
    ELSE NEW.score_tier := 'unqualified';
  END CASE;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_score_lead
BEFORE INSERT ON leads
FOR EACH ROW
EXECUTE FUNCTION auto_score_lead();
```

---

## Health Check Procedures

### Daily Health Checks

Run these checks every morning to ensure database health:

#### 1. Check Database Connection

```sql
SELECT NOW() AS current_time, version() AS postgres_version;
```

Expected: Should return current timestamp and PostgreSQL version (14+)

#### 2. Check Table Row Counts

```sql
SELECT
  'leads' AS table_name,
  COUNT(*) AS total_rows,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') AS rows_last_24h
FROM leads
UNION ALL
SELECT
  'newsletter_subscribers',
  COUNT(*),
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours')
FROM newsletter_subscribers;
```

Expected: Row counts should be increasing daily

#### 3. Check Lead Score Distribution

```sql
SELECT
  score_tier,
  COUNT(*) AS count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM leads
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY score_tier
ORDER BY
  CASE score_tier
    WHEN 'hot' THEN 1
    WHEN 'warm' THEN 2
    WHEN 'cold' THEN 3
    WHEN 'unqualified' THEN 4
  END;
```

Expected distribution:
- Hot: 10-20%
- Warm: 25-35%
- Cold: 30-40%
- Unqualified: 15-25%

#### 4. Check for Duplicate Emails

```sql
SELECT
  email,
  COUNT(*) AS submission_count,
  ARRAY_AGG(created_at ORDER BY created_at) AS submission_dates
FROM leads
GROUP BY email
HAVING COUNT(*) > 3
ORDER BY COUNT(*) DESC
LIMIT 10;
```

Expected: Few duplicates (same person submitting multiple times)
Action: If spam detected, add email validation/CAPTCHA

#### 5. Check RLS Policies

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Expected: All tables should have RLS policies as documented above

#### 6. Check Database Size

```sql
SELECT
  pg_size_pretty(pg_database_size(current_database())) AS database_size,
  pg_size_pretty(pg_total_relation_size('leads')) AS leads_table_size,
  pg_size_pretty(pg_total_relation_size('blog_posts')) AS blog_posts_table_size;
```

Expected: Database should stay under 1GB on free tier

---

### Weekly Maintenance

#### Vacuum and Analyze

```sql
VACUUM ANALYZE leads;
VACUUM ANALYZE blog_posts;
VACUUM ANALYZE newsletter_subscribers;
```

Run every Sunday to optimize query performance.

#### Check Slow Queries

In Supabase Dashboard → Database → Query Performance:
- Identify queries taking >1000ms
- Add missing indexes
- Optimize query structure

---

## Backup & Recovery

### Automatic Backups

Supabase automatically backs up databases:
- **Free tier**: Daily backups, 7-day retention
- **Pro tier**: Daily backups, 30-day retention
- **Point-in-time recovery**: Available on Pro tier

### Manual Backup

```bash
# Export leads table to CSV
supabase db dump --table=leads --data-only > leads_backup.sql

# Or use Supabase Dashboard → Database → Backups → Export
```

### Recovery Procedure

1. Go to Supabase Dashboard → Database → Backups
2. Select backup date
3. Click "Restore"
4. Confirm restoration (will overwrite current data)

---

## Monitoring & Alerts

### Set Up Supabase Alerts

1. **Database Size Alert**
   - Trigger: Database size > 800MB (80% of 1GB free tier limit)
   - Action: Email to ops@blackarrowtechnologies.com

2. **Failed Query Alert**
   - Trigger: Error rate > 5% of queries
   - Action: Slack #tech-alerts

3. **Slow Query Alert**
   - Trigger: Query execution time > 2000ms
   - Action: Log to monitoring dashboard

### External Monitoring

Use UptimeRobot or similar to monitor:
- Database connectivity: `https://your-project.supabase.co/rest/v1/leads?limit=1`
- Expected: 200 OK response

---

## Troubleshooting

### Issue: "relation does not exist"

**Cause**: Table hasn't been created yet
**Fix**:
```sql
-- Re-run table creation SQL from "Database Schema" section
```

### Issue: "permission denied for table leads"

**Cause**: RLS policies blocking access
**Fix**:
- Check if user is authenticated
- Verify RLS policies are correct
- Temporarily disable RLS for debugging: `ALTER TABLE leads DISABLE ROW LEVEL SECURITY;`

### Issue: Duplicate key value violates unique constraint

**Cause**: Trying to insert same email twice
**Fix**:
- Use `ON CONFLICT DO NOTHING` in INSERT statement
- Or update existing record instead

### Issue: Slow queries

**Cause**: Missing indexes
**Fix**:
- Check query execution plan: `EXPLAIN ANALYZE SELECT ...`
- Add index on frequently queried columns
- Limit result sets with proper WHERE clauses

---

## Security Best Practices

1. **Never expose the service_role key** - Keep it server-side only
2. **Always use RLS** - Enable on every table
3. **Validate user input** - Use CHECK constraints in SQL
4. **Use prepared statements** - Supabase client handles this automatically
5. **Rotate credentials annually** - Update Supabase project password
6. **Monitor for SQL injection attempts** - Check logs for suspicious queries
7. **Limit database exposure** - Only expose tables that need public access

---

## Upgrade Path

When growing beyond free tier limits:

### Supabase Pro ($25/month)
- 8GB database
- 100GB bandwidth
- 50GB file storage
- Point-in-time recovery
- Daily backups (30-day retention)

### Custom Plan
- Contact Supabase sales for enterprise needs
- Dedicated support
- Custom SLA
- Advanced security features

---

## Contact

For Supabase-related issues:
- **Developer**: dev@blackarrowtechnologies.com
- **Supabase Support**: https://supabase.com/support (Pro tier only)
