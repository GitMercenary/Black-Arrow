# Portfolio Supabase Migration Guide

## Overview

This document outlines the database schema and migration plan to move portfolio projects from hardcoded data (`lib/data/portfolioData.ts`) to Supabase.

---

## Current Implementation

**Location:** `lib/data/portfolioData.ts`

**Data Structure:**
- 5 dummy projects hardcoded
- Industries: Real Estate, Hospitality, Automotive, Tech, E-commerce
- Each project includes:
  - Basic info (title, client, industry, year, featured status)
  - Images (thumbnail, gallery)
  - Functionality details
  - UI/UX explanation (philosophy, design decisions, colors, typography)
  - Branding kit (logo, brand colors, guidelines)

---

## Proposed Supabase Schema

### 1. `portfolio_projects` Table

Main table for portfolio projects.

```sql
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  year INTEGER NOT NULL,
  featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  description TEXT NOT NULL,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for filtering by industry
CREATE INDEX idx_portfolio_industry ON portfolio_projects(industry);

-- Index for featured projects
CREATE INDEX idx_portfolio_featured ON portfolio_projects(featured);

-- Index for year sorting
CREATE INDEX idx_portfolio_year ON portfolio_projects(year DESC);
```

---

### 2. `portfolio_tags` Table

Tags for projects (Next.js, React, etc.)

```sql
CREATE TABLE portfolio_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for tag-based filtering
CREATE INDEX idx_portfolio_tags_project ON portfolio_tags(project_id);
CREATE INDEX idx_portfolio_tags_tag ON portfolio_tags(tag);
```

---

### 3. `portfolio_images` Table

Gallery images for each project.

```sql
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering images
CREATE INDEX idx_portfolio_images_project ON portfolio_images(project_id, order_index);
```

---

### 4. `portfolio_functionality` Table

Functionality details.

```sql
CREATE TABLE portfolio_functionality (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 5. `portfolio_features` Table

Individual features list.

```sql
CREATE TABLE portfolio_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering features
CREATE INDEX idx_portfolio_features_project ON portfolio_features(project_id, order_index);
```

---

### 6. `portfolio_uiux` Table

UI/UX explanation.

```sql
CREATE TABLE portfolio_uiux (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  philosophy TEXT NOT NULL,
  heading_font TEXT,
  body_font TEXT,
  accent_font TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 7. `portfolio_design_decisions` Table

Design decision explanations.

```sql
CREATE TABLE portfolio_design_decisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  decision TEXT NOT NULL,
  rationale TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering decisions
CREATE INDEX idx_portfolio_design_decisions_project ON portfolio_design_decisions(project_id, order_index);
```

---

### 8. `portfolio_color_palette` Table

Color palette for UI/UX.

```sql
CREATE TABLE portfolio_color_palette (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex TEXT NOT NULL,
  usage TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering colors
CREATE INDEX idx_portfolio_color_palette_project ON portfolio_color_palette(project_id, order_index);
```

---

### 9. `portfolio_branding` Table

Branding kit.

```sql
CREATE TABLE portfolio_branding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  logo_url TEXT,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 10. `portfolio_brand_guidelines` Table

Branding guidelines.

```sql
CREATE TABLE portfolio_brand_guidelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  guideline TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering guidelines
CREATE INDEX idx_portfolio_brand_guidelines_project ON portfolio_brand_guidelines(project_id, order_index);
```

---

## Migration Steps

### Step 1: Create Tables

Run the SQL schema above in Supabase SQL Editor.

### Step 2: Enable Row Level Security (RLS)

```sql
-- Public read access for all portfolio tables
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_functionality ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_uiux ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_design_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_color_palette ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_brand_guidelines ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_tags FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_functionality FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_features FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_uiux FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_design_decisions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_color_palette FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_branding FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_brand_guidelines FOR SELECT USING (true);

-- Admin-only write access (requires authentication)
CREATE POLICY "Admin insert" ON portfolio_projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update" ON portfolio_projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete" ON portfolio_projects FOR DELETE USING (auth.role() = 'authenticated');

-- Repeat for other tables...
```

### Step 3: Seed Data

Create a migration script to populate tables with existing dummy data:

**File:** `supabase/migrations/seed_portfolio_data.sql`

```sql
-- Insert portfolio projects
INSERT INTO portfolio_projects (slug, title, client, industry, year, featured, thumbnail_url, description, live_url)
VALUES
  ('luxury-villas-uae', 'Palm Residence - Luxury Villa Marketplace', 'Palm Residence Group', 'Real Estate', 2025, true, '/portfolio/palm-residence-thumbnail.jpg', 'Premium villa marketplace with 3D property tours...', 'https://palmresidence.ae'),
  ('saffron-kitchen-uk', 'Saffron Kitchen - Multi-location Restaurant Platform', 'Saffron Kitchen Group', 'Hospitality', 2025, true, '/portfolio/saffron-kitchen-thumbnail.jpg', 'Unified digital ecosystem...', 'https://saffronkitchen.co.uk'),
  -- ... etc
;

-- Insert tags
INSERT INTO portfolio_tags (project_id, tag)
SELECT id, unnest(ARRAY['Next.js', 'Three.js', 'Supabase', 'Stripe', 'AI Matching'])
FROM portfolio_projects WHERE slug = 'luxury-villas-uae';

-- ... continue for all data
```

### Step 4: Update Frontend Code

Create new API functions to fetch from Supabase:

**File:** `lib/api/portfolio.ts`

```typescript
import { createClient } from '@/lib/supabase/client';
import { PortfolioProject } from '@/lib/data/portfolioData'; // Keep type

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('portfolio_projects')
    .select(`
      *,
      tags:portfolio_tags(tag),
      images:portfolio_images(image_url, order_index, alt_text),
      functionality:portfolio_functionality(*),
      features:portfolio_features(feature, order_index),
      uiux:portfolio_uiux(*),
      design_decisions:portfolio_design_decisions(decision, rationale, order_index),
      color_palette:portfolio_color_palette(name, hex, usage, order_index),
      branding:portfolio_branding(*),
      brand_guidelines:portfolio_brand_guidelines(guideline, order_index)
    `)
    .order('year', { ascending: false });

  if (error) throw error;

  // Transform Supabase data to match PortfolioProject interface
  return data.map(project => ({
    id: project.slug,
    title: project.title,
    client: project.client,
    industry: project.industry,
    year: project.year,
    featured: project.featured,
    thumbnail: project.thumbnail_url,
    images: project.images.sort((a, b) => a.order_index - b.order_index).map(img => img.image_url),
    description: project.description,
    tags: project.tags.map(t => t.tag),
    liveUrl: project.live_url,
    functionality: {
      title: project.functionality.title,
      description: project.functionality.description,
      features: project.features.sort((a, b) => a.order_index - b.order_index).map(f => f.feature),
    },
    uiux: {
      philosophy: project.uiux.philosophy,
      designDecisions: project.design_decisions.sort((a, b) => a.order_index - b.order_index),
      colorPalette: project.color_palette.sort((a, b) => a.order_index - b.order_index),
      typography: {
        heading: project.uiux.heading_font,
        body: project.uiux.body_font,
        accent: project.uiux.accent_font,
      },
    },
    branding: {
      logo: project.branding.logo_url,
      brandColors: {
        primary: project.branding.primary_color,
        secondary: project.branding.secondary_color,
        accent: project.branding.accent_color,
      },
      guidelines: project.brand_guidelines.sort((a, b) => a.order_index - b.order_index).map(g => g.guideline),
    },
  }));
}

export async function getFeaturedProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('featured', true)
    .order('year', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProjectsByIndustry(industry: string) {
  if (industry === 'All') return getPortfolioProjects();

  const supabase = createClient();
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('industry', industry)
    .order('year', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects();
  return projects.find(p => p.id === slug) || null;
}
```

### Step 5: Update Portfolio Pages

Replace imports in `app/portfolio/page.tsx` and `app/portfolio/[id]/page.tsx`:

```typescript
// Before
import { portfolioProjects, getFeaturedProjects } from '@/lib/data/portfolioData';

// After
import { getPortfolioProjects, getFeaturedProjects } from '@/lib/api/portfolio';

// Make page components async and fetch data
export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();
  const featured = await getFeaturedProjects();
  // ...
}
```

---

## Benefits of Migration

1. **Dynamic Content Management**: Update projects without deploying code
2. **Scalability**: Add unlimited projects without file size concerns
3. **Performance**: Supabase edge caching and CDN
4. **Admin Panel**: Build a CMS for non-technical users to manage portfolio
5. **Search & Filtering**: Complex queries without client-side filtering
6. **Analytics**: Track project views and engagement
7. **Versioning**: Track changes to projects over time

---

## Admin Panel (Future Enhancement)

Create an admin dashboard at `/admin/portfolio` for:
- Adding/editing/deleting projects
- Uploading images to Supabase Storage
- Reordering projects, features, guidelines
- Toggling featured status
- Preview before publishing

---

## Image Storage

### Current: Local `/public` folder

### Future: Supabase Storage

```typescript
// Upload function
export async function uploadPortfolioImage(file: File, projectId: string) {
  const supabase = createClient();
  const fileName = `${projectId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

---

## Timeline Estimate

- **Schema Creation**: 1 hour
- **RLS Policies**: 30 minutes
- **Data Seeding**: 1 hour
- **API Functions**: 2 hours
- **Frontend Integration**: 2 hours
- **Testing**: 1 hour
- **Total**: ~8 hours

---

## Notes

- Keep `portfolioData.ts` as TypeScript interface reference
- Implement caching strategy (ISR, SWR) for performance
- Add error boundaries for failed fetches
- Consider implementing search with Postgres full-text search
