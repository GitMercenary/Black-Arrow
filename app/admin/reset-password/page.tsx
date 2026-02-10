'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();

      // Check URL hash for recovery token (Supabase puts it there)
      const hash = window.location.hash;
      if (hash && hash.includes('type=recovery')) {
        // Parse tokens from hash
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (!sessionError) {
            setHasSession(true);
            // Clean up the URL hash
            window.history.replaceState(null, '', window.location.pathname);
          } else {
            setError('Recovery link has expired. Please request a new one.');
          }
        }
      } else {
        // Check if there's already an active session (e.g. navigated here manually)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setHasSession(true);
        } else {
          setError('No recovery session found. Please use the reset link from your email.');
        }
      }

      setChecking(false);
    }

    checkSession();
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/login');
      }, 3000);
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-deep-obsidian px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">BLACK ARROW</h1>
          <p className="text-gray-500 dark:text-cloud-dancer/60">Reset Password</p>
        </div>

        <Card hover={false}>
          {checking ? (
            <div className="text-center py-8 text-gray-500 dark:text-cloud-dancer/60">
              Verifying recovery link...
            </div>
          ) : success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-unbounded font-bold mb-2">Password Updated!</h2>
              <p className="text-gray-500 dark:text-cloud-dancer/60">Redirecting to login...</p>
            </div>
          ) : hasSession ? (
            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-cloud-dancer">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-gray-900 dark:text-cloud-dancer focus:border-warm-sand focus:outline-none"
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-700 dark:text-cloud-dancer">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-gray-900 dark:text-cloud-dancer focus:border-warm-sand focus:outline-none"
                  placeholder="Re-enter your password"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Set New Password'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-400 text-sm mb-4">
                  {error}
                </div>
              )}
              <Button
                variant="secondary"
                onClick={() => router.push('/admin/login')}
              >
                Back to Login
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
