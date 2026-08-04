import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_TAGLINE } from '../content/marketingContent';
import { trackEvent } from '../lib/analytics';

export default function CTASection({ showConsultationButton = true }) {
  return (
    <section id="contact-cta" className="section-shell section-divider bg-white">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[20px] bg-[#060606] px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,124,0,0.25),transparent_65%),radial-gradient(ellipse_at_bottom_left,rgba(234,124,0,0.15),transparent_50%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <span className="inline-block rounded-full bg-[#ea7c00]/20 px-3 py-1 font-['Nunito_Sans'] text-[10px] font-bold uppercase tracking-[0.2em] text-[#ea7c00]">Get Started</span>
              <h2 className="mt-3 font-['Nunito_Sans'] text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-white">
                Need help choosing the right workforce solution?
              </h2>
              <p className="mt-3 max-w-2xl font-['Nunito_Sans'] text-sm leading-relaxed text-white/80 sm:text-base">
                {BRAND_TAGLINE}. Start with an advisory conversation and we&apos;ll help you map the right
                mix of consulting, platform modules, and growth programs for your team.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {showConsultationButton && (
                <Link
                  to="/contact"
                  className="btn-primary rounded-full px-7 py-3 font-['Nunito_Sans'] text-xs font-bold uppercase tracking-wider shadow-lg"
                  onClick={() => trackEvent('book_consultation_click', { source: 'cta_section' })}
                >
                  Book a Consultation
                </Link>
              )}
              <Link
                to="/demo"
                className="btn-secondary rounded-full border-white/30 bg-transparent px-7 py-3 font-['Nunito_Sans'] text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-white/10 hover:text-white"
                onClick={() => trackEvent('demo_cta_click', { source: 'cta_section' })}
              >
                Request a Platform Demo
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

