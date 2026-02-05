# Performance Optimization Guide

## Overview

This document outlines the performance optimizations implemented in the Black Arrow Technologies website and best practices for maintaining optimal performance.

## Current Optimizations

### Image Optimization

#### Next.js Image Component
The website uses Next.js's built-in Image component which provides:
- Automatic image optimization
- Modern image formats (AVIF, WebP) with fallbacks
- Lazy loading by default
- Responsive images with srcset
- Blur placeholder support

```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false} // Set to true for above-the-fold images
  placeholder="blur" // Optional: blur placeholder
/>
```

#### Configuration (next.config.js)
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'osmvhuyiryxposllkicd.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

#### OptimizedImage Component
Custom wrapper component with:
- Loading skeleton states
- Error fallback handling
- Smooth fade-in transitions

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  fallbackSrc="/fallback.jpg"
  showLoadingSkeleton={true}
/>
```

### Font Loading Strategy

#### Next.js Font Optimization
Fonts are loaded using Next.js's font optimization system:

```tsx
// app/layout.tsx
import { Unbounded, Hanken_Grotesk } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap", // Prevents invisible text during load
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});
```

#### Benefits
- Fonts are self-hosted automatically
- No external network requests to Google Fonts
- Preloaded with optimal caching
- Font swap strategy prevents FOIT (Flash of Invisible Text)

### Code Splitting

#### Automatic Route-Based Splitting
Next.js App Router automatically splits code by route:
- Each page is a separate chunk
- Only necessary JavaScript is loaded
- Dynamic imports for code splitting

#### Dynamic Imports
For heavy components not needed immediately:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Disable SSR if needed
});
```

#### Package Optimization
Configured in `next.config.js`:
```javascript
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```

### Build Optimizations

#### Compression
```javascript
compress: true, // Enable gzip compression
```

#### Remove Console Logs in Production
```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'], // Keep error and warn logs
  } : false,
}
```

#### Source Maps
```javascript
productionBrowserSourceMaps: false, // Disable for smaller bundles
```

#### Security Headers
```javascript
poweredByHeader: false, // Remove X-Powered-By header
```

### React Performance

#### Strict Mode
```javascript
reactStrictMode: true,
```

Benefits:
- Identifies unsafe lifecycles
- Warns about legacy APIs
- Detects unexpected side effects

### Animation Performance

#### Framer Motion Optimizations
All animations use:
- `transform` and `opacity` (GPU-accelerated)
- `useInView` with `once: true` (animations only play once)
- Proper easing functions for smooth 60fps animations

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    ease: [0.25, 0.4, 0.25, 1], // Custom easing
  }}
/>
```

## Performance Metrics

### Core Web Vitals Targets

#### Largest Contentful Paint (LCP)
- **Target:** < 2.5s
- **Optimizations:**
  - Priority loading for hero images
  - Font optimization with swap strategy
  - Minimal blocking resources

#### First Input Delay (FID)
- **Target:** < 100ms
- **Optimizations:**
  - Code splitting
  - Defer non-critical JavaScript
  - Minimal third-party scripts

#### Cumulative Layout Shift (CLS)
- **Target:** < 0.1
- **Optimizations:**
  - Fixed dimensions for images
  - Reserved space for dynamic content
  - No layout shifts from fonts (swap strategy)

## Best Practices

### Images

#### 1. Always Use Next/Image
```tsx
// ❌ Bad
<img src="/image.jpg" alt="Description" />

// ✅ Good
<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

#### 2. Prioritize Above-the-Fold Images
```tsx
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority={true} // Loads immediately
/>
```

#### 3. Use Proper Sizes Attribute
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Fonts

#### 1. Limit Font Weights
Only load necessary font weights:
```tsx
const font = Inter({
  weight: ['400', '700'], // Only regular and bold
  subsets: ['latin'],
});
```

#### 2. Preload Critical Fonts
Fonts loaded via Next.js font optimization are automatically preloaded.

### JavaScript

#### 1. Dynamic Imports for Heavy Components
```tsx
const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <Skeleton />,
});
```

#### 2. Avoid Large Dependencies
- Check bundle size before adding libraries
- Use tree-shakeable libraries
- Consider lighter alternatives

### CSS

#### 1. Use Tailwind's Purge
Tailwind automatically removes unused CSS in production.

#### 2. Avoid Large CSS Files
```css
/* ❌ Bad: Large global styles */
/* ✅ Good: Component-scoped styles or Tailwind */
```

### API Calls

#### 1. Use React Server Components
Fetch data on the server when possible:
```tsx
// app/page.tsx (Server Component)
async function getData() {
  const data = await fetch('...');
  return data.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{/* Use data */}</div>;
}
```

#### 2. Implement Proper Loading States
Always show loading states while fetching data.

#### 3. Cache API Responses
```tsx
fetch(url, {
  next: { revalidate: 3600 } // Cache for 1 hour
});
```

## Monitoring Performance

### Development Tools

#### 1. Lighthouse
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

#### 2. Next.js Build Analysis
```bash
# Install webpack-bundle-analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

#### 3. Chrome DevTools
- Performance tab for runtime analysis
- Network tab for asset loading
- Coverage tab for unused code

### Production Monitoring

Consider adding:
- Google Analytics Core Web Vitals tracking
- Vercel Analytics (if deployed on Vercel)
- Custom performance monitoring
- Error tracking (Sentry, etc.)

## Optimization Checklist

### Pre-Launch
- [ ] Run Lighthouse audit (score > 90)
- [ ] Check Core Web Vitals
- [ ] Test on slow 3G network
- [ ] Test on low-end devices
- [ ] Verify all images are optimized
- [ ] Check bundle size (< 200KB initial JS)
- [ ] Ensure no console errors in production

### Post-Launch
- [ ] Monitor Core Web Vitals
- [ ] Track bundle size growth
- [ ] Regular Lighthouse audits
- [ ] Monitor error rates
- [ ] Check loading times by region

## Common Performance Issues

### Issue: Large First Load JS
**Solution:**
- Use dynamic imports
- Code split large components
- Check for duplicate dependencies

### Issue: Slow LCP
**Solution:**
- Prioritize hero images
- Reduce server response time
- Use CDN for static assets

### Issue: High CLS
**Solution:**
- Reserve space for dynamic content
- Set explicit dimensions for media
- Avoid inserting content above existing content

### Issue: Large Images
**Solution:**
- Use Next/Image component
- Provide appropriate sizes
- Use modern formats (AVIF, WebP)

## Future Optimizations

### Planned (Phase 5+)
- [ ] Implement Service Worker for offline support
- [ ] Add resource hints (preconnect, prefetch)
- [ ] Optimize third-party scripts
- [ ] Implement image CDN
- [ ] Add Redis caching for API responses
- [ ] Implement partial prerendering
- [ ] Add edge caching via middleware

## Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: 2026-01-29
**Phase**: 4 - Polish
**Status**: Implemented and documented
