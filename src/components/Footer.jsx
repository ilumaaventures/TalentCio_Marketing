import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const openCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('talentcio:open-cookie-settings'));
    }
  };

  return (
    <footer className="bg-[var(--dark)] text-white">
      <div className="container-shell py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="py-1">
              <img src="/dark-logo-full.png" alt="TalentCIO" className="h-16 w-auto max-w-[430px] object-contain" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              From attendance and leaves to hiring, onboarding, projects, and internal support, TalentCIO
              helps teams work with one connected platform.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-3 text-slate-200 transition hover:border-blue-300 hover:text-white">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-3 text-slate-200 transition hover:border-blue-300 hover:text-white">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Product</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <Link to="/features" className="block transition hover:text-white">Features</Link>
              <a href="/#modules" className="block transition hover:text-white">Modules</a>
              <Link to="/pricing" className="block transition hover:text-white">Pricing</Link>
              <Link to="/jobs" className="block transition hover:text-white">Jobs</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Company</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <Link to="/about" className="block transition hover:text-white">About</Link>
              <Link to="/demo" className="block transition hover:text-white">Demo</Link>
              <Link to="/contact" className="block transition hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.32em] text-slate-400">Legal</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <Link
                to="/cookies"
                className="block font-medium transition hover:text-white"
              >
                Cookies Policy
              </Link>
              <Link
                to="/privacy"
                className="block font-medium transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block font-medium transition hover:text-white"
              >
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={openCookieSettings}
                className="block font-medium text-left transition hover:text-white"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
          (c) 2026 TalentCIO. All rights reserved. Built by Ilumaa Ventures.
        </div>
      </div>
    </footer>
  );
}
