import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Building2, ChevronDown, LogOut, Menu, Sparkles, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { clearPublicJobsApiMissing, isPublicJobsApiMissing, markPublicJobsApiMissing } from '../api/publicCapabilities';
import { NAV_STRUCTURE } from '../content/marketingContent';
import { useApplicantAuth } from '../context/ApplicantAuthContext';
import { trackEvent } from '../lib/analytics';
import isPrerender from '../utils/isPrerender';

function LogoMark() {
  return (
    <Link to="/" className="flex items-center" aria-label="talentCIO home">
      <img
        src="/navbar-logo.png"
        alt="talentCIO"
        className="h-9 w-auto max-w-[240px] object-contain sm:h-10 sm:max-w-[280px]"
      />
    </Link>
  );
}

function isNavLinkActive(currentPath, href) {
  const basePath = href.split('#')[0];

  if (basePath === '/') {
    return currentPath === '/';
  }

  return currentPath === basePath || currentPath.startsWith(`${basePath}/`);
}

export default function Navbar() {
  const location = useLocation();
  const { isLoggedIn, applicant, logout } = useApplicantAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const jobCountLabel = jobCount > 99 ? '99+' : String(jobCount);

  const navLinks = useMemo(
    () => {
      const priorityLabels = new Set([
        'About Us',
        'Solutions',
        'Platform',
        'TaleEx',
        'TalentSphere',
        'Insights',
        'Contact Us'
      ]);

      return [
        ...NAV_STRUCTURE.main
          .filter((link) => priorityLabels.has(link.label))
          .map((link) => ({
            ...link,
            shortLabel:
              link.label === 'About Us'
                ? 'About'
                : link.label === 'Contact Us'
                  ? 'Contact'
                  : link.label
          })),
        { label: 'Jobs', href: '/jobs' }
      ];
    },
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
      if (isPrerender()) {
        setJobCount(0);
        return;
      }

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
          className={`mx-auto w-full max-w-[86rem] px-4 sm:px-5 lg:px-6 rounded-[28px] border transition-all duration-300 ${
            scrolled
              ? 'border-white/70 bg-white/90 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl'
              : 'border-transparent bg-white/70 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between px-2.5 py-2.5 sm:px-4">
            <LogoMark />

            <nav className="hidden items-center gap-3 xl:gap-4 lg:flex">
              {navLinks.map((link) => {
                const active = isNavLinkActive(location.pathname, link.href);

                return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-2 py-1 text-sm font-semibold transition ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-blue-700'
                  } ${link.label === 'Jobs' && jobCount > 0 ? 'relative pr-4' : ''
                  }`}
                >
                  <span className="inline-flex items-center">
                    {link.shortLabel || link.label}
                    {link.label === 'Jobs' && jobCount > 0 && (
                      <span className="absolute -right-1 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-white bg-blue-600 px-1.5 text-[10px] font-bold leading-none text-white shadow-sm">
                        {jobCountLabel}
                      </span>
                    )}
                  </span>
                </Link>
                );
              })}
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
                  className="btn-secondary whitespace-nowrap"
                  onClick={() => trackEvent('applicant_sign_in_click', { source: 'navbar_desktop' })}
                >
                  Sign In
                </Link>
              )}
              <Link to="/company/login" className="btn-secondary flex items-center gap-2 whitespace-nowrap">
                <Building2 size={14} />
                Company Login
              </Link>
              <Link
                to="/demo"
                className="btn-primary whitespace-nowrap"
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
                  {navLinks.map((link) => {
                    const active = isNavLinkActive(location.pathname, link.href);

                    return (
                    <Link
                      key={link.label}
                      to={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.label === 'Jobs' && jobCount > 0 ? (
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                          {jobCountLabel}
                        </span>
                      ) : (
                        <Sparkles size={16} className="text-blue-600" />
                      )}
                    </Link>
                    );
                  })}
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
                    Company Login
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
