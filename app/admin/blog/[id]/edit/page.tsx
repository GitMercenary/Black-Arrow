'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Post, PostUpdateData } from '@/lib/types/database';
import { ArrowLeft } from 'lucide-react';

const REGIONS = ['UK', 'UAE', 'IND'];

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    meta_title: '',
    meta_description: '',
    region_tags: ['UK', 'UAE', 'IND'] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error || !data) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      setPost(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        featured_image: data.featured_image || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        region_tags: data.region_tags || ['UK', 'UAE', 'IND'],
      });
      setLoading(false);
    }

    fetchPost();
  }, [postId]);

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
    }));
  }

  function toggleRegion(region: string) {
    setFormData(prev => ({
      ...prev,
      region_tags: prev.region_tags.includes(region)
        ? prev.region_tags.filter(r => r !== region)
        : [...prev.region_tags, region],
    }));
  }

  async function handleSubmit(publish?: boolean) {
    setError('');

    // Validation
    if (formData.title.length < 10) {
      setError('Title must be at least 10 characters');
      return;
    }
    if (formData.slug.length === 0) {
      setError('Slug is required');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      setError('Slug must only contain lowercase letters, numbers, and hyphens');
      return;
    }
    if (formData.content.length === 0) {
      setError('Content is required');
      return;
    }
    if (formData.meta_description.length > 160) {
      setError('Meta description must be 160 characters or less');
      return;
    }
    if (formData.region_tags.length === 0) {
      setError('At least one region must be selected');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const updateData: PostUpdateData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content,
      featured_image: formData.featured_image || null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      region_tags: formData.region_tags,
      updated_at: new Date().toISOString(),
    };

    // Update publish status if specified
    if (publish !== undefined) {
      updateData.published = publish;
      if (publish && !post?.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId);

    if (updateError) {
      if (updateError.code === '23505') {
        setError('A post with this slug already exists. Please use a different slug.');
      } else {
        setError(updateError.message);
      }
      setSaving(false);
      return;
    }

    router.push('/admin/blog');
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <p className="text-gray-500 dark:text-cloud-dancer/60">Loading post...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error && !post) {
    return (
      <AdminLayout>
        <div className="p-8">
          <Card hover={false} className="p-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="secondary" onClick={() => router.push('/admin/blog')}>
              Back to Blog
            </Button>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/blog')}
            className="flex items-center gap-2 text-gray-500 dark:text-cloud-dancer/60 hover:text-gray-900 dark:hover:text-cloud-dancer transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-unbounded font-bold">Edit Post</h1>
            {post?.published ? (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded">
                Published
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-200 dark:bg-slate-ui text-gray-500 dark:text-cloud-dancer/60 text-sm rounded">
                Draft
              </span>
            )}
          </div>
        </div>

        <Card hover={false}>
          <form className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none"
                placeholder="Enter post title (min 10 characters)"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none font-mono text-sm"
                placeholder="post-url-slug"
                required
              />
              <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 mt-1">
                URL: /blog/{formData.slug || 'your-slug'}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none resize-none"
                placeholder="Short summary for blog cards (optional)"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content (Markdown) <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={16}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none resize-none font-mono text-sm"
                placeholder="Write your post content in Markdown..."
                required
              />
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featured_image" className="block text-sm font-medium mb-2">
                Featured Image URL
              </label>
              <input
                id="featured_image"
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t border-gray-200 dark:border-slate-ui pt-6">
              <h3 className="text-lg font-unbounded font-bold mb-4">SEO Settings</h3>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <label htmlFor="meta_title" className="block text-sm font-medium mb-2">
                    Meta Title
                  </label>
                  <input
                    id="meta_title"
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none"
                    placeholder="Leave blank to use post title"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label htmlFor="meta_description" className="block text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={2}
                    maxLength={160}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none resize-none"
                    placeholder="SEO description (max 160 characters)"
                  />
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 mt-1">
                    {formData.meta_description.length}/160 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Targeting */}
            <div className="border-t border-gray-200 dark:border-slate-ui pt-6">
              <h3 className="text-lg font-unbounded font-bold mb-4">Regional Targeting</h3>
              <p className="text-sm text-gray-500 dark:text-cloud-dancer/60 mb-4">
                Select which regions should see this post
              </p>
              <div className="flex gap-4">
                {REGIONS.map(region => (
                  <label key={region} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.region_tags.includes(region)}
                      onChange={() => toggleRegion(region)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-slate-ui bg-gray-50 dark:bg-deep-obsidian checked:bg-warm-sand checked:border-warm-sand focus:ring-0 focus:outline-none cursor-pointer"
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-slate-ui">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              {!post?.published ? (
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(true);
                  }}
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? 'Publishing...' : 'Publish Now'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(false);
                  }}
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? 'Unpublishing...' : 'Unpublish'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
