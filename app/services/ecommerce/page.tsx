'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { ShoppingCart, Globe, Zap, Shield, BarChart3, Languages } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';

const FEATURES = [
  {
    icon: <Globe size={24} />,
    title: 'Headless Architecture',
    description: 'Next.js frontends with any commerce backend. Blazing fast, infinitely scalable.',
  },
  {
    icon: <Zap size={24} />,
    title: 'AI Recommendations',
    description: 'Machine learning that increases average order value by understanding buyer behavior.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Dynamic Pricing',
    description: 'Real-time price optimization based on demand, inventory, and competitor analysis.',
  },
  {
    icon: <Languages size={24} />,
    title: 'Multi-Language & RTL',
    description: 'Full Arabic localization with RTL support for UAE and Middle East markets.',
  },
  {
    icon: <Shield size={24} />,
    title: '99.9% Uptime',
    description: 'Enterprise-grade infrastructure that never sleeps. Your store is always open.',
  },
  {
    icon: <ShoppingCart size={24} />,
    title: 'Multi-Currency',
    description: 'GBP, AED, INR - automatic currency detection and conversion for global sales.',
  },
];

export default function EcommercePage() {
  const { openAudit } = useAIAudit();

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-40 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <OptimizedImage
            src={IMAGES.hero.ecommerce}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-warm-sand/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-warm-sand mb-4">
              <ShoppingCart size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">E-Commerce Development</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Build Once. Sell Everywhere.
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              Headless commerce platforms with AI-powered recommendations, dynamic pricing,
              and zero downtime. We build stores that convert across UK, UAE, and India.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Proof Point */}
      <Section className="py-12 bg-warm-sand/10">
        <BentoGrid2Col>
          <div>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              ₹2.3Cr Revenue in 6 Months
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              Luxury watch retailer, Dubai
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Legacy Shopify store couldn&apos;t handle 10K+ SKUs or Arabic localization.
              We built a headless Next.js platform with AI recommendations that
              transformed their digital presence.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">+35%</div>
              <div className="text-sm text-gray-300">Conversion</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">+22%</div>
              <div className="text-sm text-gray-300">AOV</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">-60%</div>
              <div className="text-sm text-gray-300">Load Time</div>
            </div>
          </div>
        </BentoGrid2Col>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center">
          What We Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} hover={false} className="p-6">
              <div className="text-warm-sand mb-4">{feature.icon}</div>
              <h3 className="text-lg font-unbounded font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Tech Stack */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-8">
            Our Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Next.js', 'Shopify Headless', 'Medusa', 'Stripe', 'Algolia', 'Vercel', 'Supabase', 'TensorFlow'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-full text-sm text-cloud-dancer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
          Ready to Build Your Commerce Engine?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Get a free technical audit of your current store. We&apos;ll show you exactly
          where you&apos;re losing revenue.
        </p>
        <Button variant="primary" className="text-lg" onClick={() => openAudit()}>
          Start Your AI Audit
        </Button>
      </Section>
    </main>
  );
}
