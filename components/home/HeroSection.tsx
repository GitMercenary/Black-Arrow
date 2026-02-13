'use client';

import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import HeroLeadForm from '@/components/forms/HeroLeadForm';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';

export default function HeroSection() {
  const { openAudit } = useAIAudit();

  return (
    <Section className="relative pt-40 pb-20 bg-pattern-topo overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-warm-sand/10 to-transparent blur-3xl pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-left">
            <FadeIn direction="up" duration={0.6}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-unbounded font-bold mb-6 sm:mb-8 leading-tight">
                AI-Native Marketing & Web Development That Moves the Needle
              </h1>
            </FadeIn>
            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                We don&apos;t just do pretty websites. We engineer digital sales machines &mdash; powered by AI, built by developers who understand your market.
              </p>
              <p className="text-sm font-medium text-warm-sand tracking-widest uppercase mb-6 sm:mb-8">
                Cardiff &middot; Dubai &middot; Bangalore
              </p>
            </FadeIn>
            <FadeIn direction="up" duration={0.6} delay={0.4}>
              <Button
                variant="primary"
                className="text-base sm:text-lg lg:hidden w-full sm:w-auto"
                onClick={() => openAudit()}
              >
                Start Your AI Audit
              </Button>
            </FadeIn>
          </div>

          <div className="hidden lg:block">
            <FadeIn direction="left" duration={0.7} delay={0.3}>
              <HeroLeadForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
}
