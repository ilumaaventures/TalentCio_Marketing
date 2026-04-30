import React from 'react';
import LegalDocumentPage from '../components/LegalDocumentPage';
import { privacySections } from '../content/legalContent';

export default function PrivacyPolicy() {
  return (
    <LegalDocumentPage
      title="Privacy Policy | TalentCIO"
      description="Read how TalentCIO collects, uses, stores, and protects personal information on the platform."
      canonicalPath="/privacy"
      heroTitle="Privacy Policy"
      heroCopy="This policy explains how TalentCIO collects, uses, and protects your personal information."
      summary="TalentCIO is an HR and recruitment platform for Indian businesses. We collect only what's needed to run our service, never sell your data, and store everything on servers in India. This full policy explains the details."
      sections={privacySections}
      lastUpdated="April 30, 2026"
      effectiveDate="April 28, 2026"
      contactEmail="privacy@talentcio.in"
    />
  );
}
