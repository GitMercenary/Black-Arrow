'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { AdminUser } from '@/lib/types/database';
import {
  Key,
  Users,
  UserPlus,
  Trash2,
  Shield,
  Eye,
  Edit3,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';

const ROLE_LABELS: Record<string, { label: string; color: string; icon: typeof Shield }> = {
  admin: { label: 'Admin', color: 'bg-warm-sand/20 text-warm-sand', icon: Shield },
  editor: { label: 'Editor', color: 'bg-blue-500/20 text-blue-400', icon: Edit3 },
  viewer: { label: 'Viewer', color: 'bg-gray-500/20 text-gray-400', icon: Eye },
};

const ALL_REGIONS = ['UK', 'UAE', 'IND'];

export default function AccountPage() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  // Add user form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    allowed_regions: ['UK', 'UAE', 'IND'] as string[],
  });
  const [addingUser, setAddingUser] = useState(false);
  const [addMessage, setAddMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit user
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    allowed_regions: ['UK', 'UAE', 'IND'] as string[],
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) return;

    const { data: currentAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (currentAdmin) {
      setCurrentUser(currentAdmin);

      // Fetch all admin users if super admin
      if (currentAdmin.is_super_admin) {
        const { data: allUsers } = await supabase
          .from('admin_users')
          .select('*')
          .order('created_at', { ascending: true });

        if (allUsers) setAdminUsers(allUsers);
      }
    }

    setLoading(false);
  }

  // ── Password Change ──
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setChangingPassword(true);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMessage({ type: 'error', text: error.message });
    } else {
      setPasswordMessage({ type: 'success', text: 'Password updated successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    }

    setChangingPassword(false);
  }

  // ── Add User ──
  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddMessage(null);

    if (!addForm.email || !addForm.full_name || !addForm.password) {
      setAddMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    if (addForm.password.length < 6) {
      setAddMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    if (addForm.allowed_regions.length === 0) {
      setAddMessage({ type: 'error', text: 'Select at least one region.' });
      return;
    }

    setAddingUser(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setAddMessage({ type: 'error', text: data.error || 'Failed to create user.' });
      } else {
        setAddMessage({ type: 'success', text: 'User created successfully.' });
        setAddForm({ email: '', full_name: '', password: '', role: 'viewer', allowed_regions: ['UK', 'UAE', 'IND'] });
        setShowAddForm(false);
        fetchData();
      }
    } catch {
      setAddMessage({ type: 'error', text: 'Network error. Please try again.' });
    }

    setAddingUser(false);
  }

  // ── Edit User ──
  function startEditing(user: AdminUser) {
    setEditingUserId(user.id);
    setEditForm({
      role: user.role,
      allowed_regions: user.allowed_regions || ['UK', 'UAE', 'IND'],
    });
  }

  async function saveUserEdit(userId: string) {
    setSavingEdit(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('admin_users')
      .update({
        role: editForm.role,
        allowed_regions: editForm.allowed_regions,
      })
      .eq('id', userId);

    if (!error) {
      setAdminUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, role: editForm.role, allowed_regions: editForm.allowed_regions } : u)
      );
      setEditingUserId(null);
    }

    setSavingEdit(false);
  }

  // ── Delete User ──
  async function handleDeleteUser(userId: string) {
    if (userId === currentUser?.id) return;

    setDeletingUserId(userId);

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAdminUsers(prev => prev.filter(u => u.id !== userId));
      }
    } catch {
      // Silently fail — user stays in list
    }

    setDeletingUserId(null);
  }

  // ── Region Toggle Helper ──
  function toggleRegion(region: string, current: string[], setter: (regions: string[]) => void) {
    if (current.includes(region)) {
      if (current.length > 1) {
        setter(current.filter(r => r !== region));
      }
    } else {
      setter([...current, region]);
    }
  }

  const inputClass =
    'w-full px-4 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none text-gray-900 dark:text-cloud-dancer';

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-unbounded font-bold mb-2">Account</h1>
          <p className="text-gray-500 dark:text-cloud-dancer/60">
            Manage your password{currentUser?.is_super_admin ? ' and team members' : ''}
          </p>
        </div>

        {loading ? (
          <Card hover={false} className="p-8 text-center">
            <p className="text-gray-500 dark:text-cloud-dancer/60">Loading...</p>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* ═══ Section 1: My Account ═══ */}
            <Card hover={false} className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-warm-sand/20 flex items-center justify-center">
                  <Key size={20} className="text-warm-sand" />
                </div>
                <div>
                  <h2 className="text-xl font-unbounded font-bold">My Account</h2>
                  <p className="text-sm text-gray-500 dark:text-cloud-dancer/60">
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              {/* Current Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-slate-ui/20 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-cloud-dancer">
                    {currentUser?.full_name || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">Role</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${ROLE_LABELS[currentUser?.role || 'viewer'].color}`}>
                    {currentUser?.is_super_admin ? 'Super Admin' : ROLE_LABELS[currentUser?.role || 'viewer'].label}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">Regions</p>
                  <div className="flex gap-1">
                    {(currentUser?.allowed_regions || ALL_REGIONS).map(r => (
                      <span key={r} className="px-2 py-0.5 bg-gray-200 dark:bg-slate-ui/50 text-gray-700 dark:text-cloud-dancer/80 text-xs rounded">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangePassword} className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-cloud-dancer/80">
                  Change Password
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Re-enter password"
                    />
                  </div>
                </div>

                {passwordMessage && (
                  <p className={`text-sm ${passwordMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {passwordMessage.text}
                  </p>
                )}

                <Button type="submit" variant="primary" disabled={changingPassword || !newPassword}>
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </Card>

            {/* ═══ Section 2: User Management (Super Admin Only) ═══ */}
            {currentUser?.is_super_admin && (
              <Card hover={false} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warm-sand/20 flex items-center justify-center">
                      <Users size={20} className="text-warm-sand" />
                    </div>
                    <div>
                      <h2 className="text-xl font-unbounded font-bold">User Management</h2>
                      <p className="text-sm text-gray-500 dark:text-cloud-dancer/60">
                        {adminUsers.length} team member{adminUsers.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => { setShowAddForm(!showAddForm); setAddMessage(null); }}
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add User
                  </Button>
                </div>

                {/* Add User Form */}
                {showAddForm && (
                  <div className="mb-6 p-4 border border-warm-sand/30 rounded-lg bg-gray-50 dark:bg-slate-ui/20">
                    <h3 className="text-sm font-unbounded font-bold mb-4">New Team Member</h3>
                    <form onSubmit={handleAddUser} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={addForm.full_name}
                            onChange={(e) => setAddForm({ ...addForm, full_name: e.target.value })}
                            className={inputClass}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={addForm.email}
                            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                            className={inputClass}
                            placeholder="user@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                            Password *
                          </label>
                          <input
                            type="password"
                            value={addForm.password}
                            onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                            className={inputClass}
                            placeholder="Min 6 characters"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-1">
                            Role
                          </label>
                          <select
                            value={addForm.role}
                            onChange={(e) => setAddForm({ ...addForm, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                            className={inputClass}
                          >
                            <option value="viewer">Viewer — Read only</option>
                            <option value="editor">Editor — Can edit content</option>
                            <option value="admin">Admin — Full access</option>
                          </select>
                        </div>
                      </div>

                      {/* Region Checkboxes */}
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-cloud-dancer/60 mb-2">
                          Allowed Regions
                        </label>
                        <div className="flex gap-3">
                          {ALL_REGIONS.map((region) => (
                            <label key={region} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={addForm.allowed_regions.includes(region)}
                                onChange={() =>
                                  toggleRegion(region, addForm.allowed_regions, (regions) =>
                                    setAddForm({ ...addForm, allowed_regions: regions })
                                  )
                                }
                                className="accent-warm-sand"
                              />
                              <span className="text-sm text-gray-700 dark:text-cloud-dancer/80">{region}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {addMessage && (
                        <p className={`text-sm ${addMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                          {addMessage.text}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <Button type="submit" variant="primary" disabled={addingUser}>
                          {addingUser ? 'Creating...' : 'Create User'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => setShowAddForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* User List */}
                <div className="space-y-3">
                  {adminUsers.map((user) => {
                    const isEditing = editingUserId === user.id;
                    const isSelf = user.id === currentUser.id;
                    const roleInfo = ROLE_LABELS[user.role] || ROLE_LABELS.viewer;

                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-ui rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-cloud-dancer truncate">
                              {user.full_name || user.email}
                            </p>
                            {user.is_super_admin && (
                              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded font-medium">
                                Super Admin
                              </span>
                            )}
                            {isSelf && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-cloud-dancer/60 truncate">
                            {user.email}
                          </p>

                          {isEditing ? (
                            <div className="mt-3 space-y-3">
                              {/* Role Select */}
                              <div className="flex items-center gap-3">
                                <label className="text-xs text-gray-500 dark:text-cloud-dancer/60 w-16">Role</label>
                                <select
                                  value={editForm.role}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, role: e.target.value as 'admin' | 'editor' | 'viewer' })
                                  }
                                  className="px-3 py-1 text-sm bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none text-gray-900 dark:text-cloud-dancer"
                                >
                                  <option value="viewer">Viewer</option>
                                  <option value="editor">Editor</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </div>

                              {/* Region Checkboxes */}
                              <div className="flex items-center gap-3">
                                <label className="text-xs text-gray-500 dark:text-cloud-dancer/60 w-16">Regions</label>
                                <div className="flex gap-3">
                                  {ALL_REGIONS.map((region) => (
                                    <label key={region} className="flex items-center gap-1 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={editForm.allowed_regions.includes(region)}
                                        onChange={() =>
                                          toggleRegion(region, editForm.allowed_regions, (regions) =>
                                            setEditForm({ ...editForm, allowed_regions: regions })
                                          )
                                        }
                                        className="accent-warm-sand"
                                      />
                                      <span className="text-xs text-gray-700 dark:text-cloud-dancer/80">{region}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              {/* Save/Cancel */}
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveUserEdit(user.id)}
                                  disabled={savingEdit}
                                  className="flex items-center gap-1 px-3 py-1 text-xs bg-warm-sand text-deep-obsidian rounded hover:bg-warm-sand/90 transition-colors disabled:opacity-50"
                                >
                                  <Check size={12} />
                                  {savingEdit ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                  onClick={() => setEditingUserId(null)}
                                  className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-200 dark:bg-slate-ui text-gray-700 dark:text-cloud-dancer/80 rounded hover:bg-gray-300 dark:hover:bg-slate-ui/80 transition-colors"
                                >
                                  <X size={12} />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${roleInfo.color}`}>
                                {roleInfo.label}
                              </span>
                              <div className="flex gap-1">
                                {(user.allowed_regions || ALL_REGIONS).map(r => (
                                  <span key={r} className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-ui/30 text-gray-500 dark:text-cloud-dancer/60 text-[10px] rounded">
                                    {r}
                                  </span>
                                ))}
                              </div>
                              {user.last_login && (
                                <span className="text-[10px] text-gray-400 dark:text-cloud-dancer/40">
                                  Last login: {new Date(user.last_login).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        {!isEditing && !user.is_super_admin && (
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => startEditing(user)}
                              className="p-2 text-gray-400 hover:text-warm-sand transition-colors"
                              title="Edit user"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${user.full_name || user.email}? This cannot be undone.`)) {
                                  handleDeleteUser(user.id);
                                }
                              }}
                              disabled={deletingUserId === user.id}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                              title="Delete user"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Role Descriptions */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-ui/20 rounded-lg">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-cloud-dancer/60 mb-3 uppercase tracking-wider">
                    Role Permissions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-medium text-gray-700 dark:text-cloud-dancer/80 flex items-center gap-1 mb-1">
                        <Eye size={12} /> Viewer
                      </p>
                      <p className="text-gray-500 dark:text-cloud-dancer/60">
                        View dashboard, leads, blog posts, and projects. Cannot edit or delete.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-cloud-dancer/80 flex items-center gap-1 mb-1">
                        <Edit3 size={12} /> Editor
                      </p>
                      <p className="text-gray-500 dark:text-cloud-dancer/60">
                        Everything a Viewer can do, plus create and edit blog posts and projects.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-cloud-dancer/80 flex items-center gap-1 mb-1">
                        <Shield size={12} /> Admin
                      </p>
                      <p className="text-gray-500 dark:text-cloud-dancer/60">
                        Full access to all features including lead management and deletions.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Non-super-admin info box */}
            {!currentUser?.is_super_admin && (
              <Card hover={false} className="p-4 bg-gray-50 dark:bg-slate-ui/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-warm-sand mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-cloud-dancer/70">
                    Only the super admin can manage team members. Contact your administrator to update roles or add new users.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
