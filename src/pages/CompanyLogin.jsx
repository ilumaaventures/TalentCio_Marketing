import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Eye, EyeOff, Shield, Users, Zap } from 'lucide-react';
import api from '../api/axios';

const isWorkspaceSlug = (value) => /^[a-z0-9-]+$/i.test(value.trim());
const isLocalHost = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
const normalizeEmail = (value) => value.trim().toLowerCase();

const buildTenantUrl = (template, subdomain, path, extraParams = {}) => {
  let normalizedTemplate = (template || 'https://{tenant}.talentcio.in').trim();
  let useTenantQueryParam = false;

  if (normalizedTemplate.includes('{tenant}.localhost') || normalizedTemplate.includes('{tenant}.127.0.0.1')) {
    normalizedTemplate = normalizedTemplate.replace('{tenant}.', '');
    useTenantQueryParam = true;
  }

  const resolvedBase = normalizedTemplate.includes('{tenant}')
    ? normalizedTemplate.replace('{tenant}', subdomain)
    : normalizedTemplate;

  const url = new URL(resolvedBase, window.location.origin);
  const basePath = url.pathname && url.pathname !== '/' ? url.pathname.replace(/\/$/, '') : '';
  url.pathname = `${basePath}${path}`.replace(/\/{2,}/g, '/');

  if (useTenantQueryParam || isLocalHost(url.hostname)) {
    url.searchParams.set('tenant', subdomain);
  }

  Object.entries(extraParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

export default function CompanyLogin() {
  const [form, setForm] = useState({ companyIdentifier: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(null);
  const [error, setError] = useState('');

  const tenantLoginBase = useMemo(() => {
    const template = import.meta.env.VITE_TENANT_APP_URL || 'https://{tenant}.talentcio.in';
    return template;
  }, []);

  const resetPasswordUrl = useMemo(() => {
    const identifier = form.companyIdentifier.trim().toLowerCase();
    if (!identifier || !isWorkspaceSlug(identifier)) {
      return '';
    }

    return buildTenantUrl(tenantLoginBase, identifier, '/reset-password');
  }, [form.companyIdentifier, tenantLoginBase]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.companyIdentifier.trim() || !form.email.trim() || !form.password) {
      setError('All fields are required.');
      return;
    }

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(form.email);

      const response = await api.post('/public/company-login', {
        companyIdentifier: form.companyIdentifier.trim(),
        email: normalizedEmail,
        password: form.password
      });

      const { subdomain, handoffToken, companyName } = response.data;
      const handoffUrl = buildTenantUrl(tenantLoginBase, subdomain, '/auth/handoff', {
        token: handoffToken
      });
      const redirectHost = new URL(handoffUrl).host;

      setRedirecting({ companyName, subdomain, token: handoffToken, redirectHost });

      window.setTimeout(() => {
        window.location.href = handoffUrl;
      }, 1500);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed. Please check your details and try again.');
      setSubmitting(false);
    }
  };

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faff] px-4">
        <div className="surface-card w-full max-w-sm p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
            <Building2 size={28} className="text-white" />
          </div>
          <h2 className="mb-1 font-['Sora'] text-xl font-bold text-slate-900">Welcome back!</h2>
          <p className="mb-6 text-sm text-slate-500">
            Redirecting you to <strong className="text-blue-700">{redirecting.companyName}</strong>...
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: '100%',
                animation: 'progress-fill 1.4s ease-in-out forwards'
              }}
            />
          </div>
          <style>{`
            @keyframes progress-fill {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
          <p className="mt-4 text-xs text-slate-400">
            Taking you to <span className="font-mono text-slate-600">{redirecting.redirectHost}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen lg:h-screen lg:overflow-hidden">
      <div className="relative hidden overflow-hidden bg-[#0d1b2a] p-10 lg:flex lg:w-5/12 lg:flex-col lg:justify-between xl:w-1/2 xl:p-12">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #115cb9 0%, transparent 50%), radial-gradient(circle at 75% 75%, #115cb9 0%, transparent 50%)`
          }}
        />

        <div className="relative">
          <Link to="/" className="inline-flex" aria-label="TalentCIO home">
            <img src="/dark-logo-full.png" alt="TalentCIO" className="h-25 w-auto max-w-117.5 object-contain" />
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-white">
              Your workspace is
              <br />
              waiting for you.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Sign in to manage your team, track hiring, handle attendance, and run operations from one workspace.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Users, text: 'Manage your entire team from one dashboard' },
              { icon: Zap, text: 'AI-powered hiring and candidate screening' },
              { icon: Shield, text: 'Enterprise-grade security and access control' }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon size={15} className="text-blue-400" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="text-xs text-slate-500">
              Looking for jobs?{' '}
              <Link to="/jobs" className="font-semibold text-blue-400 transition hover:text-blue-300">
                Browse open positions {'->'}
              </Link>
            </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-[#f8faff] px-6 py-12 lg:py-8">
        <div className="mb-8 lg:hidden">
          <Link to="/" className="inline-flex" aria-label="TalentCIO home">
            <img src="/company-login-logo.png" alt="TalentCIO" className="h-16 w-auto max-w-[470px] object-contain" />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="section-kicker">Employee Login</span>
            <h1 className="mt-3 font-['Sora'] text-2xl font-bold text-slate-950">Sign in to your workspace</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your company and account details to continue.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <span className="mt-0.5 shrink-0 text-red-500">!</span>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="surface-card space-y-5 p-7">
            <div>
              <label className="label-shell">Company Name</label>
              <div className="relative">
                <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="input-shell pl-10"
                  value={form.companyIdentifier}
                  onChange={(event) => setForm((current) => ({ ...current, companyIdentifier: event.target.value }))}
                  placeholder="Your company name"
                  autoComplete="organization"
                  required
                  autoFocus
                />
              </div>
              <p className="mt-1.5 px-1 text-[11px] text-slate-400">
                Enter your company name or workspace ID (subdomain)
              </p>
            </div>

            <div>
              <label className="label-shell">Work Email</label>
              <input
                type="email"
                className="input-shell"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value.toLowerCase() }))}
                placeholder="you@yourcompany.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="label-shell">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-shell pr-11"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Your account password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-2 flex w-full items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying credentials...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <Shield size={13} className="shrink-0 text-slate-400" />
              <p className="text-[11px] text-slate-500">
                Your credentials are verified securely and never stored on this page.
              </p>
            </div>
          </form>

          <div className="mt-6 space-y-3 text-center">
            {resetPasswordUrl && (
              <p className="text-sm text-slate-500">
                Need password help?{' '}
                <a href={resetPasswordUrl} className="font-semibold text-blue-600 hover:underline">
                  Reset it in your workspace
                </a>
              </p>
            )}
            <p className="text-sm text-slate-500">
              Looking for jobs instead?{' '}
              <Link to="/jobs" className="font-semibold text-blue-600 hover:underline">
                Browse openings {'->'}
              </Link>
            </p>
            <p className="text-sm text-slate-500">
              Job seeker account?{' '}
              <Link to="/applicant/login" className="font-semibold text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
