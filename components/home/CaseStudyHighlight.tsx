'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';

export default function CaseStudyHighlight() {
  return (
    <Section className="bg-gray-100 dark:bg-neutral-900">
      <BentoGrid2Col>
        <SlideIn direction="left" duration={0.7}>
          <div>
            <div className="mb-8 relative rounded-lg overflow-hidden">
              <OptimizedImage
                src={IMAGES.caseStudies.autoparts}
                alt="Astern Autoparts - E-commerce platform for OEM auto parts"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 dark:from-deep-obsidian/70 via-gray-900/40 dark:via-deep-obsidian/40 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
              9,000+ Parts Online in 4 Weeks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 mb-6 font-medium">
              Astern Autoparts, USA
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-base md:text-lg" style={{lineHeight: '1.8'}}>
              Built a WooCommerce-powered parts finder with year/make/model lookup, connecting 200+ warehouses across all 50 US states. From manual phone orders to a fully searchable online catalogue.
            </p>
            <Link href="/case-studies">
              <Button variant="text">
                View Case Studies &rarr;
              </Button>
            </Link>
          </div>
        </SlideIn>
        <SlideIn direction="right" duration={0.7}>
          <div className="space-y-4">
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">9,000+</div>
                <div className="text-gray-200">Parts Catalogued</div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">200+</div>
                <div className="text-gray-200">US Warehouses</div>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">&lt;2s</div>
                <div className="text-gray-200">Load Time</div>
              </div>
            </FadeIn>
          </div>
        </SlideIn>
      </BentoGrid2Col>
    </Section>
  );
}
