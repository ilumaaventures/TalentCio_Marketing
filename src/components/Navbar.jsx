import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const desktopAuthMenuRef = useRef(null);
  const mobileAuthMenuRef = useRef(null);
  const jobCountLabel = jobCount > 99 ? '99+' : String(jobCount);

  const navLinks = useMemo(
    () => {
      const priorityLabels = new Set([
        'Home',
        'Solutions',
        'Platform',
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
                  ? 'Connect'
                  : link.label
          })),
        { label: 'Jobs', shortLabel: 'Opportunities', href: '/jobs' }
      ];
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAuthMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!authMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      const clickedDesktopMenu = desktopAuthMenuRef.current?.contains(event.target);
      const clickedMobileMenu = mobileAuthMenuRef.current?.contains(event.target);

      if (!clickedDesktopMenu && !clickedMobileMenu) {
        setAuthMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [authMenuOpen]);

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
          className={`mx-auto w-full max-w-[1480px] rounded-full border px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled
              ? 'border-black/[0.08] bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl'
              : 'border-slate-200/80 bg-white/88 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between px-2 py-2.5 sm:px-3">
            <LogoMark />

            <nav className="hidden items-center gap-1.5 font-['Nunito_Sans'] xl:gap-2 lg:flex">
              {navLinks.map((link) => {
                const active = isNavLinkActive(location.pathname, link.href);

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] font-medium transition-all duration-200 ${
                      active
                        ? 'bg-[#ea7c00] font-semibold text-white shadow-sm'
                        : 'text-[#5b5b5b] hover:bg-[#ea7c00]/10 hover:text-[#ea7c00]'
                    } ${link.label === 'Jobs' && jobCount > 0 ? 'pr-4' : ''}`}
                  >
                    <span className="inline-flex items-center">
                      {link.shortLabel || link.label}
                      {link.label === 'Jobs' && jobCount > 0 && (
                        <span className="absolute -right-1 -top-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-white bg-[#ea7c00] px-1.5 text-[10px] font-bold leading-none text-white shadow-sm">
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
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#282828] transition hover:border-[#ea7c00] hover:text-[#ea7c00]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ea7c00] text-xs font-bold text-white">
                      {applicant?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                    My Account
                    <ChevronDown size={13} />
                  </button>

                  <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 rounded-[16px] border border-black/[0.08] bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    <Link to="/my-applications" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]">
                      <Briefcase size={14} />
                      My Applications
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]">
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
                <div ref={desktopAuthMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAuthMenuOpen((current) => !current)}
                    className="btn-secondary whitespace-nowrap px-5 py-2.5 text-xs tracking-wider"
                    aria-expanded={authMenuOpen}
                    aria-haspopup="menu"
                  >
                    LOGIN
                    <ChevronDown size={14} className={`transition ${authMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {authMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full z-50 mt-2 w-56 rounded-[16px] border border-black/[0.08] bg-white p-2 shadow-xl"
                      >
                        <Link
                          to="/applicant/login"
                          className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]"
                          onClick={() => {
                            setAuthMenuOpen(false);
                            trackEvent('applicant_sign_in_click', { source: 'navbar_desktop_dropdown' });
                          }}
                        >
                          <User size={15} />
                          Sign In
                        </Link>
                        <Link
                          to="/company/login"
                          className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]"
                          onClick={() => setAuthMenuOpen(false)}
                        >
                          <Building2 size={15} />
                          Company Login
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <Link
                to="/demo"
                className="btn-primary whitespace-nowrap px-6 py-2.5 text-xs font-bold tracking-wider"
                onClick={() => trackEvent('demo_cta_click', { source: 'navbar_desktop' })}
              >
                REQUEST DEMO
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#282828] lg:hidden"
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
                <div className="space-y-2 font-['Nunito_Sans']">
                  {navLinks.map((link) => {
                    const active = isNavLinkActive(location.pathname, link.href);

                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                          active
                            ? 'border-[#ea7c00] bg-[#ea7c00] text-white'
                            : 'border-slate-200 bg-white text-[#444444] hover:text-[#ea7c00]'
                        }`}
                      >
                        <span>{link.shortLabel || link.label}</span>
                        {link.label === 'Jobs' && jobCount > 0 ? (
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[#ea7c00]">
                            {jobCountLabel}
                          </span>
                        ) : (
                          <Sparkles size={16} className={active ? 'text-white' : 'text-[#ea7c00]'} />
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
                    <div ref={mobileAuthMenuRef} className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setAuthMenuOpen((current) => !current)}
                        className="btn-secondary flex w-full items-center justify-center gap-2"
                        aria-expanded={authMenuOpen}
                        aria-haspopup="menu"
                      >
                        Login
                        <ChevronDown size={16} className={`transition ${authMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {authMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden rounded-[16px] border border-slate-200 bg-white p-2"
                          >
                            <div className="grid gap-2">
                              <Link
                                to="/applicant/login"
                                className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]"
                                onClick={() => {
                                  setAuthMenuOpen(false);
                                  trackEvent('applicant_sign_in_click', { source: 'navbar_mobile_dropdown' });
                                }}
                              >
                                <User size={16} />
                                Sign In
                              </Link>
                              <Link
                                to="/company/login"
                                className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold text-[#444444] transition hover:bg-[#f5f2ef] hover:text-[#ea7c00]"
                                onClick={() => setAuthMenuOpen(false)}
                              >
                                <Building2 size={16} className="text-[#ea7c00]" />
                                Company Login
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  <Link
                    to="/demo"
                    className="btn-primary w-full"
                    onClick={() => trackEvent('demo_cta_click', { source: 'navbar_mobile' })}
                  >
                    Request Demo
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

