# Current Sprint - Black Arrow Technologies Website

**Sprint Start:** 2026-01-31
**Sprint Goal:** Implement 8 high-priority features + UI/UX improvements + Compliance documentation

---

## 📊 Tool Choice Analysis & Recommendations

### ✅ APPROVED (Your choices are optimal)

1. **Regional Auto-Detection:** ipapi.co/ipinfo.io - Good choice. I recommend **ipapi.co** (no API key needed for basic use)
2. **Heatmapping:** Microsoft Clarity - Excellent! Free, GDPR-compliant, better than Hotjar
3. **Cookie Management:** js-cookie - Perfect for client-side cookie handling
4. **Dark Mode:** Tailwind's Dark Mode (class strategy) - Best approach for Next.js
5. **AEO:** JSON-LD schemas - Essential for modern SEO

### 🔄 ALTERNATIVE SUGGESTIONS

6. **Lead Scoring:** Consider using Supabase Edge Functions instead of triggers for better control
7. **Notification System:** Consider using Sonner (react-hot-toast alternative) for better animations

---

## 🎯 Task Breakdown

### Phase 1: Critical Infrastructure (Tasks 1-4)
- [ ] Regional Auto-Detection (Client-Side)
- [ ] Microsoft Clarity Integration
- [ ] Cookie Consent System
- [ ] AEO JSON-LD Schemas

### Phase 2: User Experience (Tasks 5-7)
- [ ] Dark/Light Mode Toggle
- [ ] Lead Scoring Documentation
- [ ] Dark Pattern Audit

### Phase 3: Documentation & Compliance (Task 8)
- [ ] Supabase Health Check
- [ ] Privacy Policy (UK/UAE/IND)
- [ ] Cookie Policy
- [ ] Terms & Conditions

### Phase 4: UI/UX Fixes (Additional Tasks)
- [ ] Fix navbar popup behavior
- [ ] Optimize form layout (no scrolling)
- [ ] Make budget/description optional
- [ ] Replace luxury watch image
- [ ] Add 40% more images
- [ ] Golden/White SVG for dark mode
- [ ] Regional compliance display

---

## 🔍 My Recommendations on Additional Questions

### i) **Banner Form on Right Side?**
**Recommendation:** ❌ **No**
- Desktop: Will clutter the hero section
- Mobile: Will push main content down
- **Alternative:** Keep CTA button, make popup faster to load

### ii) **Navbar Popup Issue**
**Issue Confirmed:** The popup should overlay the entire viewport, not open inside navbar
**Fix:** z-index issue - will fix in Phase 4

### iii) **Popup Form Without Scrolling**
**Recommendation:**
- Reduce spacing between fields
- Use single-column layout on mobile
- Make form max-height: 85vh

### iv) **Optional Form Fields**
**Recommendation:** ✅ **Agreed**
- Required: Name, Email, Company, Website
- Optional: Budget, Challenge/Description

### v) **Luxury Watch Image**
**Will replace** with a more relevant tech/digital image

### vi) **40% More Images Recommendation**
**Strategic placement:**
- Homepage: 3-4 images (hero, services, case study preview)
- Service Pages: 2 images per page (hero + proof point)
- About: Team/office images
- Blog: Featured images
**Total:** ~15-20 images across site

### vii) **Golden/White SVG in Dark Mode**
**Recommendation:** ✅ **Good idea**
- Current: `fill="currentColor"` (adapts to text color)
- Dark mode: Should use warm-sand (#D4AF87)

### viii) **Regional Compliance Content**
**Recommendation:** ✅ **Show region-specific content**
- UK: Show UK GDPR, ICO, PECR compliance
- UAE: Show UAE DPA compliance
- India: Show DPDP Act 2023 compliance
- **Dynamic display based on selected region**

---

## 📋 Implementation Priority Order

1. ✅ **URGENT:** Fix navbar popup z-index issue
2. ✅ **URGENT:** Optimize form layout (no scrolling)
3. Regional Auto-Detection
4. Microsoft Clarity
5. Cookie Consent System
6. Dark/Light Mode
7. AEO Schemas
8. Compliance Documentation
9. Image additions
10. Lead Scoring (can be last, needs 100 leads)

---

## 🚀 Progress Tracking

### Completed
- Initial sprint planning ✅

### In Progress
- Sprint tracking document setup 🔄

### Blocked
- None

---

## 📝 Notes

- All compliance content will be region-aware
- Images will be optimized using Next.js Image component
- Dark mode will persist via localStorage
- Cookie consent will block tracking until accepted
- Regional detection happens on first visit only

---

**Last Updated:** 2026-01-31 01:21
