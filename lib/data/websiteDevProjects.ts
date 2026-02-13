import { Layout, Briefcase, Code } from 'lucide-react';

export interface WebsiteProject {
  id: string;
  title: string;
  category: 'landing-page' | 'business-site' | 'custom-web-app';
  description: string;
  url: string;
  image: string;
  tags: string[];
  highlights: string[];
}

export const WEBSITE_DEV_PROJECTS: WebsiteProject[] = [
  {
    id: 'cafev1',
    title: 'Origin & Iron',
    category: 'landing-page',
    description: 'Specialty coffee roastery & café in Seattle. Full multi-page site with shop, menu, education hub, and subscription features.',
    url: 'https://cafev1.blackarrowtechnologies.com/',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    tags: ['Coffee Shop', 'E-Commerce', 'Multi-Page'],
    highlights: [
      'Product shop with 3 featured roasts',
      'Interactive café menu',
      'Brew guides & education hub',
      'Subscription & wholesale options',
    ],
  },
  {
    id: 'cafev2',
    title: 'The Hearthstone Café',
    category: 'landing-page',
    description: 'Family-owned café since 1985. Warm, community-focused website with history timeline, events calendar, and full menu.',
    url: 'https://cafev2.blackarrowtechnologies.com/',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    tags: ['Restaurant', 'Family Business', 'Community'],
    highlights: [
      'Brand storytelling with history timeline',
      'Community events section',
      'Full breakfast & brunch menu',
      'Warm, inviting design language',
    ],
  },
  {
    id: 'cafev3',
    title: 'Neon Sip',
    category: 'landing-page',
    description: 'Premium bubble tea brand with vibrant neon aesthetic. Interactive drink builder, trending items, and social media integration.',
    url: 'https://cafev3.blackarrowtechnologies.com/',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&q=80',
    tags: ['Bubble Tea', 'Interactive', 'Modern'],
    highlights: [
      'Custom drink builder (Mix Your Own)',
      'Vibrant neon visual identity',
      'Instagram integration (#NEONSIP)',
      'Trending items showcase',
    ],
  },
  {
    id: 'cafev4',
    title: 'Brew & Brick',
    category: 'landing-page',
    description: 'Authentic London coffee shop est. 2012. Clean, modern design showcasing artisan baking, sustainability, and multiple branches.',
    url: 'https://cafev4.blackarrowtechnologies.com/',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    tags: ['Coffee Shop', 'London', 'Sustainable'],
    highlights: [
      'Multi-location branch info',
      'Sustainability & ethical sourcing story',
      'Seasonal specials section',
      'Pet-friendly & remote-worker features',
    ],
  },
  {
    id: 'astern-autoparts',
    title: 'Astern Autoparts',
    category: 'business-site',
    description: 'WooCommerce-powered marketplace for used OEM automotive parts with year/make/model part finder, connecting 200+ warehouses across all 50 US states.',
    url: 'https://asternautoparts.com',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop&q=80',
    tags: ['WordPress', 'WooCommerce', 'E-commerce'],
    highlights: [
      'Year/Make/Model part finder tool',
      '200+ warehouse network integration',
      '90-day warranty system',
      'Bulk order RFQ for mechanics',
    ],
  },
  {
    id: 'marakk-design',
    title: 'Marakk Design Atelier',
    category: 'business-site',
    description: 'Elegant portfolio website for Bangalore\'s premier interior design studio, showcasing luxury residential and commercial projects since 2014.',
    url: 'https://marakkdesignatelier.com',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80',
    tags: ['WordPress', 'Gutenverse', 'Portfolio'],
    highlights: [
      'Filterable project portfolio gallery',
      'Before & after comparison sliders',
      'Multi-step consultation booking',
      'Material & finish library',
    ],
  },
  {
    id: 'marakk-developers',
    title: 'Marakk Developers',
    category: 'business-site',
    description: 'Luxury real estate platform for Bangalore with location-based browsing, interactive maps, and qualified agent services.',
    url: 'https://marakkdevelopers.com',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80',
    tags: ['WordPress', 'Elementor', 'Real Estate'],
    highlights: [
      'Interactive OpenStreetMap integration',
      'Location-based property browsing',
      'EMI calculator tool',
      'Agent WhatsApp direct contact',
    ],
  },
  {
    id: 'bharath-cycle-hub',
    title: 'Bharath Cycle Hub',
    category: 'business-site',
    description: 'E-commerce store for Bangalore\'s trusted bicycle retailer with Google Ads integration and home test-ride booking.',
    url: 'https://bharathcyclehub.store',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200&h=800&fit=crop&q=80',
    tags: ['Shopify', 'Google Ads', 'E-commerce'],
    highlights: [
      'Home test-ride booking system',
      'Google Ads conversion tracking',
      'Interactive size guide tool',
      'Same-day local delivery',
    ],
  },
];

export const CATEGORY_INFO = {
  'landing-page': {
    label: 'Landing Page',
    icon: Layout,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  'business-site': {
    label: 'Business Website',
    icon: Briefcase,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  'custom-web-app': {
    label: 'Custom Web App',
    icon: Code,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
};
