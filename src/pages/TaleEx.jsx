import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { ECOSYSTEM_VERTICALS, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const taleex = ECOSYSTEM_VERTICALS.find((item) => item.id === 'taleex');

export default function TaleEx() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.taleex.title}
        description={PAGE_COPY.taleex.description}
        canonical={`${SITE_URL}/taleex`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'TaleEx', url: `${SITE_URL}/taleex` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="taleex-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">{taleex.number} Opportunity Exchange</span>
            <h1 className="section-title">{PAGE_COPY.taleex.h1}</h1>
            <p className="section-copy max-w-3xl">{taleex.subtitle}</p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{taleex.description}</p>
            <div className="mt-6 rounded-[28px] border border-orange-200 bg-orange-50 px-5 py-4 text-sm font-semibold text-orange-900">
              {taleex.positioning}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary">Explore Opportunities</Link>
              <Link to="/contact" className="btn-secondary">Partner With talentCIO</Link>
            </div>
          </div>
        </section>

        <section id="taleex-features" className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {taleex.features.map((feature) => (
                <article key={feature.name} className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">TaleEx</p>
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{feature.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
