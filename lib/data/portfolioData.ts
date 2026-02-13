export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: 'Real Estate' | 'E-commerce' | 'Hospitality' | 'Automotive' | 'Tech' | 'Interior Design';
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
    id: 'astern-autoparts-usa',
    title: 'Astern Autoparts - OEM Auto Parts Marketplace',
    client: 'Astern Autoparts',
    industry: 'E-commerce',
    year: 2025,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'WooCommerce-powered marketplace for used OEM automotive parts with year/make/model part finder, connecting 200+ warehouses across all 50 US states.',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'Part Finder', 'E-commerce'],
    liveUrl: 'https://asternautoparts.com',

    functionality: {
      title: 'Nationwide OEM Parts Discovery Engine',
      description: 'Built a comprehensive e-commerce platform that simplifies the search for used OEM auto parts by connecting buyers directly with a network of 200+ verified warehouses across the United States. The Year/Make/Model part finder is the core of the experience, letting customers narrow down compatible parts in seconds.',
      features: [
        'Year/Make/Model Part Finder - Multi-step dropdown tool that filters inventory by vehicle year, make, model, and part category for precise results',
        'Warehouse Network Integration - Real-time inventory sync across 200+ partner warehouses spanning all 50 US states',
        'OEM Compatibility Verification - Each listing includes OEM part numbers and cross-references to ensure correct fitment',
        '90-Day Warranty System - All parts ship with a standard 90-day warranty; claims handled through an integrated portal',
        'Shipping Calculator - Freight and standard shipping estimates based on part weight, dimensions, and destination',
        'Bulk Order Requests - Mechanics and body shops can submit multi-part RFQs for wholesale pricing',
        'Order Tracking Dashboard - Customers track shipments from warehouse dispatch through last-mile delivery',
      ],
    },

    uiux: {
      philosophy: 'Auto parts buyers know exactly what they need. The interface must get out of the way and deliver results fast. Trust signals are critical because customers are purchasing mechanical components sight-unseen.',
      designDecisions: [
        {
          decision: 'Part finder front and center on homepage',
          rationale: 'Returning customers skip browsing entirely. Placing the Year/Make/Model tool above the fold reduces time-to-search to under 5 seconds.',
        },
        {
          decision: 'Product cards with fitment confirmation badges',
          rationale: 'Buyers fear ordering the wrong part. Green "Confirmed Fit" badges on search results reduce cart abandonment and return rates.',
        },
        {
          decision: 'Dark navy background with high-contrast product images',
          rationale: 'Automotive industry convention signals professionalism. White product photography on dark backgrounds makes parts easy to inspect visually.',
        },
        {
          decision: 'Trust badges and warranty info on every product page',
          rationale: 'Used parts carry perceived risk. Prominent 90-day warranty badges, warehouse ratings, and verified seller icons build buyer confidence.',
        },
      ],
      colorPalette: [
        { name: 'Navy', hex: '#1B2A4A', usage: 'Primary background, header, footer, and navigation' },
        { name: 'Bright Blue', hex: '#2196F3', usage: 'CTAs, links, active part finder selections' },
        { name: 'White', hex: '#FFFFFF', usage: 'Product cards, text on dark backgrounds, content areas' },
        { name: 'Safety Orange', hex: '#FF6B00', usage: 'Sale badges, urgency indicators, warranty highlights' },
      ],
      typography: {
        heading: 'Roboto Bold - Clean, industrial feel appropriate for automotive e-commerce',
        body: 'Roboto Regular - Highly legible for part descriptions, specs, and compatibility notes',
        accent: 'Roboto Mono - OEM part numbers, SKUs, and pricing figures',
      },
    },

    branding: {
      logo: '/logos/astern-autoparts.png',
      brandColors: {
        primary: '#1B2A4A',
        secondary: '#2196F3',
        accent: '#FF6B00',
      },
      guidelines: [
        'Logo uses a clean wordmark; always display on dark navy or white backgrounds with adequate contrast',
        'Product photography must show parts on a plain white background with consistent lighting',
        'Bright Blue is reserved for interactive elements: buttons, links, and the part finder interface',
        'Safety Orange used sparingly for promotions, sale tags, and warranty callouts only',
        'Tone of voice: Straightforward, knowledgeable, trustworthy - speak like a seasoned mechanic, not a salesman',
      ],
    },
  },

  {
    id: 'marakk-design-atelier',
    title: 'Marakk Design Atelier - Interior Design Portfolio',
    client: 'Marakk Design Atelier',
    industry: 'Real Estate',
    year: 2025,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Elegant portfolio website for Bangalore\'s premier interior design studio, showcasing luxury residential and commercial projects since 2014.',
    tags: ['WordPress', 'Gutenverse', 'Portfolio', 'Interior Design'],
    liveUrl: 'https://marakkdesignatelier.com',

    functionality: {
      title: 'Visual-First Design Portfolio',
      description: 'Created an elegant digital portfolio for Marakk Design Atelier that positions the studio as Bangalore\'s go-to firm for luxury interiors. The site balances rich project imagery with clear service descriptions and makes it effortless for prospective clients to explore past work and initiate consultations.',
      features: [
        'Project Portfolio Gallery - Filterable showcase of completed residential and commercial interiors with full-screen lightbox viewing',
        'Category-Based Browsing - Projects organized by type: Living Rooms, Bedrooms, Kitchens, Commercial Spaces, and Full Home Transformations',
        'Team Profiles - Individual pages for lead designers highlighting specializations, experience, and featured projects',
        'Consultation Booking Form - Multi-step inquiry form capturing project scope, budget range, timeline, and preferred design style',
        'Before & After Sliders - Interactive comparison views showing transformation from raw space to finished interior',
        'Material & Finish Library - Curated lookbook of fabrics, stones, woods, and finishes the studio works with',
        'Client Testimonials - Rotating testimonials with project photos to build social proof',
      ],
    },

    uiux: {
      philosophy: 'The website itself must feel like a designed space. Every pixel should reflect the studio\'s attention to detail, restraint, and refined taste. Let the project photography do the talking while the interface stays invisible.',
      designDecisions: [
        {
          decision: 'Minimalist layout with generous whitespace',
          rationale: 'Interior design is about spatial harmony. Ample whitespace between sections mirrors the studio\'s design philosophy and lets project images breathe.',
        },
        {
          decision: 'Gold accent color on neutral backgrounds',
          rationale: 'Gold communicates luxury without being ostentatious. Used sparingly on hover states, dividers, and CTAs to guide attention without competing with project imagery.',
        },
        {
          decision: 'Full-bleed project imagery with subtle parallax',
          rationale: 'Large photographs are the primary selling tool. Gentle parallax scrolling adds depth and keeps the browsing experience immersive and magazine-like.',
        },
        {
          decision: 'Serif headings paired with sans-serif body text',
          rationale: 'Serif typography evokes sophistication and tradition. Pairing with clean sans-serif body copy maintains readability while establishing visual hierarchy.',
        },
      ],
      colorPalette: [
        { name: 'Warm Gold', hex: '#C5A055', usage: 'Accent color, hover states, dividers, CTA buttons' },
        { name: 'Charcoal', hex: '#2C2C2C', usage: 'Primary text, headings, navigation' },
        { name: 'Warm White', hex: '#FAF8F5', usage: 'Page backgrounds, card surfaces' },
        { name: 'Soft Gray', hex: '#9E9E9E', usage: 'Secondary text, captions, metadata' },
      ],
      typography: {
        heading: 'Playfair Display - Elegant serif for project titles and section headings',
        body: 'Lato - Clean and warm sans-serif for descriptions and UI text',
        accent: 'Cormorant Garamond - Italic pull-quotes and testimonial text',
      },
    },

    branding: {
      logo: '/logos/marakk-design-atelier.png',
      brandColors: {
        primary: '#2C2C2C',
        secondary: '#C5A055',
        accent: '#FAF8F5',
      },
      guidelines: [
        'Logo presented in charcoal on light backgrounds or warm gold on dark backgrounds; never in full color',
        'Project photography must be professionally shot with natural or warm-toned lighting; no harsh flash',
        'Gold accent reserved for interactive elements and brand moments - never used as a fill or background color',
        'Maintain a minimum of 60px vertical spacing between content sections to preserve the open, airy feel',
        'Tone of voice: Refined, confident, understated - let the work speak louder than the words',
      ],
    },
  },

  {
    id: 'marakk-developers',
    title: 'Marakk Developers - Luxury Real Estate Platform',
    client: 'Marakk Developers',
    industry: 'Real Estate',
    year: 2025,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'Luxury real estate platform for Bangalore with location-based browsing, interactive maps, and qualified agent services.',
    tags: ['WordPress', 'Elementor', 'OpenStreetMap', 'Real Estate'],
    liveUrl: 'https://marakkdevelopers.com',

    functionality: {
      title: 'Location-Driven Property Discovery',
      description: 'Developed a professional real estate platform for Marakk Developers that showcases premium residential properties across Bangalore. The site combines location-based browsing with interactive maps and streamlined agent connections to move prospects from discovery to site visit as efficiently as possible.',
      features: [
        'Location-Based Property Browsing - Visitors explore listings by Bangalore neighborhoods with area-specific landing pages and local amenity highlights',
        'Interactive OpenStreetMap Integration - Custom map markers with property previews; users can pan, zoom, and filter by price range and property type',
        'Property Listing Pages - Detailed pages with image galleries, floor plans, pricing, amenities list, and nearby landmarks',
        'Agent Contact System - Each listing links to a qualified agent with direct WhatsApp and phone contact options for immediate inquiry',
        'Property Valuation Request - Form-based tool for homeowners to request a free market valuation of their existing property',
        'Brochure Downloads - Gated PDF brochures for each project requiring name and phone number for lead capture',
        'EMI Calculator - Built-in mortgage estimation tool showing monthly payments based on loan amount, interest rate, and tenure',
      ],
    },

    uiux: {
      philosophy: 'Buying property is the biggest financial decision most people make. The site must project absolute trustworthiness and authority while making complex property information easy to digest at a glance.',
      designDecisions: [
        {
          decision: 'Navy blue as dominant brand color',
          rationale: 'Navy (#004274) is the color of trust, authority, and stability in financial and real estate contexts. It positions Marakk as an established, dependable developer.',
        },
        {
          decision: 'DM Serif Display for headings with clean sans-serif body',
          rationale: 'Serif headings communicate heritage and credibility. The contrast with modern body text creates a professional yet approachable reading experience.',
        },
        {
          decision: 'Property cards with key specs visible at a glance',
          rationale: 'Buyers filter mentally by BHK count, area, and price before clicking through. Displaying these on the card surface reduces unnecessary page loads and respects user time.',
        },
        {
          decision: 'Prominent "Quality Builds Trust" tagline placement',
          rationale: 'Positioned in the hero section and footer to reinforce the brand promise at entry and exit points. Repetition of the tagline anchors brand recall.',
        },
      ],
      colorPalette: [
        { name: 'Marakk Navy', hex: '#004274', usage: 'Primary brand color, header, footer, CTAs, hero overlays' },
        { name: 'White', hex: '#FFFFFF', usage: 'Backgrounds, cards, text on navy surfaces' },
        { name: 'Light Gray', hex: '#F5F5F5', usage: 'Alternate section backgrounds, input fields' },
        { name: 'Gold Accent', hex: '#D4A84B', usage: 'Premium badges, featured property highlights, hover states' },
      ],
      typography: {
        heading: 'DM Serif Display - Authoritative serif for property names and section titles',
        body: 'Poppins - Modern, geometric sans-serif for descriptions and UI elements',
        accent: 'Poppins Medium - Pricing, specs, and key property data points',
      },
    },

    branding: {
      logo: '/logos/marakk-developers.png',
      brandColors: {
        primary: '#004274',
        secondary: '#FFFFFF',
        accent: '#D4A84B',
      },
      guidelines: [
        'Logo always displayed in navy on white or reversed-out white on navy; no color variations permitted',
        'Property photographs must showcase exterior elevations in daylight or twilight conditions for aspirational appeal',
        'Gold accent used exclusively for premium or featured property highlights - never for standard UI elements',
        'The tagline "Quality Builds Trust" must appear on every page, either in the hero area or the footer',
        'Tone of voice: Authoritative, reassuring, professional - speak as a trusted advisor, not a hard seller',
      ],
    },
  },

  {
    id: 'bharath-cycle-hub',
    title: 'Bharath Cycle Hub - Online Bicycle Store',
    client: 'Bharath Cycle Hub',
    industry: 'E-commerce',
    year: 2026,
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1200&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&h=800&fit=crop&q=80',
    ],
    description: 'E-commerce store for Bangalore\'s trusted bicycle retailer with Google Ads integration and home test-ride booking.',
    tags: ['Shopify', 'Google Ads', 'E-commerce', 'Test Rides'],
    liveUrl: 'https://bharathcyclehub.store',

    functionality: {
      title: 'Local-First Bicycle E-commerce',
      description: 'Built a Shopify-based online store for Bharath Cycle Hub, a well-known Bangalore bicycle retailer expanding into e-commerce. The store bridges online discovery with offline experience through a unique home test-ride booking feature and tight Google Ads integration for local customer acquisition.',
      features: [
        'Product Catalogue - Full bicycle inventory organized by category: Mountain, Road, Hybrid, Kids, and Electric with detailed spec sheets',
        'Home Test Ride Booking - Customers select a bicycle and schedule a free test ride delivered to their doorstep within Bangalore city limits',
        'Google Ads Conversion Tracking - End-to-end tracking from ad click through purchase with ROAS reporting for campaign optimization',
        'Local Delivery Integration - Same-day and next-day delivery options within Bangalore with real-time delivery status updates',
        'Size Guide Tool - Interactive chart helping customers select the right frame size based on height and riding style',
        'Accessory Bundling - Smart product recommendations suggesting helmets, locks, and lights at checkout to increase average order value',
        'EMI Options - Integration with Shopify payment partners for no-cost EMI on bicycles above a certain price point',
      ],
    },

    uiux: {
      philosophy: 'Bangalore cyclists range from daily commuters to weekend enthusiasts. The store must feel approachable and local, not intimidating. The test-ride feature is the key differentiator and must be impossible to miss.',
      designDecisions: [
        {
          decision: 'Bold green and black color scheme',
          rationale: 'Green signals health, outdoor activity, and eco-friendliness - core cycling values. Black provides contrast and a sporty, energetic edge that appeals to the target demographic.',
        },
        {
          decision: 'Test ride CTA on every product page',
          rationale: 'The home test-ride is the strongest conversion tool. A persistent "Book a Test Ride" button on every product page removes hesitation and bridges the online-to-offline gap.',
        },
        {
          decision: 'Mobile-first product browsing',
          rationale: 'Over 78% of traffic comes from mobile via Google Ads. Product cards, filters, and checkout are optimized for thumb-friendly one-handed navigation.',
        },
        {
          decision: 'Product images showing bikes in Bangalore streets',
          rationale: 'Lifestyle photography featuring recognizable Bangalore locations creates local connection and helps customers visualize ownership in their own context.',
        },
      ],
      colorPalette: [
        { name: 'Cycle Green', hex: '#2ECC40', usage: 'Primary CTAs, add-to-cart buttons, test ride booking' },
        { name: 'Carbon Black', hex: '#1A1A1A', usage: 'Header, footer, text, navigation background' },
        { name: 'White', hex: '#FFFFFF', usage: 'Page backgrounds, product cards, content areas' },
        { name: 'Light Gray', hex: '#F0F0F0', usage: 'Alternate section backgrounds, filter panels' },
      ],
      typography: {
        heading: 'Montserrat Bold - Sporty, energetic, excellent for product titles and category headers',
        body: 'Open Sans - Friendly and highly readable for product descriptions and specifications',
        accent: 'Montserrat SemiBold - Pricing, discount badges, and promotional banners',
      },
    },

    branding: {
      logo: '/logos/bharath-cycle-hub.png',
      brandColors: {
        primary: '#2ECC40',
        secondary: '#1A1A1A',
        accent: '#FFFFFF',
      },
      guidelines: [
        'Logo uses green wordmark on black or white backgrounds; always maintain minimum 24px clearance around the logo',
        'Product photography must show bicycles from a 3/4 front-right angle with consistent studio lighting',
        'Cycle Green is reserved for primary actions: Add to Cart, Book Test Ride, and Checkout buttons',
        'Lifestyle photography should feature real Bangalore locations to reinforce the local identity',
        'Tone of voice: Friendly, energetic, knowledgeable - like advice from a trusted neighborhood cycle shop owner',
      ],
    },
  },
];

// Helper functions for filtering
export const getFeaturedProjects = () => portfolioProjects.filter(p => p.featured);
export const getProjectsByIndustry = (industry: string) =>
  industry === 'All' ? portfolioProjects : portfolioProjects.filter(p => p.industry === industry);
export const getProjectById = (id: string) => portfolioProjects.find(p => p.id === id);
