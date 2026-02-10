'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'business-site', label: 'Business Site' },
  { value: 'custom-web-app', label: 'Custom Web App' },
];

const INDUSTRY_OPTIONS = ['Real Estate', 'Hospitality', 'Automotive', 'Tech', 'E-commerce', 'Other'];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    client: '',
    description: '',
    category: 'landing-page',
    industry: '',
    live_url: '',
    thumbnail: '',
    tags: '',
    highlights: [''],
    featured: false,
    published: true,
    region_visibility: ['UK', 'UAE', 'IND'],
    show_on_portfolio: true,
    show_on_website_dev: true,
    show_on_landing_page: false,
    show_on_business_site: false,
    show_on_custom_web_app: false,
    year: new Date().getFullYear(),
  });

  function updateField(field: string, value: unknown) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleRegion(region: string) {
    const newRegions = form.region_visibility.includes(region)
      ? form.region_visibility.filter(r => r !== region)
      : [...form.region_visibility, region];
    updateField('region_visibility', newRegions);
  }

  function addHighlight() {
    updateField('highlights', [...form.highlights, '']);
  }

  function updateHighlight(index: number, value: string) {
    const updated = [...form.highlights];
    updated[index] = value;
    updateField('highlights', updated);
  }

  function removeHighlight(index: number) {
    updateField('highlights', form.highlights.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) return;

    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('projects').insert({
      title: form.title,
      client: form.client || null,
      description: form.description,
      category: form.category,
      industry: form.industry || null,
      live_url: form.live_url || null,
      thumbnail: form.thumbnail || null,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      highlights: form.highlights.filter(h => h.trim()),
      featured: form.featured,
      published: form.published,
      region_visibility: form.region_visibility,
      show_on_portfolio: form.show_on_portfolio,
      show_on_website_dev: form.show_on_website_dev,
      show_on_landing_page: form.show_on_landing_page,
      show_on_business_site: form.show_on_business_site,
      show_on_custom_web_app: form.show_on_custom_web_app,
      year: form.year,
      created_by: user?.id || null,
    });

    if (!error) {
      router.push('/admin/projects');
    } else {
      alert('Error creating project: ' + error.message);
    }
    setSaving(false);
  }

  const inputClass = "w-full px-4 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none text-sm";
  const labelClass = "block text-sm text-gray-500 dark:text-cloud-dancer/60 mb-1";

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/projects"
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-ui rounded transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-unbounded font-bold">New Project</h1>
            <p className="text-gray-500 dark:text-cloud-dancer/60 text-sm mt-1">Add a new portfolio project</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <Card hover={false} className="mb-6">
            <h2 className="text-lg font-unbounded font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className={inputClass}
                  placeholder="Project title"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Client</label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => updateField('client', e.target.value)}
                  className={inputClass}
                  placeholder="Client name"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Brief project description"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className={inputClass}
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => updateField('industry', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select industry</option>
                  {INDUSTRY_OPTIONS.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Live URL</label>
                <input
                  type="url"
                  value={form.live_url}
                  onChange={(e) => updateField('live_url', e.target.value)}
                  className={inputClass}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => updateField('year', parseInt(e.target.value))}
                  className={inputClass}
                  min={2020}
                  max={2030}
                />
              </div>
            </div>
          </Card>

          {/* Media */}
          <Card hover={false} className="mb-6">
            <h2 className="text-lg font-unbounded font-bold mb-4">Media</h2>
            <div>
              <label className={labelClass}>Thumbnail URL</label>
              <input
                type="url"
                value={form.thumbnail}
                onChange={(e) => updateField('thumbnail', e.target.value)}
                className={inputClass}
                placeholder="https://images.unsplash.com/..."
              />
              {form.thumbnail && (
                <img src={form.thumbnail} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded" />
              )}
            </div>
          </Card>

          {/* Tags & Highlights */}
          <Card hover={false} className="mb-6">
            <h2 className="text-lg font-unbounded font-bold mb-4">Tags & Highlights</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  className={inputClass}
                  placeholder="coffee, roastery, editorial"
                />
              </div>
              <div>
                <label className={labelClass}>Highlights</label>
                {form.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                      className={`${inputClass} flex-1`}
                      placeholder="Key highlight or feature"
                    />
                    {form.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="px-3 py-2 text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 rounded text-sm transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="text-sm text-warm-sand hover:underline"
                >
                  + Add highlight
                </button>
              </div>
            </div>
          </Card>

          {/* Visibility */}
          <Card hover={false} className="mb-6">
            <h2 className="text-lg font-unbounded font-bold mb-4">Visibility</h2>
            <div className="space-y-4">
              {/* Region Visibility */}
              <div>
                <label className={labelClass}>Region Visibility</label>
                <div className="flex gap-3 mt-1">
                  {['UK', 'UAE', 'IND'].map(region => (
                    <label key={region} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.region_visibility.includes(region)}
                        onChange={() => toggleRegion(region)}
                        className="rounded border-gray-300 dark:border-slate-ui text-warm-sand focus:ring-warm-sand"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Page Visibility */}
              <div>
                <label className={labelClass}>Show on Pages</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-1">
                  {[
                    { key: 'show_on_portfolio', label: 'Portfolio' },
                    { key: 'show_on_website_dev', label: 'Website Dev' },
                    { key: 'show_on_landing_page', label: 'Landing Page' },
                    { key: 'show_on_business_site', label: 'Business Site' },
                    { key: 'show_on_custom_web_app', label: 'Custom Web App' },
                  ].map(page => (
                    <label key={page.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[page.key as keyof typeof form] as boolean}
                        onChange={(e) => updateField(page.key, e.target.checked)}
                        className="rounded border-gray-300 dark:border-slate-ui text-warm-sand focus:ring-warm-sand"
                      />
                      <span className="text-sm">{page.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Featured & Published */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                    className="rounded border-gray-300 dark:border-slate-ui text-warm-sand focus:ring-warm-sand"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => updateField('published', e.target.checked)}
                    className="rounded border-gray-300 dark:border-slate-ui text-warm-sand focus:ring-warm-sand"
                  />
                  <span className="text-sm">Published</span>
                </label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={saving}>
              <Save size={16} className="mr-2" />
              {saving ? 'Creating...' : 'Create Project'}
            </Button>
            <Link href="/admin/projects">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
