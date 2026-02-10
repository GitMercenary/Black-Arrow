'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Zap, ArrowRight } from 'lucide-react';
import { useServiceIntent } from '@/lib/contexts/ServiceIntentContext';
import { useRegion } from '@/lib/contexts/RegionContext';
import { motion, AnimatePresence } from 'framer-motion';

// Regional pricing for Landing Page
const LANDING_PAGE_PRICES: Record<string, string> = {
  UK: '£350',
  UAE: 'AED 1,299',
  IND: '₹29,999',
};

export default function StickyIntentReminder() {
  const { shouldShowSticky, stickyContent } = useServiceIntent();
  const { currentRegion } = useRegion();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Delay showing the sticky for better UX
  useEffect(() => {
    if (shouldShowSticky && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Show after 1.5 seconds
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShowSticky, isDismissed]);

  // Reset dismissed state when user visits a new WD page
  useEffect(() => {
    if (!shouldShowSticky) {
      setIsDismissed(false);
    }
  }, [shouldShowSticky]);

  if (!stickyContent || !isVisible) return null;

  // Get the correct price based on region
  const displayPrice = stickyContent.showPrice
    ? LANDING_PAGE_PRICES[currentRegion] || LANDING_PAGE_PRICES.UK
    : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
        >
          <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-warm-sand/30 overflow-hidden max-w-[280px] md:max-w-[320px]">
            {/* Dismiss button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            {/* Gradient accent bar */}
            <div className="h-1 bg-gradient-to-r from-warm-sand to-warm-sand/60" />

            <div className="p-4">
              {/* Title */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-warm-sand/10 flex items-center justify-center">
                  <Zap size={16} className="text-warm-sand" />
                </div>
                <h4 className="font-unbounded font-bold text-sm text-gray-900 dark:text-cloud-dancer">
                  {stickyContent.title}
                </h4>
              </div>

              {/* Price or subtitle */}
              <p className="text-lg font-bold text-warm-sand mb-1">
                {displayPrice ? `Starting at ${displayPrice}` : stickyContent.subtitle}
              </p>

              {/* Scarcity indicator (only for landing page) */}
              {stickyContent.showPrice && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  3 spots left this month
                </p>
              )}

              {/* CTA Button */}
              <Link
                href={stickyContent.href}
                className="flex items-center justify-center gap-2 w-full bg-warm-sand text-deep-obsidian font-bold text-sm py-2.5 px-4 rounded-lg hover:bg-warm-sand/90 transition-all group"
              >
                {stickyContent.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Subtle pulse animation border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-warm-sand/0 animate-pulse-border pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
