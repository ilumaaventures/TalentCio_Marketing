import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_DESCRIPTION, NAV_STRUCTURE } from '../content/marketingContent';

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
    <footer className="border-t border-white/10 bg-[#060606] text-white">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.7fr))]">
          <div>
            <div className="py-1">
              <img src="/dark-logo-full.png" alt="talentCIO" className="h-16 w-auto max-w-[430px] object-contain" />
            </div>
            <p className="mt-4 max-w-sm font-['Nunito_Sans'] text-sm leading-relaxed text-white/70">
              {BRAND_DESCRIPTION}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition duration-300 hover:border-[#ea7c00] hover:bg-[#ea7c00] hover:text-white">
                <Linkedin size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition duration-300 hover:border-[#ea7c00] hover:bg-[#ea7c00] hover:text-white">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-['Nunito_Sans'] text-xs font-extrabold uppercase tracking-[0.22em] text-[#ea7c00]">Product</h3>
            <div className="mt-4 space-y-2.5 font-['Nunito_Sans'] text-sm text-white/70">
              {productLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block transition-colors duration-200 hover:text-[#ea7c00]">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-['Nunito_Sans'] text-xs font-extrabold uppercase tracking-[0.22em] text-[#ea7c00]">Company</h3>
            <div className="mt-4 space-y-2.5 font-['Nunito_Sans'] text-sm text-white/70">
              {companyLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block transition-colors duration-200 hover:text-[#ea7c00]">{link.label}</Link>
              ))}
              <Link to="/demo" className="block transition-colors duration-200 hover:text-[#ea7c00]">Request Demo</Link>
            </div>
          </div>

          <div>
            <h3 className="font-['Nunito_Sans'] text-xs font-extrabold uppercase tracking-[0.22em] text-[#ea7c00]">Legal</h3>
            <div className="mt-4 space-y-2.5 font-['Nunito_Sans'] text-sm text-white/70">
              <Link
                to="/cookies"
                className="block transition-colors duration-200 hover:text-[#ea7c00]"
              >
                Cookies Policy
              </Link>
              <Link
                to="/privacy"
                className="block transition-colors duration-200 hover:text-[#ea7c00]"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block transition-colors duration-200 hover:text-[#ea7c00]"
              >
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={openCookieSettings}
                className="block text-left transition-colors duration-200 hover:text-[#ea7c00]"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-['Nunito_Sans'] gap-4">
          <p>&copy; {new Date().getFullYear()} talentCIO. All rights reserved.</p>
          <p>Human Intelligence + Technology = Talent Intelligence</p>
        </div>
      </div>
    </footer>
  );
}

