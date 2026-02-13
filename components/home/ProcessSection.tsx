'use client';

import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';

export default function ProcessSection() {
  return (
    <Section className="bg-pattern-circuit">
      <FadeIn direction="up" duration={0.6}>
        <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center text-warm-sand">
          How We Work
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
          Our battle-tested process turns complex projects into predictable outcomes
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FadeIn direction="up" delay={0.1} duration={0.6}>
          <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
              1
            </div>
            <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
              <OptimizedImage
                src={IMAGES.process.discovery}
                alt="Discovery & Strategy Phase"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
              Discovery & Strategy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Deep-dive into your business model, competitive landscape, and customer psychology. We identify quick wins and long-term opportunities.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.6}>
          <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
              2
            </div>
            <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
              <OptimizedImage
                src={IMAGES.process.design}
                alt="Design & Development Phase"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
              Design & Development
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Mobile-first UI/UX with conversion psychology baked in. We build fast, secure, and scalable systems using modern tech stacks.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3} duration={0.6}>
          <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
              3
            </div>
            <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
              <OptimizedImage
                src={IMAGES.process.launch}
                alt="Launch & Optimization Phase"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
              Launch & Optimize
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Data-driven optimization cycles. A/B testing, heatmaps, and analytics dashboards to continuously improve performance.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
