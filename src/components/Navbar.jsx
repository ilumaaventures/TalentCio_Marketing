import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Building2, ChevronDown, LogOut, Menu, Sparkles, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { clearPublicJobsApiMissing, isPublicJobsApiMissing, markPublicJobsApiMissing } from '../api/publicCapabilities';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import { trackEvent } from '../lib/analytics';

function LogoMark() {
  return (
    <Link to="/" className="flex items-center" aria-label="TalentCIO home">
      <img
        src="/navbar-logo.png"
        alt="TalentCIO"
        className="h-9 w-auto max-w-[240px] object-contain sm:h-10 sm:max-w-[280px]"
      />
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();
  const { isLoggedIn, applicant, logout } = useApplicantAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
              {isLoggedIn ? (
                <div className="group relative">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {applicant?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                    My Account
                    <ChevronDown size={13} />
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    <Link to="/my-applications" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50">
                      <Briefcase size={14} />
                      My Applications
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50">
                      <User size={14} />
                      My Profile
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/applicant/login"
                  className="btn-secondary"
                  onClick={() => trackEvent('applicant_sign_in_click', { source: 'navbar_desktop' })}
                >
                  Sign In
                </Link>
              )}
              <Link to="/company/login" className="btn-secondary flex items-center gap-2">
                <Building2 size={14} />
                Company Login
              </Link>
              <Link
                to="/demo"
                className="btn-primary"
                onClick={() => trackEvent('demo_cta_click', { source: 'navbar_desktop' })}
              >
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
                  {isLoggedIn ? (
                    <>
                      <Link to="/my-applications" className="btn-secondary w-full">
                        My Applications
                      </Link>
                      <Link to="/profile" className="btn-secondary w-full">
                        My Profile
                      </Link>
                      <button type="button" onClick={logout} className="w-full rounded-full border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/applicant/login"
                      className="btn-secondary w-full"
                      onClick={() => trackEvent('applicant_sign_in_click', { source: 'navbar_mobile' })}
                    >
                      Sign In
                    </Link>
                  )}
                  <Link
                    to="/demo"
                    className="btn-primary w-full"
                    onClick={() => trackEvent('demo_cta_click', { source: 'navbar_mobile' })}
                  >
                    Request Demo
                  </Link>
                  <Link to="/company/login" className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">
                    <Building2 size={16} className="text-blue-600" />
                    Employee Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
