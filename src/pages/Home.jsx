import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ModulesShowcase from '../components/ModulesShowcase';
import HowItWorks from '../components/HowItWorks';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ModulesShowcase />
      <HowItWorks />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
