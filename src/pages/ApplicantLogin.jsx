import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import applicantApi from '../api/applicantApi';
import { useApplicantAuth } from '../context/ApplicantAuthContext';

const normalizeEmail = (value) => value.trim().toLowerCase();

export default function ApplicantLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApplicantAuth();
  const from = location.state?.from || '/my-applications';

  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationOtp, setVerificationOtp] = useState('');
  const [resetForm, setResetForm] = useState({ email: '', otp: '', newPassword: '' });
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(form.email);
      const response = await applicantApi.post('/login', {
        email: normalizedEmail,
        password: form.password
      });
      login(response.data.token, response.data.applicant);
      toast.success(`Welcome back, ${response.data.applicant.firstName}.`);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response?.data?.needsVerification) {
        setVerificationEmail(error.response.data.email || normalizeEmail(form.email));
        setVerificationOtp('');
        setMode('verify');
        toast.error('Please verify your email before logging in.');
      } else {
        toast.error(error.response?.data?.message || 'Login failed.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(forgotEmail);
      await applicantApi.post('/forgot-password', { email: normalizedEmail });
      toast.success('If that email exists, a reset code was sent.');
      setResetForm((current) => ({ ...current, email: normalizedEmail }));
      setMode('reset');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();

    if (resetForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(resetForm.email);
      await applicantApi.post('/reset-password', {
        ...resetForm,
        email: normalizedEmail
      });
      toast.success('Password reset successfully. Please sign in.');
      setMode('login');
      setForm((current) => ({ ...current, email: normalizedEmail }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(verificationEmail);
      const response = await applicantApi.post('/verify-email', {
        email: normalizedEmail,
        otp: verificationOtp.trim()
      });

      if (!response.data.token || !response.data.applicant) {
        toast.success(response.data.message || 'Email verified. Please sign in.');
        setMode('login');
        setForm((current) => ({ ...current, email: normalizedEmail }));
        return;
      }

      login(response.data.token, response.data.applicant);
      toast.success('Email verified successfully.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    const normalizedEmail = normalizeEmail(verificationEmail);

    if (!normalizedEmail) {
      toast.error('Enter your email address first.');
      return;
    }

    try {
      await applicantApi.post('/resend-verification', { email: normalizedEmail });
      toast.success('A new verification code has been sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification code.');
    }
  };

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="mx-auto max-w-md">
          {mode === 'login' && (
            <div className="surface-card p-8">
              <div className="mb-6">
                <span className="section-kicker">Job Seekers</span>
                <h1 className="mt-3 text-2xl font-bold text-slate-950">Sign in to your account</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Track your applications and review updates in one place.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label-shell">Email Address</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value.toLowerCase() }))}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="label-shell mb-0">Password</label>
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs font-semibold text-blue-600 hover:underline">
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-shell pr-11"
                      value={form.password}
                      onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="Your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:opacity-70">
                  {submitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                New to TalentCIO?{' '}
                <Link to="/applicant/register" className="font-semibold text-blue-600 hover:underline">
                  Create an account
                </Link>
              </p>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-center text-xs text-slate-500">
                  <strong>Are you a company employee?</strong> Use your workspace subdomain login instead of this applicant account.
                </p>
              </div>
            </div>
          )}

          {mode === 'verify' && (
            <div className="surface-card p-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="text-xl font-bold text-slate-950">Verify your email</h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter the 6-digit verification code sent to <strong>{verificationEmail}</strong>
              </p>

              <form onSubmit={handleVerify} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="label-shell">Email Address</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={verificationEmail}
                    onChange={(event) => setVerificationEmail(event.target.value.toLowerCase())}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="label-shell">Verification Code</label>
                  <input
                    className="input-shell text-center text-xl font-bold tracking-[0.4em]"
                    maxLength={6}
                    value={verificationOtp}
                    onChange={(event) => setVerificationOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    required
                  />
                </div>

                <button type="submit" disabled={submitting || verificationOtp.length !== 6} className="btn-primary w-full disabled:opacity-70">
                  {submitting ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>

              <div className="mt-4 flex flex-col items-center gap-3">
                <button type="button" onClick={handleResendVerification} className="text-sm font-semibold text-blue-600 hover:underline">
                  Resend code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setForm((current) => ({ ...current, email: verificationEmail }));
                  }}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-700"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {mode === 'forgot' && (
            <div className="surface-card p-8">
              <h2 className="text-xl font-bold text-slate-950">Reset your password</h2>
              <p className="mt-2 text-sm text-slate-500">Enter your email address and we will send you a 6-digit reset code.</p>

              <form onSubmit={handleForgot} className="mt-6 space-y-4">
                <div>
                  <label className="label-shell">Email Address</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={forgotEmail}
                    onChange={(event) => setForgotEmail(event.target.value.toLowerCase())}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-70">
                  {submitting ? 'Sending...' : 'Send Reset Code'}
                </button>
                <button type="button" onClick={() => setMode('login')} className="btn-secondary w-full">
                  Back to Login
                </button>
              </form>
            </div>
          )}

          {mode === 'reset' && (
            <div className="surface-card p-8">
              <h2 className="text-xl font-bold text-slate-950">Enter your reset code</h2>
              <p className="mt-2 text-sm text-slate-500">Check your inbox for the 6-digit code.</p>

              <form onSubmit={handleReset} className="mt-6 space-y-4">
                <div>
                  <label className="label-shell">Email Address</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={resetForm.email}
                    onChange={(event) => setResetForm((current) => ({ ...current, email: event.target.value.toLowerCase() }))}
                    required
                  />
                </div>

                <div>
                  <label className="label-shell">Reset Code</label>
                  <input
                    className="input-shell text-center text-xl font-bold tracking-[0.4em]"
                    maxLength={6}
                    value={resetForm.otp}
                    onChange={(event) => setResetForm((current) => ({ ...current, otp: event.target.value.replace(/\D/g, '').slice(0, 6) }))}
                    placeholder="000000"
                    required
                  />
                </div>

                <div>
                  <label className="label-shell">New Password</label>
                  <input
                    type="password"
                    className="input-shell"
                    value={resetForm.newPassword}
                    onChange={(event) => setResetForm((current) => ({ ...current, newPassword: event.target.value }))}
                    placeholder="At least 8 characters"
                    required
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-70">
                  {submitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
