# Lead Scoring Logic

## Overview

Black Arrow Technologies uses an automated lead scoring system to prioritize and qualify inbound leads from the website. This system assigns scores based on multiple factors to help the sales team focus on the most promising opportunities.

## Scoring Framework

### Base Score Components

| Factor | Weight | Score Range | Description |
|--------|--------|-------------|-------------|
| Budget Intent | 40% | 0-100 | Based on selected budget range in forms |
| Service Interest | 30% | 0-100 | Type and complexity of service requested |
| Company Maturity | 20% | 0-100 | Domain age, traffic indicators, business size |
| Engagement Level | 10% | 0-100 | Form completion, chatbot interaction, page views |

### Total Lead Score: 0-100

- **Hot Lead (80-100)**: Immediate sales outreach within 2 hours
- **Warm Lead (60-79)**: Sales outreach within 24 hours
- **Cold Lead (40-59)**: Marketing nurture sequence
- **Unqualified (<40)**: Automated response only

---

## Budget Intent Scoring

Budget selection is the strongest signal of purchase intent and ability to pay.

### UK Market Scoring

| Budget Range | Score | Qualification |
|--------------|-------|---------------|
| £25,000+ | 100 | Hot - Enterprise tier |
| £10,000+ | 80 | Hot - Mid-market |
| £5,000+ | 60 | Warm - SMB |
| £1,500+ | 40 | Cold - Starter projects |
| Not specified | 20 | Unqualified |

### UAE Market Scoring

| Budget Range | Score | Qualification |
|--------------|-------|---------------|
| AED 100,000+ | 100 | Hot - Enterprise tier |
| AED 40,000+ | 80 | Hot - Mid-market |
| AED 20,000+ | 60 | Warm - SMB |
| AED 5,000+ | 40 | Cold - Starter projects |
| Not specified | 20 | Unqualified |

### India Market Scoring

| Budget Range | Score | Qualification |
|--------------|-------|---------------|
| ₹25L+ | 100 | Hot - Enterprise tier |
| ₹10L+ | 80 | Hot - Mid-market |
| ₹5L+ | 60 | Warm - SMB |
| ₹1.5L+ | 40 | Cold - Starter projects |
| Not specified | 20 | Unqualified |

---

## Service Interest Scoring

Different services indicate different project complexity and revenue potential.

### Service Type Scores

| Service | Base Score | Revenue Multiplier | Rationale |
|---------|------------|-------------------|-----------|
| **E-Commerce Development** | 100 | 2.5x | High complexity, ongoing relationship, retainer potential |
| **Performance Ads** | 90 | 2.0x | Monthly recurring revenue, high margins |
| **Automation & AI** | 90 | 2.2x | Complex projects, competitive differentiator |
| **Technical SEO** | 80 | 1.8x | 6-12 month engagements, measurable ROI |
| **General Inquiry** | 40 | 1.0x | Unqualified, discovery call needed |

### Multi-Service Bonus

If a lead expresses interest in **2+ services**, add +15 points to the total score. This indicates:
- Higher project value
- Longer engagement potential
- More sophisticated buyer (understands integrated approach)

---

## Company Maturity Scoring

Assess the lead's ability to execute and pay based on company signals.

### Manual Indicators

| Signal | Score Adjustment |
|--------|------------------|
| **Domain Age** | |
| 5+ years | +20 |
| 2-5 years | +10 |
| <2 years | 0 |
| **Employee Count (LinkedIn)** | |
| 100+ employees | +25 |
| 20-99 employees | +15 |
| 5-19 employees | +5 |
| <5 employees | 0 |
| **Funding Status** | |
| Series B+ / Profitable | +20 |
| Series A / Revenue | +10 |
| Seed / Pre-revenue | 0 |

### Automated Signals (Future Enhancement)

**Clearbit/Apollo Enrichment**:
- Industry match (SaaS, E-commerce, B2B Services): +15
- Revenue range ($1M-$10M): +10, ($10M+): +20
- Technology stack match (React, Next.js, Shopify): +10

**Website Quality Indicators** (via PageSpeed Insights API):
- PageSpeed <50: +15 (shows need for technical SEO)
- No schema markup: +10 (shows need for AEO work)
- High bounce rate (>70%): +10 (shows need for UX optimization)

---

## Engagement Level Scoring

Behavioral signals that indicate serious interest.

### On-Site Engagement

| Action | Points | Rationale |
|--------|--------|-----------|
| Completed AI Audit form | +25 | High intent, provided website for review |
| Completed Contact form | +20 | Direct inquiry |
| Chatbot conversation (5+ messages) | +15 | Active engagement, asking questions |
| Downloaded case study | +10 | Researching solutions |
| Viewed Pricing page | +15 | Qualified themselves |
| Visited 5+ pages | +10 | Serious interest |
| Spent 5+ minutes on site | +10 | Deep engagement |

### Form Completion Quality

| Completeness | Score Modifier |
|--------------|----------------|
| All fields completed | +15 |
| Partial completion (skipped optional fields) | +5 |
| Minimal info only | 0 |

---

## Real-Time Score Calculation

### Implementation Logic

```typescript
interface Lead {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  budget?: string;
  serviceInterest: string[];
  message?: string;
  source: string; // 'ai_audit_popup', 'contact_form', 'chatbot'
  pageViews: number;
  timeOnSite: number; // seconds
}

function calculateLeadScore(lead: Lead, region: 'UK' | 'UAE' | 'IND'): number {
  let score = 0;

  // 1. Budget Intent (40% weight)
  const budgetScore = getBudgetScore(lead.budget, region);
  score += budgetScore * 0.4;

  // 2. Service Interest (30% weight)
  const serviceScore = getServiceScore(lead.serviceInterest);
  score += serviceScore * 0.3;

  // 3. Company Maturity (20% weight)
  const companyScore = getCompanyScore(lead.website, lead.company);
  score += companyScore * 0.2;

  // 4. Engagement Level (10% weight)
  const engagementScore = getEngagementScore(lead);
  score += engagementScore * 0.1;

  // Round to nearest integer
  return Math.round(score);
}
```

---

## Lead Routing & Workflows

### Automated Actions by Score

#### Hot Leads (80-100)
1. **Immediate Slack notification** to #sales-hot channel
2. **Email alert** to sales team (within 2 minutes)
3. **SMS to on-call sales rep** (if after hours)
4. **Auto-create HubSpot deal** with "Hot Lead" tag
5. **Assign to senior sales rep** (round-robin)

SLA: First response within 2 hours

#### Warm Leads (60-79)
1. **Email notification** to sales team (batched every 30 minutes)
2. **Add to HubSpot** with "Warm Lead" tag
3. **Assign to sales team** (based on region)
4. **Add to nurture sequence** (automated email series)

SLA: First response within 24 hours

#### Cold Leads (40-59)
1. **Add to HubSpot** with "Cold Lead" tag
2. **Automated email** with case study relevant to their service interest
3. **Add to marketing nurture sequence** (weekly educational content)
4. **Re-score after 7 days** based on email engagement

SLA: Automated response only, manual follow-up after 7 days if engaged

#### Unqualified (<40)
1. **Automated thank-you email** with link to resources
2. **Add to general newsletter list** (monthly content)
3. **Flag for manual review** if from enterprise domain

SLA: Automated response only

---

## Special Cases & Overrides

### Manual Score Adjustments

Sales team can manually override lead scores in HubSpot with justification:
- **VIP Account** (existing client referral): Force to Hot (100)
- **Named Account** (target company list): +20 to score
- **Bad Fit** (competitor, spam): Force to Unqualified (0)

### Regional Variations

**UAE Leads**:
- Luxury retail or real estate: +15 (matches our case studies)
- Arabic language preference indicated: +10 (we have localization expertise)

**India Leads**:
- B2B SaaS: +15 (matches our expertise)
- Tier 1 cities (Mumbai, Bangalore, Delhi): +10

**UK Leads**:
- London/South East: +10 (easier for in-person meetings)
- GDPR-sensitive industries (fintech, healthtech): +15 (we have compliance expertise)

---

## Reporting & Optimization

### Weekly Metrics to Track

1. **Score Distribution**
   - % of leads in each tier (Hot/Warm/Cold/Unqualified)
   - Target: 15% Hot, 30% Warm, 35% Cold, 20% Unqualified

2. **Conversion Rates by Score**
   - Lead-to-Opportunity conversion % for each tier
   - Opportunity-to-Close conversion % for each tier
   - Time to close by lead score

3. **Score Accuracy**
   - Are Hot leads actually closing at high rates?
   - Are we missing opportunities in lower-scored leads?

### Monthly Score Calibration

Review and adjust scoring weights based on:
- Which factors best predict closed deals
- Regional differences in conversion patterns
- Seasonal variations (Q4 vs Q1 budget cycles)

---

## Database Schema

### Leads Table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  region TEXT NOT NULL, -- 'UK', 'UAE', 'IND'
  budget_range TEXT,
  service_interest TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL, -- 'ai_audit_popup', 'contact_form', 'chatbot'

  -- Scoring fields
  lead_score INTEGER, -- 0-100
  budget_score INTEGER,
  service_score INTEGER,
  company_score INTEGER,
  engagement_score INTEGER,
  score_tier TEXT, -- 'hot', 'warm', 'cold', 'unqualified'

  -- Engagement tracking
  page_views INTEGER DEFAULT 0,
  time_on_site INTEGER DEFAULT 0, -- seconds

  -- Status tracking
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'unqualified', 'converted'
  assigned_to TEXT,
  contacted_at TIMESTAMP,
  qualified_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Enrichment data (populated via Clearbit/Apollo)
  company_domain_age INTEGER, -- days
  company_employee_count INTEGER,
  company_funding_stage TEXT,
  company_tech_stack TEXT[]
);

-- Indexes for performance
CREATE INDEX idx_leads_score ON leads(lead_score DESC);
CREATE INDEX idx_leads_region ON leads(region);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

---

## Future Enhancements

### Phase 2: Predictive Scoring (ML Model)

Train a machine learning model on historical lead data:
- Features: All current scoring factors + enrichment data
- Target: Did the lead convert to paying customer?
- Model: Logistic regression or gradient boosting
- Output: Predicted conversion probability (0-100%)

### Phase 3: Behavioral Lead Scoring

Track additional behavioral signals:
- Email open/click rates
- Content downloads (case studies, whitepapers)
- Webinar attendance
- Social media engagement
- Website return visits

### Phase 4: Account-Based Scoring

Aggregate lead scores at the company level:
- Multiple touchpoints from same company
- Buying committee identification
- Account engagement trending up/down

---

## Contact

For questions about lead scoring or to request manual score adjustments:
- **Sales Team**: sales@blackarrowtechnologies.com
- **HubSpot Admin**: ops@blackarrowtechnologies.com
