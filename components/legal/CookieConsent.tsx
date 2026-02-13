'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, MessageCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import {
  hasConsentChoice,
  saveCookiePreferences,
  getCookiePreferences,
  type CookiePreferences,
} from '@/lib/utils/cookies';
import { cn } from '@/lib/utils/cn';
import { usePopupManager } from '@/lib/contexts/PopupManagerContext';
import Button from '@/components/ui/Button';

/**
 * Cookie Consent Notification
 *
 * GDPR/PECR compliant cookie consent for UK, UAE, and India markets.
 *
 * Features:
 * - Non-intrusive notification (not blocking)
 * - Granular consent options (Analytics, Marketing, Functional)
 * - Necessary cookies always enabled
 * - Links to Cookie Policy and Privacy Policy
 * - Remembers choice for 1 year
 *
 * Compliance:
 * - UK: PECR and UK GDPR
 * - EU: ePrivacy Directive
 * - General: Best practices for transparent data collection
 */

export default function CookieConsent() {
  const { requestShow, dismiss } = usePopupManager();
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasConsentChoice()) {
      // Show notification after a short delay (only if popup manager allows)
      const timer = setTimeout(() => {
        if (requestShow('cookie')) {
          setIsVisible(true);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [requestShow]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
    dismiss('cookie');

    // Reload to apply analytics scripts
    window.location.reload();
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    saveCookiePreferences(onlyNecessary);
    setIsVisible(false);
    dismiss('cookie');
  };

  const handleSaveCustom = () => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
    dismiss('cookie');

    // Reload to apply/remove analytics scripts based on preferences
    window.location.reload();
  };

  const toggleCustomize = () => {
    if (!showCustomize) {
      // Load current preferences when opening customize panel
      setPreferences(getCookiePreferences());
    }
    setShowCustomize(!showCustomize);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Notification - Non-blocking */}
      <div
        className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[440px] z-[90] animate-in slide-in-from-bottom-4 duration-500 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
      >
        <div className="bg-white dark:bg-deep-obsidian border-2 border-warm-sand rounded-xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warm-sand/20 flex items-center justify-center flex-shrink-0">
                <Cookie size={20} className="text-warm-sand" />
              </div>
              <h3
                id="cookie-consent-title"
                className="text-lg font-unbounded font-bold text-gray-900 dark:text-cloud-dancer"
              >
                Cookie Preferences
              </h3>
            </div>
          </div>

          {!showCustomize ? (
            // Simple view
            <>
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. Your data is protected in
                compliance with UK GDPR and PECR regulations.
              </p>

              <div className="flex flex-col gap-2 mb-4">
                <Button
                  variant="primary"
                  className="w-full text-sm"
                  onClick={handleAcceptAll}
                >
                  Accept All Cookies
                </Button>
                <Button
                  variant="secondary"
                  className="w-full text-sm"
                  onClick={handleRejectAll}
                >
                  Reject Non-Essential
                </Button>
                <button
                  onClick={toggleCustomize}
                  className="text-sm text-warm-sand hover:underline"
                >
                  Customize Preferences
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-cloud-dancer/50">
                Read our{' '}
                <Link href="/legal/cookies" className="text-warm-sand hover:underline">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="text-warm-sand hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          ) : (
            // Customize view
            <>
              <div className="space-y-4 mb-4">
                {/* Necessary Cookies */}
                <div className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-neutral-800/50 rounded-lg">
                  <Shield size={18} className="text-warm-sand mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-cloud-dancer">
                        Necessary Cookies
                      </span>
                      <span className="text-xs text-gray-500 dark:text-cloud-dancer/50">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Essential for website functionality and security. Cannot be
                      disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-neutral-800/50 rounded-lg">
                  <BarChart3 size={18} className="text-warm-sand mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-cloud-dancer">
                        Analytics Cookies
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              analytics: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-cloud-dancer after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-warm-sand"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Help us improve by collecting anonymous usage data (Microsoft
                      Clarity).
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-neutral-800/50 rounded-lg">
                  <Settings size={18} className="text-warm-sand mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-cloud-dancer">
                        Marketing Cookies
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              marketing: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-cloud-dancer after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-warm-sand"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Show relevant ads and measure campaign effectiveness.
                    </p>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start gap-3 p-3 bg-slate-100 dark:bg-neutral-800/50 rounded-lg">
                  <MessageCircle size={18} className="text-warm-sand mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-cloud-dancer">
                        Functional Cookies
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              functional: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-cloud-dancer after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-warm-sand"></div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Enable chatbot, region preferences, and personalized features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full text-sm"
                  onClick={handleSaveCustom}
                >
                  Save Preferences
                </Button>
                <button
                  onClick={toggleCustomize}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer"
                >
                  ← Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
