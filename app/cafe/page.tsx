'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Smartphone,
  Clock,
  MapPin,
  Instagram,
  Star,
  Check,
  X as XMark,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Search,
  RefreshCw,
  Send,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_URL =
  'https://wa.me/447506827925?text=Hi!%20I%20saw%20your%20%C2%A3150%20cafe%20website%20offer';
const WHATSAPP_DISPLAY = '+44 7506 827 925';
const EMAIL = 'info@blackarrowtechnologies.com';

const FEATURES = [
  {
    icon: Smartphone,
    title: 'Mobile-Optimised Menu',
    desc: "Your full menu displayed beautifully on any device. No more PDF downloads or pinch-to-zoom.",
  },
  {
    icon: MapPin,
    title: 'Location & Opening Hours',
    desc: 'Google Maps embedded plus always-updated hours. Customers find you instantly.',
  },
  {
    icon: Mail,
    title: 'Contact Form + Google Maps',
    desc: 'Built-in enquiry form for catering, events, and reservations. Plus a map right on the page.',
  },
  {
    icon: Instagram,
    title: 'Instagram Feed Embedded',
    desc: 'Your latest posts auto-displayed on your website. Post once, show everywhere.',
  },
  {
    icon: RefreshCw,
    title: '1 Round of Revisions',
    desc: "Not happy with a section? We'll revise it at no extra charge. Your cafe, your call.",
  },
  {
    icon: Zap,
    title: 'Delivered in 72 Hours',
    desc: "Briefing on Monday, live website by Wednesday. We don't hang about.",
  },
];

const PAIN_POINTS = [
  {
    icon: Search,
    title: "Your Instagram bio can't rank on Google",
    desc: 'When someone searches "best cafe near Shoreditch", your Instagram post from 3 weeks ago won\'t show up. A website will.',
  },
  {
    icon: Smartphone,
    title: "PDF menus don't work on mobile",
    desc: "Half your customers are trying to read a menu designed for A4 paper on a 6-inch screen. That's lost orders.",
  },
  {
    icon: Clock,
    title: "Customers can't find your hours at 2am",
    desc: "Someone planning their morning coffee at midnight can't figure out if you open at 7 or 8. They'll go to the cafe with a website.",
  },
];

const COMPARISON_ROWS: [string, string | boolean, string | boolean][] = [
  ['Google Search Visibility', false, true],
  ['Menu Always Updated', false, true],
  ['Customer Reviews Control', 'Limited', 'Full Control'],
  ['Opening Hours (24/7 Access)', false, true],
  ['Delivery Integration', false, 'Optional'],
  ['Professional Look', false, true],
  ['Your Own .co.uk Domain', false, true],
];

const FAQS = [
  {
    q: 'What if I change my menu every week?',
    a: "We build your site with an easy-to-update menu section. We'll show you exactly how to change items, prices, and descriptions yourself — takes about 2 minutes. No coding required.",
  },
  {
    q: 'Do I need to provide photos?',
    a: "Nope. We can use your existing Instagram photos (with your permission) or high-quality stock images that match your cafe's vibe. If you have professional photos, even better — but it's not a requirement.",
  },
  {
    q: "What's the catch with £150?",
    a: "No catch. We're testing whether London cafes actually want websites at an accessible price point. We normally charge £350 for landing pages. This is a limited run to build our cafe portfolio — you get a bargain, we get a case study. Win-win.",
  },
  {
    q: 'Can I get online ordering too?',
    a: 'Yes — but that\'s a separate add-on at +£200. The £150 base package focuses on getting you found on Google, showing your menu, and making it dead easy for customers to contact you. Ordering is Phase 2 if you want it.',
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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function CafeLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    cafeName: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.cafeName || !form.name || !form.email) return;

    setSubmitting(true);
    setFormError('');

    try {
      const supabase = createClient();

      const { data: region } = await supabase
        .from('regions')
        .select('id')
        .eq('code', 'UK')
        .single();

      const { error } = await supabase.from('leads').insert({
        region_id: region?.id,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.cafeName,
        message:
          form.message ||
          `£150 Cafe website enquiry from ${form.cafeName}`,
        service_interest: 'Website Development',
        budget_range: '£1,500+',
        source: 'cafe_landing_page',
        status: 'new',
      });

      if (error) throw error;

      setSubmitted(true);
      setForm({ cafeName: '', name: '', email: '', phone: '', message: '' });
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
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 via-amber-50/30 to-orange-50/20 dark:from-deep-obsidian dark:via-amber-950/10 dark:to-deep-obsidian">
        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-warm-sand/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            {/* Urgency badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Only 7 spots left this month
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="font-unbounded font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                <span className="text-gray-900 dark:text-cloud-dancer">
                  London Cafes:{' '}
                </span>
                <span className="text-warm-sand">Professional Website</span>
                <span className="text-gray-900 dark:text-cloud-dancer">
                  {' '}
                  for{' '}
                </span>
                <span className="text-warm-sand">£150</span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mb-8 leading-relaxed">
                Instagram isn&apos;t enough. Get a real website that brings
                customers through your door—delivered in{' '}
                <strong className="text-gray-900 dark:text-cloud-dancer">
                  3 days
                </strong>
                .
              </p>
            </FadeIn>

            {/* Price anchor */}
            <FadeIn delay={0.25}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl line-through text-gray-400 dark:text-cloud-dancer/30 font-unbounded">
                  £350
                </span>
                <span className="text-3xl font-unbounded font-bold text-warm-sand">
                  £150
                </span>
                <span className="px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-full">
                  Save £200 — Limited Offer
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
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-warm-sand/10 dark:bg-warm-sand/20 hover:bg-warm-sand/20 dark:hover:bg-warm-sand/30 text-warm-sand font-bold rounded-lg border-2 border-warm-sand/30 hover:border-warm-sand/50 transition-all"
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-cloud-dancer/60">
                  <div className="flex -space-x-2">
                    {['☕', '🍰', '🧁'].map((emoji, i) => (
                      <span
                        key={i}
                        className="w-8 h-8 rounded-full bg-warm-sand/20 border-2 border-white dark:border-deep-obsidian flex items-center justify-center text-sm"
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                  <span>12 London cafes launched this month</span>
                </div>
                <span className="hidden sm:block text-gray-300 dark:text-cloud-dancer/20">
                  |
                </span>
                <div className="flex items-center gap-1 text-gray-600 dark:text-cloud-dancer/60">
                  <Clock size={14} className="text-warm-sand" />
                  Offer ends 28 Feb 2026
                </div>
              </div>
            </FadeIn>
            </div>

            {/* Hero Image */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-warm-sand/10 aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                    alt="Cozy London cafe interior with warm lighting"
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
      {/*  WHAT YOU GET                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/80">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              Everything You Need.{' '}
              <span className="text-warm-sand">Nothing You Don&apos;t.</span>
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/60 max-w-xl mx-auto">
              A complete website built specifically for cafes. No bloatware. No
              maintenance headaches.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} className="h-full">
                <div className="h-full p-6 rounded-xl border border-gray-100 dark:border-warm-sand/10 bg-gray-50/50 dark:bg-white/[0.02] hover:border-warm-sand/30 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-warm-sand/10 flex items-center justify-center mb-4 group-hover:bg-warm-sand/20 transition-colors">
                    <item.icon size={24} className="text-warm-sand" />
                  </div>
                  <h3 className="font-unbounded font-bold text-base mb-2 text-gray-900 dark:text-cloud-dancer">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-cloud-dancer/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  PHOTO BREAK                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80"
          alt="Cafe counter with pastries and coffee"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-obsidian/70 via-deep-obsidian/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <FadeIn>
              <p className="font-unbounded font-bold text-2xl md:text-3xl text-white max-w-md">
                Your cafe deserves more than an Instagram bio.
              </p>
              <p className="text-white/60 text-sm mt-2 max-w-sm">
                Join 12 London cafes who launched this month.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  WHY CAFES NEED A WEBSITE                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-deep-obsidian/80">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              Instagram Alone is{' '}
              <span className="text-warm-sand">Costing You Customers</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {PAIN_POINTS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-warm-sand/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={28} className="text-warm-sand" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm md:text-base mb-3 text-gray-900 dark:text-cloud-dancer leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-cloud-dancer/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  PRICING COMPARISON TABLE                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              Instagram vs.{' '}
              <span className="text-warm-sand">A Real Website</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-gray-200 dark:border-warm-sand/20 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gray-50 dark:bg-white/[0.03]">
                <div className="p-4 text-sm font-medium text-gray-500 dark:text-cloud-dancer/50">
                  Feature
                </div>
                <div className="p-4 text-sm font-medium text-gray-400 dark:text-cloud-dancer/30 text-center">
                  Instagram Only
                </div>
                <div className="p-4 text-sm font-unbounded font-bold text-warm-sand text-center">
                  £150 Website
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_ROWS.map(([feature, insta, website], i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 border-t border-gray-100 dark:border-warm-sand/10"
                >
                  <div className="p-4 text-sm text-gray-700 dark:text-cloud-dancer/80">
                    {feature as string}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {insta === false ? (
                      <XMark size={18} className="text-red-400" />
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-cloud-dancer/40">
                        {insta as string}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {website === true ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {website as string}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  PHOTO STRIP                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-white dark:bg-deep-obsidian">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { src: 'photo-1559305616-3f99cd43e353', alt: 'London cafe storefront' },
              { src: 'photo-1511920170033-f8396924c348', alt: 'Coffee being prepared' },
              { src: 'photo-1453614512568-c4024d13c247', alt: 'Cafe interior seating' },
            ].map((img) => (
              <FadeIn key={img.src}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image
                    src={`https://images.unsplash.com/${img.src}?w=500&q=80`}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 300px"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  BEFORE / AFTER                                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-deep-obsidian/80 dark:to-deep-obsidian">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
              From{' '}
              <span className="text-gray-400 dark:text-cloud-dancer/40">
                This
              </span>{' '}
              to <span className="text-warm-sand">This</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* BEFORE — Instagram profile mockup */}
            <FadeIn delay={0.1}>
              <div className="relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-cloud-dancer/50 text-xs font-unbounded font-bold rounded-full uppercase tracking-wider z-10">
                  Before
                </div>
                <div className="border-2 border-gray-200 dark:border-white/10 rounded-2xl p-6 bg-gray-50 dark:bg-white/[0.02] opacity-70">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl">
                      ☕
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-cloud-dancer">
                        your_cafe_london
                      </p>
                      <p className="text-xs text-gray-500 dark:text-cloud-dancer/40">
                        @your_cafe_london
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-cloud-dancer/50 mb-3 leading-relaxed">
                    ☕ Specialty coffee &amp; brunch 🥑
                    <br />
                    📍 Somewhere in London
                    <br />
                    ⏰ Mon-Fri 7-5 | Sat-Sun 8-4
                    <br />
                    👇 Menu in highlights
                    <br />
                    linktr.ee/yourcafe
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400 dark:text-cloud-dancer/30 mb-4">
                    <span>
                      <strong className="text-gray-600 dark:text-cloud-dancer/60">
                        137
                      </strong>{' '}
                      posts
                    </span>
                    <span>
                      <strong className="text-gray-600 dark:text-cloud-dancer/60">
                        2.3k
                      </strong>{' '}
                      followers
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      'photo-1509042239860-f550ce710b93',
                      'photo-1555507036-ab1f4038024a',
                      'photo-1514432324607-a09d9b4aefda',
                      'photo-1495474472287-4d71bcdd2085',
                      'photo-1464979681340-bdd28a61699e',
                      'photo-1414235077428-338989a2e8c0',
                    ].map((id, i) => (
                      <div key={i} className="aspect-square rounded overflow-hidden relative">
                        <Image
                          src={`https://images.unsplash.com/${id}?w=150&q=60`}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* AFTER — Clean cafe website mockup */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -top-3 left-4 px-3 py-1 bg-warm-sand text-deep-obsidian text-xs font-unbounded font-bold rounded-full uppercase tracking-wider z-10">
                  After
                </div>
                <div className="border-2 border-warm-sand/30 rounded-2xl p-6 bg-white dark:bg-white/[0.04] shadow-lg shadow-warm-sand/5">
                  {/* Browser bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-unbounded font-bold text-sm text-gray-900 dark:text-cloud-dancer">
                      YOUR CAFE
                    </span>
                    <div className="flex gap-3 text-xs text-gray-500 dark:text-cloud-dancer/50">
                      <span>Menu</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </div>

                  {/* Hero area */}
                  <div className="aspect-[16/7] rounded-lg overflow-hidden mb-4 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
                      alt="Specialty coffee latte art"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <div>
                        <p className="font-unbounded font-bold text-sm text-white">
                          Specialty Coffee
                        </p>
                        <p className="text-[10px] text-white/70">
                          Since 2019 &bull; Shoreditch, London
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info chips */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 text-center">
                      <Clock
                        size={16}
                        className="text-warm-sand mx-auto mb-1"
                      />
                      <p className="text-[10px] text-gray-600 dark:text-cloud-dancer/60">
                        Mon-Fri 7-5
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 text-center">
                      <MapPin
                        size={16}
                        className="text-warm-sand mx-auto mb-1"
                      />
                      <p className="text-[10px] text-gray-600 dark:text-cloud-dancer/60">
                        Shoreditch E1
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 text-center">
                      <Phone
                        size={16}
                        className="text-warm-sand mx-auto mb-1"
                      />
                      <p className="text-[10px] text-gray-600 dark:text-cloud-dancer/60">
                        Call Us
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="w-full py-2.5 rounded-lg bg-warm-sand text-center text-xs font-bold text-deep-obsidian">
                    View Full Menu
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  TESTIMONIAL                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-deep-obsidian/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <Image
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=40"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-warm-sand fill-warm-sand"
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer leading-snug mb-6">
              &ldquo;We went from 50 to 120 Google searches per month.
              Customers actually find us now instead of the chain next
              door.&rdquo;
            </blockquote>
            <div>
              <p className="font-bold text-gray-900 dark:text-cloud-dancer">
                The Daily Grind
              </p>
              <p className="text-sm text-gray-500 dark:text-cloud-dancer/50">
                Camden, London
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 dark:bg-green-500/20 rounded-full">
              <Check size={16} className="text-green-500" />
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                Cafe in Shoreditch got 40% more walk-ins after launch
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  RISK REVERSAL                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-warm-sand/5 dark:bg-warm-sand/[0.03]">
        <div className="container mx-auto px-4">
          <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-warm-sand/10 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={28} className="text-warm-sand" />
            </div>
            <div>
              <h3 className="font-unbounded font-bold text-lg text-gray-900 dark:text-cloud-dancer mb-1">
                Don&apos;t like it? Full refund within 7 days.
              </h3>
              <p className="text-sm text-gray-600 dark:text-cloud-dancer/60">
                Zero risk. If the website doesn&apos;t meet your expectations,
                we refund every penny. No questions, no hassle.
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
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80"
          alt="Barista pouring latte art"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-deep-obsidian/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeIn className="text-center">
            <p className="font-unbounded font-bold text-xl md:text-2xl text-white">
              Ready to get found on Google?
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
        className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-deep-obsidian dark:to-deep-obsidian/80"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <FadeIn className="text-center mb-10">
              <h2 className="font-unbounded font-bold text-3xl md:text-4xl mb-4 text-gray-900 dark:text-cloud-dancer">
                Get Your <span className="text-warm-sand">£150 Website</span>
              </h2>
              <p className="text-gray-600 dark:text-cloud-dancer/60">
                Fill this in and we&apos;ll WhatsApp you within 2 hours to get
                started.
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
                    Thanks! We&apos;ll WhatsApp you within 2 hours to discuss
                    your cafe website.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:underline font-medium text-sm"
                  >
                    <MessageCircle size={16} />
                    Or message us now on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-cloud-dancer/50 mb-1.5">
                        Cafe Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.cafeName}
                        onChange={(e) =>
                          setForm({ ...form, cafeName: e.target.value })
                        }
                        className={inputCls}
                        placeholder="The Daily Grind"
                      />
                    </div>
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
                        placeholder="Sarah"
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
                        placeholder="sarah@mycafe.co.uk"
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
                      Anything else? (optional)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`${inputCls} resize-none`}
                      rows={3}
                      placeholder="E.g. We're in Hackney, opening a second location in March..."
                    />
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
                        Get My £150 Website
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 dark:text-cloud-dancer/30">
                    No spam. No sales calls unless you want one. We&apos;ll
                    reply on WhatsApp.
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
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-obsidian/80">
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
      {/*  FINAL CTA + FOOTER                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-deep-obsidian to-black text-cloud-dancer">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-red-400">
                Limited to 20 cafes in February 2026
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl lg:text-5xl mb-6 max-w-3xl mx-auto">
              Your Competitors Have Websites.{' '}
              <span className="text-warm-sand">You Should Too.</span>
            </h2>
            <p className="text-cloud-dancer/60 mb-10 max-w-lg mx-auto">
              £150. 3 days. Full refund if you don&apos;t love it.
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
      {/*  FLOATING WHATSAPP BUTTON (bottom-left to avoid chatbot clash)   */}
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
