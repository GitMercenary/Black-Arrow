'use client';

import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';
import CountUp from '@/components/animations/CountUp';

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 3, suffix: '', label: 'Countries Served' },
];

export default function StatsBar() {
  return (
    <Section className="py-12 bg-gray-100 dark:bg-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {STATS.map((stat, index) => (
          <FadeIn key={stat.label} direction="up" delay={index * 0.1} duration={0.5}>
            <div>
              <div className="text-4xl md:text-5xl font-unbounded font-bold text-warm-sand mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} duration={2} delay={0.5} />
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                {stat.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
