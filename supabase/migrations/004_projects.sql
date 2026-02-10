-- PROJECTS TABLE
-- Admin-managed portfolio projects with region/page visibility controls
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic info
  title TEXT NOT NULL,
  client TEXT,
  description TEXT NOT NULL,

  -- Classification
  category TEXT NOT NULL CHECK (category IN ('landing-page', 'business-site', 'custom-web-app')),
  industry TEXT CHECK (industry IN ('Real Estate', 'Hospitality', 'Automotive', 'Tech', 'E-commerce', 'Other')),

  -- Display
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  -- Media
  thumbnail TEXT,
  images TEXT[] DEFAULT '{}',

  -- URLs & Tags
  live_url TEXT,
  tags TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',

  -- Visibility Controls
  region_visibility TEXT[] DEFAULT '{UK,UAE,IND}',
  show_on_portfolio BOOLEAN DEFAULT true,
  show_on_website_dev BOOLEAN DEFAULT true,
  show_on_landing_page BOOLEAN DEFAULT false,
  show_on_business_site BOOLEAN DEFAULT false,
  show_on_custom_web_app BOOLEAN DEFAULT false,

  -- Rich content (JSONB for flexibility)
  functionality JSONB,
  uiux JSONB,
  branding JSONB,

  -- Metadata
  year INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published projects" ON projects;
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  TO anon
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated can view all projects" ON projects;
CREATE POLICY "Authenticated can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can insert projects" ON projects;
CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can update projects" ON projects;
CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Seed with existing static project data

-- From websiteDevProjects.ts
INSERT INTO projects (title, client, description, category, thumbnail, live_url, tags, highlights, show_on_website_dev, show_on_landing_page, show_on_business_site, show_on_custom_web_app, show_on_portfolio, published, sort_order) VALUES
(
  'Origin & Iron',
  'Origin & Iron Coffee',
  'A specialty coffee roastery with a clean, editorial homepage designed to tell their story. Strong typography and warm tones guide visitors to their subscription service.',
  'landing-page',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  'https://cafev1-demo.vercel.app',
  '{coffee,roastery,editorial,subscription}',
  '{Subscription-first CTA layout,Editorial scroll storytelling,Warm palette with dark roast tones,Mobile-optimised hero section}',
  true, true, false, false, true, true, 1
),
(
  'The Hearthstone Cafe',
  'Hearthstone Cafe',
  'A family-owned cafe since 1985 needed a digital presence that matched their homely atmosphere. We created a multi-page site with online menu, location info, and an events booking system.',
  'business-site',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  'https://cafev2-demo.vercel.app',
  '{cafe,family-owned,menu,events}',
  '{Multi-page layout with easy navigation,Interactive weekly menu display,Events booking integration,Heritage-inspired visual identity}',
  true, false, true, false, true, true, 2
),
(
  'Neon Sip',
  'Neon Sip Bubble Tea',
  'A premium bubble tea brand targeting Gen Z. We built a full custom web app with a drink customiser, loyalty points system, and multi-location ordering.',
  'custom-web-app',
  'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&q=80',
  'https://cafev3-demo.vercel.app',
  '{bubble-tea,gen-z,customiser,loyalty}',
  '{Interactive drink customiser,Points-based loyalty system,Multi-location ordering,Vibrant neon-themed UI}',
  true, false, false, true, true, true, 3
),
(
  'Brew & Brick',
  'Brew & Brick Coffee',
  'A London-based coffee shop chain looking to unify their online presence. We delivered a sleek landing page with store locator, loyalty app integration, and wholesale enquiry forms.',
  'landing-page',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
  'https://cafev4-demo.vercel.app',
  '{coffee-chain,london,store-locator,wholesale}',
  '{Store locator with map integration,Wholesale enquiry pipeline,Loyalty app deep linking,Industrial-chic design language}',
  true, true, false, false, true, true, 4
);

-- From portfolioData.ts
INSERT INTO projects (title, client, description, category, industry, featured, thumbnail, live_url, tags, highlights, functionality, uiux, branding, year, show_on_portfolio, show_on_website_dev, published, sort_order, region_visibility) VALUES
(
  'Palm Residence',
  'Palm Residence UAE',
  'A luxury villa marketplace with immersive 3D tours, AI-powered property matching, and a seamless buying journey that combines the grandeur of Dubai real estate with cutting-edge web technology.',
  'custom-web-app',
  'Real Estate',
  true,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  NULL,
  '{real-estate,luxury,3D-tours,AI-matching,marketplace}',
  '{3D Virtual Tours,AI Property Matching,Multi-currency Support,VIP Concierge Portal}',
  '{"title": "Intelligent Property Discovery", "description": "An AI-powered platform that understands buyer preferences and delivers personalized property recommendations with immersive virtual experiences.", "features": ["Interactive 3D property tours with hotspot navigation", "AI-driven property matching based on lifestyle preferences", "Real-time availability and pricing in AED/USD/GBP/EUR", "VIP concierge dashboard for high-net-worth clients", "Mortgage calculator with UAE bank rate integration", "Shortlist and comparison tool for up to 5 properties"]}',
  '{"philosophy": "Desert Modernism meets Digital Luxury", "designDecisions": [{"decision": "Full-bleed imagery with minimal UI overlay", "rationale": "Properties sell themselves - the UI should frame, not compete"}, {"decision": "Dark mode default with gold accents", "rationale": "Conveys exclusivity and aligns with luxury brand positioning"}, {"decision": "Horizontal scroll for property galleries", "rationale": "Mimics the experience of walking through a property"}], "colorPalette": [{"name": "Desert Gold", "hex": "#C9A96E", "usage": "Primary accent, CTAs, active states"}, {"name": "Obsidian", "hex": "#0A0A0A", "usage": "Primary background"}, {"name": "Marble White", "hex": "#F8F6F3", "usage": "Text, cards on dark backgrounds"}, {"name": "Palm Green", "hex": "#2D5A3D", "usage": "Success states, verified badges"}], "typography": "Playfair Display for headings (serif elegance), Inter for body text (clean readability)"}',
  '{"logo": "Geometric palm tree silhouette in gold", "brandColors": ["#C9A96E", "#0A0A0A", "#F8F6F3"], "guidelines": ["Always maintain generous whitespace", "Photography should feature twilight/golden hour lighting", "Minimum 60% image-to-text ratio on landing pages"]}',
  2025,
  true, false, true, 10, '{UK,UAE,IND}'
),
(
  'Saffron Kitchen',
  'Saffron Kitchen Restaurant Group',
  'A multi-location restaurant platform that seamlessly blends online ordering, table reservations, and a loyalty programme into one cohesive digital experience that celebrates culinary artistry.',
  'business-site',
  'Hospitality',
  true,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  NULL,
  '{restaurant,multi-location,ordering,reservations,loyalty}',
  '{Online Ordering System,Smart Table Reservations,Loyalty Points Programme,Multi-location Management}',
  '{"title": "Connected Dining Experience", "description": "A unified platform that connects diners with their favourite restaurants through seamless ordering, smart reservations, and rewarding loyalty.", "features": ["Real-time menu management across 4 locations", "Smart table allocation with waitlist management", "Integrated loyalty programme with tiered rewards", "Kitchen display system (KDS) for order management", "Customer preference tracking for personalised recommendations", "Gift card and group booking functionality"]}',
  '{"philosophy": "Warm Minimalism with Culinary Soul", "designDecisions": [{"decision": "Warm colour palette with saffron as hero colour", "rationale": "Creates appetite appeal while staying true to brand identity"}, {"decision": "Card-based menu layout with large food photography", "rationale": "Food-first approach drives ordering conversion"}, {"decision": "Sticky reservation bar on all pages", "rationale": "Booking should be one tap away regardless of browsing context"}], "colorPalette": [{"name": "Saffron", "hex": "#E5A100", "usage": "Primary brand colour, CTAs"}, {"name": "Charcoal", "hex": "#2C2C2C", "usage": "Text, navigation background"}, {"name": "Cream", "hex": "#FFF8E7", "usage": "Page backgrounds, card surfaces"}, {"name": "Herb Green", "hex": "#4A7C59", "usage": "Success states, fresh/available indicators"}], "typography": "Cormorant Garamond for headings (refined dining feel), Source Sans Pro for body (menu readability)"}',
  '{"logo": "Stylised saffron flower with script wordmark", "brandColors": ["#E5A100", "#2C2C2C", "#FFF8E7"], "guidelines": ["Food photography must be professionally lit, no filters", "Menu items always show allergen indicators", "Maintain consistent padding across location pages"]}',
  2025,
  true, false, true, 11, '{UK,UAE,IND}'
),
(
  'Pristine Auto Spa',
  'Pristine Auto Spa India',
  'A premium car detailing platform with subscription management, before/after galleries, and an intelligent booking system that optimises technician schedules across service centres.',
  'business-site',
  'Automotive',
  true,
  'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
  NULL,
  '{automotive,detailing,booking,subscription,premium}',
  '{Smart Booking System,Subscription Packages,Before/After Gallery,Technician Management}',
  '{"title": "Premium Detailing, Digitally Perfected", "description": "An end-to-end platform that transforms car care from a chore into a premium experience with smart scheduling, subscription flexibility, and stunning visual proof of quality.", "features": ["AI-optimised technician scheduling across 3 centres", "Subscription management with pause/upgrade/downgrade", "Before/after photo comparison with slider tool", "Push notification reminders for service schedules", "Loyalty programme with referral bonuses", "Fleet management portal for corporate clients"]}',
  '{"philosophy": "Showroom Precision in Digital Form", "designDecisions": [{"decision": "High-contrast dark theme with chrome accents", "rationale": "Mirrors the premium automotive aesthetic clients expect"}, {"decision": "Before/after slider as hero element", "rationale": "Visual proof of quality is the strongest sales tool"}, {"decision": "Step-by-step booking wizard", "rationale": "Reduces decision fatigue for complex service packages"}], "colorPalette": [{"name": "Chrome Silver", "hex": "#C0C0C0", "usage": "Primary accent, borders, highlights"}, {"name": "Midnight", "hex": "#121212", "usage": "Primary background"}, {"name": "Pearl White", "hex": "#F5F5F0", "usage": "Text, card surfaces"}, {"name": "Racing Red", "hex": "#CC0000", "usage": "Urgent CTAs, premium tier indicators"}], "typography": "Montserrat for headings (bold, automotive feel), Roboto for body (clean, technical readability)"}',
  '{"logo": "Abstract car silhouette with water droplet detail", "brandColors": ["#C0C0C0", "#121212", "#F5F5F0"], "guidelines": ["All car photos must be high-resolution, professionally shot", "Maintain consistent dark theme across all touchpoints", "Service package cards must show clear pricing hierarchy"]}',
  2026,
  true, false, true, 12, '{UK,UAE,IND}'
),
(
  'Nexora',
  'Nexora Technologies',
  'An AI-powered project management SaaS that combines intelligent task prioritisation, resource allocation, and predictive analytics into a clean, focused workspace designed for modern teams.',
  'custom-web-app',
  'Tech',
  false,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  NULL,
  '{SaaS,AI,project-management,analytics,teams}',
  '{AI Task Prioritisation,Predictive Analytics,Resource Allocation,Team Workspaces}',
  '{"title": "AI-First Project Intelligence", "description": "A next-generation project management platform that uses machine learning to predict bottlenecks, optimise resource allocation, and keep teams focused on what matters most.", "features": ["ML-powered task prioritisation and sprint planning", "Predictive timeline analysis with risk indicators", "Resource heatmaps showing team capacity in real-time", "Customisable workspaces with drag-and-drop layouts", "Integration hub (Slack, GitHub, Jira, Figma)", "Automated standup reports and progress summaries"]}',
  '{"philosophy": "Focused Clarity in Complex Work", "designDecisions": [{"decision": "Light, airy interface with generous whitespace", "rationale": "Reduces cognitive load in an already complex tool category"}, {"decision": "Progressive disclosure of features", "rationale": "New users see simplicity; power users unlock depth"}, {"decision": "Colour-coded priority system across all views", "rationale": "Instant visual scanning of task urgency without reading"}], "colorPalette": [{"name": "Electric Indigo", "hex": "#5B5FC7", "usage": "Primary brand, navigation, key CTAs"}, {"name": "Snow", "hex": "#FAFBFC", "usage": "Background, workspace surfaces"}, {"name": "Graphite", "hex": "#24292E", "usage": "Primary text, data visualisations"}, {"name": "Mint", "hex": "#2DA44E", "usage": "Success states, completed tasks"}], "typography": "Inter for everything (consistent, highly legible at all sizes, excellent for data-dense UIs)"}',
  '{"logo": "Abstract N lettermark with orbital ring suggesting AI/connectivity", "brandColors": ["#5B5FC7", "#FAFBFC", "#24292E"], "guidelines": ["Dashboard widgets must have consistent border radius (8px)", "Data visualisations use the brand colour palette only", "Empty states should always include helpful onboarding prompts"]}',
  2025,
  true, false, true, 13, '{UK,UAE,IND}'
),
(
  'Threadly',
  'Threadly Fashion',
  'A sustainable fashion marketplace with AR try-on, blockchain-verified supply chains, and a community-driven discovery feed that connects conscious consumers with ethical fashion brands.',
  'custom-web-app',
  'E-commerce',
  false,
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  NULL,
  '{fashion,sustainable,AR,blockchain,marketplace}',
  '{AR Virtual Try-On,Blockchain Supply Chain,Community Discovery,Ethical Brand Profiles}',
  '{"title": "Conscious Commerce, Beautifully Designed", "description": "A marketplace that makes sustainable fashion discovery delightful through AR experiences, transparent supply chains, and a community that celebrates conscious consumption.", "features": ["AR try-on using device camera with size recommendations", "Blockchain-verified supply chain journey for every item", "Community discovery feed with style boards and reviews", "Brand sustainability scorecards with verified certifications", "Smart wardrobe planner suggesting outfit combinations", "Carbon footprint tracker for purchase history"]}',
  '{"philosophy": "Organic Modernism with Purpose", "designDecisions": [{"decision": "Earth-tone palette with organic textures", "rationale": "Visually communicates sustainability without greenwashing"}, {"decision": "Full-screen product imagery with minimal chrome", "rationale": "Fashion is visual - let the clothing speak first"}, {"decision": "Story-driven product pages", "rationale": "Each item has a journey worth telling - from farm to wardrobe"}], "colorPalette": [{"name": "Terra Cotta", "hex": "#C67B5C", "usage": "Primary accent, CTAs"}, {"name": "Natural Linen", "hex": "#F5F0EB", "usage": "Background surfaces"}, {"name": "Deep Forest", "hex": "#1B3A2D", "usage": "Text, sustainability badges"}, {"name": "Ochre", "hex": "#D4A843", "usage": "Highlight, verified indicators"}], "typography": "DM Serif Display for headings (editorial fashion feel), DM Sans for body (modern, clean pairing)"}',
  '{"logo": "Thread needle forming a T with leaf detail", "brandColors": ["#C67B5C", "#F5F0EB", "#1B3A2D"], "guidelines": ["Model photography must be diverse and inclusive", "Product images on neutral/earth-tone backgrounds only", "Supply chain visualisations use the green palette family"]}',
  2026,
  true, false, true, 14, '{UK,UAE,IND}'
);
