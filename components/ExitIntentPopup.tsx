'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import Button from './ui/Button';

const EXIT_INTENT_KEY = 'bat-exit-intent-shown';
const EXIT_INTENT_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(true); // Start as true to prevent initial show
  const { openAudit } = useAIAudit();

  useEffect(() => {
    // Check if we've shown the popup recently
    const lastShown = localStorage.getItem(EXIT_INTENT_KEY);
    const now = Date.now();

    if (lastShown && now - parseInt(lastShown) < EXIT_INTENT_COOLDOWN) {
      setHasShown(true);
      return;
    }

    setHasShown(false);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top (y < 10) and moving upward
      if (e.clientY < 10 && e.movementY < 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem(EXIT_INTENT_KEY, now.toString());
      }
    };

    // Add listener after a short delay to avoid triggering on page load
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    setIsVisible(false);
    openAudit();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative max-w-lg w-full bg-white dark:bg-deep-obsidian border-2 border-warm-sand rounded-lg shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-cloud-dancer/60 hover:text-warm-sand transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon/Emoji */}
          <div className="mb-4 text-6xl">⚡</div>

          {/* Headline */}
          <h2 className="font-unbounded font-bold text-2xl mb-4 text-gray-900 dark:text-cloud-dancer">
            Wait! Before You Go...
          </h2>

          {/* Description */}
          <p className="text-gray-700 dark:text-cloud-dancer/80 mb-6 text-lg">
            Get a <span className="text-warm-sand font-bold">FREE AI Audit</span> of your digital presence.
            Discover exactly how to unlock growth—no obligations, just actionable insights.
          </p>

          {/* Benefits List */}
          <div className="text-left mb-8 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-warm-sand mt-1">✓</span>
              <span className="text-gray-700 dark:text-cloud-dancer/80">
                Identify hidden growth opportunities
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-warm-sand mt-1">✓</span>
              <span className="text-gray-700 dark:text-cloud-dancer/80">
                Get personalized recommendations
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-warm-sand mt-1">✓</span>
              <span className="text-gray-700 dark:text-cloud-dancer/80">
                100% free, no credit card required
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={handleCTA}
              className="flex-1 group"
            >
              Get My Free Audit
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-md border-2 border-gray-300 dark:border-slate-ui text-gray-700 dark:text-cloud-dancer hover:border-warm-sand hover:text-warm-sand transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust Badge */}
          <p className="text-xs text-gray-500 dark:text-cloud-dancer/50 mt-6">
            Join 500+ businesses that trusted Black Arrow Technologies
          </p>
        </div>
      </div>
    </div>
  );
}
