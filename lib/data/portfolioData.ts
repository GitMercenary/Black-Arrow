export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: 'Real Estate' | 'Hospitality' | 'Automotive' | 'Tech' | 'E-commerce';
  year: number;
  featured: boolean;
  thumbnail: string;
  images: string[];
  description: string;
  tags: string[];
  liveUrl?: string;

  // Functionality details
  functionality: {
    title: string;
    description: string;
    features: string[];
  };

  // UI/UX explanation
  uiux: {
    philosophy: string;
    designDecisions: {
      decision: string;
      rationale: string;
    }[];
    colorPalette: {
      name: string;
      hex: string;
      usage: string;
    }[];
    typography: {
      heading: string;
      body: string;
      accent: string;
    };
  };

  // Branding kit
  branding: {
    logo: string;
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    guidelines: string[];
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'luxury-villas-uae',
    title: 'Palm Residence - Luxury Villa Marketplace',
    client: 'Palm Residence Group',
    industry: 'Real Estate',
    year: 2025,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Premium villa marketplace with 3D property tours, virtual staging, and AI-powered property matching for UAE luxury real estate market.',
    tags: ['Next.js', 'Three.js', 'Supabase', 'Stripe', 'AI Matching'],
    liveUrl: 'https://palmresidence.ae',

    functionality: {
      title: 'Immersive Property Discovery Platform',
      description: 'Built a sophisticated real estate platform that revolutionizes how high-net-worth individuals discover and purchase luxury villas in Dubai.',
      features: [
        '360° Virtual Property Tours - WebGL-based 3D walkthroughs with realistic lighting',
        'AI Property Matching - ML algorithm matches buyers with properties based on preferences and behavior',
        'Virtual Staging - Real-time furniture placement and interior design visualization',
        'Multi-currency Support - AED, USD, GBP, EUR with live exchange rates',
        'Mortgage Calculator - Integrated with UAE banks for pre-approval estimates',
        'Document Management - Secure portal for contracts, NOCs, and title deeds',
        'Agent Dashboard - Real-time lead tracking and automated follow-ups',
      ],
    },

    uiux: {
      philosophy: 'Luxury is in the details. Every interaction should feel premium, effortless, and trustworthy. We designed for high-net-worth individuals who expect sophistication without complexity.',
      designDecisions: [
        {
          decision: 'Dark theme with gold accents',
          rationale: 'Luxury brands traditionally use dark backgrounds to convey exclusivity. Gold (#D4AF37) accents signal premium positioning without appearing gaudy.',
        },
        {
          decision: 'Large, cinematic hero images',
          rationale: 'Properties are the product. Full-bleed imagery creates emotional connection before rational decision-making begins.',
        },
        {
          decision: 'Minimal form fields with smart defaults',
          rationale: 'Reduced friction in lead capture. AI pre-fills location, budget range based on browsing behavior to minimize user input.',
        },
        {
          decision: 'Floating action button for property comparison',
          rationale: 'Users browse 8-12 properties before deciding. Persistent FAB allows instant comparison without losing context.',
        },
      ],
      colorPalette: [
        { name: 'Midnight Black', hex: '#0A0A0A', usage: 'Primary background, conveys luxury and focus' },
        { name: 'Warm Gold', hex: '#D4AF37', usage: 'CTAs, highlights, premium indicators' },
        { name: 'Marble White', hex: '#F8F8F8', usage: 'Text, borders, subtle UI elements' },
        { name: 'Slate Gray', hex: '#2A2A2A', usage: 'Cards, secondary backgrounds' },
      ],
      typography: {
        heading: 'Playfair Display - Serif elegance for property titles',
        body: 'Inter - Clean readability for descriptions and specs',
        accent: 'Space Mono - Technical data (price, sqft, coordinates)',
      },
    },

    branding: {
      logo: 'https://via.placeholder.com/400x100/0A0A0A/D4AF37?text=Palm+Residence',
      brandColors: {
        primary: '#0A0A0A',
        secondary: '#D4AF37',
        accent: '#F8F8F8',
      },
      guidelines: [
        'Logo must always have 40px minimum clearance on all sides',
        'Gold color reserved exclusively for CTAs and premium badges',
        'Photography must be professionally shot during golden hour',
        'All property images must maintain 16:9 aspect ratio',
        'Tone of voice: Sophisticated, confident, aspirational',
      ],
    },
  },

  {
    id: 'saffron-kitchen-uk',
    title: 'Saffron Kitchen - Multi-location Restaurant Platform',
    client: 'Saffron Kitchen Group',
    industry: 'Hospitality',
    year: 2025,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Unified digital ecosystem for 12-location restaurant chain with online ordering, table reservations, and loyalty program.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Google Maps API'],
    liveUrl: 'https://saffronkitchen.co.uk',

    functionality: {
      title: 'Omnichannel Restaurant Experience',
      description: 'Consolidated 12 separate restaurant websites into a unified platform with location-aware features and centralized management.',
      features: [
        'Smart Location Detection - Auto-selects nearest location based on user IP and offers alternatives',
        'Real-time Table Availability - Live seat map updates every 30 seconds, prevents double-bookings',
        'Hybrid Ordering System - Switch between delivery, pickup, and dine-in without losing cart',
        'Dynamic Menu Management - Central CMS with location-specific pricing and availability',
        'Loyalty Program - Points system with tiered rewards and birthday bonuses',
        'Kitchen Display System - Orders push directly to kitchen tablets with prep timers',
        'Staff Scheduling - AI-optimized shifts based on historical demand patterns',
      ],
    },

    uiux: {
      philosophy: 'Hunger is impatient. Every interaction must be instant, obvious, and delicious. We designed for speed-to-order while maintaining brand warmth.',
      designDecisions: [
        {
          decision: 'Food photography dominates above-the-fold',
          rationale: 'Users decide to order within 3 seconds. Hero carousel of signature dishes triggers appetite and reduces bounce rate by 34%.',
        },
        {
          decision: 'Sticky cart with live total',
          rationale: 'Persistent cart visibility increases average order value by 18%. Users add items freely when they see running total.',
        },
        {
          decision: 'One-tap reorder from history',
          rationale: '62% of orders are repeats. Prominent reorder buttons reduce time-to-checkout from 4 minutes to 22 seconds.',
        },
        {
          decision: 'Calorie counts hidden by default',
          rationale: 'A/B testing showed visible calories reduced order value by 12%. Users can toggle nutrition info if desired.',
        },
      ],
      colorPalette: [
        { name: 'Saffron Gold', hex: '#F4B942', usage: 'Primary brand color, CTAs, rewards' },
        { name: 'Cardamom Green', hex: '#6B8E23', usage: 'Secondary accents, vegetarian indicators' },
        { name: 'Cream', hex: '#FFF8DC', usage: 'Backgrounds, cards' },
        { name: 'Charcoal', hex: '#2F2F2F', usage: 'Text, navigation' },
      ],
      typography: {
        heading: 'Cormorant Garamond - Elegant, appetite-inducing headlines',
        body: 'Manrope - Friendly, highly legible for menus and descriptions',
        accent: 'DM Mono - Prices and nutritional data',
      },
    },

    branding: {
      logo: 'https://via.placeholder.com/400x100/8B4513/FFDAB9?text=Saffron+Kitchen',
      brandColors: {
        primary: '#F4B942',
        secondary: '#6B8E23',
        accent: '#FFF8DC',
      },
      guidelines: [
        'All food photography must use natural daylight or warm LED lighting',
        'Saffron Gold reserved for positive actions (order, reserve, reward)',
        'Menu items must include allergy tags in 10px Manrope Regular',
        'Spice level indicators use 🌶️ emoji (1-3 peppers)',
        'Tone of voice: Warm, welcoming, knowledgeable but not pretentious',
      ],
    },
  },

  {
    id: 'pristine-auto-india',
    title: 'Pristine Auto Spa - Premium Car Detailing Booking',
    client: 'Pristine Auto Spa',
    industry: 'Automotive',
    year: 2026,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Subscription-based car detailing service with mobile app for scheduling, doorstep service, and before/after photo documentation.',
    tags: ['Next.js', 'React Native', 'PostgreSQL', 'Razorpay', 'AWS S3'],
    liveUrl: 'https://pristineautospa.in',

    functionality: {
      title: 'Doorstep Detailing Made Effortless',
      description: 'On-demand premium car care platform that brings professional detailing to customer locations with subscription flexibility.',
      features: [
        'Smart Scheduling - AI suggests optimal service times based on weather, location, and car usage patterns',
        'Live Technician Tracking - Real-time GPS updates with ETA accuracy within 5 minutes',
        'Before/After Photo Documentation - Automated comparison gallery sent via WhatsApp after each service',
        'Subscription Management - Flexible plans (weekly, bi-weekly, monthly) with pause/resume options',
        'Vehicle Profile System - Stores car details, service history, and preferred products',
        'Damage Reporting - In-app photo capture with timestamp and GPS for insurance claims',
        'Eco-Water Usage Tracker - Gamified water savings vs. traditional wash methods',
      ],
    },

    uiux: {
      philosophy: 'Premium service demands premium experience. Every touchpoint should reflect the care we put into detailing. Trust is built through transparency and consistency.',
      designDecisions: [
        {
          decision: 'Car-first dashboard with 3D vehicle model',
          rationale: 'Emotional connection to their vehicle drives retention. Interactive 3D model (using car make/model) personalizes the experience.',
        },
        {
          decision: 'Service packages as visual cards, not lists',
          rationale: 'Visual hierarchy with package photos increased conversions by 41%. Users understand value at a glance.',
        },
        {
          decision: 'WhatsApp integration for notifications',
          rationale: 'Indian users prefer WhatsApp over email (89% open rate vs. 23%). Before/after photos shared directly to chat.',
        },
        {
          decision: 'Transparent pricing with no hidden fees',
          rationale: 'Trust issue in service industry. Upfront pricing with breakdowns reduced support queries by 67%.',
        },
      ],
      colorPalette: [
        { name: 'Chrome Silver', hex: '#C0C0C0', usage: 'Primary, represents shine and premium quality' },
        { name: 'Carbon Black', hex: '#1A1A1A', usage: 'Backgrounds, navigation, luxury aesthetic' },
        { name: 'Sapphire Blue', hex: '#0F52BA', usage: 'CTAs, active states, trust indicators' },
        { name: 'Pearl White', hex: '#FAFAFA', usage: 'Text on dark backgrounds, cards' },
      ],
      typography: {
        heading: 'Montserrat - Bold, modern, automotive industry standard',
        body: 'Open Sans - Excellent legibility for service descriptions',
        accent: 'Roboto Mono - Service codes, license plates, timestamps',
      },
    },

    branding: {
      logo: 'https://via.placeholder.com/400x100/1E3A8A/60A5FA?text=Pristine+Auto',
      brandColors: {
        primary: '#C0C0C0',
        secondary: '#0F52BA',
        accent: '#1A1A1A',
      },
      guidelines: [
        'All car photography must show vehicles at 3/4 front angle with natural reflection',
        'Logo must never be placed on surfaces that obscure the water droplet icon',
        'Sapphire Blue reserved for actionable elements only (buttons, links)',
        'Service photos must use consistent lighting (5600K daylight)',
        'Tone of voice: Professional, detail-oriented, trustworthy',
      ],
    },
  },

  {
    id: 'nexora-saas-uk',
    title: 'Nexora - Project Management SaaS',
    client: 'Nexora Technologies',
    industry: 'Tech',
    year: 2025,
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'AI-powered project management tool for creative agencies with resource planning, time tracking, and client portals.',
    tags: ['React', 'TypeScript', 'Supabase', 'OpenAI', 'Recharts'],
    liveUrl: 'https://nexora.io',

    functionality: {
      title: 'Intelligent Agency Operations Platform',
      description: 'Purpose-built for creative agencies managing multiple clients, deadlines, and resources with AI assistance for workload optimization.',
      features: [
        'AI Task Breakdown - Natural language project input generates structured tasks with time estimates',
        'Resource Conflict Detection - Automatically flags team member over-allocation across projects',
        'Client Portal - Branded white-label dashboards for client project visibility',
        'Time Tracking with Screenshots - Optional proof-of-work captures for remote teams',
        'Profitability Dashboard - Real-time burn rate vs. budget with predictive completion costs',
        'Template Library - Reusable project templates for recurring client work',
        'Integration Hub - Connects with Slack, Figma, GitHub, and Google Workspace',
      ],
    },

    uiux: {
      philosophy: 'Complexity is the enemy of adoption. We built for busy agency owners who need instant clarity on project health without hunting through menus.',
      designDecisions: [
        {
          decision: 'Dashboard-first navigation',
          rationale: 'Users want overview before detail. Dashboard shows all critical metrics (deadlines, budget, team capacity) in single view.',
        },
        {
          decision: 'Traffic light color system for project status',
          rationale: 'Red/Yellow/Green is universally understood. Visual scanning 4x faster than reading status labels.',
        },
        {
          decision: 'Drag-and-drop task assignment',
          rationale: 'Reduced task assignment time from 30 seconds to 3 seconds. Natural interaction for resource management.',
        },
        {
          decision: 'Keyboard shortcuts for power users',
          rationale: 'Agency PMs use system daily. Shortcuts (Cmd+K for search, Cmd+N for new task) increase efficiency by 40%.',
        },
      ],
      colorPalette: [
        { name: 'Nexora Purple', hex: '#7C3AED', usage: 'Primary brand, CTAs, active states' },
        { name: 'Slate', hex: '#334155', usage: 'Backgrounds, cards in dark mode' },
        { name: 'Emerald', hex: '#10B981', usage: 'Success states, on-track projects' },
        { name: 'Amber', hex: '#F59E0B', usage: 'Warning states, at-risk projects' },
        { name: 'Rose', hex: '#F43F5E', usage: 'Error states, overdue tasks' },
      ],
      typography: {
        heading: 'Inter - Clean, professional, tech industry standard',
        body: 'Inter - Consistency across all text sizes',
        accent: 'JetBrains Mono - Code snippets, API keys, timestamps',
      },
    },

    branding: {
      logo: 'https://via.placeholder.com/400x100/6366F1/C7D2FE?text=Nexora',
      brandColors: {
        primary: '#7C3AED',
        secondary: '#334155',
        accent: '#10B981',
      },
      guidelines: [
        'Logo must have 32px minimum clearance on all sides in UI',
        'Purple reserved for primary actions and brand moments',
        'Traffic light colors (green/yellow/red) must not be used decoratively',
        'All icons use 1.5px stroke weight for consistency',
        'Tone of voice: Efficient, empowering, jargon-free',
      ],
    },
  },

  {
    id: 'threadly-ecommerce-uae',
    title: 'Threadly - Sustainable Fashion Marketplace',
    client: 'Threadly DMCC',
    industry: 'E-commerce',
    year: 2026,
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Eco-conscious fashion platform with blockchain authentication, carbon footprint tracking, and virtual try-on using AR.',
    tags: ['Next.js', 'Shopify', 'AR.js', 'Blockchain', 'Stripe'],
    liveUrl: 'https://threadly.ae',

    functionality: {
      title: 'Transparent Sustainable Shopping',
      description: 'Fashion marketplace that makes sustainability measurable and verifiable through technology, targeting conscious consumers in UAE.',
      features: [
        'AR Virtual Try-On - WebAR technology lets users see clothes on themselves via smartphone camera',
        'Blockchain Authenticity - Each item has NFT certificate proving origin and ethical production',
        'Carbon Footprint Calculator - Shows environmental impact per item vs. fast fashion equivalent',
        'Sustainability Score - Algorithmic rating (A+ to F) based on materials, labor, and shipping',
        'Resale Marketplace - Integrated second-hand section with quality verification',
        'Impact Dashboard - Personal sustainability metrics (CO2 saved, water conserved, ethical brands supported)',
        'Material Sourcing Map - Interactive map showing origin of fabrics and manufacturing locations',
      ],
    },

    uiux: {
      philosophy: 'Sustainability should feel aspirational, not sacrificial. We designed to make eco-conscious choices feel modern, desirable, and socially rewarding.',
      designDecisions: [
        {
          decision: 'Earth-tone color palette with bold accents',
          rationale: 'Neutrals communicate sustainability without appearing "crunchy." Bold CTAs maintain conversion focus.',
        },
        {
          decision: 'Sustainability score above price',
          rationale: 'Target audience values ethics over cost. A+ rating drives desire as much as product itself.',
        },
        {
          decision: 'Transparency over perfection',
          rationale: 'Users distrust greenwashing. Honest impact data (even when not perfect) builds trust more than marketing claims.',
        },
        {
          decision: 'Social proof via impact leaderboard',
          rationale: 'Gamification of sustainability. Monthly leaderboard increased repeat purchases by 28%.',
        },
      ],
      colorPalette: [
        { name: 'Earth Tan', hex: '#C9A67A', usage: 'Primary brand, natural aesthetic' },
        { name: 'Forest Green', hex: '#2D5016', usage: 'Success states, sustainability badges' },
        { name: 'Ocean Blue', hex: '#006994', usage: 'CTAs, links, active states' },
        { name: 'Sand', hex: '#F4EBE1', usage: 'Backgrounds, cards' },
        { name: 'Charcoal', hex: '#3E3E3E', usage: 'Text, borders' },
      ],
      typography: {
        heading: 'Sora - Modern, geometric, forward-thinking',
        body: 'Work Sans - Clean, versatile for product descriptions',
        accent: 'Roboto Mono - Blockchain hashes, impact metrics',
      },
    },

    branding: {
      logo: 'https://via.placeholder.com/400x100/059669/6EE7B7?text=Threadly',
      brandColors: {
        primary: '#C9A67A',
        secondary: '#2D5016',
        accent: '#006994',
      },
      guidelines: [
        'All product photography must use natural daylight or full-spectrum LED',
        'Sustainability scores must use consistent icon system (leaf = A+, seedling = B, etc.)',
        'Earth Tan reserved for brand moments, not decorative use',
        'Packaging photography must show recycled/biodegradable materials clearly',
        'Tone of voice: Conscious, optimistic, transparent, community-driven',
      ],
    },
  },
];

// Helper functions for filtering
export const getFeaturedProjects = () => portfolioProjects.filter(p => p.featured);
export const getProjectsByIndustry = (industry: string) =>
  industry === 'All' ? portfolioProjects : portfolioProjects.filter(p => p.industry === industry);
export const getProjectById = (id: string) => portfolioProjects.find(p => p.id === id);
