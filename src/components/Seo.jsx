import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'TalentCIO';
const DEFAULT_TITLE = 'TalentCIO | HRMS and Hiring Software for Indian Teams';
const DEFAULT_DESCRIPTION =
  'TalentCIO helps Indian teams manage attendance, hiring, onboarding, leaves, and employee operations in one connected platform.';
const DEFAULT_IMAGE = 'https://talentcio.in/logo-full.svg';

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index,follow',
  schema
}) {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {schema ? (
        <script id="talentcio-json-ld" type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ) : null}
    </Helmet>
  );
}
