import React from 'react';
import CTASection from '../components/CTASection';
import FeaturesSection from '../components/FeaturesSection';
import ModulesShowcase from '../components/ModulesShowcase';
import Seo from '../components/Seo';
import { MARKET_SIGNALS, PAGE_COPY, SITE_URL } from '../content/marketingContent';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TalentCIO Features',
  url: `${SITE_URL}/features`,
  description: PAGE_COPY.features.description,
  about: {
    '@type': 'SoftwareApplication',
    name: 'TalentCIO',
    applicationCategory: 'BusinessApplication'
  }
};

export default function Features() {
  return (
    <>
      <Seo
        title={PAGE_COPY.features.title}
        description={PAGE_COPY.features.description}
        canonical={`${SITE_URL}/features`}
        schema={pageSchema}
      />

      <main className="bg-white pb-20 pt-28">
        <section className="container-shell">
          <div className="surface-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">Features</span>
            <h1 className="section-title">TalentCIO features built for real HR and hiring workflows</h1>
            <p className="section-copy max-w-3xl">
              TalentCIO brings attendance, hiring, onboarding, leave management, help desk workflows,
              and employee operations into one connected system so teams can move faster with fewer manual
              handoffs.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {MARKET_SIGNALS.map((signal) => (
                <article key={signal.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{signal.title}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">{signal.value}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{signal.detail}</p>
                  <a
                    href={signal.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                  >
                    Source: {signal.source.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />
        <ModulesShowcase />

        <section className="section-shell bg-[var(--surface)]">
          <div className="container-shell">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Operations in one place',
                  body:
                    'Keep attendance, leave approvals, employee records, and internal requests connected instead of split across spreadsheets and point tools.'
                },
                {
                  title: 'Hiring that feeds onboarding',
                  body:
                    'Move from public job posts to candidate pipelines and pre-joining workflows without re-entering the same information at every step.'
                },
                {
                  title: 'Modular rollout',
                  body:
                    'Start with the workflows you need now, then expand as new teams and operating models come online.'
                }
              ].map((item) => (
                <article key={item.title} className="surface-card p-6">
                  <h2 className="text-2xl font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
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
