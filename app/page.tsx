'use client';

import StructuredData from '@/components/seo/StructuredData';
import ClientLogoBar from '@/components/ui/ClientLogoBar';
import AIToolLogos from '@/components/ui/AIToolLogos';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import ServicesGrid from '@/components/home/ServicesGrid';
import CaseStudyHighlight from '@/components/home/CaseStudyHighlight';
import ProcessSection from '@/components/home/ProcessSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HomeFAQ from '@/components/home/HomeFAQ';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <StructuredData type="home" />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content">
        <HeroSection />
        <ClientLogoBar />
        <StatsBar />
        <ServicesGrid />
        <CaseStudyHighlight />
        <ProcessSection />
        <WhyChooseUs />
        <AIToolLogos />
        <TestimonialsSection />
        <HomeFAQ />
        <FinalCTA />
      </main>
    </>
  );
}
