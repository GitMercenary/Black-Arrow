'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import { IMAGES } from '@/lib/constants/images';
import {
  Briefcase, ArrowRight, ArrowLeft, CheckCircle2, Zap, Clock,
  Globe, Search, BarChart3, Shield, Star,
  FileCode, Palette, Rocket, Users, MessageSquare,
  Layers, PenTool, Monitor
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: Layers,
    title: 'Multi-Page Structure',
    description: 'Home, About, Services, Blog, Contact - all fully customized to your brand',
  },
  {
    icon: Globe,
    title: 'Custom Domain & Hosting',
    description: 'Professional domain setup with reliable, fast hosting infrastructure',
  },
  {
    icon: Search,
    title: 'Advanced SEO',
    description: 'On-page SEO, meta tags, schema markup, and sitemap for maximum visibility',
  },
  {
    icon: PenTool,
    title: 'Content Management',
    description: 'Easy-to-use CMS so you can update content without touching code',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Tracking',
    description: 'Google Analytics, heatmaps, and conversion tracking from day one',
  },
  {
    icon: Shield,
    title: 'Security & SSL',
    description: 'Enterprise-grade security with SSL, firewalls, and regular backups',
  },
];

const packages = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses establishing their online presence',
    pages: 'Up to 5 pages',
    features: [
      'Custom responsive design',
      'Contact form with email alerts',
      'Basic SEO setup',
      'Google Analytics integration',
      'Social media links',
      'Mobile-optimized',
      '2 rounds of revisions',
    ],
    timeline: '2-3 weeks',
    highlight: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need a comprehensive web presence',
    pages: 'Up to 10 pages',
    features: [
      'Everything in Starter, plus:',
      'Blog / News section',
      'Team / About pages',
      'Testimonials & portfolio',
      'Advanced SEO & schema markup',
      'Newsletter integration',
      'CMS for easy content updates',
      '3 rounds of revisions',
    ],
    timeline: '3-4 weeks',
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-scale website for established businesses with complex needs',
    pages: '15+ pages',
    features: [
      'Everything in Professional, plus:',
      'Multi-language support',
      'Advanced integrations (CRM, ERP)',
      'Custom animations & interactions',
      'Performance optimization',
      'Priority support (12 months)',
      'Quarterly performance reports',
      'Unlimited revisions',
    ],
    timeline: '4-6 weeks',
    highlight: false,
  },
];

const process = [
  {
    step: 1,
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss your goals, audience, and requirements in a free strategy call',
    duration: 'Day 1',
  },
  {
    step: 2,
    icon: Palette,
    title: 'Design',
    description: 'Wireframes and visual mockups tailored to your brand identity',
    duration: 'Week 1',
  },
  {
    step: 3,
    icon: FileCode,
    title: 'Development',
    description: 'We build your site with clean code, responsive design, and SEO best practices',
    duration: 'Weeks 2-3',
  },
  {
    step: 4,
    icon: Rocket,
    title: 'Launch & Support',
    description: 'Final testing, deployment, and ongoing support to ensure success',
    duration: 'Week 4',
  },
];

const idealFor = [
  'Small to medium businesses',
  'Professional service firms',
  'Restaurants & hospitality',
  'Healthcare & clinics',
  'Real estate agencies',
  'Consulting & coaching',
  'Retail & local shops',
  'Non-profits & organisations',
];

export default function BusinessSitePage() {
  const { openQuote } = useWebDevQuote();

  return (
    <main className="pb-24">
      {/* Breadcrumb */}
      <div className="pt-28 pb-0 max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-cloud-dancer/60" aria-label="Breadcrumb">
          <Link href="/services/website-development" className="flex items-center gap-1 hover:text-warm-sand transition-colors" aria-label="Back to Website Development">
            <ArrowLeft size={16} />
          </Link>
          <Link href="/services" className="hidden sm:inline hover:text-warm-sand transition-colors">Services</Link>
          <span className="hidden sm:inline">/</span>
          <Link href="/services/website-development" className="hover:text-warm-sand transition-colors">Website Development</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-cloud-dancer font-medium">Business Website</span>
        </nav>
      </div>

      {/* Hero Section with Image */}
      <Section className="pt-8 pb-16 bg-gradient-to-b from-warm-sand/10 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up" duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-sand/10 text-warm-sand text-sm font-medium mb-6">
                <Briefcase size={16} />
                Business Website Development
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
                Professional Websites That <span className="text-warm-sand">Build Trust</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed mb-8">
                Multi-page business websites designed to establish credibility, showcase your services,
                and convert visitors into customers.
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('business-site')}>
                  Get Free Quote
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <a href="#packages">
                  <Button variant="secondary" className="px-8 py-4 text-lg">
                    View Packages
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.websiteDev.webDesign}
                alt="Professional business website design"
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

      {/* Features Grid */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Every business website comes packed with features to help you grow online.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} direction="up" duration={0.6} delay={index * 0.05}>
                <Card hover={false} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-warm-sand/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-warm-sand" />
                  </div>
                  <h3 className="text-lg font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Packages Section */}
      <Section className="py-16" id="packages">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Choose Your Package
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Flexible packages tailored to your business size and goals. All prices provided in your free consultation.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <FadeIn key={pkg.name} direction="up" duration={0.6} delay={index * 0.1}>
              <Card
                hover={false}
                className={`p-6 h-full flex flex-col relative overflow-hidden ${
                  pkg.highlight ? 'border-2 border-warm-sand' : ''
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 bg-warm-sand text-deep-obsidian text-xs font-bold px-4 py-1 rounded-bl-lg">
                    RECOMMENDED
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-2xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-4 text-warm-sand font-medium">
                  <Monitor size={18} />
                  {pkg.pages}
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-cloud-dancer/60">
                  <Clock size={16} />
                  Delivery: {pkg.timeline}
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-warm-sand flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-cloud-dancer/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                    variant={pkg.highlight ? 'primary' : 'secondary'}
                    className="w-full py-3"
                    onClick={() => openQuote('business-site')}
                  >
                    Get Quote
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              A proven 4-step process to deliver your business website on time and on budget.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.step} direction="up" duration={0.6} delay={index * 0.1}>
                <div className="text-center relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-warm-sand/20" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-sand text-deep-obsidian font-unbounded font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 mb-2 text-sm">
                    {step.description}
                  </p>
                  <span className="text-warm-sand text-sm font-medium">{step.duration}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Ideal For Section */}
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
                Ideal For
              </h2>
              <p className="text-gray-600 dark:text-cloud-dancer/70 mb-8">
                Our business websites are built for organisations that need a professional
                online presence to attract and retain customers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {idealFor.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-warm-sand flex-shrink-0" />
                    <span className="text-gray-700 dark:text-cloud-dancer/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <Card className="p-8 bg-warm-sand/5 border-warm-sand/20">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-warm-sand fill-warm-sand" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 dark:text-cloud-dancer/90 italic mb-4 text-center">
                &quot;Our new website has completely transformed how customers find us online. We&apos;ve seen
                a 60% increase in enquiries since launch.&quot;
              </blockquote>
              <p className="text-center text-gray-600 dark:text-cloud-dancer/70 text-sm">
                <strong>Consulting Firm</strong> - London, UK
              </p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Portfolio Examples */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Business Websites We&apos;ve Built
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Explore live examples of business websites we&apos;ve delivered for our clients.
            </p>
          </FadeIn>
        </div>

        <ProjectShowcase showFilters={false} maxItems={4} defaultFilter="business-site" />
      </Section>

      {/* Final CTA */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-warm-sand/10 to-warm-sand/5 border-warm-sand/20">
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Ready to Build Your Business Website?
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-6">
              Get a free consultation and custom quote for your project.
              No obligations, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('business-site')}>
                Get Free Quote
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Link href="/services/website-development">
                <Button variant="secondary" className="px-8 py-4 text-lg">
                  Compare Options
                </Button>
              </Link>
            </div>
          </Card>
        </FadeIn>
      </Section>
    </main>
  );
}
