import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { HOMEPAGE_MARKET_PARAGRAPH, MARKET_SOURCES, PAGE_COPY, SITE_URL } from '../content/marketingContent';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About TalentCIO',
  url: `${SITE_URL}/about`,
  description: PAGE_COPY.about.description
};

export default function About() {
  return (
    <>
      <Seo
        title={PAGE_COPY.about.title}
        description={PAGE_COPY.about.description}
        canonical={`${SITE_URL}/about`}
        schema={pageSchema}
      />

      <main className="bg-white pb-20 pt-28">
        <section className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_360px]">
            <div className="surface-card p-6 sm:p-10">
              <span className="section-kicker">About</span>
              <h1 className="section-title">TalentCIO exists to reduce fragmentation in people operations</h1>
              <p className="section-copy max-w-3xl">
                Indian teams often end up stitching together separate systems for attendance, hiring,
                onboarding, employee records, internal requests, and approvals. TalentCIO is designed to
                bring those workflows closer together so teams spend less time reconciling systems and more
                time moving work forward.
              </p>

              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-950">Why now</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{HOMEPAGE_MARKET_PARAGRAPH}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: 'Connected workflows',
                    body: 'Hiring data should support onboarding, employee data should feed day-to-day operations, and approvals should not live in separate silos.'
                  },
                  {
                    title: 'Practical rollout',
                    body: 'Start with the team pain points that are most urgent now, then expand the implementation as your process maturity grows.'
                  },
                  {
                    title: 'India-first operations',
                    body: 'Attendance patterns, internal approvals, and hiring complexity often look different for India-based teams than for generic global HR templates.'
                  },
                  {
                    title: 'Commercial clarity',
                    body: 'Trust is easier to build when product pages avoid inflated proof points and stay grounded in real, verifiable information.'
                  }
                ].map((item) => (
                  <article key={item.title} className="rounded-[26px] border border-slate-200 bg-white p-5">
                    <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="surface-card h-fit p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Sources used</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                {Object.values(MARKET_SOURCES).map((source) => (
                  <div key={source.url} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{source.label}</p>
                    <p className="text-slate-500">{source.date}</p>
                    <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex font-semibold text-blue-700">
                      Open source
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-900">
                Need implementation scope, pricing, or a walkthrough? Use the demo flow so your request goes
                straight to the commercial team.
              </div>

              <div className="mt-5">
                <Link to="/demo" className="btn-primary w-full">
                  Request a Demo
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <CTASection />
      </main>
    </>
  );
}
