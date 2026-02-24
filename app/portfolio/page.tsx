'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import BlurFade from '@/components/animations/BlurFade';
import FadeIn from '@/components/animations/FadeIn';
import { portfolioProjects, getFeaturedProjects } from '@/lib/data/portfolioData';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const industries = ['All', 'Real Estate', 'Hospitality', 'Automotive', 'Tech', 'E-commerce'];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.industry === activeFilter);

  const featuredProjects = getFeaturedProjects();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">

      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative overflow-hidden pt-8 pb-0">
        {/* Background gradient + pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-sand/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-pattern-topo pointer-events-none" />

        <div className="relative container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left: Heading + Subtitle */}
            <div className="lg:col-span-7">
              <BlurFade delay={0.05}>
                <span className="font-space text-xs uppercase tracking-[0.2em] text-warm-sand mb-6 block">
                  Portfolio
                </span>
              </BlurFade>
              <BlurFade delay={0.1}>
                <h1 className="font-unbounded font-bold text-5xl md:text-7xl lg:text-8xl text-stone-900 dark:text-neutral-100 leading-[1.05] mb-6">
                  Selected<br />
                  <span className="text-warm-sand">Work</span>
                </h1>
              </BlurFade>
              <BlurFade delay={0.25}>
                <p className="font-hanken text-lg md:text-xl text-stone-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                  A curated collection of websites and applications we&apos;ve crafted. Each
                  project showcases our approach to functionality, design, and user experience.
                </p>
              </BlurFade>
            </div>

            {/* Right: Stats Strip */}
            <div className="lg:col-span-5">
              <FadeIn direction="left" delay={0.3} duration={0.6}>
                <div className="grid grid-cols-2 gap-8 lg:gap-10">
                  {[
                    { number: '50+', label: 'Projects Built' },
                    { number: '10+', label: 'Industries Served' },
                    { number: '4+', label: 'Years Active' },
                    { number: '3', label: 'Countries' },
                  ].map((stat) => (
                    <div key={stat.label} className="border-l-2 border-warm-sand/30 pl-6">
                      <p className="font-unbounded font-bold text-4xl md:text-5xl text-warm-sand leading-none mb-2">
                        {stat.number}
                      </p>
                      <p className="font-hanken text-sm text-stone-500 dark:text-neutral-500 uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

        {/* Bottom gradient divider */}
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-warm-sand/30 to-transparent" />
        </div>
      </section>

      {/* ─── SECTION 2: FEATURED PROJECTS (ASYMMETRIC BENTO GRID) ─── */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-stone-900 dark:text-neutral-100 mb-12">
            Featured Work
          </h2>
        </FadeIn>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {featuredProjects.map((project, index) => {
            const isLarge = index === 0;
            return (
              <FadeIn
                key={project.id}
                direction="up"
                delay={0.1 + index * 0.12}
                duration={0.6}
                className={
                  isLarge
                    ? 'col-span-12 md:col-span-7 md:row-span-2'
                    : 'col-span-12 md:col-span-5'
                }
              >
                <Link
                  href={`/portfolio/${project.id}`}
                  className={`group relative block overflow-hidden rounded-2xl ${
                    isLarge ? 'h-[500px]' : 'h-[300px] md:h-[240px]'
                  }`}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-smooth group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.thumbnail}')` }}
                  />

                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category pill — top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-warm-sand text-stone-900 font-space text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      {project.industry}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Description — hover only */}
                    <p className="font-hanken text-sm text-neutral-300 leading-relaxed mb-3 max-w-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.description.length > 100
                        ? project.description.slice(0, 100) + '...'
                        : project.description}
                    </p>

                    <div className="flex items-end justify-between">
                      <div>
                        <h3
                          className={`font-unbounded font-bold text-white leading-tight ${
                            isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                          }`}
                        >
                          {project.title.split(' - ')[0]}
                        </h3>
                        <p className="font-hanken text-sm text-neutral-400 mt-1">
                          {project.client}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="text-warm-sand opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-4"
                        size={24}
                      />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 3: ALL PROJECTS (FILTERABLE GRID) ─── */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn direction="up" duration={0.6}>
          <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-stone-900 dark:text-neutral-100 mb-8">
            All Projects
          </h2>
        </FadeIn>

        {/* Filter pills */}
        <FadeIn direction="up" delay={0.1} duration={0.5}>
          <p className="font-hanken text-sm text-stone-500 dark:text-neutral-500 mb-4 uppercase tracking-wide">
            Filter by Industry
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`
                  px-5 py-2.5 rounded-full font-hanken font-medium text-sm
                  transition-all duration-300 ease-smooth
                  ${
                    activeFilter === industry
                      ? 'bg-warm-sand text-stone-900 shadow-sm scale-105'
                      : 'bg-stone-100 dark:bg-neutral-800 text-stone-600 dark:text-neutral-400 hover:bg-stone-200 dark:hover:bg-neutral-700'
                  }
                `}
              >
                {industry}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Filtered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/portfolio/${project.id}`} className="group block h-full">
                  <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-warm-sand/30 dark:hover:border-warm-sand/20 transition-colors duration-300 h-full flex flex-col">

                    {/* Image */}
                    <div className="relative h-[220px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${project.thumbnail}')` }}
                      />
                      {/* Industry badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block bg-warm-sand text-stone-900 font-space text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-unbounded font-bold text-base text-stone-900 dark:text-neutral-100 group-hover:text-warm-sand transition-colors leading-snug mb-2">
                        {project.title.split(' - ')[0]}
                      </h3>
                      <p className="font-hanken text-sm text-stone-600 dark:text-neutral-400 line-clamp-2 leading-relaxed flex-1 mb-4">
                        {project.description}
                      </p>
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-neutral-800">
                        <span className="font-space text-xs text-stone-400 dark:text-neutral-600">
                          {project.year}
                        </span>
                        <ArrowUpRight
                          className="text-warm-sand opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          size={18}
                        />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── SECTION 4: ARCHIVE TABLE ─── */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn direction="up" duration={0.6}>
          <div className="flex items-baseline gap-4 mb-12">
            <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-stone-900 dark:text-neutral-100">
              Archive
            </h2>
            <span className="font-space text-sm text-stone-400 dark:text-neutral-600">
              ({portfolioProjects.length})
            </span>
          </div>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t-2 border-warm-sand border-b border-stone-200 dark:border-neutral-800">
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-warm-sand uppercase tracking-widest">
                  #
                </th>
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-stone-900 dark:text-neutral-100 uppercase tracking-widest">
                  Year
                </th>
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-stone-900 dark:text-neutral-100 uppercase tracking-widest">
                  Project
                </th>
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-stone-900 dark:text-neutral-100 uppercase tracking-widest hidden md:table-cell">
                  Client
                </th>
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-stone-900 dark:text-neutral-100 uppercase tracking-widest hidden lg:table-cell">
                  Industry
                </th>
                <th className="text-left py-4 px-4 font-unbounded font-bold text-xs text-stone-900 dark:text-neutral-100 uppercase tracking-widest">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolioProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="index-row border-b border-stone-100 dark:border-neutral-800"
                >
                  <td className="py-5 px-4 font-space text-warm-sand text-xs font-bold">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-5 px-4 font-space text-stone-500 dark:text-neutral-500 text-xs">
                    {project.year}
                  </td>
                  <td className="py-5 px-4">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="font-hanken font-semibold text-stone-900 dark:text-neutral-100 hover:text-warm-sand transition-colors"
                    >
                      {project.title.split(' - ')[0]}
                    </Link>
                  </td>
                  <td className="py-5 px-4 font-hanken text-stone-600 dark:text-neutral-400 hidden md:table-cell">
                    {project.client}
                  </td>
                  <td className="py-5 px-4 hidden lg:table-cell">
                    <span className="flex items-center gap-2 font-hanken text-stone-600 dark:text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-warm-sand flex-shrink-0" />
                      {project.industry}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-hanken text-warm-sand hover:text-warm-sand-hover transition-colors text-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit
                      </a>
                    ) : (
                      <span className="font-hanken text-stone-400 dark:text-neutral-600 text-sm">
                        NDA
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── SECTION 5: CTA ─── */}
      <section className="relative overflow-hidden py-32">
        {/* Background */}
        <div className="absolute inset-0 bg-warm-sand/10 dark:bg-warm-sand/5" />
        <div className="absolute inset-0 bg-pattern-diagonal" />

        <div className="relative container mx-auto px-4 text-center">
          <FadeIn direction="up" duration={0.6}>
            <h2 className="font-unbounded font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900 dark:text-neutral-100 mb-6 leading-tight max-w-3xl mx-auto">
              Ready to build something     {' '}
              <span className="text-warm-sand">exceptional</span>?
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.15} duration={0.6}>
            <p className="font-hanken text-xl text-stone-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              From concept to launch, we&apos;ll engineer a digital experience that drives
              real results. Let&apos;s build it{' '}
              <span className="text-warm-sand font-semibold">together</span>.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} duration={0.6}>
            <Link href="/contact">
              <Button variant="primary" className="text-lg px-12 py-5">
                Start Your Project <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
