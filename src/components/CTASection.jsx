import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export default function CTASection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[36px] bg-[var(--primary)] px-6 py-10 text-white shadow-[0_35px_80px_-45px_rgba(17,92,185,0.9)] sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">Get Started</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to transform how your team works?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
                Use the demo flow to map TalentCIO around your attendance, hiring, onboarding, and employee
                operations priorities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                onClick={() => trackEvent('demo_cta_click', { source: 'cta_section' })}
              >
                Request a Demo
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                onClick={() => trackEvent('explore_opportunities_click', { source: 'cta_section' })}
              >
                Browse Jobs
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
