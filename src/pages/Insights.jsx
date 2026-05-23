import React from 'react';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { MARKET_SIGNALS, MARKET_SOURCES, PAGE_COPY, SITE_URL, buildBreadcrumbSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

export default function Insights() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.insights.title}
        description={PAGE_COPY.insights.description}
        canonical={`${SITE_URL}/insights`}
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Insights', url: `${SITE_URL}/insights` }
        ])}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="insights-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Insights</span>
            <h1 className="section-title">{PAGE_COPY.insights.h1}</h1>
            <p className="section-copy max-w-3xl">
              Market signals and practical context for leaders thinking about hiring demand, HR technology,
              and the cost of fragmented workforce systems.
            </p>
          </div>
        </section>

        <section id="insights-signals" className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 lg:grid-cols-3">
              {MARKET_SIGNALS.map((signal) => (
                <article key={signal.title} className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{signal.title}</p>
                  <p className="mt-4 text-4xl font-bold text-slate-950">{signal.value}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{signal.detail}</p>
                  <a href={signal.source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-blue-700">
                    Source: {signal.source.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="insights-sources" className="section-shell bg-[var(--surface)]">
          <div className="container-shell">
            <div className="surface-card p-6 sm:p-8">
              <span className="section-kicker">Sources</span>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Object.values(MARKET_SOURCES).map((source) => (
                  <article key={source.url} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <h2 className="text-lg font-bold text-slate-950">{source.label}</h2>
                    <p className="mt-2 text-sm text-slate-500">{source.date}</p>
                    <a href={source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-blue-700">
                      Open source
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
