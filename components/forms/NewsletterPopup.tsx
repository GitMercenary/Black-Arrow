'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X, Mail, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';
import { usePopupManager } from '@/lib/contexts/PopupManagerContext';
import Button from '../ui/Button';
import FieldError from '../ui/FieldError';

interface NewsletterPopupProps {
  delaySeconds?: number;
}

export default function NewsletterPopup({ delaySeconds = 10 }: NewsletterPopupProps) {
  const pathname = usePathname();
  const { requestShow, dismiss } = usePopupManager();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Don't show on admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Check if user has already dismissed or subscribed
    let dismissed: string | null = null;
    let subscribed: string | null = null;
    try {
      dismissed = localStorage.getItem('newsletter_dismissed');
      subscribed = localStorage.getItem('newsletter_subscribed');
    } catch {
      return; // Fail gracefully if localStorage unavailable
    }

    if (dismissed || subscribed) {
      return;
    }

    // Show popup after delay (only if popup manager allows)
    const timer = setTimeout(() => {
      if (requestShow('newsletter')) {
        setIsVisible(true);
      }
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, pathname, requestShow]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    dismiss('newsletter');
    try {
      localStorage.setItem('newsletter_dismissed', 'true');
    } catch {
      // Silently fail
    }
  }, [dismiss]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Check if email already exists
      const { data: existing, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existing) {
        setError('This email is already subscribed');
        setLoading(false);
        return;
      }

      // Insert new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email,
            subscribed_at: new Date().toISOString(),
            is_active: true,
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);
      try {
        localStorage.setItem('newsletter_subscribed', 'true');
      } catch {
        // Silently fail
      }

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        dismiss('newsletter');
      }, 3000);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Document-level Escape key handler (works regardless of focus)
  useEffect(() => {
    if (!isVisible) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
      >
        <div
          className={cn(
            "relative bg-white dark:bg-deep-obsidian border-2 border-warm-sand rounded-xl p-6 sm:p-8 max-w-md w-full pointer-events-auto",
            "animate-in zoom-in-95 duration-300 shadow-2xl max-h-[90vh] overflow-y-auto"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-ui rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer" />
          </button>

          {success ? (
            // Success State
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-400" />
              </div>
              <h3 id="newsletter-title" className="text-xl sm:text-2xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                You're Subscribed!
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Thank you for subscribing. We'll keep you updated with insights on e-commerce, marketing, and automation.
              </p>
            </div>
          ) : (
            // Form State
            <>
              <div className="mb-6 text-center">
                <div className="w-12 h-12 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-warm-sand" />
                </div>
                <h3 id="newsletter-title" className="text-xl sm:text-2xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                  Get Digital Marketing Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Join 500+ business leaders receiving actionable strategies on e-commerce, ads, and AI automation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700",
                      "text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40",
                      "focus:outline-none focus:border-warm-sand transition-colors",
                      error && "border-red-400"
                    )}
                    disabled={loading}
                    required
                  />
                  {error && <FieldError error={error} className="mt-2" />}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe Now'}
                </Button>

                <p className="text-xs text-gray-500 dark:text-cloud-dancer/50 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>

              <button
                onClick={handleClose}
                className="mt-4 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer transition-colors w-full text-center"
              >
                No thanks, maybe later
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
