'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useServiceIntent } from '@/lib/contexts/ServiceIntentContext';
import { useRegion } from '@/lib/contexts/RegionContext';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import { Layout, Briefcase, Code, ChevronRight, Zap } from 'lucide-react';

const LIMITED_PLANS = [
  { name: 'Starter', price: '₹11,999' },
  { name: 'Growth', price: '₹24,999' },
  { name: 'Performance', price: '₹44,999' },
];

// Regional pricing for Landing Page
const LANDING_PAGE_PRICES: Record<string, string> = {
  UK: '£350',
  UAE: 'AED 1,299',
  IND: '₹29,999',
};

const services = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    href: '/services/website-development/landing-page',
    icon: Layout,
    showPrice: true,
  },
  {
    id: 'business-site',
    name: 'Business Site',
    href: '/services/website-development/business-site',
    icon: Briefcase,
    showPrice: false,
  },
  {
    id: 'custom-web-app',
    name: 'Custom Web App',
    href: '/services/website-development/custom-web-app',
    icon: Code,
    showPrice: false,
  },
];

export default function StickyServiceBar() {
  const pathname = usePathname();
  const { shouldShowServiceBar } = useServiceIntent();
  const { currentRegion } = useRegion();
  const { openQuote } = useWebDevQuote();

  if (!shouldShowServiceBar) return null;

  const isLimitedPeriod = pathname?.includes('website-development-limited-period') ?? false;

  // Get the correct price based on region
  const landingPagePrice = LANDING_PAGE_PRICES[currentRegion] || LANDING_PAGE_PRICES.UK;

  // ─── Limited Period sticky bar ───
  if (isLimitedPeriod) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-warm-sand/30 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4 gap-2 md:gap-4">
            {/* Label */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Zap size={16} className="text-warm-sand" />
              <span className="text-xs font-bold text-warm-sand uppercase tracking-wide whitespace-nowrap">Limited Offer</span>
            </div>

            {/* Package options */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
              {LIMITED_PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => openQuote('website-development', plan.name)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap bg-stone-100 dark:bg-neutral-800 text-gray-700 dark:text-cloud-dancer hover:bg-warm-sand/20 transition-all min-h-[44px]"
                >
                  <span className="text-sm font-medium">{plan.name}</span>
                  <span className="text-xs text-warm-sand font-semibold">{plan.price}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openQuote('website-development', 'any')}
              className="hidden md:flex items-center gap-2 bg-warm-sand text-deep-obsidian font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-warm-sand/90 transition-all whitespace-nowrap group"
            >
              Grab This Offer
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-stone-200 dark:border-neutral-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4 gap-2 md:gap-4">
          {/* Service options */}
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide flex-1">
            {services.map((service) => {
              const isActive = pathname === service.href;
              const Icon = service.icon;
              const price = service.showPrice ? landingPagePrice : null;

              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg whitespace-nowrap transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-warm-sand text-deep-obsidian font-bold'
                      : 'bg-stone-100 dark:bg-neutral-800 text-gray-700 dark:text-cloud-dancer hover:bg-warm-sand/20'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-deep-obsidian' : 'text-warm-sand'} />
                  <span className="text-sm font-medium">{service.name}</span>
                  {price && (
                    <span className={`text-xs ${isActive ? 'text-deep-obsidian/70' : 'text-warm-sand'}`}>
                      {price}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick CTA - visible on larger screens */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 bg-warm-sand text-deep-obsidian font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-warm-sand/90 transition-all whitespace-nowrap group"
          >
            Get Quote
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
