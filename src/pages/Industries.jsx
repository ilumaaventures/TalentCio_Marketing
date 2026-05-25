import React from 'react';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { INDUSTRIES_SERVED, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

export default function Industries() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.industries.title}
        description={PAGE_COPY.industries.description}
        canonical={`${SITE_URL}/industries`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Industries', url: `${SITE_URL}/industries` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="industries-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Industries</span>
            <h1 className="section-title">{PAGE_COPY.industries.h1}</h1>
            <p className="section-copy max-w-3xl">
              talentCIO is designed to adapt to different hiring models, workforce structures, and
              operational realities across high-growth and established sectors.
            </p>
          </div>
        </section>

        <section id="industries-grid" className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {INDUSTRIES_SERVED.map((industry) => (
                <article key={industry.name} className="surface-card p-6">
                  <h2 className="text-2xl font-bold text-slate-950">{industry.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{industry.desc}</p>
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
