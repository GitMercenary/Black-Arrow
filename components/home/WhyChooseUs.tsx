'use client';

import Section from '@/components/ui/Section';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { ShoppingCart, TrendingUp, Zap } from 'lucide-react';
import SlideIn from '@/components/animations/SlideIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';

export default function WhyChooseUs() {
  return (
    <Section className="bg-gray-100 dark:bg-neutral-900">
      <BentoGrid2Col>
        <SlideIn direction="left" duration={0.7}>
          <div>
            <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
              Why Choose Black Arrow?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                  <Zap className="text-warm-sand" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                    AI-Native Approach
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We don&apos;t bolt AI onto old workflows. Every solution is built with automation and intelligence from day one.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-warm-sand" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                    Revenue-Obsessed
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Pretty websites don&apos;t pay bills. We engineer for conversions, retention, and measurable ROI.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="text-warm-sand" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                    Multi-Market Expertise
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We&apos;ve navigated UK compliance, UAE luxury markets, and India&apos;s digital-first consumers. Your growth isn&apos;t limited by borders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SlideIn>
        <SlideIn direction="right" duration={0.7}>
          <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
            <OptimizedImage
              src={IMAGES.whyChooseUs.teamWork}
              alt="Team collaboration and expertise"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 dark:from-deep-obsidian/85 via-gray-900/50 dark:via-deep-obsidian/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-2xl font-unbounded font-bold text-white dark:text-cloud-dancer mb-2">
                &quot;Not just vendors. Strategic partners.&quot;
              </p>
              <p className="text-warm-sand">
                — UAE E-Commerce Director
              </p>
            </div>
          </div>
        </SlideIn>
      </BentoGrid2Col>
    </Section>
  );
}
