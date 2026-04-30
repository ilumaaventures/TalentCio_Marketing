import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { cookiesSections } from '../content/legalContent';

export default function CookiesPolicy() {
  return (
    <LegalDocumentPage
      title="Cookies Policy | TalentCIO"
      description="Read how TalentCIO uses cookies and similar technologies on its website and marketing pages."
      canonicalPath="/cookies"
      heroTitle="Cookies Policy"
      heroCopy="This page explains how TalentCIO uses cookies and similar technologies, what types we use, and how you can manage your preferences."
      summary="TalentCIO uses essential, analytics, and preference cookies to keep the site working and understand usage. You can manage cookie choices through your browser settings and any consent controls we provide."
      sections={cookiesSections}
      lastUpdated="April 30, 2026"
      effectiveDate="April 30, 2026"
      contactEmail="privacy@talentcio.in"
    />
  );
}
