'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { usePopupManager } from '@/lib/contexts/PopupManagerContext';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import Portal from '@/components/ui/Portal';

const BANNER_DISMISSED_KEY = 'bat-launch-banner-dismissed';

export default function LaunchBanner() {
  const pathname = usePathname();
  const isLimitedPeriod = pathname?.includes('website-development-limited-period') ?? false;
  const { openQuote } = useWebDevQuote();
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { requestShow, dismiss } = usePopupManager();

  const closeForm = useCallback(() => {
    setShowForm(false);
    dismiss('launch');
  }, [dismiss]);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // Escape key to close modal
  useEffect(() => {
    if (!showForm) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeForm();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showForm, closeForm]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    } catch {
      // Silently fail if localStorage unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (formData.name.trim().length < 2) {
      setError('Please enter a valid name');
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      setSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();

      // Get a default region for the lead
      const { data: region } = await supabase
        .from('regions')
        .select('id')
        .eq('code', 'UK')
        .single();

      const { error: insertError } = await supabase
        .from('leads')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone || null,
          message: 'Launch Offer: 50% Off + Free Speed Audit Claim',
          budget_range: 'TBD',
          source: 'launch_banner',
          region_id: region?.id,
          status: 'new',
        }]);

      if (insertError) throw insertError;

      setSubmitted(true);
      timeoutRef.current = setTimeout(() => {
        closeForm();
        handleDismiss();
      }, 3000);
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-warm-sand text-deep-obsidian relative">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm sm:text-base">
          <span className="font-bold">
            {isLimitedPeriod ? 'LIMITED PERIOD OFFER' : 'Launch Offer:'}
          </span>
          <span className="hidden sm:inline">
            {isLimitedPeriod ? 'Website Plans from ₹11,999 — Limited Slots Available' : 'First 5 Clients Get 50% Off + Free Speed Audit'}
          </span>
          <span className="sm:hidden">
            {isLimitedPeriod ? 'From ₹11,999 — Limited Slots' : '50% Off for First 5 Clients'}
          </span>
          <button
            onClick={() => {
              if (isLimitedPeriod) {
                openQuote('website-development', 'any');
              } else if (requestShow('launch')) {
                setShowForm(true);
              }
            }}
            className="ml-2 underline underline-offset-2 font-bold hover:no-underline transition-all"
          >
            Claim Your Spot &rarr;
          </button>
          <button
            onClick={handleDismiss}
            className="absolute right-3 sm:right-4 p-1 hover:bg-deep-obsidian/10 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Popup Form Modal - Portal escapes header's transform containing block */}
      {showForm && (
        <Portal>
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="claim-modal-title">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => closeForm()}
            />
            <div className="relative max-w-md w-full bg-white dark:bg-neutral-900 border-2 border-warm-sand rounded-xl shadow-2xl p-6 sm:p-8 animate-scale-in">
              <button
                onClick={() => closeForm()}
                className="absolute top-3 right-3 p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-white">
                    Spot Claimed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We&apos;ll be in touch within 24 hours with your offer details.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 id="claim-modal-title" className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-white">
                      Claim Your 50% Off
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Limited to the first 5 clients. Enter your details and we&apos;ll reach out.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      aria-label="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-warm-sand transition-colors"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-warm-sand transition-colors"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      aria-label="Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-warm-sand transition-colors"
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-warm-sand text-deep-obsidian font-bold py-3 rounded-lg hover:bg-warm-sand/90 transition-all disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Claim My Spot'}
                    </button>
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    No obligations. We&apos;ll send offer details within 24 hours.
                  </p>
                </>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
