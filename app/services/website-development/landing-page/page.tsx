'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import { useRegion } from '@/lib/contexts/RegionContext';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import { IMAGES } from '@/lib/constants/images';
import {
  Layout, ArrowRight, ArrowLeft, CheckCircle2, Zap, Clock,
  Smartphone, Search, BarChart3, Shield, Star,
  FileCode, Palette, Rocket
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Regional pricing
const PRICES: Record<string, string> = {
  UK: '£350',
  UAE: 'AED 1,299',
  IND: '₹29,999',
};

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Looks stunning on all devices, from phones to desktops',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-2 second load times',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built-in SEO best practices for better Google rankings',
  },
  {
    icon: BarChart3,
    title: 'Conversion Focused',
    description: 'Strategic layout designed to convert visitors to leads',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'SSL certificate and secure hosting included',
  },
  {
    icon: FileCode,
    title: 'Clean Code',
    description: 'Modern tech stack for easy future updates',
  },
];

const whatsIncluded = [
  'Custom responsive design',
  'Up to 5 sections',
  'Contact/lead capture form',
  'Social media integration',
  'Google Analytics setup',
  'Basic SEO optimization',
  '1 round of revisions',
  '5-7 day delivery',
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
    description: 'We create your custom landing page with conversion optimization',
    duration: 'Days 2-5',
  },
  {
    step: 3,
    icon: Rocket,
    title: 'Launch',
    description: 'Final review, revisions, and live deployment',
    duration: 'Days 6-7',
  },
];

// Trust badges
const trustBadges = [
  { text: 'SSL Secured', icon: Shield },
  { text: 'Mobile Optimized', icon: Smartphone },
  { text: '99.9% Uptime', icon: Zap },
];

export default function LandingPageServicePage() {
  const { currentRegion } = useRegion();
  const { openQuote } = useWebDevQuote();
  const price = PRICES[currentRegion] || PRICES.UK;

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
          <span className="text-gray-900 dark:text-cloud-dancer font-medium">Landing Page</span>
        </nav>
      </div>

      {/* Hero Section */}
      <Section className="pt-8 pb-16 bg-gradient-to-b from-warm-sand/10 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <FadeIn direction="up" duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-sand/10 text-warm-sand text-sm font-medium mb-6">
                <Layout size={16} />
                Landing Page Development
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 leading-tight">
                High-Converting Landing Pages
              </h1>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 mb-6">
                Professional landing pages designed to capture leads and drive conversions.
                Perfect for campaigns, product launches, and service promotions.
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
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('landing-page')}>
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </FadeIn>
          </div>

          {/* Right - Pricing Card */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <Card className="p-8 bg-white dark:bg-neutral-900 border-2 border-warm-sand/30 relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-warm-sand text-deep-obsidian text-xs font-bold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-600 dark:text-cloud-dancer/70 mb-2">Starting at</p>
                <p className="text-5xl font-unbounded font-bold text-warm-sand mb-2">{price}</p>
                <p className="text-sm text-gray-500 dark:text-cloud-dancer/60">One-time payment</p>
              </div>

              {/* Scarcity */}
              <div className="flex items-center justify-center gap-2 mb-6 text-sm text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                3 spots left this month
              </div>

              {/* What's included */}
              <div className="space-y-3 mb-8">
                {whatsIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-warm-sand flex-shrink-0" />
                    <span className="text-gray-700 dark:text-cloud-dancer/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="w-full py-4 text-lg" onClick={() => openQuote('landing-page')}>
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

      {/* Features Grid */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              What You Get
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Every landing page is built with these core features to maximize your results.
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
              From idea to live landing page in just 5-7 business days.
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
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Landing pages we&apos;ve built for real businesses. Click to explore live.
            </p>
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
              &quot;Black Arrow delivered our landing page in just 5 days. The conversion rate exceeded our expectations - we saw a 40% increase in leads within the first month.&quot;
            </blockquote>
            <p className="text-gray-600 dark:text-cloud-dancer/70">
              <strong>Restaurant Owner</strong> - Dubai, UAE
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Final CTA */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-warm-sand/10 to-warm-sand/5 border-warm-sand/20">
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Ready to Launch Your Landing Page?
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-6">
              Get a professional, high-converting landing page for your business.
              Starting at just <span className="text-warm-sand font-bold">{price}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('landing-page')}>
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
