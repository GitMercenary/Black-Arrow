/**
 * Chatbot Q&A Database
 * Common questions and answers for BLACK ARROW Technologies
 */

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: 'services' | 'pricing' | 'process' | 'about' | 'technical' | 'general';
}

export const CHATBOT_QA: ChatMessage[] = [
  // Services
  {
    id: 'q1',
    question: 'What services do you offer?',
    answer: 'We offer four core services:\n\n1. **E-Commerce Development** - Headless commerce platforms with AI recommendations\n2. **Performance Ads** - Google Ads, Meta Ads, and LinkedIn campaigns\n3. **Automation & AI** - Workflow automation, AI chatbots, and CRM integration\n4. **Technical SEO** - Core Web Vitals optimization and structured data',
    keywords: ['services', 'what do you do', 'offerings', 'capabilities'],
    category: 'services',
  },
  {
    id: 'q2',
    question: 'Do you work with e-commerce stores?',
    answer: 'Yes! E-commerce is one of our core specialties. We build headless commerce platforms using Next.js, Shopify Plus, and modern technologies. We\'ve helped clients achieve:\n\n- +35% conversion rates\n- +22% average order values\n- -60% page load times\n\nWe specialize in luxury retail, B2B commerce, and multi-region stores.',
    keywords: ['ecommerce', 'e-commerce', 'shopify', 'online store', 'retail'],
    category: 'services',
  },
  {
    id: 'q3',
    question: 'Can you help with Google Ads or Meta Ads?',
    answer: 'Absolutely! Our Performance Ads service covers:\n\n- Google Ads (Search, Shopping, Display)\n- Meta Ads (Facebook & Instagram)\n- LinkedIn Ads (B2B campaigns)\n\nWe focus on data-driven optimization to reduce CAC and improve ROAS. Our clients have seen 42% lower customer acquisition costs on average.',
    keywords: ['google ads', 'meta ads', 'facebook ads', 'advertising', 'ppc', 'paid ads'],
    category: 'services',
  },
  {
    id: 'q4',
    question: 'Do you build AI chatbots?',
    answer: 'Yes! We create custom AI chatbots using GPT-4 that can:\n\n- Qualify leads 24/7\n- Answer customer questions\n- Book appointments\n- Integrate with your CRM\n\nOur chatbots are trained on your specific business and provide human-like responses.',
    keywords: ['chatbot', 'ai', 'chat', 'automation', 'gpt', 'artificial intelligence'],
    category: 'services',
  },

  // Pricing
  {
    id: 'q5',
    question: 'How much does it cost?',
    answer: 'Our pricing depends on the scope and complexity of your project. Typical ranges:\n\n- **E-Commerce Development**: $15,000 - $50,000+\n- **Performance Ads**: $2,000 - $10,000/month (+ ad spend)\n- **Automation & AI**: $5,000 - $25,000 (one-time) + optional monthly support\n- **Technical SEO**: $3,000 - $15,000\n\nWe provide custom quotes based on your specific needs. Start with a free AI audit to get an accurate estimate.',
    keywords: ['pricing', 'cost', 'how much', 'price', 'budget', 'rates'],
    category: 'pricing',
  },
  {
    id: 'q6',
    question: 'Do you offer monthly retainers?',
    answer: 'Yes, we offer monthly retainer packages for ongoing work:\n\n- **Ad Management**: Starting at $2,000/month\n- **Technical Support**: $1,500 - $5,000/month\n- **SEO & Content**: $2,500 - $8,000/month\n- **Full-Service Marketing**: Custom pricing\n\nRetainers include dedicated support, regular optimization, and monthly reporting.',
    keywords: ['retainer', 'monthly', 'ongoing', 'subscription'],
    category: 'pricing',
  },

  // Process
  {
    id: 'q7',
    question: 'What is your process?',
    answer: 'Our typical process:\n\n1. **Discovery Call** (30 mins) - Understand your goals and challenges\n2. **Free AI Audit** - Analyze your digital presence\n3. **Custom Proposal** - Detailed plan with ROI projections\n4. **Kickoff** - Project planning and timeline\n5. **Development/Implementation** - We build and optimize\n6. **Testing & Launch** - QA and deployment\n7. **Ongoing Optimization** - Monitor and improve\n\nTimeline varies by project but typically 4-12 weeks.',
    keywords: ['process', 'how does it work', 'workflow', 'timeline', 'steps'],
    category: 'process',
  },
  {
    id: 'q8',
    question: 'How long does a project take?',
    answer: 'Project timelines vary based on complexity:\n\n- **E-Commerce Store**: 6-12 weeks\n- **Ad Campaign Setup**: 1-2 weeks\n- **AI Chatbot**: 2-4 weeks\n- **SEO Optimization**: 8-16 weeks (ongoing)\n- **Website Redesign**: 8-16 weeks\n\nWe provide detailed timelines in our proposals and keep you updated throughout.',
    keywords: ['timeline', 'how long', 'duration', 'time', 'weeks'],
    category: 'process',
  },

  // About
  {
    id: 'q9',
    question: 'Which regions do you serve?',
    answer: 'We serve clients in three primary regions:\n\n🇬🇧 **United Kingdom** - London and nationwide\n🇦🇪 **United Arab Emirates** - Dubai, Abu Dhabi, and GCC\n🇮🇳 **India** - Bangalore, Mumbai, Delhi, and nationwide\n\nWe work with clients globally but specialize in these markets with localized expertise, currency support, and time zone coverage.',
    keywords: ['location', 'region', 'country', 'uk', 'uae', 'india', 'where'],
    category: 'about',
  },
  {
    id: 'q10',
    question: 'Who are your typical clients?',
    answer: 'We work with:\n\n- **E-Commerce Brands** (luxury retail, fashion, electronics)\n- **B2B SaaS Companies** (lead generation, demand gen)\n- **Healthcare Providers** (automation, patient engagement)\n- **Professional Services** (law firms, consultancies)\n\nMost clients are scaling businesses with revenues between $1M - $50M seeking ROI-focused digital solutions.',
    keywords: ['clients', 'who', 'industries', 'sectors'],
    category: 'about',
  },

  // Technical
  {
    id: 'q11',
    question: 'What technologies do you use?',
    answer: 'Our tech stack includes:\n\n**Frontend**: Next.js 14, React, TypeScript, Tailwind CSS\n**Backend**: Node.js, Supabase, PostgreSQL\n**E-Commerce**: Shopify Plus, Headless Commerce\n**Automation**: Zapier, Make, n8n\n**AI**: OpenAI GPT-4, Claude, Custom Models\n**Analytics**: Google Analytics 4, Mixpanel\n\nWe use modern, scalable technologies that ensure performance and maintainability.',
    keywords: ['technology', 'tech stack', 'tools', 'platforms', 'framework'],
    category: 'technical',
  },
  {
    id: 'q12',
    question: 'Do you provide hosting and maintenance?',
    answer: 'Yes! We offer:\n\n**Hosting Options**:\n- Vercel (recommended for Next.js sites)\n- AWS, Google Cloud, Azure\n- Shopify Plus\n\n**Maintenance Packages**:\n- **Basic**: $500/month - Security updates, bug fixes\n- **Standard**: $1,500/month - + Feature updates, performance monitoring\n- **Premium**: $3,000/month - + Dedicated support, priority development\n\nAll packages include uptime monitoring and backups.',
    keywords: ['hosting', 'maintenance', 'support', 'uptime', 'managed'],
    category: 'technical',
  },

  // General
  {
    id: 'q13',
    question: 'How do I get started?',
    answer: 'Getting started is easy:\n\n1. **Click "Start Your AI Audit"** - Fill out the brief form\n2. **Receive Free Audit** - Within 24 hours, we\'ll email you actionable insights\n3. **Schedule Discovery Call** - 30-minute call to discuss your goals\n4. **Receive Proposal** - Detailed plan with ROI projections\n5. **Kickoff** - We start building!\n\nNo obligations, no sales pressure. Just honest insights and recommendations.',
    keywords: ['get started', 'begin', 'start', 'how to', 'onboard'],
    category: 'general',
  },
  {
    id: 'q14',
    question: 'Do you offer a free consultation?',
    answer: 'Yes! We offer:\n\n- **Free AI Audit** - Automated analysis of your website, ads, and digital presence (24-hour delivery)\n- **Free Discovery Call** - 30-minute consultation to discuss your goals and challenges\n\nBoth are no-obligation. We only recommend solutions that make sense for your business.',
    keywords: ['free', 'consultation', 'audit', 'demo', 'trial'],
    category: 'general',
  },
  {
    id: 'q15',
    question: 'Can you guarantee results?',
    answer: 'We focus on data-driven strategies and have a strong track record:\n\n- ₹50Cr+ revenue generated for clients\n- 42% average CAC reduction\n- 80 hours/month average time saved through automation\n\nWhile we can\'t guarantee specific results (too many variables), we do guarantee:\n- Transparent reporting\n- ROI-focused approach\n- Regular optimization\n- Money-back guarantee on select services\n\nWe\'ll provide realistic projections in your proposal.',
    keywords: ['guarantee', 'results', 'roi', 'success', 'promise'],
    category: 'general',
  },
];

/**
 * Default/fallback responses
 */
export const CHATBOT_FALLBACKS = {
  noMatch: 'I\'m not sure about that. Would you like to:\n\n1. Schedule a free discovery call\n2. Get a free AI audit of your digital presence\n3. Email us at hello@blackarrowtechnologies.com\n\nOr try asking me about our services, pricing, or process!',
  greeting: 'Hello! I\'m the BLACK ARROW AI assistant. How can I help you today?\n\nI can answer questions about:\n- Our services (e-commerce, ads, automation, SEO)\n- Pricing and packages\n- Our process and timeline\n- Technical capabilities',
  goodbye: 'Thank you for chatting! If you\'d like to continue the conversation with our team, feel free to start your free AI audit or schedule a discovery call. Have a great day!',
};

/**
 * Greeting patterns
 */
export const GREETING_PATTERNS = [
  'hello',
  'hi',
  'hey',
  'greetings',
  'good morning',
  'good afternoon',
  'good evening',
];

/**
 * Goodbye patterns
 */
export const GOODBYE_PATTERNS = [
  'bye',
  'goodbye',
  'thanks',
  'thank you',
  'that\'s all',
  'see you',
];
