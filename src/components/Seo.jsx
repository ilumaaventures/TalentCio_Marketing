import { useEffect } from 'react';

const SITE_NAME = 'TalentCIO';
const DEFAULT_TITLE = 'TalentCIO | HRMS and Hiring Software for Indian Teams';
const DEFAULT_DESCRIPTION =
  'TalentCIO helps Indian teams manage attendance, hiring, onboarding, leaves, and employee operations in one connected platform.';
const DEFAULT_IMAGE = 'https://talentcio.in/logo-full.svg';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index,follow',
  schema
}) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = 'en';

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description
    });

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: robots
    });

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title
    });

    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description
    });

    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME
    });

    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: image
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: image
    });

    if (canonical) {
      upsertLink('link[rel="canonical"]', {
        rel: 'canonical',
        href: canonical
      });

      upsertMeta('meta[property="og:url"]', {
        property: 'og:url',
        content: canonical
      });
    }

    const schemaNodeId = 'talentcio-json-ld';
    const existingNode = document.getElementById(schemaNodeId);

    if (existingNode) {
      existingNode.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = schemaNodeId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const activeNode = document.getElementById(schemaNodeId);
      if (activeNode) {
        activeNode.remove();
      }
    };
  }, [canonical, description, image, robots, schema, title, type]);

  return null;
}
