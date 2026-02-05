'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { TrendingUp, Target, BarChart3, Users, DollarSign, Repeat } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import FadeIn from '@/components/animations/FadeIn';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';

const FEATURES = [
  {
    icon: <Target size={24} />,
    title: 'Google Ads',
    description: 'Search, Shopping, and Performance Max campaigns that capture high-intent buyers.',
  },
  {
    icon: <Users size={24} />,
    title: 'Meta Ads',
    description: 'Facebook and Instagram campaigns optimized for B2C and luxury retail audiences.',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'LinkedIn Ads',
    description: 'B2B lead generation that reaches decision-makers in your target industries.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'ROI Tracking',
    description: 'Full-funnel attribution that shows exactly which ads drive revenue.',
  },
  {
    icon: <Repeat size={24} />,
    title: 'A/B Testing',
    description: 'Continuous creative and audience testing to maximize performance.',
  },
  {
    icon: <DollarSign size={24} />,
    title: 'Budget Optimization',
    description: 'AI-driven bid management that gets more conversions for less spend.',
  },
];

export default function AdsPage() {
  const { openAudit } = useAIAudit();

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-32 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <OptimizedImage
            src={IMAGES.services.marketing}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-warm-sand/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-warm-sand mb-4">
              <TrendingUp size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">Performance Ads</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Every Dirham. Every Pound. Every Rupee. Tracked.
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-cloud-dancer/80 leading-relaxed max-w-3xl">
              Google Ads, Meta Ads, and LinkedIn campaigns engineered for B2B
              and luxury retail. We don&apos;t guess - we optimize based on data.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Proof Point */}
      <Section className="py-12 bg-warm-sand/10">
        <BentoGrid2Col>
          <div>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              42% Lower CAC in 90 Days
            </h2>
            <p className="text-lg text-cloud-dancer/80 mb-2">
              Real estate developer, Dubai
            </p>
            <p className="text-cloud-dancer/70 leading-relaxed">
              Previous agency was burning budget on broad targeting. We rebuilt
              their campaigns with intent-based audiences and conversion-optimized
              landing pages that cut acquisition costs nearly in half.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">-42%</div>
              <div className="text-sm text-cloud-dancer/70">CAC</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">+89%</div>
              <div className="text-sm text-cloud-dancer/70">Leads</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">3.2x</div>
              <div className="text-sm text-cloud-dancer/70">ROAS</div>
            </div>
          </div>
        </BentoGrid2Col>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center">
          What We Manage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} hover={false} className="p-6">
              <div className="text-warm-sand mb-4">{feature.icon}</div>
              <h3 className="text-lg font-unbounded font-bold mb-2">{feature.title}</h3>
              <p className="text-cloud-dancer/70 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Platforms */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-8">
            Platforms We Master
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Google Analytics 4', 'Looker Studio', 'HubSpot', 'Salesforce'].map((platform) => (
              <span
                key={platform}
                className="px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-full text-sm"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
          Stop Wasting Ad Spend
        </h2>
        <p className="text-xl text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
          Get a free audit of your current campaigns. We&apos;ll show you exactly
          where your budget is leaking.
        </p>
        <Button variant="primary" className="text-lg" onClick={() => openAudit()}>
          Start Your AI Audit
        </Button>
      </Section>
    </main>
  );
}
