'use client';

import { useState } from 'react';
import { useRegion } from '@/lib/contexts/RegionContext';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';

const SERVICES = [
  'E-Commerce Development',
  'Performance Ads',
  'Automation & AI',
  'Technical SEO',
  'Full Digital Strategy',
  'Other',
];

export default function ContactForm() {
  const { currentRegion, regionData } = useRegion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    budget_range: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const supabase = createClient();

      // Get region ID from regions table
      const { data: regionRecord } = await supabase
        .from('regions')
        .select('id')
        .eq('code', currentRegion)
        .single();

      if (!regionRecord) {
        throw new Error('Region not found');
      }

      // Insert lead
      const { error } = await supabase.from('leads').insert({
        region_id: regionRecord.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        service_interest: formData.service_interest || null,
        budget_range: formData.budget_range,
        message: formData.message,
        source: 'website',
        status: 'new',
      });

      if (error) {
        throw error;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        budget_range: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-unbounded font-bold text-green-400 mb-4">
          Message Sent
        </h3>
        <p className="text-cloud-dancer/80 mb-6">
          We&apos;ll contact you within 24 hours to discuss your project.
        </p>
        <Button
          variant="secondary"
          onClick={() => setStatus('idle')}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-warm-sand">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-warm-sand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
            placeholder="john@company.com"
          />
        </div>
      </div>

      {/* Phone & Company Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
            placeholder="+44 20 1234 5678"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
            placeholder="Acme Inc"
          />
        </div>
      </div>

      {/* Service & Budget Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service_interest" className="block text-sm font-medium mb-2">
            Service Interest
          </label>
          <select
            id="service_interest"
            name="service_interest"
            value={formData.service_interest}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium mb-2">
            Budget Range <span className="text-warm-sand">*</span>
          </label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors"
          >
            <option value="">Select budget range</option>
            {regionData.budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Tell us about your project <span className="text-warm-sand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          rows={5}
          className="w-full px-4 py-3 bg-deep-obsidian border border-slate-ui rounded-md text-cloud-dancer focus:border-warm-sand focus:outline-none transition-colors resize-none"
          placeholder="What challenges are you facing? What goals do you want to achieve?"
        />
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        loading={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Start Your AI Audit'}
      </Button>

      <p className="text-sm text-cloud-dancer/60 text-center">
        We respond within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
