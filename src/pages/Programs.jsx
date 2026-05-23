import React from 'react';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { FLAGSHIP_PROGRAMS, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

export default function Programs() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.programs.title}
        description={PAGE_COPY.programs.description}
        canonical={`${SITE_URL}/programs`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Programs', url: `${SITE_URL}/programs` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="programs-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Flagship Programs</span>
            <h1 className="section-title">{PAGE_COPY.programs.h1}</h1>
            <p className="section-copy max-w-3xl">
              Programs built for both professionals and organizations that want stronger positioning,
              sharper talent outcomes, and measurable workforce progress.
            </p>
          </div>
        </section>

        <section id="programs-list" className="section-shell">
          <div className="container-shell space-y-8">
            {FLAGSHIP_PROGRAMS.map((program) => (
              <article key={program.id} id={program.id} className="surface-card p-6 sm:p-8">
                <span className="section-kicker">{program.title}</span>
                <h2 className="mt-4 text-3xl font-bold text-slate-950">{program.subtitle}</h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">{program.description}</p>
                <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                  <strong className="text-slate-950">Positioning:</strong> {program.positioning}
                </div>
                <div className="mt-4 rounded-[28px] border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-7 text-blue-900">
                  {program.philosophy}
                </div>

                {'services' in program && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {program.services.map((item) => (
                      <div key={item.name} className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {'focusAreas' in program && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {program.focusAreas.map((item) => (
                      <div key={item.name} className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {'framework' in program && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {program.framework.map((item) => (
                      <div key={item.name} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-lg font-bold text-slate-950">{item.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
