# Image & Visual Guide for BLACK ARROW

## Brand Visual Identity

### Color Palette
- **Deep Obsidian**: #0f1419 (main background)
- **Warm Sand**: #dab582 (accent/CTA color)
- **Cloud Dancer**: #f5f5f5 (text)
- **Slate UI**: #1e2933 (secondary background)

### Visual Style
- **Modern & Minimalist**: Clean, uncluttered visuals
- **Professional**: Avoid overly casual or playful imagery
- **Tech-Forward**: AI, automation, digital themes
- **International**: Represents UK, UAE, and India markets

---

## Stock Photo Sources (Recommended)

### 1. Unsplash (Free)
**Best Collections:**
- "Technology & Business"
- "Minimal Workspace"
- "Data & Analytics"
- "E-commerce"

**Search Terms:**
- "professional workspace minimalist"
- "data visualization"
- "e-commerce luxury"
- "AI technology abstract"
- "Dubai business" / "London business" / "India startup"

### 2. Pexels (Free)
**Search Terms:**
- "minimalist office"
- "laptop code"
- "charts analytics"
- "luxury retail"

### 3. Premium Options
- **Shutterstock**: Extensive professional business imagery
- **Getty Images**: High-end luxury brand visuals
- **Adobe Stock**: Professional tech and business

---

## Image Needs by Section

### Homepage

#### Hero Section
**Type**: Abstract tech, data visualization, or clean workspace
**Mood**: Professional, modern, ambitious
**Dimensions**: 1920x1080 (landscape)
**Examples**:
- Abstract network connections (nodes/lines)
- Minimalist workspace with laptop showing analytics
- Data visualization dashboards
- Geometric patterns in warm-sand/obsidian colors

#### Services Section
**Type**: Icon-based (already using Lucide icons)
**Enhancement**: Add subtle background images
- E-commerce: Luxury product photography, shopping interfaces
- Performance Ads: Analytics dashboards, rising charts
- Automation: Robotic/AI abstract imagery
- SEO: Search results, ranking graphs

#### Case Study Highlight
**Type**: Product screenshots or results visualization
**Needed**:
1. Luxury watch e-commerce site screenshot
2. Analytics dashboard showing growth
3. Before/after comparison visuals

### Service Pages

#### E-Commerce Development
- Headless commerce architecture diagrams
- Beautiful e-commerce product pages
- Mobile shopping experiences
- Payment gateway interfaces

#### Performance Ads
- Google Ads/Meta Ads dashboards
- ROI graphs and charts
- Multi-platform ad creative examples
- Conversion funnel visualizations

#### Automation & AI
- Workflow diagrams
- Chatbot interfaces
- CRM integration visualizations
- Process automation flowcharts

#### Technical SEO
- Google Search Console screenshots
- Core Web Vitals scores
- Ranking position graphs
- Structured data examples

### Blog
- Featured images for each post (1200x630)
- In-article screenshots/diagrams
- Infographics for complex topics

---

## Creating Custom Graphics

### Tools Recommended

1. **Figma** (Free): For creating custom graphics, diagrams
2. **Canva Pro**: Quick branded social graphics
3. **Excalidraw**: Hand-drawn style diagrams
4. **Mermaid.js**: Code-based diagrams/flowcharts

### Brand-Specific Graphics to Create

1. **Service Process Diagrams**
   - Show your methodology step-by-step
   - Use brand colors (warm-sand for highlights)

2. **Results Visualizations**
   - Before/after comparisons
   - Growth charts
   - ROI calculators

3. **Architecture Diagrams**
   - Tech stack visualizations
   - Integration maps
   - Data flow diagrams

4. **Icon Sets**
   - Create custom icons matching your style
   - Use throughout site for consistency

---

## Image Specifications

### File Formats
- **Photos**: WebP (with JPEG fallback)
- **Graphics/Logos**: SVG when possible
- **Screenshots**: PNG

### Sizes & Optimization
- **Hero Images**: Max 1920x1080, under 200KB
- **Service Icons**: 512x512, under 50KB
- **Blog Featured**: 1200x630, under 150KB
- **Thumbnails**: 400x300, under 30KB

### Always:
- Compress images (use TinyPNG or Squoosh)
- Use WebP format for better performance
- Implement lazy loading (already using OptimizedImage component)

---

## Quick Wins

### 1. Add Hero Background Image
Replace solid backgrounds with subtle tech imagery:
```tsx
<div className="relative">
  <OptimizedImage
    src="/images/hero-bg.webp"
    alt=""
    className="absolute inset-0 opacity-5"
  />
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</div>
```

### 2. Service Card Images
Add small icons or images to service cards:
```tsx
<BentoCard
  image="/images/services/ecommerce.webp"
  icon={<ShoppingCart size={48} strokeWidth={2} />}
  title="E-Commerce Development"
  description="..."
/>
```

### 3. Case Study Screenshots
Add actual project screenshots or mockups:
```tsx
<OptimizedImage
  src="/images/case-studies/luxury-watches.webp"
  alt="Luxury watch e-commerce platform"
  className="rounded-lg shadow-2xl"
/>
```

---

## Color Overlay Technique

To ensure images match your brand, apply color overlays:

```css
.image-overlay {
  position: relative;
}

.image-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 20, 25, 0.8),
    rgba(218, 181, 130, 0.2)
  );
  mix-blend-mode: multiply;
}
```

---

## Next Steps

1. **Immediate**: Download 5-10 images from Unsplash for hero sections
2. **This Week**: Create service-specific graphics/diagrams
3. **This Month**: Commission custom illustrations or photography
4. **Ongoing**: Add screenshots from real client projects (with permission)

---

## Image Checklist for Launch

- [ ] Homepage hero image
- [ ] Service page hero images (4)
- [ ] Case study screenshots (minimum 3)
- [ ] Blog placeholder image
- [ ] About/Team photos
- [ ] Favicon (already noted)
- [ ] Open Graph image for social sharing
- [ ] Logo variations (light/dark backgrounds)

---

## Brand-Safe Stock Photo Guidelines

**DO:**
- Modern, minimalist workspaces
- Abstract tech/data visualizations
- Professional business settings
- Clean product photography
- Charts and analytics

**DON'T:**
- Cheesy stock photos (people pointing at screens)
- Overly corporate/stiff imagery
- Outdated tech (old computers, etc.)
- Culturally insensitive imagery
- Generic "business handshake" photos

---

## Resources

- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Squoosh (Image Compression)**: https://squoosh.app
- **Remove.bg (Background Removal)**: https://remove.bg
- **Figma**: https://figma.com
