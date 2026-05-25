import React from 'react';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { ECOSYSTEM_VERTICALS, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const talentsphere = ECOSYSTEM_VERTICALS.find((item) => item.id === 'talentsphere');

export default function TalentSphere() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.talentsphere.title}
        description={PAGE_COPY.talentsphere.description}
        canonical={`${SITE_URL}/talentsphere`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'TalentSphere', url: `${SITE_URL}/talentsphere` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="talentsphere-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">{talentsphere.number} Community</span>
            <h1 className="section-title">{PAGE_COPY.talentsphere.h1}</h1>
            <p className="section-copy max-w-3xl">{talentsphere.subtitle}</p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{talentsphere.description}</p>
            <div className="mt-6 rounded-[28px] border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-900">
              {talentsphere.positioning}
            </div>
          </div>
        </section>

        <section id="network" className="section-shell">
          <div className="container-shell">
            <div className="surface-card p-6 sm:p-8">
              <span className="section-kicker">Who It Is For</span>
              <div className="mt-6 flex flex-wrap gap-3">
                {talentsphere.members.map((member) => (
                  <span key={member} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="knowledge" className="section-shell bg-[var(--surface)]">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {talentsphere.focusAreas.map((area) => (
                <article
                  key={area.name}
                  id={area.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="surface-card p-6"
                >
                  <h2 className="text-2xl font-bold text-slate-950">{area.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{area.desc}</p>
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
