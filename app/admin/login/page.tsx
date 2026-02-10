'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        // Check if user is an admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (!adminData) {
          setError('You are not authorized to access the admin panel.');
          await supabase.auth.signOut();
          return;
        }

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);

        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError('Please enter your email first, then click Forgot Password.');
      return;
    }

    setResetLoading(true);
    setError('');
    setMessage('');

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-deep-obsidian px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">BLACK ARROW</h1>
          <p className="text-gray-500 dark:text-cloud-dancer/60">Admin Portal</p>
        </div>

        <Card hover={false}>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-cloud-dancer">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-gray-900 dark:text-cloud-dancer focus:border-warm-sand focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-cloud-dancer">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-gray-900 dark:text-cloud-dancer focus:border-warm-sand focus:outline-none"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-md p-3 text-green-400 text-sm">
                {message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center pt-2 border-t border-slate-ui/30">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="text-warm-sand hover:text-warm-sand/80 text-sm font-medium underline underline-offset-4 transition-colors"
              >
                {resetLoading ? 'Sending reset email...' : 'Forgot Password?'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
