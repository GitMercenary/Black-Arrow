'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { BentoCard } from '@/components/ui/Card';
import BentoGrid, { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { ShoppingCart, TrendingUp, Zap, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Stat } from '@/lib/types/database';
import FadeIn from '@/components/animations/FadeIn';
import CountUp from '@/components/animations/CountUp';
import SlideIn from '@/components/animations/SlideIn';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import StructuredData from '@/components/seo/StructuredData';
import FAQAccordion from '@/components/ui/FAQAccordion';
import HeroLeadForm from '@/components/forms/HeroLeadForm';

const FAQ_ITEMS = [
  {
    question: "What's your typical project timeline?",
    answer: "E-commerce builds: 4-8 weeks. Marketing campaigns: 2-3 weeks to launch. Automation projects: 3-6 weeks. We work in 2-week sprints with continuous delivery."
  },
  {
    question: "Do you work with startups or just established businesses?",
    answer: "Both! Startups get lean MVPs with growth engines. Established businesses get enterprise-grade solutions. Minimum project size is £5K to ensure we can deliver real value."
  },
  {
    question: "What if I need ongoing support after launch?",
    answer: "We offer retainer packages starting at £2K/month. Includes hosting, monitoring, security updates, and 10 hours of development/optimization work monthly."
  },
  {
    question: "Can you integrate with our existing tech stack?",
    answer: "Yes. We work with CRMs (HubSpot, Salesforce), ERPs (SAP, Oracle), payment gateways (Stripe, PayPal, regional options), and custom APIs. If it has an API, we can connect it."
  }
];

export default function HomePage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const { openAudit } = useAIAudit();

  useEffect(() => {
    async function fetchStats() {
      setLoadingStats(true);
      const supabase = createClient();
      const { data } = await supabase
        .from('stats')
        .select('*')
        .order('key');

      if (data) {
        setStats(data);
      }
      setLoadingStats(false);
    }

    fetchStats();
  }, []);

  return (
    <>
      <StructuredData type="home" />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content">
      {/* Hero Section */}
      <Section className="relative pt-32 pb-20 bg-pattern-topo overflow-hidden">
        {/* Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-warm-sand/10 to-transparent blur-3xl pointer-events-none z-10" />

        {/* Hero Content - 2 Column Layout on Desktop */}
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Hero Text */}
            <div className="text-left">
              <FadeIn direction="up" duration={0.6}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-unbounded font-bold mb-6 sm:mb-8 leading-tight">
                  AI-Native Marketing & Web Development That Moves the Needle
                </h1>
              </FadeIn>
              <FadeIn direction="up" duration={0.6} delay={0.2}>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  We don&apos;t do pretty websites. We engineer digital sales machines for UK, UAE, and India markets.
                </p>
              </FadeIn>
              <FadeIn direction="up" duration={0.6} delay={0.4}>
                <Button
                  variant="primary"
                  className="text-base sm:text-lg lg:hidden w-full sm:w-auto"
                  onClick={() => openAudit()}
                >
                  Start Your AI Audit
                </Button>
              </FadeIn>
            </div>

            {/* Right Column - Lead Form (Desktop Only) */}
            <div className="hidden lg:block">
              <FadeIn direction="left" duration={0.7} delay={0.3}>
                <HeroLeadForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats Bar */}
      <Section className="py-12 bg-gray-100 dark:bg-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {loadingStats ? (
            // Skeleton loaders for stats
            [1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-slate-ui rounded w-24 mx-auto mb-2"></div>
                <div className="h-4 bg-slate-ui rounded w-32 mx-auto"></div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => {
              // Extract number and suffix from stat value
              const numMatch = stat.value.match(/(\d+)/);
              const number = numMatch ? parseInt(numMatch[1]) : 0;
              const suffix = stat.value.replace(/\d+/, '');

              return (
                <FadeIn key={stat.key} direction="up" delay={index * 0.1} duration={0.5}>
                  <div>
                    <div className="text-4xl md:text-5xl font-unbounded font-bold text-warm-sand mb-2">
                      {number > 0 ? (
                        <CountUp value={number} suffix={suffix} duration={2} delay={0.5} />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                      {stat.label}
                    </div>
                  </div>
                </FadeIn>
              );
            })
          )}
        </div>
      </Section>

      {/* Services Bento Grid */}
      <Section className="bg-pattern-dots">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-12 text-center">
            Our Services
          </h2>
        </FadeIn>
        <BentoGrid>
          <FadeIn direction="up" delay={0.1} duration={0.6}>
            <BentoCard
              icon={<ShoppingCart size={48} strokeWidth={2} />}
              title="E-Commerce Development"
              description="Headless commerce platforms with AI-powered recommendations, dynamic pricing, and zero downtime."
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <BentoCard
              icon={<TrendingUp size={48} strokeWidth={2} />}
              title="Performance Ads"
              description="Google Ads, Meta Ads, and LinkedIn campaigns engineered for B2B and luxury retail."
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <BentoCard
              icon={<Zap size={48} strokeWidth={2} />}
              title="Automation & AI"
              description="Workflow automation, AI chatbots, and CRM integration that frees your team for strategy."
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.4} duration={0.6}>
            <BentoCard
              icon={<Search size={48} strokeWidth={2} />}
              title="Technical SEO"
              description="Core Web Vitals optimization, structured data, and content strategies that Google rewards."
            />
          </FadeIn>
        </BentoGrid>

        <FadeIn direction="up" delay={0.5} duration={0.6}>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="secondary">
                View All Services
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Case Study Highlight */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <BentoGrid2Col>
          <SlideIn direction="left" duration={0.7}>
            <div>
              {/* Case study image */}
              <div className="mb-8 relative rounded-lg overflow-hidden">
                <OptimizedImage
                  src={IMAGES.caseStudies.luxuryWatch}
                  alt="Luxury watch e-commerce platform - UAE client success story"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 dark:from-deep-obsidian/70 via-gray-900/40 dark:via-deep-obsidian/40 to-transparent" />
              </div>

              <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
                ₹2.3Cr Revenue in 6 Months
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-200 mb-6 font-medium">
                Luxury watch retailer, UAE
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-base md:text-lg" style={{lineHeight: '1.8'}}>
                Legacy Shopify store couldn&apos;t handle 10K+ SKUs or Arabic localization. We built a headless Next.js commerce platform with AI product recommendations that transformed their digital presence.
              </p>
              <Link href="/case-studies">
                <Button variant="text">
                  View Case Studies →
                </Button>
              </Link>
            </div>
          </SlideIn>
          <SlideIn direction="right" duration={0.7}>
            <div className="space-y-4">
              <FadeIn direction="up" delay={0.2}>
                <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                  <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">+35%</div>
                  <div className="text-gray-700 dark:text-gray-200">Conversion Rate</div>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                  <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">+22%</div>
                  <div className="text-gray-700 dark:text-gray-200">Average Order Value</div>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-6">
                  <div className="text-3xl font-unbounded font-bold text-warm-sand mb-2">-60%</div>
                  <div className="text-gray-700 dark:text-gray-200">Page Load Time</div>
                </div>
              </FadeIn>
            </div>
          </SlideIn>
        </BentoGrid2Col>
      </Section>

      {/* How We Work - Process Section */}
      <Section className="bg-pattern-circuit">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            How We Work
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
            Our battle-tested process turns complex projects into predictable outcomes
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeIn direction="up" delay={0.1} duration={0.6}>
            <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
                1
              </div>
              <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={IMAGES.process.discovery}
                  alt="Discovery & Strategy Phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
                Discovery & Strategy
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Deep-dive into your business model, competitive landscape, and customer psychology. We identify quick wins and long-term opportunities.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={IMAGES.process.design}
                  alt="Design & Development Phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
                Design & Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mobile-first UI/UX with conversion psychology baked in. We build fast, secure, and scalable systems using modern tech stacks.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <div className="relative bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="absolute -top-4 left-8 bg-warm-sand text-deep-obsidian font-unbounded font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={IMAGES.process.launch}
                  alt="Launch & Optimization Phase"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-unbounded font-bold mb-3 text-warm-sand">
                Launch & Optimize
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Data-driven optimization cycles. A/B testing, heatmaps, and analytics dashboards to continuously improve performance.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <BentoGrid2Col>
          <SlideIn direction="left" duration={0.7}>
            <div>
              <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
                Why Choose Black Arrow?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                    <Zap className="text-warm-sand" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                      AI-Native Approach
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We don&apos;t bolt AI onto old workflows. Every solution is built with automation and intelligence from day one.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-warm-sand" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                      Revenue-Obsessed
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Pretty websites don&apos;t pay bills. We engineer for conversions, retention, and measurable ROI.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-warm-sand/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-warm-sand" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-unbounded font-bold mb-2 text-warm-sand">
                      Multi-Market Expertise
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We&apos;ve navigated UK compliance, UAE luxury markets, and India&apos;s digital-first consumers. Your growth isn&apos;t limited by borders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
          <SlideIn direction="right" duration={0.7}>
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
              <OptimizedImage
                src={IMAGES.whyChooseUs.teamWork}
                alt="Team collaboration and expertise"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 dark:from-deep-obsidian/85 via-gray-900/50 dark:via-deep-obsidian/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-2xl font-unbounded font-bold text-white dark:text-cloud-dancer mb-2">
                  &quot;Not just vendors. Strategic partners.&quot;
                </p>
                <p className="text-warm-sand">
                  — UAE E-Commerce Director
                </p>
              </div>
            </div>
          </SlideIn>
        </BentoGrid2Col>
      </Section>

      {/* Client Testimonials */}
      <Section className="bg-pattern-arrows">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Real results from real businesses across three continents
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn direction="up" delay={0.1} duration={0.6}>
            <div className="bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <OptimizedImage
                    src={IMAGES.testimonials.client1}
                    alt="Client testimonial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-unbounded font-bold text-warm-sand">Sarah Johnson</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">Founder, LuxeRetail UK</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                &quot;Black Arrow rebuilt our entire e-commerce platform in 6 weeks. Sales are up 140% and our team finally has the automation tools they needed.&quot;
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} duration={0.6}>
            <div className="bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <OptimizedImage
                    src={IMAGES.testimonials.client2}
                    alt="Client testimonial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-unbounded font-bold text-warm-sand">Ahmed Al-Mansoori</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">CEO, Premium Watches UAE</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                &quot;The AI chatbot handles 70% of customer inquiries. Our conversion rate jumped from 1.8% to 2.8%. ROI was positive in month 2.&quot;
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <div className="bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <OptimizedImage
                    src={IMAGES.testimonials.client3}
                    alt="Client testimonial"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-unbounded font-bold text-warm-sand">Priya Sharma</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">CMO, TechStart India</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                &quot;Their Google Ads strategy cut our CAC by 45% while doubling qualified leads. Finally, a team that understands B2B SaaS.&quot;
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Everything you need to know before we start
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} duration={0.6}>
          <FAQAccordion items={FAQ_ITEMS} />
        </FadeIn>
      </Section>

      {/* Final CTA */}
      <Section className="text-center bg-pattern-topo">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
            Ready to Build Your Sales Engine?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start growing. Get a data-driven audit of your digital presence.
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <Button
            variant="primary"
            className="text-lg"
            onClick={() => openAudit()}
          >
            Start Your AI Audit
          </Button>
        </FadeIn>
      </Section>
    </main>
    </>
  );
}
