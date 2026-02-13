'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Clock,
  Palette,
  BarChart3,
  Zap,
  Check,
  X as XMark,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Send,
  Shield,
  Smartphone,
  Search,
  Image as ImageIcon,
  MapPin,
  Video,
  RefreshCw,
  Timer,
  TrendingUp,
  ExternalLink,
  Building2,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_URL =
  'https://wa.me/447506827925?text=Hi!%20I%27m%20a%20London%20agent%20interested%20in%20the%20%C2%A3350%20property%20website';
const WHATSAPP_DISPLAY = '+44 7506 827 925';
const EMAIL = 'info@blackarrowtechnologies.com';

const PROBLEMS = [
  {
    icon: Clock,
    title: 'Rightmove pages load in 4+ seconds',
    desc: '60% of mobile visitors bounce before seeing your listing. Every second of delay costs you inquiries.',
    stat: '60% bounce rate',
  },
  {
    icon: Palette,
    title: "You can't control the branding",
    desc: "Your £1.2M listing looks identical to every other agent's. No differentiation, no personality, no trust.",
    stat: 'Zero brand recall',
  },
  {
    icon: BarChart3,
    title: 'Zero analytics on your listings',
    desc: "You have no idea which listings get views, which photos get clicks, or where your inquiries actually come from.",
    stat: 'Flying blind',
  },
];

const SOLUTIONS = [
  {
    icon: Zap,
    title: '0.8 second load time',
    desc: 'Keeps visitors on the page. Every second of delay costs you inquiries — we eliminate the wait.',
    stat: '5x faster',
  },
  {
    icon: Palette,
    title: 'Your brand, your style',
    desc: 'Custom design matching your agency identity. Your listings, your colours, your rules.',
    stat: 'Full control',
  },
  {
    icon: BarChart3,
    title: 'Full Google Analytics setup',
    desc: 'Know exactly how many people view, scroll, and inquire. Data-driven decisions from day one.',
    stat: 'Every click tracked',
  },
];

const CHECKLIST = [
  { icon: Building2, text: 'Single property showcase page OR agent profile page' },
  { icon: ImageIcon, text: 'Interactive image gallery (6-12 photos)' },
  { icon: MessageCircle, text: 'Integrated contact form with WhatsApp button' },
  { icon: MapPin, text: 'Google Maps embed with neighbourhood info' },
  { icon: Video, text: 'Virtual tour embed (if you have one)' },
  { icon: Smartphone, text: 'Mobile-optimised (70% of property searches are mobile)' },
  { icon: Search, text: 'SEO optimised (rank for "[Property Address] for sale")' },
  { icon: RefreshCw, text: '1 round of revisions included' },
  { icon: Zap, text: 'Delivered in 5-7 business days' },
];

const PRICING_TIERS = [
  {
    name: 'Single Property',
    price: '£350',
    desc: 'One high-converting property page',
    features: [
      '1 property showcase page',
      'Up to 12 photos',
      'Contact form + WhatsApp',
      'Google Maps + Analytics',
      'SEO optimised',
      '5-7 day delivery',
    ],
    recommended: false,
  },
  {
    name: 'Agent Profile + 3 Listings',
    price: '£550',
    desc: 'Your agency page plus three property pages',
    features: [
      'Everything in Single Property',
      'Agent/agency profile page',
      '3 property pages included',
      'Consistent branding throughout',
      'Lead dashboard access',
      'Priority 4-day delivery',
    ],
    recommended: true,
  },
  {
    name: 'Full Agency Website',
    price: '£1,200',
    desc: 'Complete digital presence for your agency',
    features: [
      'Everything in Agent Profile',
      'Up to 10 active listings',
      'About & team page',
      'Testimonials section',
      'Blog / market updates page',
      'Quarterly performance report',
    ],
    recommended: false,
  },
];

const FAQS = [
  {
    q: 'What if the property sells before you finish?',
    a: "We pivot to your next listing at no extra cost. The design and structure are ready — we just swap the content. Most agents have another property waiting anyway.",
  },
  {
    q: 'Can I update photos myself?',
    a: "Yes. We include a 10-minute training video showing you exactly how to swap images, update descriptions, and change the price. No coding needed.",
  },
  {
    q: 'Do you integrate with my CRM?',
    a: 'Yes. Contact form submissions can feed into any CRM via webhook — Zoho, HubSpot, Salesforce, or even a simple email + spreadsheet setup. We configure it during build.',
  },
  {
    q: 'What about multiple properties?',
    a: "Start with one page at £350 to see the results. If it works (it will), upgrade to 3 properties for £550 or a full agency site for £1,200. 12 London agents upgraded after their first page.",
  },
];

// ─── Helper Components ───────────────────────────────────────────────────────

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-sand/20 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="font-unbounded font-bold text-sm md:text-base pr-4 text-gray-900 dark:text-cloud-dancer">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-warm-sand" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 dark:text-cloud-dancer/70 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpeedBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="space-y-6">
      {/* Rightmove - slow */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-cloud-dancer/70">
            Rightmove Listing
          </span>
          <span className="font-mono font-bold text-red-500">4.2s</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 4.2, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full relative"
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
              LOADED
            </span>
          </motion.div>
        </div>
      </div>

      {/* Custom page - fast */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-cloud-dancer/70">
            Your Custom Page
          </span>
          <span className="font-mono font-bold text-green-500">0.8s</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full relative"
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
              LOADED
            </span>
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-500 dark:text-cloud-dancer/40 mt-2">
        Watch the difference. Your visitors feel it too.
      </p>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const target = new Date('2026-02-28T23:59:59').getTime();

    if (Date.now() > target) {
      setExpired(true);
      return;
    }

    function update() {
      const diff = Math.max(0, target - Date.now());
      if (diff === 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  if (expired) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.mins, label: 'Mins' },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <span className="block text-2xl md:text-3xl font-unbounded font-bold text-warm-sand">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-cloud-dancer/40">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AgentLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    agency: '',
    email: '',
    phone: '',
    listings: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToExamples = () =>
    examplesRef.current?.scrollIntoView({ behavior: 'smooth' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setSubmitting(true);
    setFormError('');

    try {
      const supabase = createClient();

      const { data: region } = await supabase
        .from('regions')
        .select('id')
        .eq('code', 'UK')
        .single();

      if (!region) {
        setFormError('Configuration error. Please WhatsApp us instead.');
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.from('leads').insert({
        region_id: region.id,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.agency || null,
        message: `Property website enquiry. Active listings: ${form.listings || 'Not specified'}`,
        service_interest: 'Website Development',
        budget_range: '£1,500+',
        source: 'real_estate_landing_page',
        status: 'new',
      });

      if (error) throw error;

      setSubmitted(true);
      setForm({ name: '', agency: '', email: '', phone: '', listings: '' });
    } catch {
      setFormError('Something went wrong. Please WhatsApp us instead.');
    }

    setSubmitting(false);
  }

  const inputCls =
    'w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-warm-sand/20 text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/30 focus:outline-none focus:border-warm-sand transition-colors text-sm';

  return (
    <main className="overflow-hidden">
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  HERO                                                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-deep-obsidian dark:via-slate-950/30 dark:to-deep-obsidian">
        {/* Subtle geometric decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-20 w-80 h-80 bg-warm-sand/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-warm-sand/[0.03] rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,164,107,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,164,107,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 pt-40 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            {/* Trust bar */}
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-warm-sand/10 dark:bg-warm-sand/20 border border-warm-sand/20 rounded-full">
                  <Shield size={14} className="text-warm-sand" />
                  <span className="text-xs font-medium text-gray-700 dark:text-cloud-dancer/70">
                    GDPR Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-warm-sand/10 dark:bg-warm-sand/20 border border-warm-sand/20 rounded-full">
                  <Smartphone size={14} className="text-warm-sand" />
                  <span className="text-xs font-medium text-gray-700 dark:text-cloud-dancer/70">
                    Mobile-First
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-warm-sand/10 dark:bg-warm-sand/20 border border-warm-sand/20 rounded-full">
                  <Search size={14} className="text-warm-sand" />
                  <span className="text-xs font-medium text-gray-700 dark:text-cloud-dancer/70">
                    SEO Optimised
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="font-unbounded font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                <span className="text-gray-900 dark:text-cloud-dancer">
                  Your Listings Deserve{' '}
                </span>
                <span className="text-warm-sand">a Fast Website</span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mb-8 leading-relaxed">
                Stop losing leads to slow Rightmove redirects. Get a
                conversion-focused property page that loads in{' '}
                <strong className="text-gray-900 dark:text-cloud-dancer">
                  0.8 seconds
                </strong>
                —delivered in{' '}
                <strong className="text-gray-900 dark:text-cloud-dancer">
                  5 days
                </strong>
                .
              </p>
            </FadeIn>

            {/* Price */}
            <FadeIn delay={0.25}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-unbounded font-bold text-warm-sand">
                  £350
                </span>
                <span className="text-sm text-gray-500 dark:text-cloud-dancer/50">
                  per property page
                </span>
              </div>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={22} />
                  WhatsApp Us Now
                </a>
                <button
                  onClick={scrollToExamples}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-warm-sand/10 dark:bg-warm-sand/20 hover:bg-warm-sand/20 dark:hover:bg-warm-sand/30 text-warm-sand font-bold rounded-lg border-2 border-warm-sand/30 hover:border-warm-sand/50 transition-all"
                >
                  See Examples
                  <ArrowRight size={18} />
                </button>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-cloud-dancer/60">
                  <div className="flex -space-x-2">
                    {['🏠', '🏢', '🏡'].map((emoji, i) => (
                      <span
                        key={i}
                        className="w-8 h-8 rounded-full bg-warm-sand/20 border-2 border-white dark:border-deep-obsidian flex items-center justify-center text-sm"
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                  <span>50+ property pages delivered since 2024</span>
                </div>
                <span className="hidden sm:block text-gray-300 dark:text-cloud-dancer/20">
                  |
                </span>
                <div className="flex items-center gap-1 text-gray-600 dark:text-cloud-dancer/60">
                  <TrendingUp size={14} className="text-warm-sand" />
                  12 agents upgraded to full sites
                </div>
              </div>
            </FadeIn>
            </div>

            {/* Hero Image */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-warm-sand/10 aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                    alt="Modern London apartment living room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 40vw"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-warm-sand/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-warm-sand/5 rounded-full -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  THE PROBLEM                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/80">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-unbounded font-bold rounded-full uppercase tracking-wider mb-4">
              The Problem
            </span>
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-gray-900 dark:text-cloud-dancer">
              Rightmove Is{' '}
              <span className="text-red-500">Losing You Leads</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PROBLEMS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="h-full">
                <div className="h-full p-6 rounded-xl border border-red-500/10 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/[0.03]">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-red-500" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm md:text-base mb-2 text-gray-900 dark:text-cloud-dancer">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-cloud-dancer/60 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium rounded">
                    {item.stat}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  THE SOLUTION                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-obsidian">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-unbounded font-bold rounded-full uppercase tracking-wider mb-4">
              The Fix
            </span>
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-gray-900 dark:text-cloud-dancer">
              A Property Page That{' '}
              <span className="text-warm-sand">Actually Converts</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SOLUTIONS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="h-full">
                <div className="h-full p-6 rounded-xl border border-green-500/10 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/[0.03]">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-green-500" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm md:text-base mb-2 text-gray-900 dark:text-cloud-dancer">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-cloud-dancer/60 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                    {item.stat}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Speed test CTA */}
          <FadeIn delay={0.4} className="text-center mt-10">
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-warm-sand hover:underline"
            >
              Test your current site speed
              <ExternalLink size={14} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  LONDON PROPERTY SHOWCASE                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80"
          alt="London cityscape with modern properties"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-obsidian/70 via-deep-obsidian/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <FadeIn>
              <p className="font-unbounded font-bold text-2xl md:text-3xl text-white max-w-lg">
                Built for London agents who want to stand out.
              </p>
              <p className="text-white/60 text-sm mt-2 max-w-sm">
                50+ property pages delivered. 12 agents upgraded to full sites.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  WHAT YOU GET                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/80">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              What&apos;s Included for{' '}
              <span className="text-warm-sand">£350</span>
            </h2>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            {CHECKLIST.map((item, i) => (
              <FadeIn key={item.text} delay={i * 0.05}>
                <div className="flex items-start gap-4 py-3 border-b border-gray-100 dark:border-warm-sand/10 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-warm-sand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={16} className="text-warm-sand" />
                  </div>
                  <p className="text-gray-700 dark:text-cloud-dancer/80 text-sm md:text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-cloud-dancer/40">
              One extra sale pays for 20 of these pages.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  BEFORE / AFTER + SPEED COMPARISON                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={examplesRef}
        className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-deep-obsidian dark:to-deep-obsidian/80"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              <span className="text-red-400">Rightmove</span> vs.{' '}
              <span className="text-warm-sand">Your Page</span>
            </h2>
          </FadeIn>

          {/* Speed Bars */}
          <FadeIn delay={0.1} className="max-w-xl mx-auto mb-16">
            <SpeedBars />
          </FadeIn>

          {/* Visual comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* BEFORE — Rightmove mockup */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-red-500/10 text-red-500 text-xs font-unbounded font-bold rounded-full uppercase tracking-wider z-10">
                  Rightmove
                </div>
                <div className="border-2 border-red-500/20 rounded-2xl p-5 bg-gray-50 dark:bg-white/[0.02] opacity-70">
                  {/* Rightmove-style header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
                    <div className="w-24 h-4 bg-green-600/30 rounded" />
                    <div className="flex gap-2">
                      <div className="w-12 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="w-12 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                    </div>
                  </div>

                  {/* Ad banner */}
                  <div className="w-full h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded mb-3 flex items-center justify-center">
                    <span className="text-[9px] text-yellow-600 dark:text-yellow-400">
                      ADVERTISEMENT
                    </span>
                  </div>

                  {/* Small image */}
                  <div className="aspect-[16/9] rounded overflow-hidden mb-3 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=60"
                      alt="Property listing"
                      fill
                      className="object-cover saturate-50 opacity-80"
                      sizes="300px"
                    />
                  </div>

                  {/* Generic text */}
                  <div className="space-y-2 mb-3">
                    <div className="w-3/4 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                  </div>

                  {/* Another ad */}
                  <div className="w-full h-8 bg-blue-50 dark:bg-blue-900/10 rounded mb-3 flex items-center justify-center">
                    <span className="text-[9px] text-blue-400">
                      SPONSORED
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-cloud-dancer/30 pt-3 border-t border-gray-200 dark:border-white/10">
                    <span className="text-red-400 font-bold">4.2s load</span>
                    <span>2% inquiry rate</span>
                    <span>No analytics</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* AFTER — Custom property page mockup */}
            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-warm-sand text-deep-obsidian text-xs font-unbounded font-bold rounded-full uppercase tracking-wider z-10">
                  Your Page
                </div>
                <div className="border-2 border-warm-sand/30 rounded-2xl p-5 bg-white dark:bg-white/[0.04] shadow-lg shadow-warm-sand/5">
                  {/* Clean branded header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-unbounded font-bold text-xs text-gray-900 dark:text-cloud-dancer">
                      YOUR AGENCY
                    </span>
                    <div className="flex gap-3 text-[10px] text-gray-500 dark:text-cloud-dancer/50">
                      <span>About</span>
                      <span>Listings</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Hero image */}
                  <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                      alt="Modern apartment interior"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <div>
                        <p className="font-unbounded font-bold text-sm text-white">
                          2 Bed Flat, Canary Wharf
                        </p>
                        <p className="text-warm-sand font-unbounded font-bold text-xs mt-0.5">
                          £850,000
                        </p>
                      </div>
                    </div>
                    {/* Photo count badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 text-white text-[9px] rounded">
                      1/12
                    </div>
                  </div>

                  {/* Key details */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded bg-gray-50 dark:bg-white/5 text-center">
                      <p className="font-bold text-xs text-gray-900 dark:text-cloud-dancer">
                        2
                      </p>
                      <p className="text-[9px] text-gray-500 dark:text-cloud-dancer/40">
                        Bedrooms
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-50 dark:bg-white/5 text-center">
                      <p className="font-bold text-xs text-gray-900 dark:text-cloud-dancer">
                        1
                      </p>
                      <p className="text-[9px] text-gray-500 dark:text-cloud-dancer/40">
                        Bathroom
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-50 dark:bg-white/5 text-center">
                      <p className="font-bold text-xs text-gray-900 dark:text-cloud-dancer">
                        780
                      </p>
                      <p className="text-[9px] text-gray-500 dark:text-cloud-dancer/40">
                        Sq Ft
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="w-full py-2 rounded-lg bg-warm-sand text-center text-xs font-bold text-deep-obsidian mb-3">
                    Book a Viewing
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-cloud-dancer/30 pt-3 border-t border-gray-100 dark:border-warm-sand/10">
                    <span className="text-green-500 font-bold">
                      0.8s load
                    </span>
                    <span className="text-green-500">8% inquiry rate</span>
                    <span className="text-green-500">Full analytics</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  CASE STUDY / TESTIMONIALS                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/90">
        <div className="container mx-auto px-4">
          {/* Data case study */}
          <FadeIn className="max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl border border-warm-sand/20 bg-warm-sand/[0.03] overflow-hidden">
              <div className="relative h-48 md:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
                  alt="Modern apartment in Canary Wharf"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 bg-warm-sand text-deep-obsidian text-xs font-unbounded font-bold rounded-full">
                    Case Study
                  </span>
                </div>
              </div>
              <div className="p-8">
              <span className="text-xs font-unbounded font-bold text-warm-sand uppercase tracking-wider">
                Canary Wharf, E14
              </span>
              <p className="text-lg md:text-xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer mt-4 mb-6 leading-snug">
                &ldquo;We tested this on a £850K flat in Canary Wharf. The
                custom page got 15 inquiries in 2 weeks vs 3 from Rightmove in
                the same period.&rdquo;
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-warm-sand/20 flex items-center justify-center font-unbounded font-bold text-sm text-warm-sand">
                  M
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-cloud-dancer">
                    Marcus
                  </p>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/50">
                    Independent Agent, E14
                  </p>
                </div>
              </div>

              {/* Result badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-white dark:bg-white/5">
                  <p className="text-xl font-unbounded font-bold text-warm-sand">
                    +400%
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-cloud-dancer/50 mt-1">
                    More inquiries
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white dark:bg-white/5">
                  <p className="text-xl font-unbounded font-bold text-warm-sand">
                    0.8s
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-cloud-dancer/50 mt-1">
                    Load time
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white dark:bg-white/5">
                  <p className="text-xl font-unbounded font-bold text-warm-sand">
                    8.2%
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-cloud-dancer/50 mt-1">
                    Conversion rate
                  </p>
                </div>
              </div>
              </div>
            </div>
          </FadeIn>

          {/* Sarah testimonial */}
          <FadeIn delay={0.2} className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-warm-sand fill-warm-sand"
                />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-cloud-dancer/80 leading-snug mb-4">
              &ldquo;I was skeptical about £350 making a difference. Turns out a
              fast, branded page converts 4x better than Rightmove redirects.
              Worth every penny.&rdquo;
            </blockquote>
            <p className="text-sm text-gray-500 dark:text-cloud-dancer/50">
              — Sarah J., Independent Agent, SW11
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  PRICING                                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-obsidian">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              Transparent <span className="text-warm-sand">Pricing</span>
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/60">
              Start with one. Scale when you see results.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1} className="h-full">
                <div
                  className={`h-full p-6 rounded-xl border ${
                    tier.recommended
                      ? 'border-warm-sand/50 bg-warm-sand/[0.04] dark:bg-warm-sand/[0.06] ring-1 ring-warm-sand/30'
                      : 'border-gray-200 dark:border-warm-sand/10 bg-white dark:bg-white/[0.02]'
                  } relative flex flex-col`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-warm-sand text-deep-obsidian text-xs font-unbounded font-bold rounded-full">
                      Most Popular
                    </span>
                  )}

                  <h3 className="font-unbounded font-bold text-sm text-gray-900 dark:text-cloud-dancer mb-1 mt-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/50 mb-4">
                    {tier.desc}
                  </p>
                  <p className="text-3xl font-unbounded font-bold text-warm-sand mb-6">
                    {tier.price}
                  </p>

                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-cloud-dancer/70"
                      >
                        <Check
                          size={16}
                          className="text-green-500 flex-shrink-0 mt-0.5"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-lg text-center text-sm font-bold transition-all ${
                      tier.recommended
                        ? 'bg-warm-sand text-deep-obsidian hover:bg-warm-sand/90'
                        : 'bg-warm-sand/10 dark:bg-warm-sand/20 text-warm-sand hover:bg-warm-sand/20 dark:hover:bg-warm-sand/30 border border-warm-sand/20'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-cloud-dancer/40">
              While others wait 3 months for an agency website, you launch in 5
              days.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  SPEED GUARANTEE                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-warm-sand/5 to-warm-sand/[0.02] dark:from-warm-sand/[0.04] dark:to-warm-sand/[0.01] border-y border-warm-sand/10">
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-warm-sand/10 flex items-center justify-center flex-shrink-0">
              <Timer size={36} className="text-warm-sand" />
            </div>
            <div>
              <h3 className="font-unbounded font-bold text-xl text-gray-900 dark:text-cloud-dancer mb-2">
                Speed Guarantee
              </h3>
              <p className="text-gray-700 dark:text-cloud-dancer/80 mb-2">
                If your page doesn&apos;t load in under 2 seconds on mobile,{' '}
                <strong className="text-warm-sand">
                  we&apos;ll refund 50% of your payment
                </strong>
                .
              </p>
              <p className="text-sm text-gray-500 dark:text-cloud-dancer/50">
                Tested on real London 4G networks. No Wi-Fi cheating.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  PHOTO BREAK 2                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1600&q=80"
          alt="Modern London building exterior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep-obsidian/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn className="text-center">
            <p className="font-unbounded font-bold text-xl md:text-2xl text-white">
              Your listings deserve their own stage.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  CONTACT FORM                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        id="form"
        className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/80"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <FadeIn className="text-center mb-10">
              <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
                Get Your{' '}
                <span className="text-warm-sand">Property Page</span>
              </h2>
              <p className="text-gray-600 dark:text-cloud-dancer/60">
                Fill this in. We&apos;ll check WhatsApp within the hour.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              {submitted ? (
                <div className="text-center p-8 rounded-xl border border-green-500/30 bg-green-500/5">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-unbounded font-bold text-xl text-gray-900 dark:text-cloud-dancer mb-2">
                    You&apos;re In!
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 mb-4">
                    Thanks! Check WhatsApp in the next hour.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:underline font-medium text-sm"
                  >
                    <MessageCircle size={16} />
                    Or message us directly now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={inputCls}
                        placeholder="Sarah Johnson"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                        Agency Name
                      </label>
                      <input
                        type="text"
                        value={form.agency}
                        onChange={(e) =>
                          setForm({ ...form, agency: e.target.value })
                        }
                        className={inputCls}
                        placeholder="Independent / Agency name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputCls}
                        placeholder="sarah@agency.co.uk"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className={inputCls}
                        placeholder="07700 900 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                      Number of Active Listings
                    </label>
                    <select
                      value={form.listings}
                      onChange={(e) =>
                        setForm({ ...form, listings: e.target.value })
                      }
                      className={inputCls}
                    >
                      <option value="">Select...</option>
                      <option value="1-3">1-3 listings</option>
                      <option value="4-10">4-10 listings</option>
                      <option value="10-20">10-20 listings</option>
                      <option value="20+">20+ listings</option>
                    </select>
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <XMark size={16} />
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-warm-sand hover:bg-warm-sand/90 text-deep-obsidian font-unbounded font-bold rounded-lg transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={18} />
                        Get My Property Page
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-cloud-dancer/30">
                    No spam. We reply on WhatsApp within 1 hour during business
                    hours.
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  FAQ                                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-obsidian">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-gray-900 dark:text-cloud-dancer">
              Questions? <span className="text-warm-sand">Answered.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="max-w-2xl mx-auto">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  URGENCY FOOTER + FINAL CTA                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-deep-obsidian to-black text-cloud-dancer">
        <div className="container mx-auto px-4 text-center">
          {/* February special */}
          <FadeIn>
            <div className="max-w-xl mx-auto p-6 rounded-2xl border border-warm-sand/20 bg-warm-sand/[0.04] mb-12">
              <span className="text-xs font-unbounded font-bold text-warm-sand uppercase tracking-wider">
                February Special
              </span>
              <p className="text-lg md:text-xl font-unbounded font-bold text-cloud-dancer mt-3 mb-4">
                Book this week, get free Google My Business optimisation{' '}
                <span className="text-cloud-dancer/50">(worth £150)</span>
              </p>
              <Countdown />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl lg:text-5xl mb-6 max-w-3xl mx-auto">
              Your Listings Are Worth More Than{' '}
              <span className="text-warm-sand">a Rightmove Redirect</span>
            </h2>
            <p className="text-cloud-dancer/60 mb-10 max-w-lg mx-auto">
              £350. 5 days. 50% refund if it&apos;s not under 2 seconds.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={22} />
                WhatsApp Us Now
              </a>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-warm-sand/30 hover:border-warm-sand/50 text-warm-sand font-bold rounded-lg transition-all"
              >
                Fill Out the Form
                <ArrowRight size={18} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-cloud-dancer/50">
              <a
                href="https://wa.me/447506827925"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cloud-dancer/80 transition-colors"
              >
                <Phone size={16} className="text-warm-sand" />
                {WHATSAPP_DISPLAY}
              </a>
              <span className="hidden sm:block">&bull;</span>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-cloud-dancer/80 transition-colors"
              >
                <Mail size={16} className="text-warm-sand" />
                {EMAIL}
              </a>
            </div>
            <p className="mt-8 text-xs text-cloud-dancer/30">
              Black Arrow Technologies is a trading name of Lateral View
              Solutions Ltd (Company No: 16673116).
              <br />
              71-75 Shelton Street, Covent Garden, London WC2H 9JQ
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  FLOATING WHATSAPP BUTTON                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[110] flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-full shadow-lg shadow-green-500/30 transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
        <span className="hidden sm:inline text-sm">WhatsApp Us</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
      </a>
    </main>
  );
}
