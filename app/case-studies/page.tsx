'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ShoppingCart, TrendingUp, Zap, Search } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';

const CASE_STUDIES = [
  {
    icon: <ShoppingCart size={24} />,
    industry: 'Automotive E-commerce',
    region: 'USA',
    title: '9,000+ Parts Catalogued & Online in 4 Weeks',
    description: 'Built a WooCommerce-powered parts finder with year/make/model lookup, connecting 200+ warehouses across all 50 US states. Transformed manual phone-order workflow into a fully searchable online catalogue.',
    image: IMAGES.caseStudies.autoparts,
    metrics: [
      { value: '9,000+', label: 'Parts Online' },
      { value: '200+', label: 'Warehouses' },
      { value: '<2s', label: 'Load Time' },
    ],
    quote: 'They took our entire catalogue and built a search system that actually works. Customers find what they need in seconds now.',
    client: 'Founder, Astern Autoparts',
    url: 'https://asternautoparts.com',
  },
  {
    icon: <Search size={24} />,
    industry: 'Interior Design',
    region: 'India',
    title: 'Portfolio-First Design That Converts Visitors to Consultations',
    description: 'Elegant portfolio website for Bangalore\'s premier interior design studio. Showcases luxury residential and commercial projects with a visual-first approach that drives consultation bookings.',
    image: IMAGES.caseStudies.interiorDesign,
    metrics: [
      { value: '50+', label: 'Projects Showcased' },
      { value: '2014', label: 'Est. Year' },
      { value: '5+', label: 'Design Categories' },
    ],
    quote: 'Our portfolio finally does our work justice. The site has become our best sales tool for new consultations.',
    client: 'Director, Marakk Design Atelier',
    url: 'https://marakkdesignatelier.com',
  },
  {
    icon: <TrendingUp size={24} />,
    industry: 'Real Estate',
    region: 'India',
    title: 'Property Listings That Sell Themselves',
    description: 'Luxury real estate platform for Bangalore with location-based neighbourhood browsing, interactive OpenStreetMap integration, and agent services. Premium property discovery made effortless.',
    image: IMAGES.caseStudies.realEstateBangalore,
    metrics: [
      { value: '5+', label: 'Neighbourhoods' },
      { value: 'Map', label: 'Integration' },
      { value: '24/7', label: 'Online Listings' },
    ],
    quote: 'Buyers can explore neighbourhoods before they even call us. The platform changed how we present listings entirely.',
    client: 'Managing Director, Marakk Developers',
    url: 'https://marakkdevelopers.com',
  },
  {
    icon: <Zap size={24} />,
    industry: 'E-commerce',
    region: 'India',
    title: 'From Showroom to Online Store in 3 Weeks',
    description: 'E-commerce store for Bangalore\'s trusted bicycle retailer with Google Ads conversion tracking, home test-ride booking, and a catalogue that brings the showroom experience online.',
    image: IMAGES.caseStudies.bicycleShop,
    metrics: [
      { value: '3', label: 'Weeks to Launch' },
      { value: 'Ads', label: 'Tracking Setup' },
      { value: 'Test Rides', label: 'Home Booking' },
    ],
    quote: 'We went from a physical-only shop to getting orders online within three weeks. The speed was incredible.',
    client: 'Owner, Bharath Cycle Hub',
    url: 'https://bharathcyclehub.store',
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-40 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <OptimizedImage
            src={IMAGES.backgrounds.dataViz}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-warm-sand/10 to-transparent blur-3xl pointer-events-none z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Results That Speak
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Real projects, real clients, real impact. Every case study here
              represents work we&apos;re proud to stand behind.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Case Studies Grid */}
      <Section className="pt-0">
        <div className="space-y-12">
          {CASE_STUDIES.map((study, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1} duration={0.6}>
              <Card hover={false} className="p-0 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Image */}
                  <div className="relative h-64 lg:h-auto">
                    <OptimizedImage
                      src={study.image}
                      alt={`${study.title} - ${study.industry} case study`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian/80 via-deep-obsidian/40 to-transparent lg:bg-gradient-to-r" />
                  </div>

                  {/* Right: Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-warm-sand">{study.icon}</div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{study.industry}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 mx-2">&bull;</span>
                        <span className="text-sm text-warm-sand">{study.region}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-unbounded font-bold mb-4">
                      {study.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-slate-ui/50 dark:bg-deep-obsidian border border-warm-sand/30 rounded-lg p-3 text-center"
                        >
                          <div className="text-xl md:text-2xl font-unbounded font-bold text-warm-sand mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <blockquote className="border-l-2 border-warm-sand pl-4 mb-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-2">&ldquo;{study.quote}&rdquo;</p>
                      <cite className="text-sm text-gray-600 dark:text-gray-400">&mdash; {study.client}</cite>
                    </blockquote>

                    {study.url && (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-warm-sand hover:underline"
                      >
                        Visit live site &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Stats Summary */}
      <Section className="bg-slate-ui/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <FadeIn direction="up" delay={0.1} duration={0.6}>
            <div>
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Delivered</div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <div>
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Client Retention</div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <div>
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">3</div>
              <div className="text-gray-600 dark:text-gray-400">Countries Served</div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.4} duration={0.6}>
            <div>
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">4</div>
              <div className="text-gray-600 dark:text-gray-400">Industries</div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
            Ready to Become Our Next Success Story?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get a free audit and see exactly how we can drive results for your business.
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <Link href="/contact">
            <Button variant="primary" className="text-lg">
              Start Your AI Audit
            </Button>
          </Link>
        </FadeIn>
      </Section>
    </main>
  );
}
