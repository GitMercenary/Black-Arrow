'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { Search, Gauge, Code, FileText, Link2, BarChart3 } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import FadeIn from '@/components/animations/FadeIn';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';

const FEATURES = [
  {
    icon: <Gauge size={24} />,
    title: 'Core Web Vitals',
    description: 'LCP, FID, and CLS optimization that improves rankings and user experience.',
  },
  {
    icon: <Code size={24} />,
    title: 'Structured Data',
    description: 'Schema markup that helps Google understand and feature your content.',
  },
  {
    icon: <Search size={24} />,
    title: 'Technical Audits',
    description: 'Deep crawl analysis that finds and fixes indexing issues.',
  },
  {
    icon: <FileText size={24} />,
    title: 'Content Strategy',
    description: 'Keyword research and content plans that target buyer intent.',
  },
  {
    icon: <Link2 size={24} />,
    title: 'Link Building',
    description: 'White-hat outreach that builds domain authority the right way.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Rank Tracking',
    description: 'Real-time monitoring of your positions across target keywords.',
  },
];

export default function SEOPage() {
  const { openAudit } = useAIAudit();

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-32 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <OptimizedImage
            src={IMAGES.services.seo}
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
              <Search size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">Technical SEO</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Rank. Convert. Dominate.
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-cloud-dancer/80 leading-relaxed max-w-3xl">
            Core Web Vitals optimization, structured data, and content strategies
            that Google rewards. We don&apos;t chase algorithms - we build foundations.
          </p>
          </FadeIn>
        </div>
      </Section>

      {/* Proof Point */}
      <Section className="py-12 bg-warm-sand/10">
        <BentoGrid2Col>
          <div>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Page 3 → Position 2 in 90 Days
            </h2>
            <p className="text-lg text-cloud-dancer/80 mb-2">
              Fintech startup, London
            </p>
            <p className="text-cloud-dancer/70 leading-relaxed">
              A React-heavy SPA was invisible to Google. We rebuilt their architecture
              with Next.js, implemented proper structured data, and created a content
              strategy that established topical authority.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">#2</div>
              <div className="text-sm text-cloud-dancer/70">Ranking</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">+340%</div>
              <div className="text-sm text-cloud-dancer/70">Organic Traffic</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">98</div>
              <div className="text-sm text-cloud-dancer/70">PageSpeed</div>
            </div>
          </div>
        </BentoGrid2Col>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center">
          What We Optimize
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

      {/* Tools */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-8">
            Tools We Use
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'PageSpeed Insights', 'Schema.org', 'Sitebulb', 'Surfer SEO'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
          Ready to Rank?
        </h2>
        <p className="text-xl text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
          Get a free SEO audit. We&apos;ll show you exactly what&apos;s holding
          you back from page one.
        </p>
        <Button variant="primary" className="text-lg" onClick={() => openAudit()}>
          Start Your AI Audit
        </Button>
      </Section>
    </main>
  );
}
