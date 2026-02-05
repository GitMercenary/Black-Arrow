# Mobile Responsiveness Guide

## Overview

This document outlines the mobile responsiveness standards and best practices implemented across the Black Arrow Technologies website.

## Design Breakpoints

Following Tailwind CSS default breakpoints:

- **Mobile**: < 640px (default/base styles)
- **SM (Small)**: ≥ 640px
- **MD (Medium)**: ≥ 768px
- **LG (Large)**: ≥ 1024px
- **XL (Extra Large)**: ≥ 1280px

## Touch Target Guidelines

### Minimum Touch Target Size: 44px × 44px

Based on Apple's Human Interface Guidelines and Google's Material Design, all interactive elements should have a minimum touch target of 44px × 44px (or 48dp in Material Design).

### Implementation Examples

#### Buttons
```tsx
// Button component already implements proper touch targets
<Button variant="primary">Click Me</Button>
// Uses: px-8 py-4 (total height ~52-56px including text)
```

#### Mobile Menu Links
```tsx
<Link className="py-3 min-h-[44px]">
  Menu Item
</Link>
```

#### Icon Buttons
```tsx
<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center">
  <Icon size={24} />
</button>
```

## Component Responsive Patterns

### Header
- Desktop: Full navigation menu with inline links
- Mobile: Hamburger menu with stacked links
- Touch targets: All buttons and links meet 44px minimum

### Cards
- Padding: `p-6 sm:p-8` (24px mobile, 32px desktop)
- Text sizes: `text-xl sm:text-2xl` for titles
- Icon spacing: `mb-3 sm:mb-4`

### Typography
- Hero heading: `text-5xl md:text-6xl lg:text-7xl`
- Body text: `text-sm sm:text-base`
- Subtitles: `text-xl md:text-2xl`

### Grids
- Service cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Stats: `grid-cols-1 md:grid-cols-3`
- Case studies: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Testing Checklist

### Mobile Devices to Test
- [ ] iPhone SE (375px width) - Smallest common viewport
- [ ] iPhone 12/13/14 (390px width)
- [ ] iPhone 14 Pro Max (430px width)
- [ ] Android devices (360px-412px width)

### Desktop Resolutions
- [ ] 1280×720 (Minimum supported)
- [ ] 1920×1080 (Most common)
- [ ] 2560×1440 (Large displays)

### Test Scenarios

#### Navigation
- [ ] Mobile menu opens/closes smoothly
- [ ] All menu items are tappable (44px min)
- [ ] Region switcher works on mobile
- [ ] Logo links back to home

#### Forms
- [ ] Input fields are large enough for touch
- [ ] Labels are visible and clear
- [ ] Error messages display properly
- [ ] Submit buttons are accessible

#### Content
- [ ] Text is readable without zooming
- [ ] Images scale appropriately
- [ ] Cards stack properly on mobile
- [ ] No horizontal scrolling (except tables)

#### Interactions
- [ ] Buttons have proper hover/active states
- [ ] Touch targets don't overlap
- [ ] Scrolling is smooth
- [ ] Animations work on mobile

## Common Responsive Patterns

### Container Padding
```tsx
className="px-4 sm:px-6 lg:px-8"
```

### Section Spacing
```tsx
className="py-12 sm:py-16 lg:py-20"
```

### Flex Direction
```tsx
className="flex flex-col md:flex-row"
```

### Grid Columns
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Text Alignment
```tsx
className="text-center md:text-left"
```

### Hidden Elements
```tsx
className="hidden md:block" // Show only on desktop
className="md:hidden" // Show only on mobile
```

## Accessibility Considerations

### ARIA Labels
Always add aria-labels to icon-only buttons:
```tsx
<button aria-label="Open menu">
  <MenuIcon />
</button>
```

### Focus States
Ensure all interactive elements have visible focus states:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-warm-sand"
```

### Keyboard Navigation
- Tab order should be logical
- All interactive elements should be keyboard accessible
- Skip links for screen readers

## Performance Considerations

### Image Optimization
- Use Next.js Image component for automatic optimization
- Provide appropriate sizes for different viewports
- Use WebP format with fallbacks

### Font Loading
- Fonts are loaded via Next.js font optimization
- System fonts used as fallbacks
- Font display: swap for better performance

### Code Splitting
- Routes are automatically code-split by Next.js
- Dynamic imports for heavy components
- Lazy load below-the-fold content

## Known Issues & Limitations

### Current Implementation
✅ Header mobile menu - fully responsive with proper touch targets
✅ Homepage hero - responsive typography and spacing
✅ Stats section - responsive grid layout
✅ Service cards - responsive grid with proper padding
✅ Footer - responsive layout
✅ Admin dashboard - responsive table with overflow scroll

### Future Improvements
- [ ] Add swipe gestures for mobile menu (Phase 5)
- [ ] Implement infinite scroll for blog posts (Phase 5)
- [ ] Add pull-to-refresh on mobile (Phase 5)
- [ ] Optimize table layouts for very small screens (Phase 5)

## Useful Tailwind Classes Reference

### Responsive Utilities
- `sm:` - Small screens (≥640px)
- `md:` - Medium screens (≥768px)
- `lg:` - Large screens (≥1024px)
- `xl:` - Extra large screens (≥1280px)
- `2xl:` - 2X extra large screens (≥1536px)

### Touch Target Classes
- `min-h-[44px]` - Minimum height for touch targets
- `min-w-[44px]` - Minimum width for touch targets
- `p-3` - 12px padding (0.75rem)
- `py-3` - 12px vertical padding

### Layout Classes
- `container` - Responsive container with max-width
- `mx-auto` - Center horizontally
- `px-4` - Horizontal padding (16px)
- `space-y-4` - Vertical spacing between children

## Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Apple Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2026-01-29
**Phase**: 4 - Polish
**Status**: Implemented and documented
