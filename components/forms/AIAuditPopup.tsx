'use client';

import { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';
import Button from '../ui/Button';
import FieldError from '../ui/FieldError';

interface AIAuditPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAuditPopup({ isOpen, onClose }: AIAuditPopupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    website: '',
    monthlyBudget: '',
    mainGoal: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    // Website, budget and challenge are now optional

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
          website: formData.website,
          service_interest: 'ai_audit',
          message: `AI Audit Request - Budget: ${formData.monthlyBudget} | Goal: ${formData.mainGoal}`,
          status: 'new',
          source: 'ai_audit_popup',
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);

      // Close popup after 3 seconds
      setTimeout(() => {
        onClose();
        // Reset form
        setTimeout(() => {
          setFormData({
            fullName: '',
            email: '',
            company: '',
            website: '',
            monthlyBudget: '',
            mainGoal: '',
          });
          setSuccess(false);
        }, 300);
      }, 3000);
    } catch (err) {
      console.error('AI Audit form error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={-1}
        aria-label="Close AI audit popup"
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-audit-title"
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
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-ui rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cloud-dancer" />
          </button>

          {success ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-warm-sand/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-warm-sand" />
              </div>
              <h3 id="ai-audit-title" className="text-2xl font-unbounded font-bold mb-2">
                Request Received!
              </h3>
              <p className="text-cloud-dancer/70 max-w-md mx-auto">
                We'll analyze your digital presence and send you a detailed AI audit within 24 hours.
              </p>
            </div>
          ) : (
            // Form State
            <>
              <div className="mb-3">
                <div className="w-9 h-9 rounded-full bg-warm-sand/20 flex items-center justify-center mb-2">
                  <Sparkles size={18} className="text-warm-sand" />
                </div>
                <h3 id="ai-audit-title" className="text-lg sm:text-xl font-unbounded font-bold mb-1.5 text-gray-900 dark:text-cloud-dancer">
                  Get Your Free AI-Powered Audit
                </h3>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Our AI will analyze your website speed, SEO technical health, conversion funnel, user experience, and competitor positioning. Receive a detailed 10+ page report with specific recommendations within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Full Name <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
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
                    <label htmlFor="email" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Email <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
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

                {/* Company & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Company <span className="text-warm-sand">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
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
                    <label htmlFor="website" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                      Website URL <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                      className={cn(
                        'w-full px-3 py-2 text-sm rounded-lg',
                        'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                        'text-gray-900 dark:text-cloud-dancer placeholder:text-gray-400 dark:placeholder:text-cloud-dancer/40',
                        'focus:outline-none focus:border-warm-sand transition-colors',
                        errors.website && 'border-red-400'
                      )}
                      disabled={loading}
                    />
                    {errors.website && <FieldError error={errors.website} className="mt-1" />}
                  </div>
                </div>

                {/* Current Marketing Spend */}
                <div>
                  <label htmlFor="monthlyBudget" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                    Current monthly marketing spend <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                  </label>
                  <select
                    id="monthlyBudget"
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-lg',
                      'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                      'text-gray-900 dark:text-cloud-dancer',
                      'focus:outline-none focus:border-warm-sand transition-colors',
                      errors.monthlyBudget && 'border-red-400'
                    )}
                    disabled={loading}
                  >
                    <option value="">Select your current spend</option>
                    <option value="<5k">Less than £5K/month</option>
                    <option value="5k-10k">£5K - £10K/month</option>
                    <option value="10k-25k">£10K - £25K/month</option>
                    <option value="25k-50k">£25K - £50K/month</option>
                    <option value="50k+">£50K+/month</option>
                    <option value="not_started">Not currently spending (just starting)</option>
                  </select>
                  {errors.monthlyBudget && <FieldError error={errors.monthlyBudget} className="mt-1" />}
                </div>

                {/* Main Challenge */}
                <div>
                  <label htmlFor="mainGoal" className="block text-xs font-medium mb-1 text-gray-900 dark:text-cloud-dancer">
                    What's your biggest digital marketing challenge? <span className="text-gray-500 dark:text-cloud-dancer/50 text-xs">(optional)</span>
                  </label>
                  <select
                    id="mainGoal"
                    value={formData.mainGoal}
                    onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-lg',
                      'bg-slate-100 dark:bg-neutral-800 border-2 border-slate-200 dark:border-neutral-700',
                      'text-gray-900 dark:text-cloud-dancer',
                      'focus:outline-none focus:border-warm-sand transition-colors',
                      errors.mainGoal && 'border-red-400'
                    )}
                    disabled={loading}
                  >
                    <option value="">Select your biggest challenge</option>
                    <option value="low_traffic">Not enough website traffic</option>
                    <option value="low_conversions">Traffic doesn't convert to leads/sales</option>
                    <option value="high_cac">Customer acquisition costs are too high</option>
                    <option value="poor_seo">Not ranking on Google</option>
                    <option value="slow_website">Website is slow or poorly built</option>
                    <option value="manual_processes">Too much manual work in marketing/sales</option>
                    <option value="poor_roi">Can't measure or improve marketing ROI</option>
                  </select>
                  {errors.mainGoal && <FieldError error={errors.mainGoal} className="mt-1" />}
                </div>

                {errors.submit && <FieldError error={errors.submit} />}

                <Button type="submit" variant="primary" className="w-full mt-3" loading={loading}>
                  {loading ? 'Submitting...' : 'Get My Free AI Audit'}
                </Button>

                <p className="text-xs text-gray-500 dark:text-cloud-dancer/50 text-center mt-2">
                  ✓ Detailed 10+ page audit report · ✓ Personalized recommendations · ✓ No sales calls unless you request one
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
