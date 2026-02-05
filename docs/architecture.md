# 🏗️ BLACK ARROW TECHNOLOGIES - SYSTEM ARCHITECTURE

**Version:** 1.0
**Last Updated:** 2026-01-27
**Status:** Phase 1 - Foundation

---

## 🎯 EXECUTIVE SUMMARY

Black Arrow Technologies is a **multi-region AI-native marketing and web development agency** targeting UK, UAE, and India markets. This platform serves as the primary digital sales engine, designed to generate ₹50L+ annual revenue through automated lead capture and regional routing.

**Business Model:**
- **Primary Revenue:** Web development deals (₹5L+ per project)
- **Secondary Revenue:** Marketing retainers and AI automation consulting
- **Month 1 Goal:** 30 deals closed, 100 prospects, 3 regional markets active

---

## 🏛️ CORE TECHNOLOGY STACK

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x (App Router) | Server components, file-based routing, SEO |
| **React** | 18.x | UI component framework |
| **Tailwind CSS** | 3.x | Utility-first styling, design tokens |
| **Framer Motion** | 11.x | Scroll animations, page transitions |
| **Lucide React** | Latest | Icon system (2px stroke, white, flat) |

### Typography
- **Headings:** Unbounded (Google Fonts)
- **Body:** Hanken Grotesk (Google Fonts)

### Backend & Infrastructure
| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Supabase** | Auth, PostgreSQL, Storage | Row-Level Security enabled |
| **Vercel** | Hosting, edge functions | Regional CDN (UK, UAE, India) |
| **GitHub** | Version control | Main branch = production |

### Development Tools
- **TypeScript** (strict mode)
- **ESLint** + **Prettier**
- **pnpm** (package manager)

---

## 🌍 MULTI-REGION ARCHITECTURE

### Subdomain Strategy
```
blackarrowtechnologies.com  → Global (default to UK)
ae.blackarrowtechnologies.com → UAE market
in.blackarrowtechnologies.com → India market
```

### Region Detection Logic
```typescript
// Middleware pattern
const regionMap = {
  'blackarrowtechnologies.com': 'UK',
  'ae.blackarrowtechnologies.com': 'UAE',
  'in.blackarrowtechnologies.com': 'IND'
};

// 1. Check subdomain
// 2. Inject regional data (phone, address)
// 3. Route form submissions to regional leads table
// 4. Display region-specific case studies (optional)
```

### Content Sharing Model
- **Shared Content:** Blog posts, service pages (tagged with regions)
- **Regional Override:** Contact details, phone numbers, addresses
- **Future:** Arabic RTL for UAE (Phase 2)

---

## 📊 DATA FLOW ARCHITECTURE

### User Journey (Public)
```
1. User lands on homepage → Region detected
2. Browses services → CTA visible on every page
3. Clicks "Start Your AI Audit" → Contact form
4. Submits form → Data saved to Supabase `leads` table
5. Admin notified → Lead routed to regional sales team
```

### Admin Journey
```
1. Admin logs in → Supabase Auth
2. Dashboard → View all leads (filterable by region)
3. Blog CMS → Create/edit posts with regional tags
4. Regional Settings → Update phone/address per region
```

### Database Schema Overview
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   regions   │◄─────│    leads     │      │    posts    │
│             │      │              │      │             │
│ • UK        │      │ • name       │      │ • title     │
│ • UAE       │      │ • email      │      │ • slug      │
│ • IND       │      │ • company    │      │ • content   │
│             │      │ • message    │      │ • region[]  │
└─────────────┘      │ • status     │      └─────────────┘
                     └──────────────┘
                              │
                              ▼
                     ┌──────────────┐
                     │ admin_users  │
                     │              │
                     │ • email      │
                     │ • role       │
                     └──────────────┘
```

---

## 🎨 DESIGN SYSTEM ARCHITECTURE

### Color Tokens (Tailwind Config)
```javascript
colors: {
  'deep-obsidian': '#0A0A0A',    // Background
  'cloud-dancer': '#F0EEE9',      // Primary text
  'warm-sand': '#C9A46B',         // CTAs, accents
  'slate-ui': '#2B2F36'           // Borders, cards
}
```

### Spacing System
- **Section Spacing:** 80px vertical (`py-20`)
- **Card Padding:** 32px (`p-8`)
- **Bento Grid Gap:** 24px (`gap-6`)

### Typography Scale
```css
h1: 56px (Unbounded, Bold)
h2: 40px (Unbounded, Bold)
h3: 24px (Unbounded, Bold)
body: 16px (Hanken Grotesk, Regular)
button: 16px (Hanken Grotesk, Bold)
```

### Component Hierarchy
```
Layout Components:
├── Header (navigation + region switcher)
├── Footer (contact info, social links)
├── BentoGrid (4-col responsive grid)
└── Section (80px spacing wrapper)

Core Components:
├── Button (CTAButton, SecondaryButton, TextButton)
├── Card (BentoCard, TestimonialCard, CaseStudyCard)
├── Form (ContactForm, RegionalLeadForm)
└── Icon (Lucide, 2px stroke, white)

Admin Components:
├── Dashboard (leads table, filters)
├── BlogEditor (markdown editor)
└── RegionSettings (phone/address inputs)
```

---

## 🔒 SECURITY ARCHITECTURE

### Supabase Row-Level Security (RLS)
```sql
-- Leads table: Public can insert, admins can read all
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Posts table: Public reads published, admins manage all
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admins can manage posts"
  ON posts FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));
```

### Authentication Flow
1. **Admin Login:** Email/password via Supabase Auth
2. **Session Management:** JWT tokens (7-day expiry)
3. **Protected Routes:** `/admin/*` requires authenticated session
4. **No User Accounts:** Public users do NOT create accounts (lead capture only)

---

## 📁 FILE STRUCTURE

```
bat-website/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes
│   │   ├── page.tsx              # Homepage
│   │   ├── services/             # Service deep-dive pages
│   │   │   ├── ecommerce/page.tsx
│   │   │   ├── ads/page.tsx
│   │   │   ├── automation/page.tsx
│   │   │   └── seo/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── contact/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── admin/                    # Protected admin routes
│   │   ├── layout.tsx            # Auth wrapper
│   │   ├── dashboard/page.tsx
│   │   ├── blog/page.tsx
│   │   └── settings/page.tsx
│   ├── api/                      # API routes (if needed)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind imports
│   └── middleware.ts             # Region detection
├── components/
│   ├── layout/                   # Header, Footer, Section
│   ├── ui/                       # Button, Card, BentoGrid
│   ├── forms/                    # ContactForm, LeadForm
│   └── admin/                    # Dashboard components
├── lib/
│   ├── supabase/                 # Supabase client config
│   ├── utils/                    # Helper functions
│   └── constants/                # Region data, config
├── public/
│   ├── images/                   # Case study images
│   └── icons/                    # Brand assets
├── docs/
│   ├── architecture.md           # This file
│   ├── data-model.md
│   ├── brand.md
│   └── roadmap.md                # Future features (v2.0+)
├── tailwind.config.ts            # Design tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 DEPLOYMENT PIPELINE

### Phase 1-3 (Localhost Development)
1. Local Next.js dev server (`npm run dev`)
2. Supabase local project (cloud instance for testing)
3. Manual testing on Chrome/Safari/Firefox

### Phase 4 (Production Deployment)
1. **Vercel Project Setup:**
   - Connect GitHub repo
   - Configure environment variables (Supabase keys)
   - Enable regional edge caching

2. **Domain Configuration:**
   - Point main domain to Vercel
   - Add CNAME records for `ae.` and `in.` subdomains

3. **Supabase Production:**
   - Enable RLS policies
   - Create admin user account
   - Seed regions table (UK, UAE, IND)

4. **Monitoring:**
   - Vercel Analytics (page views, conversion rate)
   - Supabase Dashboard (database usage)
   - Manual lead tracking (Phase 3 admin dashboard)

---

## 🎯 PERFORMANCE TARGETS

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse Score** | 95+ | Performance, Accessibility, SEO |
| **First Contentful Paint** | <1.5s | Core Web Vitals |
| **Time to Interactive** | <3s | Vercel Analytics |
| **Mobile Responsiveness** | 100% | 375px - 1920px tested |
| **Form Submission Rate** | 10%+ | Supabase leads count ÷ page views |

---

## 🔮 FUTURE ARCHITECTURE (Post-Phase 4)

### v2.0 Features (Do NOT Build Yet)
- **Live Metrics Dashboard:** Real-time lead count, conversion rates
- **AI Audit Quiz:** Multi-step form with scoring logic
- **Client Portals:** Authenticated project dashboards
- **Live Chat:** Real-time support widget (Intercom/Tawk.to)

### Scalability Considerations
- **Database:** Supabase can handle 10K+ leads/month on free tier
- **Hosting:** Vercel Edge Network supports global traffic
- **Content:** Blog posts stored in Supabase (not Markdown files)

---

## ✅ PHASE 1 DELIVERABLES CHECKLIST

- [x] This document (`architecture.md`)
- [ ] `data-model.md` (Supabase schema details)
- [ ] `brand.md` (Copy guidelines, tone of voice)
- [ ] Supabase project created
- [ ] Next.js 14 scaffold with Tailwind
- [ ] Design tokens configured (colors, fonts)
- [ ] Base components (Button, Card, BentoGrid, Section)
- [ ] Global navigation with region switcher
- [ ] Admin auth flow (email/password login)
- [ ] Working localhost (`localhost:3000`)

---

**Next Steps:** Create `data-model.md` and `brand.md`, then wait for approval before implementing Phase 1 code.
