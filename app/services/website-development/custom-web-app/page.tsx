'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import { useWebDevQuote } from '@/lib/contexts/WebDevQuoteContext';
import { IMAGES } from '@/lib/constants/images';
import {
  Code, ArrowRight, ArrowLeft, CheckCircle2, Zap, Clock,
  Database, Shield, Star, Server, Users,
  Lock, RefreshCw, Cpu, GitBranch, Cloud,
  MessageSquare, Palette, FileCode, Rocket, BarChart3
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const capabilities = [
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Custom database design with PostgreSQL, MongoDB, or any stack that fits your needs',
  },
  {
    icon: Lock,
    title: 'User Authentication',
    description: 'Secure login systems with role-based access, OAuth, and multi-factor authentication',
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'RESTful or GraphQL APIs that connect your app to any service or third-party platform',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable deployment on AWS, Vercel, or Azure with auto-scaling and CDN',
  },
  {
    icon: RefreshCw,
    title: 'Real-Time Features',
    description: 'Live updates, notifications, chat systems, and collaborative features',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    description: 'Integrate AI models, workflow automation, and intelligent data processing',
  },
];

const techStack = [
  { category: 'Frontend', tools: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', tools: ['Node.js', 'Python', 'Express', 'FastAPI'] },
  { category: 'Database', tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'] },
  { category: 'Infrastructure', tools: ['AWS', 'Vercel', 'Docker', 'CI/CD Pipelines'] },
];

const appTypes = [
  {
    title: 'SaaS Platforms',
    description: 'Multi-tenant applications with subscription billing, user management, and analytics dashboards',
    icon: BarChart3,
  },
  {
    title: 'Internal Tools',
    description: 'Custom admin panels, CRM systems, inventory management, and workflow automation tools',
    icon: Cpu,
  },
  {
    title: 'Customer Portals',
    description: 'Client-facing dashboards with secure document sharing, invoicing, and communication tools',
    icon: Users,
  },
  {
    title: 'E-Commerce Platforms',
    description: 'Custom storefronts with product management, payment processing, and order tracking',
    icon: GitBranch,
  },
];

const process = [
  {
    step: 1,
    icon: MessageSquare,
    title: 'Discovery & Planning',
    description: 'Deep-dive into your requirements, user flows, and technical specifications',
    duration: 'Week 1-2',
  },
  {
    step: 2,
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Wireframes, prototypes, and user interface design with your feedback',
    duration: 'Week 2-3',
  },
  {
    step: 3,
    icon: FileCode,
    title: 'Agile Development',
    description: 'Iterative development with regular demos and feedback cycles',
    duration: 'Week 3-8+',
  },
  {
    step: 4,
    icon: Shield,
    title: 'Testing & QA',
    description: 'Comprehensive testing including unit tests, integration tests, and security audits',
    duration: 'Ongoing',
  },
  {
    step: 5,
    icon: Rocket,
    title: 'Launch & Scale',
    description: 'Production deployment, monitoring setup, and ongoing support',
    duration: 'Final Week',
  },
];

export default function CustomWebAppPage() {
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
          <span className="text-gray-900 dark:text-cloud-dancer font-medium">Custom Web App</span>
        </nav>
      </div>

      {/* Hero Section with Image */}
      <Section className="pt-8 pb-16 bg-gradient-to-b from-warm-sand/10 to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeIn direction="up" duration={0.6}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-sand/10 text-warm-sand text-sm font-medium mb-6">
                <Code size={16} />
                Custom Web Application Development
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
                Web Apps Built for <span className="text-warm-sand">Your Vision</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed mb-8">
                From SaaS platforms to internal tools, we build custom web applications
                with the functionality, scalability, and security your business demands.
              </p>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('custom-web-app')}>
                  Discuss Your Project
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <a href="#capabilities">
                  <Button variant="secondary" className="px-8 py-4 text-lg">
                    See Capabilities
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.websiteDev.coding}
                alt="Custom web application development"
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

      {/* App Types Section */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              What We Build
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Custom solutions tailored to your specific business needs and workflows.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appTypes.map((app, index) => {
            const Icon = app.icon;
            return (
              <FadeIn key={app.title} direction="up" duration={0.6} delay={index * 0.08}>
                <Card hover={false} className="p-6 flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-warm-sand/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-warm-sand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                      {app.title}
                    </h3>
                    <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm">
                      {app.description}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Capabilities Grid */}
      <Section className="py-16" id="capabilities">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Technical Capabilities
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Full-stack expertise to handle any technical requirement.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <FadeIn key={capability.title} direction="up" duration={0.6} delay={index * 0.05}>
                <Card hover={false} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-warm-sand/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-warm-sand" />
                  </div>
                  <h3 className="text-lg font-unbounded font-bold mb-2 text-gray-900 dark:text-cloud-dancer">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm">
                    {capability.description}
                  </p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Tech Stack */}
      <Section className="py-16 bg-gray-100 dark:bg-neutral-900">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Our Tech Stack
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Modern technologies chosen for performance, scalability, and developer experience.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack, index) => (
            <FadeIn key={stack.category} direction="up" duration={0.6} delay={index * 0.1}>
              <Card hover={false} className="p-6">
                <h3 className="text-lg font-unbounded font-bold mb-4 text-warm-sand">
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-gray-700 dark:text-cloud-dancer/80 text-sm">
                      <CheckCircle2 size={14} className="text-warm-sand flex-shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Development Process
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto">
              Agile methodology ensures transparency and flexibility throughout the project.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-6">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.step} direction="up" duration={0.6} delay={index * 0.08}>
                <Card hover={false} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-warm-sand text-deep-obsidian font-unbounded font-bold text-lg flex items-center justify-center">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer">
                          {step.title}
                        </h3>
                        <span className="text-warm-sand text-sm font-medium bg-warm-sand/10 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-cloud-dancer/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="py-16 bg-warm-sand/5">
        <FadeIn direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-warm-sand fill-warm-sand" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-cloud-dancer/90 italic mb-6">
              &quot;Black Arrow built our entire SaaS platform from scratch. Their technical expertise
              and attention to detail exceeded every expectation. We launched on time and our users love it.&quot;
            </blockquote>
            <p className="text-gray-600 dark:text-cloud-dancer/70">
              <strong>SaaS Founder</strong> - Manchester, UK
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Final CTA */}
      <Section className="py-16">
        <FadeIn direction="up" duration={0.6}>
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-warm-sand/10 to-warm-sand/5 border-warm-sand/20">
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-gray-600 dark:text-cloud-dancer/70 max-w-2xl mx-auto mb-6">
              Tell us about your project and we&apos;ll provide a detailed technical proposal
              with timeline and investment breakdown.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="px-8 py-4 text-lg" onClick={() => openQuote('custom-web-app')}>
                Start Your Project
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
