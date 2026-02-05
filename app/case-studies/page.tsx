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
    industry: 'Luxury E-Commerce',
    region: 'UAE',
    title: '₹2.3Cr Revenue in 6 Months',
    description: 'Legacy Shopify store transformed into a headless Next.js platform with AI recommendations.',
    image: IMAGES.caseStudies.luxuryWatch,
    metrics: [
      { value: '+35%', label: 'Conversion Rate' },
      { value: '+22%', label: 'Average Order Value' },
      { value: '-60%', label: 'Page Load Time' },
    ],
    quote: 'Black Arrow didn\'t just build us a website. They built us a revenue machine.',
    client: 'CEO, Dubai Watch Retailer',
  },
  {
    icon: <TrendingUp size={24} />,
    industry: 'Real Estate',
    region: 'UAE',
    title: '42% Lower Customer Acquisition Cost',
    description: 'Rebuilt ad campaigns with intent-based targeting and conversion-optimized landing pages.',
    image: IMAGES.caseStudies.realEstate,
    metrics: [
      { value: '-42%', label: 'CAC' },
      { value: '+89%', label: 'Qualified Leads' },
      { value: '3.2x', label: 'ROAS' },
    ],
    quote: 'Our previous agency was burning money. Black Arrow showed us exactly where.',
    client: 'Marketing Director, Dubai Developer',
  },
  {
    icon: <Zap size={24} />,
    industry: 'Healthcare',
    region: 'India',
    title: '80 Hours/Month Saved on Admin',
    description: 'Automated patient follow-ups, appointment reminders, and insurance verification.',
    image: IMAGES.caseStudies.healthcare,
    metrics: [
      { value: '80h', label: 'Saved Monthly' },
      { value: '95%', label: 'Response Rate' },
      { value: '-45%', label: 'No-Shows' },
    ],
    quote: 'Our staff can finally focus on patients instead of paperwork.',
    client: 'Operations Head, Bangalore Clinic',
  },
  {
    icon: <Search size={24} />,
    industry: 'Fintech',
    region: 'UK',
    title: 'Page 3 to Position 2 in 90 Days',
    description: 'Rebuilt React SPA with Next.js, implemented structured data, and created content strategy.',
    image: IMAGES.caseStudies.fintech,
    metrics: [
      { value: '#2', label: 'Google Ranking' },
      { value: '+340%', label: 'Organic Traffic' },
      { value: '98', label: 'PageSpeed Score' },
    ],
    quote: 'We were invisible to Google. Now we\'re on the first page for our main keyword.',
    client: 'CTO, London Fintech',
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-32 pb-12 overflow-hidden">
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
              We don&apos;t do case studies with vanity metrics. Every result here
              drove real business impact for clients across UK, UAE, and India.
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
                        <span className="text-sm text-gray-600 dark:text-gray-400 mx-2">•</span>
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

                    <blockquote className="border-l-2 border-warm-sand pl-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-2">&ldquo;{study.quote}&rdquo;</p>
                      <cite className="text-sm text-gray-600 dark:text-gray-400">— {study.client}</cite>
                    </blockquote>
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
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">147+</div>
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
              <div className="text-gray-600 dark:text-gray-400">Active Markets</div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.4} duration={0.6}>
            <div>
              <div className="text-4xl font-unbounded font-bold text-warm-sand mb-2">₹50Cr+</div>
              <div className="text-gray-600 dark:text-gray-400">Revenue Generated</div>
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
