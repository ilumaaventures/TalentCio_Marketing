import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { termsSections } from '../content/legalContent';

export default function TermsOfService() {
  return (
    <LegalDocumentPage
      title="Terms of Service | TalentCIO"
      description="Read TalentCIO's terms of service for using our HR platform."
      canonicalPath="/terms"
      robots="noindex,follow"
      heroTitle="Terms of Service"
      heroCopy="Please read these terms carefully before using TalentCIO. By using our platform, you agree to be bound by them."
      summary="These terms govern your use of TalentCIO. Key points: you must be 18+, provide accurate information, not misuse the platform, and comply with Indian law. Employers are responsible for their own labour law compliance. Full details below."
      sections={termsSections}
      lastUpdated="April 30, 2026"
      effectiveDate="April 28, 2026"
      contactEmail="legal@talentcio.in"
    />
  );
}
