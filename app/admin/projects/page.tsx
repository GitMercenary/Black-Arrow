'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/lib/types/database';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Globe } from 'lucide-react';

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  'landing-page': { label: 'Landing Page', color: 'bg-emerald-500/20 text-emerald-400' },
  'business-site': { label: 'Business Site', color: 'bg-blue-500/20 text-blue-400' },
  'custom-web-app': { label: 'Custom Web App', color: 'bg-purple-500/20 text-purple-400' },
};

const INDUSTRY_OPTIONS = ['Real Estate', 'Hospitality', 'Automotive', 'Tech', 'E-commerce', 'Other'];
const CATEGORY_OPTIONS = ['landing-page', 'business-site', 'custom-web-app'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const supabase = createClient();
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (data) setProjects(data);
    setLoading(false);
  }

  async function togglePublished(project: Project) {
    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .update({ published: !project.published, updated_at: new Date().toISOString() })
      .eq('id', project.id);

    if (!error) {
      setProjects(projects.map(p =>
        p.id === project.id ? { ...p, published: !p.published } : p
      ));
    }
  }

  async function toggleFeatured(project: Project) {
    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .update({ featured: !project.featured, updated_at: new Date().toISOString() })
      .eq('id', project.id);

    if (!error) {
      setProjects(projects.map(p =>
        p.id === project.id ? { ...p, featured: !p.featured } : p
      ));
    }
  }

  async function deleteProject(projectId: string) {
    if (!confirm('Are you sure you want to delete this project? This cannot be undone.')) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (!error) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  }

  async function toggleRegion(project: Project, region: string) {
    const newVisibility = project.region_visibility.includes(region)
      ? project.region_visibility.filter(r => r !== region)
      : [...project.region_visibility, region];

    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .update({ region_visibility: newVisibility, updated_at: new Date().toISOString() })
      .eq('id', project.id);

    if (!error) {
      setProjects(projects.map(p =>
        p.id === project.id ? { ...p, region_visibility: newVisibility } : p
      ));
    }
  }

  const filteredProjects = projects.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (filterIndustry !== 'all' && p.industry !== filterIndustry) return false;
    if (filterPublished === 'published' && !p.published) return false;
    if (filterPublished === 'draft' && p.published) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-unbounded font-bold mb-2">Projects</h1>
            <p className="text-gray-500 dark:text-cloud-dancer/60">{filteredProjects.length} projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button variant="primary">
              <Plus size={16} className="mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card hover={false} className="mb-6 p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-gray-500 dark:text-cloud-dancer/60">Filters:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-sm focus:border-warm-sand focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat]?.label || cat}</option>
              ))}
            </select>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-sm focus:border-warm-sand focus:outline-none"
            >
              <option value="all">All Industries</option>
              {INDUSTRY_OPTIONS.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-sm focus:border-warm-sand focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </Card>

        {/* Projects Table */}
        <Card hover={false}>
          <div className="overflow-x-auto -mx-6 px-6 scrollbar-hide">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-ui">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Project</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Category</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Industry</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Regions</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-cloud-dancer/40">
                      Loading...
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400 dark:text-cloud-dancer/40">
                      No projects found
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-200 dark:border-slate-ui/50 hover:bg-gray-100 dark:hover:bg-slate-ui/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {project.thumbnail && (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{project.title}</span>
                              {project.featured && (
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-cloud-dancer/60">
                              {project.client || 'No client'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_LABELS[project.category]?.color || 'bg-gray-500/20 text-gray-400'}`}>
                          {CATEGORY_LABELS[project.category]?.label || project.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700 dark:text-cloud-dancer/80">
                        {project.industry || '—'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          {['UK', 'UAE', 'IND'].map(region => (
                            <button
                              key={region}
                              onClick={() => toggleRegion(project, region)}
                              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                                project.region_visibility.includes(region)
                                  ? 'bg-warm-sand/20 text-warm-sand'
                                  : 'bg-gray-200 dark:bg-slate-ui/30 text-gray-400 dark:text-cloud-dancer/40'
                              }`}
                              title={`Toggle ${region} visibility`}
                            >
                              {region}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => togglePublished(project)}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                            project.published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-200 dark:bg-slate-ui/30 text-gray-500 dark:text-cloud-dancer/60'
                          }`}
                          title={project.published ? 'Click to unpublish' : 'Click to publish'}
                        >
                          {project.published ? <Eye size={12} /> : <EyeOff size={12} />}
                          {project.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFeatured(project)}
                            className={`p-2 rounded transition-colors ${
                              project.featured
                                ? 'text-yellow-500 hover:bg-yellow-500/20'
                                : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-ui'
                            }`}
                            title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            <Star size={16} className={project.featured ? 'fill-yellow-500' : ''} />
                          </button>
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-ui rounded transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-500/20 rounded transition-colors text-gray-400 hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Page Visibility Legend */}
        <Card hover={false} className="mt-6 p-4 bg-gray-50 dark:bg-slate-ui/20">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={14} className="text-gray-500 dark:text-cloud-dancer/60" />
            <span className="text-sm font-medium text-gray-700 dark:text-cloud-dancer/80">Page visibility is managed in the edit form for each project</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-cloud-dancer/60">
            Control which pages each project appears on: Portfolio, Website Development, Landing Page, Business Site, or Custom Web App.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
