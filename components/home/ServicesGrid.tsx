'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/Card';
import BentoGrid from '@/components/ui/BentoGrid';
import { ShoppingCart, TrendingUp, Zap, Code } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function ServicesGrid() {
  return (
    <Section className="bg-pattern-dots">
      <FadeIn direction="up" duration={0.6}>
        <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-12 text-center">
          Our Services
        </h2>
      </FadeIn>
      <BentoGrid>
        <FadeIn direction="up" delay={0.1} duration={0.6}>
          <BentoCard
            icon={<Code size={48} strokeWidth={2} />}
            title="Website Development"
            description="Landing pages, business sites, and custom web apps built for conversion and speed."
          />
        </FadeIn>
        <FadeIn direction="up" delay={0.2} duration={0.6}>
          <BentoCard
            icon={<TrendingUp size={48} strokeWidth={2} />}
            title="Performance Ads"
            description="Google Ads, Meta Ads, and LinkedIn campaigns engineered for B2B and luxury retail."
          />
        </FadeIn>
        <FadeIn direction="up" delay={0.3} duration={0.6}>
          <BentoCard
            icon={<Zap size={48} strokeWidth={2} />}
            title="Automation & AI"
            description="Workflow automation, AI chatbots, and CRM integration that frees your team for strategy."
          />
        </FadeIn>
        <FadeIn direction="up" delay={0.4} duration={0.6}>
          <BentoCard
            icon={<ShoppingCart size={48} strokeWidth={2} />}
            title="E-Commerce Development"
            description="Headless commerce platforms with AI-powered recommendations, dynamic pricing, and zero downtime."
          />
        </FadeIn>
      </BentoGrid>

      <FadeIn direction="up" delay={0.5} duration={0.6}>
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="secondary">
              View All Services
            </Button>
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}
