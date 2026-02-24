'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import {
  Globe, ArrowRight, ArrowLeft, CheckCircle2, Zap,
  Smartphone, Search, BarChart3, TrendingUp, Shield, Star,
  FileCode, Palette, Rocket
} from 'lucide-react';
import Link from 'next/link';

// ─── Pricing plans for the limited period offer section ───
const PRICING_PLANS = [
  {
    name: 'Starter',
    tagline: 'Perfect for getting online fast',
    originalPrice: 14999,
    price: 11999,
    popular: false,
    features: [
      'Landing page',
      'Services / About page',
      'Contact page',
      'Privacy & legal pages',
      'Mobile responsive design',
      'Basic SEO setup',
      '1 round of revisions',
      '3–5 day delivery',
    ],
  },
  {
    name: 'Growth',
    tagline: 'For businesses ready to scale',
    originalPrice: 28999,
    price: 24999,
    popular: true,
    features: [
      '4–6 pages',
      'AI chatbot integration',
      'Contact & lead capture forms',
      'Social media integration',
      'Google Analytics setup',
      'SEO, AEO & GEO basics',
      '2 rounds of revisions',
      '7–10 day delivery',
    ],
  },
  {
    name: 'Performance',
    tagline: 'Maximum impact & automation',
    originalPrice: 54999,
    price: 44999,
    popular: false,
    features: [
      '6–10 pages',
      'Custom design for each page',
      'Automated lead workflows',
      'Automated email follow-up',
      'WhatsApp & live chat integration',
      'Google Business setup',
      'Advanced SEO, AEO & GEO',
      'Custom content writing',
      'Unlimited revisions',
      '10–14 day delivery',
    ],
  },
];

// Growth package features (for hero card)
const growthFeatures = [
  '4–6 pages',
  'AI chatbot integration',
  'Contact & lead capture forms',
  'Social media integration',
  'Google Analytics setup',
  'SEO, AEO & GEO basics',
  '2 rounds of revisions',
  '7–10 day delivery',
];

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Looks perfect on every screen — phones, tablets, desktops',
  },
  {
    icon: Zap,
    title: 'Fast Loading',
    description: 'Optimised for speed and Core Web Vitals out of the box',
  },
  {
    icon: Search,
    title: 'SEO Ready',
    description: 'Built-in SEO best practices so Google finds you from day one',
  },
  {
    icon: BarChart3,
    title: 'Conversion Focused',
    description: 'Strategic layouts designed to turn visitors into leads',
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Google Analytics setup so you can track visitors, leads, and growth',
  },
  {
    icon: FileCode,
    title: 'Scalable Codebase',
    description: 'Modern tech stack that grows with your business',
  },
];

const process = [
  {
    step: 1,
    icon: Palette,
    title: 'Discovery',
    description: 'We learn about your business, goals, and target audience',
    duration: 'Day 1',
  },
  {
    step: 2,
    icon: FileCode,
    title: 'Design & Build',
    description: 'We craft your custom website with conversion-focused design',
    duration: 'Days 2–8',
  },
  {
    step: 3,
    icon: Rocket,
    title: 'Launch',
    description: 'Final review, revisions, and live deployment',
    duration: 'Days 9–10',
  },
];

const trustBadges = [
  { text: 'SSL Secured', icon: Shield },
  { text: 'Mobile Optimised', icon: Smartphone },
  { text: '99.9% Uptime', icon: Zap },
];

export default function WebDevLimitedPeriodPage() {
  const { openQuote } = useWebDevQuote();

  return (
    <main className="pb-24">
      {/* Breadcrumb */}
      <div className="pt-28 pb-0 max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-cloud-dancer/60" aria-label="Breadcrumb">
          <Link href="/services/website-development" className="flex items-center gap-1 hover:text-warm-sand transition-colors" aria-label="Back to Website Development">
            <ArrowLeft size={16} />
          </Link>
          <Link href="/services" className="hidden sm:inline hover:text-warm-sand transition-colors">Services</Link>
          <span className="hidden sm:inline">/</span>
          <Link href="/services/website-development" className="hover:text-warm-sand transition-colors">Website Development</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-cloud-dancer font-medium">Limited Period Offer</span>
        </nav>
      </div>

      {/* Hero Section */}
      <Section className="pt-8 pb-16 bg-gradient-to-b from-warm-sand/10 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <FadeIn direction="up" duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-sand/10 text-warm-sand text-sm font-medium mb-6">
                <Globe size={16} />
                Website Development
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 leading-tight">
                Professional Websites Built for Your Business
              </h1>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Get a custom, high-performing website that looks great, loads fast,
                and turns visitors into customers.
              </p>
            </FadeIn>

            {/* Trust badges */}
            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <div className="flex flex-wrap gap-3 mb-8">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <span
                      key={badge.text}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 dark:bg-neutral-800 rounded-full text-sm text-gray-700 dark:text-cloud-dancer/80"
                    >
                      <Icon size={14} className="text-warm-sand" />
                      {badge.text}
                    </span>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.4}>
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('website-development', 'any')}>
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </FadeIn>
          </div>

          {/* Right — Growth Package Hero Card */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <Card className="p-8 bg-white dark:bg-neutral-900 border-2 border-warm-sand/30 relative overflow-hidden">
              {/* Most Popular badge */}
              <div className="absolute top-0 right-0 bg-warm-sand text-deep-obsidian text-xs font-bold px-4 py-1 rounded-bl-lg">
                ★ MOST POPULAR
              </div>

              <div className="mb-1">
                <p className="text-gray-500 dark:text-cloud-dancer/60 text-sm font-medium">Growth Package</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-stone-400 dark:text-neutral-500 line-through mb-0.5">₹28,999</p>
                <p className="text-5xl font-unbounded font-bold text-warm-sand mb-1">₹24,999</p>
                <span className="inline-block bg-warm-sand/15 text-warm-sand text-xs font-semibold px-2.5 py-1 rounded-md">
                  Limited Period Offer
                </span>
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2 mb-6 text-sm text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                3 spots left this month
              </div>

              {/* Growth features */}
              <div className="space-y-3 mb-8">
                {growthFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-warm-sand flex-shrink-0" />
                    <span className="text-gray-700 dark:text-cloud-dancer/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="w-full py-4 text-lg" onClick={() => openQuote('website-development', 'Growth')}>
                Start Your Project
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <p className="text-center text-xs text-gray-500 dark:text-cloud-dancer/50 mt-4">
                No hidden fees. 100% satisfaction guaranteed.
              </p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ─── LIMITED PERIOD PRICING SECTION ─── */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <span className="inline-flex items-center gap-2 bg-warm-sand/10 border border-warm-sand/30 rounded-full px-4 py-2 text-xs font-space text-warm-sand uppercase tracking-widest mb-5">
              🎉 Limited Period Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-xl mx-auto">
              One-time payment. No recurring fees. No hidden charges. Offer valid while slots last.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <FadeIn key={plan.name} direction="up" delay={0.1 + i * 0.1} duration={0.6} className={plan.popular ? 'relative z-10 md:scale-[1.06]' : ''}>
              <div
                className={`relative rounded-2xl p-6 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 border-2 border-warm-sand shadow-[0_0_70px_rgba(201,164,107,0.35)] text-white'
                    : 'border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                }`}
              >
                {/* Most Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-4">
                    <span className="bg-warm-sand text-stone-900 text-xs font-space font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-[0_4px_20px_rgba(201,164,107,0.5)]">
                      ★ Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name + tagline */}
                <h3 className={`font-unbounded font-bold text-lg mb-1 ${plan.popular ? '' : 'text-stone-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`font-hanken text-sm mb-5 ${plan.popular ? 'text-neutral-400' : 'text-stone-500 dark:text-neutral-400'}`}>
                  {plan.tagline}
                </p>

                {/* Price block */}
                <div className="mb-5">
                  <p className={`font-hanken text-sm line-through mb-0.5 ${plan.popular ? 'text-neutral-400' : 'text-stone-400 dark:text-neutral-500'}`}>
                    ₹{plan.originalPrice.toLocaleString('en-IN')}
                  </p>
                  <p className={`font-unbounded font-bold text-warm-sand ${plan.popular ? 'text-4xl' : 'text-3xl'}`}>
                    ₹{plan.price.toLocaleString('en-IN')}
                  </p>
                  <p className={`font-hanken text-xs mt-1 ${plan.popular ? 'text-neutral-400' : 'text-stone-500 dark:text-neutral-400'}`}>
                    One-time payment
                  </p>
                  <span className="inline-block mt-2 bg-warm-sand/15 text-warm-sand text-xs font-space font-semibold px-2 py-1 rounded-md">
                    Limited Period Offer
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-warm-sand flex-shrink-0 mt-0.5" />
                      <span className={`font-hanken text-sm ${plan.popular ? 'text-neutral-300' : 'text-stone-700 dark:text-neutral-200'}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => openQuote('website-development', plan.name)}
                  className={`w-full py-3 rounded-xl font-hanken font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-warm-sand text-stone-900 hover:bg-warm-sand/90'
                      : 'border border-warm-sand text-warm-sand hover:bg-warm-sand/10 dark:text-warm-sand'
                  }`}
                >
                  Get Started →
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Features Grid */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              What You Get
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Every website we build comes packed with these essentials to maximise your results.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} direction="up" duration={0.6} delay={index * 0.05}>
                <Card hover={false} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-warm-sand/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-warm-sand" />
                  </div>
                  <h3 className="text-lg font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              From brief to live website in 7–10 business days.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.step} direction="up" duration={0.6} delay={index * 0.1}>
                <div className="text-center relative">
                  {/* Connector line */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-warm-sand/20" />
                  )}

                  {/* Step number */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-sand text-deep-obsidian font-unbounded font-bold text-xl mb-4">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 mb-2">
                    {step.description}
                  </p>
                  <span className="text-warm-sand text-sm font-medium">{step.duration}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Example Work */}
      <Section className="py-16 bg-warm-sand/5">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              See It in Action
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-6">
              Websites we&apos;ve built for real businesses. Click to explore live.
            </p>
            <Link href="/portfolio">
              <Button variant="secondary" className="px-6 py-3">
                View Full Portfolio
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </FadeIn>
        </div>

        <ProjectShowcase showFilters={false} maxItems={2} defaultFilter="landing-page" />
      </Section>

      {/* Testimonial / Social Proof */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-warm-sand fill-warm-sand" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-cloud-dancer/90 italic mb-6">
              &quot;Black Arrow delivered our website in just 8 days. Within the first month, leads increased by 40% and our bounce rate dropped significantly.&quot;
            </blockquote>
            <p className="text-gray-600 dark:text-cloud-dancer/70">
              <strong>Business Owner</strong> — Dubai, UAE
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Final CTA */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-warm-sand/10 to-warm-sand/5 border-warm-sand/20">
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Ready to Launch Your Website?
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-6">
              Get a professional, high-converting website for your business.
              Starting at just <span className="text-warm-sand font-bold">₹11,999</span> — limited period offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('website-development', 'any')}>
                Start Your Project
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Link href="/portfolio">
                <Button variant="secondary" className="px-8 py-4 text-lg">
                  View Our Work
                </Button>
              </Link>
            </div>
          </Card>
        </FadeIn>
      </Section>
    </main>
  );
}
