'use client';

import { useRegion } from '@/lib/contexts/RegionContext';
import Script from 'next/script';

/**
 * Answer Engine Optimization (AEO) JSON-LD Structured Data
 *
 * Provides rich structured data for:
 * - Google Search & Featured Snippets
 * - AI Answer Engines (ChatGPT, Perplexity, etc.)
 * - Voice Assistants
 *
 * Schemas included:
 * - Organization: Company information
 * - LocalBusiness: Region-specific business data
 * - Service: Service offerings
 * - WebSite: Site-level schema with search action
 */

interface StructuredDataProps {
  type: 'home' | 'service' | 'contact' | 'blog';
  serviceData?: {
    name: string;
    description: string;
    url: string;
  };
}

export default function StructuredData({ type, serviceData }: StructuredDataProps) {
  const { currentRegion, regionData } = useRegion();

  // Organization Schema - Global company information
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Black Arrow Technologies',
    alternateName: 'BAT',
    url: 'https://blackarrowtechnologies.com',
    logo: 'https://blackarrowtechnologies.com/logo.svg',
    description:
      'AI-Native Marketing & Web Development agency serving UK, UAE, and India markets. We engineer digital sales machines with e-commerce development, performance ads, automation, and technical SEO.',
    slogan: "We don't do pretty websites. We engineer digital sales machines.",
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'hello@blackarrowtechnologies.com',
      availableLanguage: ['English', 'Arabic', 'Hindi'],
    },
    sameAs: [
      'https://linkedin.com/company/black-arrow-technologies',
      'https://twitter.com/blackarrowtech',
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    knowsAbout: [
      'E-commerce Development',
      'Performance Marketing',
      'AI Automation',
      'Technical SEO',
      'Headless Commerce',
      'Next.js Development',
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
    ],
  };

  // LocalBusiness Schema - Region-specific
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://blackarrowtechnologies.com/#business-${currentRegion.toLowerCase()}`,
    name: `Black Arrow Technologies - ${regionData.name}`,
    image: 'https://blackarrowtechnologies.com/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: currentRegion === 'UK' ? 'GB' : currentRegion === 'UAE' ? 'AE' : 'IN',
      addressRegion: regionData.name,
    },
    url: `https://${regionData.domain}`,
    priceRange: regionData.currency === 'GBP' ? '£££' : regionData.currency === 'AED' ? 'AED' : '₹₹₹',
    currenciesAccepted: regionData.currency,
    paymentAccepted: 'Bank Transfer, Stripe, PayPal',
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  // WebSite Schema - Site search capability
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Black Arrow Technologies',
    url: 'https://blackarrowtechnologies.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://blackarrowtechnologies.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Service Schema - For service pages
  const getServiceSchema = (service: typeof serviceData) => {
    if (!service) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'Black Arrow Technologies',
        url: 'https://blackarrowtechnologies.com',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.name,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
            },
          },
        ],
      },
      url: service.url,
    };
  };

  // Breadcrumb Schema
  const breadcrumbSchema = type === 'service' && serviceData ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://blackarrowtechnologies.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://blackarrowtechnologies.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: serviceData.name,
        item: serviceData.url,
      },
    ],
  } : null;

  // Combine schemas based on page type
  const schemas: Array<Record<string, any>> = [organizationSchema, localBusinessSchema];

  if (type === 'home') {
    schemas.push(websiteSchema);
  }

  if (type === 'service' && serviceData) {
    const serviceSchema = getServiceSchema(serviceData);
    if (serviceSchema) schemas.push(serviceSchema);
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${type}-${index}`}
          id={`schema-${type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
