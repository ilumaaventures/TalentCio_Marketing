import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_TAGLINE } from '../content/marketingContent';
import { trackEvent } from '../lib/analytics';

export default function CTASection({ showConsultationButton = true }) {
  return (
    <section id="contact-cta" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="editorial-panel overflow-hidden bg-[var(--dark)] px-6 py-10 text-white shadow-[0_35px_80px_-45px_rgba(15,23,42,0.72)] sm:px-10 sm:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,157,161,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,127,102,0.22),transparent_24%)]" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-100">Get Started</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Need help choosing the right workforce solution?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
                {BRAND_TAGLINE}. Start with an advisory conversation and we&apos;ll help you map the right
                mix of consulting, platform modules, and growth programs for your team.
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-3">
              {showConsultationButton && (
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-blue-50"
                  onClick={() => trackEvent('book_consultation_click', { source: 'cta_section' })}
                >
                  Book a Consultation
                </Link>
              )}
              <Link
                to="/demo"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                onClick={() => trackEvent('demo_cta_click', { source: 'cta_section' })}
              >
                Request a Platform Demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
