import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import { MapPin, Target, Eye, Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { IMAGES } from '@/lib/constants/images';

export const metadata = {
  title: 'About Us | Black Arrow Technologies',
  description:
    'Three friends, three cities, one mission. Meet the team behind Black Arrow Technologies — Cardiff, Dubai, Bangalore.',
};

const TEAM_MEMBERS = [
  {
    initials: 'T',
    name: 'Tauheed',
    title: 'UK Lead',
    location: 'Cardiff',
    tagline: 'Strategy, client partnerships & growth across the UK market',
    bio: 'Tauheed brings a rare mix of business acumen and technical understanding. Based in Cardiff, he\u2019s our bridge between client vision and execution reality.',
  },
  {
    initials: 'R',
    name: 'Ryan',
    title: 'UAE Lead',
    location: 'Dubai',
    tagline: 'Performance marketing & regional expansion across the Middle East',
    bio: 'Ryan lives and breathes the UAE market. From luxury retail to emerging startups, he knows what works in the Gulf region.',
  },
  {
    initials: 'MJ',
    name: 'Mohamed Jaffar',
    title: 'Technical Lead',
    location: 'Bangalore',
    tagline: 'Engineering, architecture & product delivery',
    bio: 'Mohamed is the builder. From system architecture to the last pixel, he ensures everything we ship is fast, secure, and built to scale.',
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Revenue Over Vanity',
    description:
      'Pretty websites don\u2019t pay bills. Every decision we make is filtered through one question: does this drive measurable business results?',
  },
  {
    icon: Eye,
    title: 'Transparency by Default',
    description:
      'No hidden fees, no vanity metrics, no smoke and mirrors. You\u2019ll always know exactly where your money goes and what it\u2019s doing.',
  },
  {
    icon: Zap,
    title: 'Ship Fast, Iterate Faster',
    description:
      'We\u2019d rather launch in 4 weeks and optimise than spend 4 months chasing perfection. Speed to market wins.',
  },
];

const LOCATIONS = [
  {
    city: 'Cardiff',
    country: 'UK',
    focus: 'UK compliance, GDPR, fintech and professional services',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    focus: 'Luxury retail, real estate, and emerging markets across the Gulf',
  },
  {
    city: 'Bangalore',
    country: 'India',
    focus: 'Engineering hub. Product development, automation, and technical SEO',
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="relative pt-40 pb-12 overflow-hidden">
        {/* Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-warm-sand/10 to-transparent blur-3xl pointer-events-none z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6 leading-tight">
              Our Story
            </h1>
          </FadeIn>
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Three friends. Three cities. One obsession: building digital products
              that actually move the needle for businesses.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Origin Story */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div>
            <FadeIn direction="up" duration={0.6}>
              <h2 className="text-3xl md:text-4xl font-unbounded font-bold mb-8">
                How It Started
              </h2>
            </FadeIn>
            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                We didn&apos;t start in a boardroom with a pitch deck. Black Arrow
                Technologies began the way most good things do &mdash; three friends
                with complementary skills and a shared frustration: too many businesses
                were being sold beautiful websites that didn&apos;t actually drive
                revenue.
              </p>
            </FadeIn>
            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                Tauheed brought the strategic mind from Cardiff&apos;s growing tech
                scene. Ryan brought the hustle and market instincts from Dubai&apos;s
                fast-moving business landscape. Mohamed brought the engineering depth
                from Bangalore&apos;s developer ecosystem. Together, we decided to build
                an agency that measures success the only way that matters &mdash; by the
                results we deliver.
              </p>
            </FadeIn>
            <FadeIn direction="up" duration={0.6} delay={0.3}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                We&apos;re not a faceless agency with 200 employees and a revolving door
                of account managers. We&apos;re three people who take your business
                personally. When you work with Black Arrow, you work with us.
              </p>
            </FadeIn>
          </div>

          {/* Image Column */}
          <FadeIn direction="left" duration={0.7} delay={0.2}>
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={IMAGES.about.culture}
                alt="Black Arrow Technologies team culture"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-deep-obsidian/60 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Team Grid */}
      <Section className="bg-pattern-dots">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            A remote-first team spanning three time zones, united by a mission to
            build things that actually work.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <FadeIn
              key={member.name}
              direction="up"
              delay={index * 0.15}
              duration={0.6}
            >
              <div className="bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all text-center h-full">
                <div className="w-20 h-20 bg-warm-sand text-deep-obsidian rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-unbounded font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-xl font-unbounded font-bold mb-1">
                  {member.name}
                </h3>
                <p className="text-warm-sand font-medium mb-2">{member.title}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin size={14} />
                  <span>{member.location}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 font-medium">
                  {member.tagline}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-gray-100 dark:bg-neutral-900">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            What We Stand For
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Three principles that guide every decision we make
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <FadeIn
                key={value.title}
                direction="up"
                delay={index * 0.15}
                duration={0.6}
              >
                <div className="bg-white dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all h-full">
                  <div className="w-14 h-14 bg-warm-sand/20 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-warm-sand" size={28} />
                  </div>
                  <h3 className="text-xl font-unbounded font-bold mb-3 text-warm-sand">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Global Presence */}
      <Section className="bg-pattern-topo">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-4 text-center">
            Three Cities, One Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Strategically positioned across three continents to serve global markets
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOCATIONS.map((location, index) => (
            <FadeIn
              key={location.city}
              direction="up"
              delay={index * 0.15}
              duration={0.6}
            >
              <div className="bg-gray-50 dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all text-center h-full">
                <div className="w-14 h-14 bg-warm-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-warm-sand" size={24} />
                </div>
                <h3 className="text-2xl font-unbounded font-bold mb-1">
                  {location.city}
                </h3>
                <p className="text-warm-sand font-medium mb-4">{location.country}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {location.focus}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center bg-gray-100 dark:bg-neutral-900">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="text-4xl md:text-5xl font-unbounded font-bold mb-6">
            Want to Work With Us?
          </h2>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.2}>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We take on a limited number of clients to ensure every project gets our
            full attention.
          </p>
        </FadeIn>
        <FadeIn direction="up" duration={0.6} delay={0.4}>
          <Link href="/contact">
            <Button variant="primary" className="text-lg">
              Let&apos;s Talk <ArrowRight size={20} className="inline ml-2" />
            </Button>
          </Link>
        </FadeIn>
      </Section>
    </main>
  );
}
