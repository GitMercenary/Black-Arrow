'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { BentoGrid2Col } from '@/components/ui/BentoGrid';
import { Zap, MessageSquare, RefreshCw, Mail, Brain, Database } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { IMAGES } from '@/lib/constants/images';
import FadeIn from '@/components/animations/FadeIn';
import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import AIToolLogos from '@/components/ui/AIToolLogos';

const FEATURES = [
  {
    icon: <RefreshCw size={24} />,
    title: 'Workflow Automation',
    description: 'Zapier, Make, and n8n integrations that eliminate manual data entry.',
  },
  {
    icon: <MessageSquare size={24} />,
    title: 'AI Chatbots',
    description: 'GPT-powered assistants that qualify leads and answer questions 24/7.',
  },
  {
    icon: <Database size={24} />,
    title: 'CRM Integration',
    description: 'Connect HubSpot, Salesforce, or Pipedrive to your entire tech stack.',
  },
  {
    icon: <Mail size={24} />,
    title: 'Email Automation',
    description: 'Drip campaigns and sequences that nurture leads while you sleep.',
  },
  {
    icon: <Brain size={24} />,
    title: 'Lead Scoring',
    description: 'AI that identifies your hottest leads so sales focuses on closers.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Process Mapping',
    description: 'We document and optimize workflows before automating them.',
  },
];

export default function AutomationPage() {
  const { openAudit } = useAIAudit();

  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-40 pb-12 bg-pattern-circuit overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <OptimizedImage
            src={IMAGES.hero.aiAutomation}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-warm-sand/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <div className="inline-flex items-center gap-2 text-warm-sand mb-4">
              <Zap size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">Automation & AI</span>
            </div>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Replace Busywork With Bots.
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed max-w-3xl">
            Workflow automation, AI chatbots, and CRM integration that frees
            your team for strategy. We automate the repetitive so you can focus on growth.
          </p>
          </FadeIn>
        </div>
      </Section>

      {/* Proof Point */}
      <Section className="py-12 bg-warm-sand/10">
        <BentoGrid2Col>
          <div>
            <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-4">
              80 Hours/Month Saved
            </h2>
            <p className="text-lg text-gray-600 dark:text-cloud-dancer/80 mb-2">
              Healthcare provider, Bangalore
            </p>
            <p className="text-gray-500 dark:text-cloud-dancer/70 leading-relaxed">
              Patient follow-ups, appointment reminders, and insurance verification
              were drowning the admin team. We built automated workflows that
              handle it all, freeing staff for patient care.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">80h</div>
              <div className="text-sm text-cloud-dancer/70">Saved/Month</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">95%</div>
              <div className="text-sm text-cloud-dancer/70">Response Rate</div>
            </div>
            <div className="bg-deep-obsidian border border-warm-sand/30 rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-unbounded font-bold text-warm-sand mb-1">-45%</div>
              <div className="text-sm text-cloud-dancer/70">No-Shows</div>
            </div>
          </div>
        </BentoGrid2Col>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-12 text-center">
          What We Automate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} hover={false} className="p-6">
              <div className="text-warm-sand mb-4">{feature.icon}</div>
              <h3 className="text-lg font-unbounded font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-cloud-dancer/70 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Tools */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-8">
            Tools We Use
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Zapier', 'Make', 'n8n', 'OpenAI', 'HubSpot', 'Salesforce', 'Intercom', 'Twilio'].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-full text-sm text-cloud-dancer"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* AI Tool Logos */}
      <AIToolLogos />

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-6">
          Ready to Automate?
        </h2>
        <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 mb-8 max-w-2xl mx-auto">
          Get a free workflow audit. We&apos;ll identify your biggest time sinks
          and show you how to automate them.
        </p>
        <Button
          variant="primary"
          className="text-lg"
          onClick={() => openAudit()}
        >
          Start Your AI Audit
        </Button>
      </Section>
    </main>
  );
}
