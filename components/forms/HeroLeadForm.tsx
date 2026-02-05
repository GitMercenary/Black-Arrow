'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export default function HeroLeadForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();

      // Insert lead into database
      const { error: dbError } = await supabase.from('leads').insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          source: 'homepage_hero',
          status: 'new',
        },
      ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ full_name: '', email: '', phone: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="bg-warm-sand/10 dark:bg-warm-sand/5 border border-warm-sand/30 rounded-xl p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-2xl font-unbounded font-bold text-warm-sand mb-2">
            Thanks for reaching out!
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We'll get back to you within 24 hours with a custom strategy for your business.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 dark:bg-deep-obsidian/90 border border-warm-sand/30 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
      <h3 className="text-2xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
        Get Your Free Consultation
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Let's build your digital sales machine
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="hero-full-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="hero-full-name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-cloud-dancer focus:ring-2 focus:ring-warm-sand focus:border-transparent outline-none transition-all"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label
            htmlFor="hero-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="hero-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-cloud-dancer focus:ring-2 focus:ring-warm-sand focus:border-transparent outline-none transition-all"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="hero-phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="hero-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-cloud-dancer focus:ring-2 focus:ring-warm-sand focus:border-transparent outline-none transition-all"
            placeholder="+44 20 1234 5678"
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full text-lg py-4"
          loading={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Get Free Consultation'}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          We'll respond within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
}
