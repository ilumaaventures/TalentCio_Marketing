import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Seo from '../components/Seo';
import { ECOSYSTEM_VERTICALS, PAGE_COPY, SITE_URL, buildBreadcrumbSchema, buildServiceSchema } from '../content/marketingContent';
import usePrerenderReady from '../hooks/usePrerenderReady';

const solutions = ECOSYSTEM_VERTICALS.find((item) => item.id === 'solutions');

export default function Solutions() {
  usePrerenderReady();

  return (
    <>
      <Seo
        title={PAGE_COPY.solutions.title}
        description={PAGE_COPY.solutions.description}
        canonical={`${SITE_URL}/solutions`}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumbSchema([
              { name: 'Home', url: SITE_URL },
              { name: 'Solutions', url: `${SITE_URL}/solutions` }
            ]),
            buildServiceSchema(
              'Talent Intelligence Solutions',
              solutions.description,
              `${SITE_URL}/solutions`
            )
          ]
        }}
      />

      <main className="bg-white pb-20 pt-28">
        <section id="solutions-overview" className="container-shell">
          <div className="surface-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="section-kicker">{solutions.number} Solutions</span>
            <h1 className="section-title section-title-compact">{PAGE_COPY.solutions.h1}</h1>
            <p className="section-copy max-w-3xl">{solutions.subtitle}</p>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">{solutions.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book a Consultation</Link>
              <Link to="/demo" className="btn-secondary">Discuss Platform Fit</Link>
            </div>
          </div>
        </section>

        <section id="solutions-services" className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {solutions.services.map((service) => (
                <article
                  key={service.name}
                  id={service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="surface-card p-6"
                >
                  <h2 className="mt-4 text-2xl font-bold text-slate-950">{service.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{service.desc}</p>
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
