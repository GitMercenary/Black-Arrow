'use client';

import FadeIn from '@/components/animations/FadeIn';
import {
  Shield, Zap, Clock, Award, Users, Globe,
  CheckCircle2, Star, Smartphone
} from 'lucide-react';

const badges = [
  { icon: Shield, label: 'SSL Secured', description: 'Every site comes with SSL' },
  { icon: Smartphone, label: 'Mobile-First', description: 'Responsive on all devices' },
  { icon: Zap, label: '99.9% Uptime', description: 'Reliable hosting included' },
  { icon: Clock, label: 'Fast Delivery', description: 'On-time, every time' },
  { icon: Award, label: 'Quality Code', description: 'Clean, maintainable code' },
  { icon: Globe, label: 'UK · UAE · India', description: 'Global team, local support' },
];

interface TrustBadgesProps {
  variant?: 'horizontal' | 'compact';
  className?: string;
}

export default function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {badges.slice(0, 4).map((badge) => {
          const Icon = badge.icon;
          return (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 dark:bg-neutral-800 rounded-full text-sm text-gray-700 dark:text-cloud-dancer/80"
            >
              <Icon size={14} className="text-warm-sand" />
              {badge.label}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <FadeIn direction="up" duration={0.6}>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="text-center p-4 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
            >
              <div className="w-10 h-10 rounded-full bg-warm-sand/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={20} className="text-warm-sand" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-cloud-dancer mb-0.5">
                {badge.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-cloud-dancer/50">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>
    </FadeIn>
  );
}
