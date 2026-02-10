'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { AdminUser } from '@/lib/types/database';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
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
      <div className="min-h-screen flex items-center justify-center bg-deep-obsidian">
        <p className="text-cloud-dancer/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-obsidian flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-ui/30 border-r border-slate-ui flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-ui">
          <Link href="/admin/dashboard" className="text-xl font-unbounded font-bold">
            BLACK ARROW
          </Link>
          <p className="text-xs text-cloud-dancer/60 mt-1">Admin Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-warm-sand/20 text-warm-sand'
                        : 'text-cloud-dancer/70 hover:bg-slate-ui/50 hover:text-cloud-dancer'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Sign Out */}
        <div className="p-4 border-t border-slate-ui">
          <div className="mb-4">
            <p className="text-sm font-medium truncate">{user?.full_name || 'Admin'}</p>
            <p className="text-xs text-cloud-dancer/60 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-cloud-dancer/60 hover:text-red-400 transition-colors text-sm w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
