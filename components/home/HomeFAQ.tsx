'use client';

import { useMemo } from 'react';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/animations/FadeIn';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { useRegion } from '@/lib/contexts/RegionContext';

const RETAINER_PRICES: Record<string, string> = {
  UK: '£75',
  UAE: 'AED 350',
  IND: '₹5,000',
};

export default function HomeFAQ() {
  const { currentRegion } = useRegion();

  const faqItems = useMemo(() => [
    {
      question: "What's your typical project timeline?",
      answer: "Landing pages: 48-72 hours. Marketing campaigns: 8-10 days to launch. Automation projects: 3-6 weeks. We work in 2-week sprints with continuous delivery."
    },
    {
      question: "Do you work with startups or just established businesses?",
      answer: "Both! Startups get lean MVPs with growth engines. Established businesses get enterprise-grade solutions."
    },
    {
      question: "What if I need ongoing support after launch?",
      answer: `We offer retainer packages starting at ${RETAINER_PRICES[currentRegion] || RETAINER_PRICES.UK}/month. Includes hosting, monitoring, security updates, and 10 hours of development/optimization work monthly.`
    },
    {
      question: "Can you integrate with our existing tech stack?",
      answer: "Yes. We work with CRMs (HubSpot, Salesforce), ERPs (SAP, Oracle), payment gateways (Stripe, PayPal, regional options), and custom APIs. If it has an API, we can connect it."
    }
  ], [currentRegion]);

  return (
    <Section>
      <FadeIn direction="up" duration={0.6}>
        <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Everything you need to know before we start
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1} duration={0.6}>
        <FAQAccordion items={faqItems} />
      </FadeIn>
    </Section>
  );
}
