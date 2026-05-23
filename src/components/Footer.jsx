import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_DESCRIPTION, BRAND_TAGLINE, FOOTER_TAGLINES, NAV_STRUCTURE } from '../content/marketingContent';

export default function Footer() {
  const productLinks = [
    NAV_STRUCTURE.main.find((item) => item.label === 'Solutions'),
    NAV_STRUCTURE.main.find((item) => item.label === 'Platform'),
    { label: 'Pricing', href: '/pricing' },
    { label: 'Jobs', href: '/jobs' }
  ].filter(Boolean);

  const companyLinks = [
    NAV_STRUCTURE.main.find((item) => item.label === 'About Us'),
    NAV_STRUCTURE.main.find((item) => item.label === 'TalentSphere'),
    NAV_STRUCTURE.main.find((item) => item.label === 'Insights'),
    NAV_STRUCTURE.main.find((item) => item.label === 'Contact Us')
  ].filter(Boolean);

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
              <img src="/dark-logo-full.png" alt="talentCIO" className="h-16 w-auto max-w-[430px] object-contain" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              {BRAND_DESCRIPTION}
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-100">{BRAND_TAGLINE}</p>
            <div className="mt-4 space-y-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              {FOOTER_TAGLINES.slice(1).map((tagline) => (
                <p key={tagline}>{tagline}</p>
              ))}
            </div>
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
              {productLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block transition hover:text-white">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Company</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {companyLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block transition hover:text-white">{link.label}</Link>
              ))}
              <Link to="/demo" className="block transition hover:text-white">Request Demo</Link>
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
      </div>
    </footer>
  );
}
