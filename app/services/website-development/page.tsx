'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import TrustBadges from '@/components/ui/TrustBadges';
import { useRegion } from '@/lib/contexts/RegionContext';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import { IMAGES } from '@/lib/constants/images';
import { Layout, Briefcase, Code, ArrowRight, CheckCircle2, Zap, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Regional pricing for Landing Page
const LANDING_PAGE_PRICES: Record<string, string> = {
  UK: '£350',
  UAE: 'AED 1,299',
  IND: '₹29,999',
};

const services = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'High-converting single-page websites perfect for campaigns, product launches, or lead generation.',
    icon: Layout,
    href: '/services/website-development/landing-page',
    features: ['Mobile-first design', 'SEO optimized', 'Fast loading', 'Lead capture forms'],
    showPrice: true,
    cta: 'View Pricing',
  },
  {
    id: 'business-site',
    title: 'Business Website',
    description: 'Professional multi-page websites that establish credibility and showcase your brand story.',
    icon: Briefcase,
    href: '/services/website-development/business-site',
    features: ['Multiple pages', 'Blog integration', 'Contact forms', 'Analytics setup'],
    showPrice: false,
    cta: 'Get Quote',
  },
  {
    id: 'custom-web-app',
    title: 'Custom Web App',
    description: 'Tailored web applications with complex functionality, user authentication, and database integration.',
    icon: Code,
    href: '/services/website-development/custom-web-app',
    features: ['Custom functionality', 'User authentication', 'Database integration', 'API development'],
    showPrice: false,
    cta: 'Get Quote',
  },
];

const whyChooseUs = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for Core Web Vitals and peak performance',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Built with security best practices and 99.9% uptime',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Landing pages delivered in 5-7 business days',
  },
];

export default function WebsiteDevelopmentPage() {
  const { currentRegion } = useRegion();
  const { openQuote } = useWebDevQuote();
  const landingPagePrice = LANDING_PAGE_PRICES[currentRegion] || LANDING_PAGE_PRICES.UK;

  return (
    <main className="pb-20">
      {/* Hero Section with Image */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-warm-sand/5 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up" duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-sand/10 text-warm-sand text-sm font-medium mb-6">
                <Code size={16} />
                Website Development
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
                Websites That <span className="text-warm-sand">Convert</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed mb-8">
                From simple landing pages to complex web applications. We build digital experiences
                that drive results for businesses in UK, UAE, and India.
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('website-development')}>
                    Get Free Quote
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                <a href="#our-work">
                  <Button variant="secondary" className="px-8 py-4 text-lg">
                    See Our Work
                  </Button>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.4}>
              <TrustBadges variant="compact" />
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.websiteDev.responsive}
                alt="Website development on multiple devices"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian/30 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Services Grid */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Choose Your Solution
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Three tailored offerings to match your budget and goals.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const price = service.showPrice ? landingPagePrice : null;

            return (
              <FadeIn key={service.id} direction="up" duration={0.6} delay={index * 0.1}>
                <Card hover className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-warm-sand/10 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-warm-sand" />
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer">
                      {service.title}
                    </h3>
                    {price && (
                      <span className="text-warm-sand font-bold text-lg">
                        {price}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-cloud-dancer/70 mb-4 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-cloud-dancer/70">
                        <CheckCircle2 size={16} className="text-warm-sand flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="flex items-center justify-center gap-2 w-full bg-warm-sand text-deep-obsidian font-bold py-3 px-4 rounded-lg hover:bg-warm-sand/90 transition-all group"
                  >
                    {service.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Portfolio / Our Work */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900" id="our-work">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Our Recent Work
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Real websites we&apos;ve built for real businesses. Click to explore them live.
            </p>
          </FadeIn>
        </div>

        <ProjectShowcase showFilters />
      </Section>

      {/* Trust Badges Full */}
      <Section className="py-12">
        <TrustBadges variant="horizontal" />
      </Section>

      {/* Why Choose Us */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Why Choose Black Arrow?
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              We don&apos;t just build websites. We engineer digital sales machines.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} direction="up" duration={0.6} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-warm-sand/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-warm-sand" />
                  </div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <div className="bg-gradient-to-r from-warm-sand/10 to-warm-sand/5 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Not Sure Which Option?
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your project requirements and find the perfect solution for your business.
            </p>
            <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('website-development')}>
                Get Free Consultation
                <ArrowRight size={20} className="ml-2" />
              </Button>
          </div>
        </FadeIn>
      </Section>
    </main>
  );
}
