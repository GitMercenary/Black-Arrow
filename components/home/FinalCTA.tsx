'use client';

import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';

export default function FinalCTA() {
  const { openAudit } = useAIAudit();

  return (
    <Section className="text-center bg-pattern-topo">
      <FadeIn direction="up" duration={0.6}>
        <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
          Ready to Build Your Sales Engine?
        </h2>
      </FadeIn>
      <FadeIn direction="up" duration={0.6} delay={0.2}>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Stop guessing. Start growing. Get a data-driven audit of your digital presence.
        </p>
      </FadeIn>
      <FadeIn direction="up" duration={0.6} delay={0.4}>
        <Button
          variant="primary"
          className="text-lg"
          onClick={() => openAudit()}
        >
          Start Your AI Audit
        </Button>
      </FadeIn>
    </Section>
  );
}
