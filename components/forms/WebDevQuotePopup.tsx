'use client';

import { useState, useEffect } from 'react';
import { X, Code, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';
import { useWebDevQuote, type WebDevService } from '@/lib/contexts/WebDevQuoteContext';
import Button from '../ui/Button';
import FieldError from '../ui/FieldError';

const PACKAGES = [
  { name: 'Starter', price: '₹11,999' },
  { name: 'Growth', price: '₹24,999' },
  { name: 'Performance', price: '₹44,999' },
];

const SERVICE_LABELS: Record<WebDevService, string> = {
  'website-development': 'Website Development',
  'landing-page': 'Landing Page',
  'business-site': 'Business Website',
  'custom-web-app': 'Custom Web App',
};

export default function WebDevQuotePopup() {
  const { isOpen, service, packageHint, closeQuote } = useWebDevQuote();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    projectDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Sync selectedPackage when popup opens with a hint
  useEffect(() => {
    if (isOpen) {
      setSelectedPackage(packageHint === 'any' || packageHint === '' ? '' : packageHint);
    }
  }, [isOpen, packageHint]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: insertError } = await supabase.from('leads').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          company: formData.company,
          phone: formData.phone || null,
          website: formData.website || null,
          service_interest: `webdev_${service}`,
          message: `[Web Dev Quote - ${SERVICE_LABELS[service]}${selectedPackage ? ` / Package: ${selectedPackage}` : ''}] ${formData.projectDetails || 'No details provided'}`,
          status: 'new',
          source: `webdev_quote_${service}`,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        closeQuote();
        setTimeout(() => {
          setFormData({ fullName: '', email: '', company: '', phone: '', website: '', projectDetails: '' });
          setSelectedPackage('');
          setSuccess(false);
        }, 300);
      }, 3000);
    } catch (err) {
      console.error('Quote form error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeQuote();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={closeQuote}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={-1}
        aria-label="Close quote popup"
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="webdev-quote-title"
      >
        <div
          className={cn(
            'relative bg-white dark:bg-deep-obsidian border-2 border-warm-sand rounded-xl p-4 sm:p-5 max-w-2xl w-full pointer-events-auto my-2',
            'animate-in zoom-in-95 duration-300 shadow-2xl'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeQuote}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-ui rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer" />
          </button>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-warm-sand" />
              </div>
              <h3 id="webdev-quote-title" className="text-2xl font-unbounded font-bold mb-2">
                Quote Request Received!
              </h3>
              <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-md mx-auto">
                We&apos;ll review your requirements and get back to you within 24 hours with a custom quote.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-warm-sand/20 flex items-center justify-center">
                    <Code size={18} className="text-warm-sand" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-warm-sand/10 text-warm-sand">
                    {SERVICE_LABELS[service]}
                  </span>
                </div>
                <h3 id="webdev-quote-title" className="text-lg sm:text-xl font-unbounded font-bold mb-1.5 text-gray-900 dark:text-cloud-dancer">
                  Get Your Free Quote
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Tell us about your project and we&apos;ll send you a detailed quote within 24 hours. No obligations.
                </p>
              </div>

              {/* Package picker — only shown when coming from limited period page */}
              {packageHint !== '' && (
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-2 text-gray-900 dark:text-cloud-dancer">
                    Which package are you interested in? <span className="text-warm-sand">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PACKAGES.map((pkg) => (
                      <button
                        key={pkg.name}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.name)}
                        className={cn(
                          'flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-lg border-2 text-xs font-medium transition-all',
                          selectedPackage === pkg.name
                            ? 'border-warm-sand bg-warm-sand/10 text-warm-sand'
                            : 'border-stone-200 dark:border-neutral-700 text-gray-600 dark:text-cloud-dancer/70 hover:border-warm-sand/50'
                        )}
                      >
                        <span className="font-unbounded font-bold text-[11px]">{pkg.name}</span>
                        <span className="text-warm-sand font-semibold">{pkg.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="wdq-fullName" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Full Name <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="text"
                      id="wdq-fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={cn(
                        'w-full px-3 py-2 text-sm rounded-lg',
                        'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                        'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                        'focus:outline-none focus:border-warm-sand transition-colors',
                        errors.fullName && 'border-red-400'
                      )}
                      disabled={loading}
                    />
                    {errors.fullName && <FieldError error={errors.fullName} className="mt-1" />}
                  </div>

                  <div>
                    <label htmlFor="wdq-email" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Email <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="email"
                      id="wdq-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        'w-full px-3 py-2 text-sm rounded-lg',
                        'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                        'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                        'focus:outline-none focus:border-warm-sand transition-colors',
                        errors.email && 'border-red-400'
                      )}
                      disabled={loading}
                    />
                    {errors.email && <FieldError error={errors.email} className="mt-1" />}
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="wdq-company" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Company <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="text"
                      id="wdq-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className={cn(
                        'w-full px-3 py-2 text-sm rounded-lg',
                        'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                        'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                        'focus:outline-none focus:border-warm-sand transition-colors',
                        errors.company && 'border-red-400'
                      )}
                      disabled={loading}
                    />
                    {errors.company && <FieldError error={errors.company} className="mt-1" />}
                  </div>

                  <div>
                    <label htmlFor="wdq-phone" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Phone <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="wdq-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7000 000000"
                      className={cn(
                        'w-full px-3 py-2 text-sm rounded-lg',
                        'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                        'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                        'focus:outline-none focus:border-warm-sand transition-colors'
                      )}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="wdq-website" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                    Current Website <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="wdq-website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-lg',
                      'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                      'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                      'focus:outline-none focus:border-warm-sand transition-colors'
                    )}
                    disabled={loading}
                  />
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="wdq-details" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                    Tell us about your project <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="wdq-details"
                    rows={3}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="What kind of website do you need? Any specific features or requirements?"
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-lg resize-none',
                      'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                      'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                      'focus:outline-none focus:border-warm-sand transition-colors'
                    )}
                    disabled={loading}
                  />
                </div>

                {errors.submit && <FieldError error={errors.submit} />}

                <Button type="submit" variant="primary" className="w-full mt-3" loading={loading}>
                  {loading ? 'Submitting...' : 'Get My Free Quote'}
                </Button>

                <p className="text-xs text-gray-500 dark:text-cloud-dancer/50 text-center mt-2">
                  No obligations. We&apos;ll respond within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
