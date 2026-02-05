'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Post, PostUpdateData } from '@/lib/types/database';
import { FileText, Edit, Trash2, Eye, EyeOff, Plus } from 'lucide-react';

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setPosts(data);
    }
    setLoading(false);
  }

  async function togglePublish(postId: string, currentStatus: boolean) {
    const supabase = createClient();

    const updateData: PostUpdateData = {
      published: !currentStatus,
      updated_at: new Date().toISOString(),
    };

    if (!currentStatus) {
      // Publishing the post
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId);

    if (!error) {
      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, published: !currentStatus, published_at: updateData.published_at || p.published_at }
          : p
      ));
    }
  }

  async function deletePost(postId: string) {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeleting(postId);
    const supabase = createClient();
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (!error) {
      setPosts(posts.filter(p => p.id !== postId));
    }
    setDeleting(null);
  }

  const filteredPosts = posts.filter(post => {
    if (filterStatus === 'published') return post.published;
    if (filterStatus === 'draft') return !post.published;
    return true;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length,
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-unbounded font-bold mb-2">Blog Posts</h1>
            <p className="text-cloud-dancer/60">
              {stats.total} total · {stats.published} published · {stats.drafts} drafts
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/admin/blog/new')}>
            <Plus size={18} className="mr-2" />
            New Post
          </Button>
        </div>

        {/* Filters */}
        <Card hover={false} className="mb-6 p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-cloud-dancer/60">Filter:</span>
            <div className="flex gap-2">
              {['all', 'published', 'draft'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    filterStatus === status
                      ? 'bg-warm-sand text-deep-obsidian'
                      : 'bg-slate-ui/50 text-cloud-dancer/70 hover:bg-slate-ui'
                  }`}
                >
                  {status === 'all' ? 'All Posts' : status === 'published' ? 'Published' : 'Drafts'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Posts Grid */}
        {loading ? (
          <Card hover={false} className="p-8 text-center">
            <p className="text-cloud-dancer/60">Loading posts...</p>
          </Card>
        ) : filteredPosts.length === 0 ? (
          <Card hover={false} className="p-8 text-center">
            <FileText size={48} className="mx-auto mb-4 text-cloud-dancer/30" />
            <p className="text-cloud-dancer/60 mb-4">
              {filterStatus === 'all'
                ? 'No blog posts yet. Create your first post!'
                : `No ${filterStatus} posts found.`}
            </p>
            {filterStatus === 'all' && (
              <Button variant="primary" onClick={() => router.push('/admin/blog/new')}>
                Create First Post
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} hover={false} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-unbounded font-bold">{post.title}</h3>
                      {post.published ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-ui text-cloud-dancer/60 text-xs rounded">
                          Draft
                        </span>
                      )}
                    </div>

                    {post.excerpt && (
                      <p className="text-cloud-dancer/70 text-sm mb-3">{post.excerpt}</p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-cloud-dancer/60">
                      <span>Slug: /{post.slug}</span>
                      {post.region_tags && post.region_tags.length > 0 && (
                        <span>Regions: {post.region_tags.join(', ')}</span>
                      )}
                      <span>
                        {post.published && post.published_at
                          ? `Published ${new Date(post.published_at).toLocaleDateString()}`
                          : `Created ${new Date(post.created_at).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className="p-2 hover:bg-slate-ui rounded transition-colors"
                      title={post.published ? 'Unpublish' : 'Publish'}
                    >
                      {post.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                      onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                      className="p-2 hover:bg-slate-ui rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
