'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { Lead, AdminUser } from '@/lib/types/database';
import { Inbox, FileText, Settings, Users, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();

      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        router.push('/admin/login');
        return;
      }

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (!adminData) {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setUser(adminData);
      fetchLeads();
    }

    async function fetchLeads() {
      const supabase = createClient();
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setLeads(data);
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-cloud-dancer/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-deep-obsidian py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-unbounded font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-cloud-dancer/60">Welcome back, {user?.full_name || user?.email}</p>
          </div>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/dashboard">
            <Card hover={true} className="cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <LayoutDashboard size={24} className="text-warm-sand" />
                <div>
                  <h3 className="font-unbounded font-bold text-sm">Dashboard</h3>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60">Overview & stats</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/admin/leads">
            <Card hover={true} className="cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-warm-sand" />
                <div>
                  <h3 className="font-unbounded font-bold text-sm">Leads</h3>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60">Manage contacts</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/admin/blog">
            <Card hover={true} className="cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-warm-sand" />
                <div>
                  <h3 className="font-unbounded font-bold text-sm">Blog</h3>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60">Manage posts</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/admin/settings">
            <Card hover={true} className="cursor-pointer h-full">
              <div className="flex items-center gap-3">
                <Settings size={24} className="text-warm-sand" />
                <div>
                  <h3 className="font-unbounded font-bold text-sm">Settings</h3>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60">Regional config</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card hover={false}>
            <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">
              {leads.length}
            </div>
            <div className="text-gray-500 dark:text-cloud-dancer/60 text-sm">Recent Leads</div>
          </Card>
          <Card hover={false}>
            <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">
              {leads.filter(l => l.status === 'new').length}
            </div>
            <div className="text-gray-500 dark:text-cloud-dancer/60 text-sm">New Leads</div>
          </Card>
          <Card hover={false}>
            <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">
              {leads.filter(l => l.status === 'contacted').length}
            </div>
            <div className="text-gray-500 dark:text-cloud-dancer/60 text-sm">Contacted</div>
          </Card>
          <Card hover={false}>
            <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">
              {leads.filter(l => l.status === 'converted').length}
            </div>
            <div className="text-gray-500 dark:text-cloud-dancer/60 text-sm">Converted</div>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card hover={false}>
          <h2 className="text-2xl font-unbounded font-bold mb-6">Recent Leads</h2>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-ui">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Name</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Email</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Company</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Budget</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Inbox size={48} className="text-gray-300 dark:text-cloud-dancer/30 mb-4" />
                        <h3 className="text-lg font-unbounded font-bold mb-2">No Leads Yet</h3>
                        <p className="text-gray-500 dark:text-cloud-dancer/60 text-sm max-w-md">
                          New leads from the contact form will appear here. Check back soon or share your contact page to start receiving inquiries.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-200 dark:border-slate-ui/50 hover:bg-gray-100 dark:hover:bg-slate-ui/30 transition-colors">
                      <td className="py-4 px-4">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.email}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.company || '—'}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.budget_range}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          lead.status === 'new' ? 'bg-warm-sand/20 text-warm-sand' :
                          lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                          lead.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-200 dark:bg-slate-ui text-gray-500 dark:text-cloud-dancer/60'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-500 dark:text-cloud-dancer/60 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Status */}
        <div className="mt-8 text-center text-gray-500 dark:text-cloud-dancer/60 text-sm">
          <p>All systems operational • Phases 1, 2, & 3 complete</p>
        </div>
      </div>
    </div>
  );
}
