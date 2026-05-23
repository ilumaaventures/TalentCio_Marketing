import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import {
  ABOUT_CONTENT,
  MARKET_SOURCES,
  MISSION,
  PAGE_COPY,
  SITE_URL,
  VISION,
  buildBreadcrumbSchema,
  buildOrganizationSchema
} from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

export default function About() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.about.title}
        description={PAGE_COPY.about.description}
        canonical={`${SITE_URL}/about`}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'About', url: `${SITE_URL}/about` }
            ]),
            buildOrganizationSchema()
          ]
        }}
      />

      <main className="bg-white pb-20 pt-28">
        <section className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_360px]">
            <div id="about-overview" className="surface-card p-6 sm:p-10">
              <span className="section-kicker">{ABOUT_CONTENT.kicker}</span>
              <h1 className="section-title">{ABOUT_CONTENT.headline}</h1>
              <p className="section-copy max-w-3xl">{ABOUT_CONTENT.intro}</p>

              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-950">{ABOUT_CONTENT.philosophy.title}</h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  {ABOUT_CONTENT.philosophy.tagline}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{ABOUT_CONTENT.philosophy.body}</p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {ABOUT_CONTENT.pillars.map((item) => (
                  <article key={item.title} className="rounded-[26px] border border-slate-200 bg-white p-5">
                    <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[VISION, MISSION].map((item) => (
                  <article key={item.title} className="rounded-[26px] border border-blue-200 bg-blue-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{item.kicker}</p>
                    <h2 className="mt-3 text-2xl font-bold text-slate-950">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside id="about-sources" className="surface-card h-fit p-6">
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
                Need help choosing between workforce consulting, platform adoption, or a broader ecosystem engagement?
              </div>

              <div className="mt-5 grid gap-3">
                <Link to="/contact" className="btn-primary w-full">
                  Book a Consultation
                </Link>
                <Link to="/demo" className="btn-secondary w-full">
                  Request a Platform Demo
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
