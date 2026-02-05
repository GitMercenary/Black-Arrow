'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import BlurFade from '@/components/animations/BlurFade';
import Parallax from '@/components/animations/Parallax';
import { getProjectById, portfolioProjects } from '@/lib/data/portfolioData';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Palette,
  Type,
  Lightbulb,
  Code,
  ArrowRight,
} from 'lucide-react';

export default function PortfolioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  // Get next project for CTA
  const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/portfolio">
          <Button variant="text" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <Parallax speed={0.3} direction="down">
          <BlurFade delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-warm-sand text-stone-900 rounded-full text-sm font-space font-bold">
                {project.industry}
              </span>
              <span className="px-4 py-2 bg-stone-200 dark:bg-neutral-800 text-stone-600 dark:text-neutral-400 rounded-full text-sm font-space">
                {project.year}
              </span>
            </div>
          </BlurFade>
        </Parallax>

        <BlurFade delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-6">
            {project.title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="text-2xl text-stone-600 dark:text-neutral-400 font-geist mb-8 max-w-3xl">
            {project.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="gap-2">
                  Visit Live Site <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
            )}
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-stone-200 dark:bg-neutral-800 rounded-full text-sm font-space text-stone-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Hero Image */}
        <BlurFade delay={0.5}>
          <div className="relative h-[500px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.thumbnail}')`,
              }}
            />
          </div>
        </BlurFade>
      </section>

      {/* Functionality Section */}
      <section className="container mx-auto px-4 py-20">
        <BlurFade delay={0.6}>
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-8 h-8 text-warm-sand" />
            <h2 className="text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
              Functionality
            </h2>
          </div>
        </BlurFade>

        <BlurFade delay={0.7}>
          <h3 className="text-3xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-4">
            {project.functionality.title}
          </h3>
        </BlurFade>

        <BlurFade delay={0.8}>
          <p className="text-xl text-stone-600 dark:text-neutral-400 font-geist mb-8 max-w-4xl">
            {project.functionality.description}
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.functionality.features.map((feature, index) => (
            <BlurFade key={index} delay={0.9 + index * 0.05}>
              <GlassCard
                variant="hover"
                intensity="subtle"
                className="p-6 h-full"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-warm-sand flex-shrink-0 mt-1" />
                  <p className="text-stone-700 dark:text-neutral-300 font-geist">
                    {feature}
                  </p>
                </div>
              </GlassCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* UI/UX Section */}
      <section className="container mx-auto px-4 py-20 bg-stone-100 dark:bg-neutral-900 -mx-4">
        <div className="container mx-auto px-4">
          <BlurFade delay={1.0}>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-warm-sand" />
              <h2 className="text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                UI/UX Explanation
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={1.1}>
            <div className="bg-warm-sand/10 border-l-4 border-warm-sand p-6 rounded-lg mb-12">
              <p className="text-lg font-geist text-stone-700 dark:text-neutral-300 italic">
                "{project.uiux.philosophy}"
              </p>
            </div>
          </BlurFade>

          {/* Design Decisions */}
          <BlurFade delay={1.2}>
            <h3 className="text-3xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-8">
              Design Decisions
            </h3>
          </BlurFade>

          <div className="space-y-6 mb-16">
            {project.uiux.designDecisions.map((decision, index) => (
              <BlurFade key={index} delay={1.3 + index * 0.05}>
                <GlassCard variant="hover" intensity="subtle" className="p-8">
                  <h4 className="text-xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-3">
                    {decision.decision}
                  </h4>
                  <p className="text-stone-600 dark:text-neutral-400 font-geist">
                    <span className="font-semibold text-warm-sand">Rationale:</span>{' '}
                    {decision.rationale}
                  </p>
                </GlassCard>
              </BlurFade>
            ))}
          </div>

          {/* Color Palette */}
          <BlurFade delay={1.4}>
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-6 h-6 text-warm-sand" />
              <h3 className="text-3xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                Color Palette
              </h3>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {project.uiux.colorPalette.map((color, index) => (
              <BlurFade key={index} delay={1.5 + index * 0.05}>
                <GlassCard variant="hover" intensity="subtle" className="p-0 overflow-hidden">
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4">
                    <h4 className="font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-1">
                      {color.name}
                    </h4>
                    <p className="text-sm font-space text-stone-600 dark:text-neutral-400 mb-2">
                      {color.hex}
                    </p>
                    <p className="text-sm font-geist text-stone-600 dark:text-neutral-400">
                      {color.usage}
                    </p>
                  </div>
                </GlassCard>
              </BlurFade>
            ))}
          </div>

          {/* Typography */}
          <BlurFade delay={1.6}>
            <div className="flex items-center gap-3 mb-8">
              <Type className="w-6 h-6 text-warm-sand" />
              <h3 className="text-3xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                Typography
              </h3>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlurFade delay={1.7}>
              <GlassCard variant="hover" intensity="subtle" className="p-6">
                <p className="text-sm font-space text-warm-sand mb-2">HEADINGS</p>
                <p className="text-lg font-geist text-stone-700 dark:text-neutral-300">
                  {project.uiux.typography.heading}
                </p>
              </GlassCard>
            </BlurFade>

            <BlurFade delay={1.75}>
              <GlassCard variant="hover" intensity="subtle" className="p-6">
                <p className="text-sm font-space text-warm-sand mb-2">BODY</p>
                <p className="text-lg font-geist text-stone-700 dark:text-neutral-300">
                  {project.uiux.typography.body}
                </p>
              </GlassCard>
            </BlurFade>

            <BlurFade delay={1.8}>
              <GlassCard variant="hover" intensity="subtle" className="p-6">
                <p className="text-sm font-space text-warm-sand mb-2">ACCENT</p>
                <p className="text-lg font-geist text-stone-700 dark:text-neutral-300">
                  {project.uiux.typography.accent}
                </p>
              </GlassCard>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="container mx-auto px-4 py-20">
        <BlurFade delay={1.9}>
          <h2 className="text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-12">
            Branding Kit & Guidelines
          </h2>
        </BlurFade>

        {/* Brand Colors */}
        <BlurFade delay={2.0}>
          <h3 className="text-2xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-6">
            Brand Colors
          </h3>
        </BlurFade>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <BlurFade delay={2.1}>
            <GlassCard variant="hover" intensity="subtle" className="p-0 overflow-hidden">
              <div
                className="h-40 w-full"
                style={{ backgroundColor: project.branding.brandColors.primary }}
              />
              <div className="p-4">
                <p className="font-space text-sm text-stone-600 dark:text-neutral-400">
                  PRIMARY
                </p>
                <p className="font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                  {project.branding.brandColors.primary}
                </p>
              </div>
            </GlassCard>
          </BlurFade>

          <BlurFade delay={2.15}>
            <GlassCard variant="hover" intensity="subtle" className="p-0 overflow-hidden">
              <div
                className="h-40 w-full"
                style={{ backgroundColor: project.branding.brandColors.secondary }}
              />
              <div className="p-4">
                <p className="font-space text-sm text-stone-600 dark:text-neutral-400">
                  SECONDARY
                </p>
                <p className="font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                  {project.branding.brandColors.secondary}
                </p>
              </div>
            </GlassCard>
          </BlurFade>

          <BlurFade delay={2.2}>
            <GlassCard variant="hover" intensity="subtle" className="p-0 overflow-hidden">
              <div
                className="h-40 w-full"
                style={{ backgroundColor: project.branding.brandColors.accent }}
              />
              <div className="p-4">
                <p className="font-space text-sm text-stone-600 dark:text-neutral-400">
                  ACCENT
                </p>
                <p className="font-jetbrains font-bold text-stone-900 dark:text-neutral-100">
                  {project.branding.brandColors.accent}
                </p>
              </div>
            </GlassCard>
          </BlurFade>
        </div>

        {/* Guidelines */}
        <BlurFade delay={2.3}>
          <h3 className="text-2xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-6">
            Brand Guidelines
          </h3>
        </BlurFade>

        <div className="space-y-4">
          {project.branding.guidelines.map((guideline, index) => (
            <BlurFade key={index} delay={2.4 + index * 0.05}>
              <GlassCard variant="hover" intensity="subtle" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-warm-sand flex items-center justify-center flex-shrink-0">
                    <span className="font-space font-bold text-stone-900 text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-stone-700 dark:text-neutral-300 font-geist">
                    {guideline}
                  </p>
                </div>
              </GlassCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="container mx-auto px-4 py-20">
        <Parallax speed={0.5} direction="up">
          <GlassCard variant="hover" intensity="subtle" className="p-12 text-center">
            <h2 className="text-3xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-4">
              Next Project
            </h2>
            <p className="text-xl text-stone-600 dark:text-neutral-400 font-geist mb-8">
              {nextProject.title}
            </p>
            <Link href={`/portfolio/${nextProject.id}`}>
              <Button variant="primary" className="gap-2">
                View Project <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </GlassCard>
        </Parallax>
      </section>
    </main>
  );
}
