import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, Menu, MoveRight, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { clearPublicJobsApiMissing, isPublicJobsApiMissing, markPublicJobsApiMissing } from '../api/publicCapabilities';

function LogoMark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-[0_16px_35px_-18px_rgba(17,92,185,0.8)]">
        <span className="font-['Sora'] text-xl font-bold">T</span>
      </div>
      <div>
        <span className="block font-['Sora'] text-lg font-bold tracking-tight text-slate-950">TalentCIO</span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          HROS for modern teams
        </span>
      </div>
    </Link>
  );
}

function LoginModal({ isOpen, onClose }) {
  const [subdomain, setSubdomain] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSubdomain('');
      setError('');
    }
  }, [isOpen]);

  const handleGo = (event) => {
    event.preventDefault();

    const value = subdomain.trim().toLowerCase();
    if (!value) {
      setError('Enter your workspace subdomain.');
      return;
    }

    if (!/^[a-z0-9-]+$/.test(value)) {
      setError('Use only lowercase letters, numbers, or hyphens.');
      return;
    }

    const tenantUrlTemplate = import.meta.env.VITE_TENANT_APP_URL || 'https://{tenant}.talentcio.in';
    window.location.href = `${tenantUrlTemplate.replace('{tenant}', value)}/login`.replace(/\/login\/login$/, '/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="surface-card w-full max-w-md overflow-hidden bg-white"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-6 py-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Workspace Login</p>
              <h2 className="mt-3 font-['Sora'] text-2xl font-bold">Enter your workspace</h2>
              <p className="mt-2 text-sm text-blue-50">
                Each company signs in through its own TalentCIO subdomain.
              </p>
            </div>

            <form className="p-6" onSubmit={handleGo}>
              <label className="label-shell">Workspace subdomain</label>
              <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <input
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                  placeholder="your-company"
                  value={subdomain}
                  onChange={(event) => {
                    setSubdomain(event.target.value);
                    setError('');
                  }}
                />
                <span className="pr-4 text-sm text-slate-500">.talentcio.in</span>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary">
                  Go to Workspace
                  <MoveRight size={16} />
                </button>
                <button type="button" onClick={onClose} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0);

  const navLinks = useMemo(
    () => [
      { label: 'Features', href: '/#features' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Jobs', href: '/jobs' }
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let ignore = false;

    const fetchJobCount = async () => {
      if (isPublicJobsApiMissing()) {
        setJobCount(0);
        return;
      }

      try {
        const response = await api.get('/public/jobs', {
          params: { page: 1, limit: 1 }
        });

        if (!ignore) {
          clearPublicJobsApiMissing();
          setJobCount(response.data.total || 0);
        }
      } catch (error) {
        if (!ignore) {
          if (error.response?.status === 404) {
            markPublicJobsApiMissing();
          }
          setJobCount(0);
        }
      }
    };

    fetchJobCount();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5">
        <div
          className={`container-shell rounded-[28px] border transition-all duration-300 ${
            scrolled
              ? 'border-white/70 bg-white/90 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl'
              : 'border-transparent bg-white/70 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-3 sm:px-5">
            <LogoMark />

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">
                  <span className="inline-flex items-center gap-2">
                    {link.label}
                    {link.label === 'Jobs' && jobCount > 0 && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                        {jobCount}
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <button type="button" onClick={() => setLoginOpen(true)} className="btn-secondary">
                Login
              </button>
              <Link to="/demo" className="btn-primary">
                Request Demo
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="overflow-hidden border-t border-slate-200/80 px-4 pb-5 pt-4 lg:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                      <span>{link.label}</span>
                      {link.label === 'Jobs' && jobCount > 0 ? (
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                          {jobCount}
                        </span>
                      ) : (
                        <Sparkles size={16} className="text-blue-600" />
                      )}
                    </a>
                  ))}
                </div>

                <div className="mt-4 grid gap-3">
                  <button type="button" onClick={() => setLoginOpen(true)} className="btn-secondary w-full">
                    Login
                  </button>
                  <Link to="/demo" className="btn-primary w-full">
                    Request Demo
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
