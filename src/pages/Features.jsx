import React from 'react';
import CTASection from '../components/CTASection';
import ModulesShowcase from '../components/ModulesShowcase';
import Seo from '../components/Seo';
import { ECOSYSTEM_VERTICALS, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const platform = ECOSYSTEM_VERTICALS.find((item) => item.id === 'platform');

export default function Features() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.features.title}
        description={PAGE_COPY.features.description}
        canonical={`${SITE_URL}/features`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Platform', url: `${SITE_URL}/features` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="features-overview" className="container-shell">
          <div className="surface-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Platform</span>
            <h1 className="section-title">{PAGE_COPY.features.h1}</h1>
            <p className="section-copy max-w-3xl">{platform.subtitle}</p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{platform.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {platform.benefits.map((benefit) => (
                <span key={benefit} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="platform-modules" className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {platform.modules.map((module) => (
                <article
                  key={module.name}
                  id={module.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="surface-card p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Module</p>
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{module.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{module.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ModulesShowcase />
        <CTASection />
      </main>
    </>
  );
}
