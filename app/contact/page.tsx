'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/forms/ContactForm';
import { useRegion } from '@/lib/contexts/RegionContext';
import { REGIONS } from '@/lib/constants/regions';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function ContactPage() {
  const { currentRegion } = useRegion();
  const regionInfo = REGIONS[currentRegion];

  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-40 pb-12">
        <div className="max-w-3xl">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Let&apos;s Build Your Sales Engine
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-600 dark:text-cloud-dancer/80 leading-relaxed">
              Tell us about your project. We&apos;ll respond within 24 hours with a
              data-driven assessment of how we can help you grow.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Form & Contact Info */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form - Takes 2 columns */}
          <FadeIn direction="up" duration={0.6} delay={0.1} className="lg:col-span-2">
            <Card hover={false} className="p-8">
              <ContactForm />
            </Card>
          </FadeIn>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <Card hover={false} className="p-6">
                <h3 className="text-lg font-unbounded font-bold mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${regionInfo.contact.email}`}
                    className="flex items-center gap-3 text-gray-600 dark:text-cloud-dancer/80 hover:text-warm-sand transition-colors"
                  >
                    <Mail size={20} className="text-warm-sand flex-shrink-0" />
                    {regionInfo.contact.email}
                  </a>
                  <a
                    href={`tel:${regionInfo.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-gray-600 dark:text-cloud-dancer/80 hover:text-warm-sand transition-colors"
                  >
                    <Phone size={20} className="text-warm-sand flex-shrink-0" />
                    {regionInfo.contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${regionInfo.contact.whatsapp.replace(/[\s+]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-cloud-dancer/80 hover:text-warm-sand transition-colors"
                  >
                    <MessageCircle size={20} className="text-warm-sand flex-shrink-0" />
                    WhatsApp: {regionInfo.contact.whatsapp}
                  </a>
                </div>
              </Card>
            </FadeIn>

            {/* Office Location */}
            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <Card hover={false} className="p-6">
                <h3 className="text-lg font-unbounded font-bold mb-4">
                  {regionInfo.name} Office
                </h3>
                {regionInfo.contact.companyName && (
                  <p className="text-gray-700 dark:text-cloud-dancer font-medium mb-3">
                    {regionInfo.contact.companyName}
                  </p>
                )}
                <div className="flex items-start gap-3 text-gray-600 dark:text-cloud-dancer/80">
                  <MapPin size={20} className="text-warm-sand mt-1 flex-shrink-0" />
                  <span>{regionInfo.contact.address}</span>
                </div>
              </Card>
            </FadeIn>

            {/* Response Time */}
            <FadeIn direction="up" duration={0.6} delay={0.4}>
              <Card hover={false} className="p-6 bg-warm-sand/10 border-warm-sand/30">
                <h3 className="text-lg font-unbounded font-bold mb-2 text-warm-sand">
                  24-Hour Response
                </h3>
                <p className="text-gray-600 dark:text-cloud-dancer/80 text-sm">
                  We review every inquiry personally. Expect a detailed response
                  within one business day.
                </p>
              </Card>
            </FadeIn>

            {/* What to Expect */}
            <FadeIn direction="up" duration={0.6} delay={0.5}>
              <Card hover={false} className="p-6">
                <h3 className="text-lg font-unbounded font-bold mb-4">
                  What Happens Next
                </h3>
                <ol className="space-y-3 text-gray-600 dark:text-cloud-dancer/80 text-sm">
                  <li className="flex gap-3">
                    <span className="text-warm-sand font-bold">1.</span>
                    We review your project details
                  </li>
                  <li className="flex gap-3">
                    <span className="text-warm-sand font-bold">2.</span>
                    Schedule a 30-min discovery call
                  </li>
                  <li className="flex gap-3">
                    <span className="text-warm-sand font-bold">3.</span>
                    Receive a custom proposal with ROI projections
                  </li>
                </ol>
              </Card>
            </FadeIn>
          </div>
        </div>
      </Section>
    </main>
  );
}
