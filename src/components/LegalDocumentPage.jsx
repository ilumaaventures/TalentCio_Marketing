import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from './Seo';
import { SITE_URL } from '../content/marketingContent';

function renderBody(body) {
  const blocks = body.split('\n\n');

  return blocks.map((block, index) => {
    const lines = block.split('\n').filter(Boolean);
    const isList = lines.every((line) => line.startsWith('- '));

    if (isList) {
      return (
        <ul key={`${block.slice(0, 16)}-${index}`} className="space-y-2 pl-5 text-sm leading-8 text-slate-600">
          {lines.map((line) => (
            <li key={line}>{line.slice(2)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`${block.slice(0, 16)}-${index}`} className="text-sm leading-8 text-slate-600">
        {block}
      </p>
    );
  });
}

export default function LegalDocumentPage({
  title,
  description,
  canonicalPath,
  heroTitle,
  heroCopy,
  summary,
  sections,
  lastUpdated,
  effectiveDate,
  contactEmail
}) {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: heroTitle,
      url: `${SITE_URL}${canonicalPath}`,
      description
    }),
    [canonicalPath, description, heroTitle]
  );

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonical={`${SITE_URL}${canonicalPath}`}
        schema={schema}
      />

      <main className="min-h-screen bg-white pb-20 pt-28">
        <section className="border-b border-blue-100 bg-[linear-gradient(180deg,#f0f5ff_0%,#f8fbff_100%)]">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <Link to="/" className="text-sm font-semibold text-blue-700 transition hover:text-blue-800">
              Back to TalentCIO
            </Link>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{heroTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{heroCopy}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <p><span className="font-semibold text-slate-700">Last updated:</span> {lastUpdated}</p>
              <p><span className="font-semibold text-slate-700">Effective date:</span> {effectiveDate}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Contents</p>
              <nav className="mt-4 space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div>
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
              <strong>Summary:</strong> {summary}
            </div>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="border-b border-slate-200 pb-3 text-xl font-bold text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.content.map((item, index) => (
                      <div key={`${section.id}-${index}`} className="space-y-2">
                        {item.heading ? (
                          <h3 className="text-sm font-semibold text-slate-900">{item.heading}</h3>
                        ) : null}
                        <div className="space-y-4">{renderBody(item.body)}</div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-[28px] border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-7 text-blue-900">
              <strong>Questions?</strong> Email{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-blue-700">
                {contactEmail}
              </a>
              . We respond within 5 business days.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
