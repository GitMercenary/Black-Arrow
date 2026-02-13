'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/Card';
import BentoGrid from '@/components/ui/BentoGrid';
import { ShoppingCart, TrendingUp, Zap, Search, Code } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import AIToolLogos from '@/components/ui/AIToolLogos';

const SERVICES = [
  {
    icon: <Code size={48} strokeWidth={2} />,
    title: 'Website Development',
    description: 'Landing pages, business sites, and custom web apps built for conversion and speed.',
    href: '/services/website-development',
    stat: 'From £350 / ₹29,999',
  },
  {
    icon: <TrendingUp size={48} strokeWidth={2} />,
    title: 'Performance Ads',
    description: 'Google Ads, Meta Ads, and LinkedIn campaigns engineered for B2B and luxury retail.',
    href: '/services/ads',
    stat: '42% lower CAC',
  },
  {
    icon: <Zap size={48} strokeWidth={2} />,
    title: 'Automation & AI',
    description: 'Workflow automation, AI chatbots, and CRM integration that frees your team for strategy.',
    href: '/services/automation',
    stat: '80 hours/month saved',
  },
  {
    icon: <ShoppingCart size={48} strokeWidth={2} />,
    title: 'E-Commerce Development',
    description: 'Headless commerce platforms with AI-powered recommendations, dynamic pricing, and zero downtime.',
    href: '/services/ecommerce',
    stat: '₹2.3Cr revenue unlocked',
  },
  {
    icon: <Search size={48} strokeWidth={2} />,
    title: 'Technical SEO, GEO & AEO',
    description: 'Core Web Vitals optimization, structured data, and AI search optimization strategies.',
    href: '/services/seo',
    stat: 'Page 3 → Position 2',
  },
];

export default function ServicesPage() {
  const { openAudit } = useAIAudit();

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-40 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <OptimizedImage
            src={IMAGES.hero.analytics}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-warm-sand/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Services That Scale Revenue
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed max-w-2xl mx-auto">
              We don&apos;t do vanity metrics. Every service is engineered to drive
              measurable business outcomes across UK, UAE, and India markets.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="pt-0">
        <BentoGrid>
          {SERVICES.map((service, index) => (
            <FadeIn key={service.href} direction="up" delay={index * 0.1} duration={0.6}>
              <Link href={service.href} className="block group">
                <BentoCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="h-full transition-all duration-300 group-hover:border-warm-sand/50"
                >
                  <div className="mt-4 pt-4 border-t border-slate-ui">
                    <div className="text-sm text-warm-sand font-medium">
                      {service.stat}
                    </div>
                  </div>
                </BentoCard>
              </Link>
            </FadeIn>
          ))}
        </BentoGrid>
      </Section>

      {/* AI Tool Logos */}
      <AIToolLogos />

      {/* Process Section */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center">
              Our Process
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={0.1} duration={0.6}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-unbounded font-bold text-warm-sand">1</span>
                </div>
                <h3 className="text-xl font-unbounded font-bold mb-2">Audit</h3>
                <p className="text-gray-500 dark:text-cloud-dancer/70">
                  We analyze your current digital presence, competitors, and market opportunities.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} duration={0.6}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-unbounded font-bold text-warm-sand">2</span>
                </div>
                <h3 className="text-xl font-unbounded font-bold mb-2">Strategy</h3>
                <p className="text-gray-500 dark:text-cloud-dancer/70">
                  We create a data-backed roadmap with clear KPIs and ROI projections.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3} duration={0.6}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-unbounded font-bold text-warm-sand">3</span>
                </div>
                <h3 className="text-xl font-unbounded font-bold mb-2">Execute</h3>
                <p className="text-gray-500 dark:text-cloud-dancer/70">
                  We build, launch, and optimize with weekly reporting and continuous improvement.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="text-center">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
            Ready to See What&apos;s Possible?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
            Get a free audit of your digital presence. No obligations, just actionable insights.
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <Button variant="primary" className="text-lg" onClick={() => openAudit()}>
            Start Your AI Audit
          </Button>
        </FadeIn>
      </Section>
    </main>
  );
}
