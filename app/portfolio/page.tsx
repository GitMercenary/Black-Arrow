'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import BlurFade from '@/components/animations/BlurFade';
import Parallax from '@/components/animations/Parallax';
import HoverReveal from '@/components/animations/HoverReveal';
import { portfolioProjects, getFeaturedProjects } from '@/lib/data/portfolioData';
import { ArrowRight, ExternalLink, Calendar, Tag } from 'lucide-react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured');

  const industries = ['All', 'Real Estate', 'Hospitality', 'Automotive', 'Tech', 'E-commerce'];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.industry === activeFilter);

  const featuredProjects = getFeaturedProjects();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <Parallax speed={0.3} direction="down">
          <BlurFade delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-6">
              Selected Work
            </h1>
          </BlurFade>
        </Parallax>

        <BlurFade delay={0.2}>
          <p className="text-xl text-stone-600 dark:text-neutral-400 font-geist max-w-2xl">
            A curated collection of websites and applications we've crafted. Each project
            showcases our approach to functionality, design, and user experience.
          </p>
        </BlurFade>
      </section>

      {/* Featured Projects - Large Bento Grid */}
      <section className="container mx-auto px-4 py-20">
        <BlurFade delay={0.4}>
          <h2 className="text-3xl md:text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-12">
            Featured Projects
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <BlurFade key={project.id} delay={0.5 + index * 0.1}>
              <Link href={`/portfolio/${project.id}`} className="group block">
                <div>
                  {/* Image Card */}
                  <GlassCard
                    variant="hover"
                    intensity="subtle"
                    className="relative overflow-hidden h-[400px] p-0 mb-4"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('${project.thumbnail}')`,
                      }}
                    />

                    {/* Category Tag - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center gap-2 bg-warm-sand/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm font-space font-bold text-stone-900">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Content Below Card */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 group-hover:text-warm-sand transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-stone-600 dark:text-neutral-400 font-geist text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-stone-200 dark:bg-neutral-800 rounded-full text-xs font-space text-stone-600 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Industry Sections - Tabbed Grid */}
      <section className="container mx-auto px-4 py-20">
        <BlurFade delay={0.6}>
          <h2 className="text-3xl md:text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-8">
            All Projects
          </h2>
        </BlurFade>

        {/* Filter Chips */}
        <BlurFade delay={0.65}>
          <p className="text-sm font-space text-stone-500 dark:text-neutral-500 mb-4 uppercase tracking-wide">
            Filter by Industry
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`
                  px-6 py-3 rounded-full font-geist font-medium transition-all duration-300 ease-smooth
                  ${
                    activeFilter === industry
                      ? 'bg-warm-sand text-stone-900 shadow-md scale-105'
                      : 'bg-stone-200 dark:bg-neutral-800 text-stone-600 dark:text-neutral-400 hover:bg-stone-300 dark:hover:bg-neutral-700'
                  }
                `}
              >
                {industry}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Grid with smooth transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/portfolio/${project.id}`} className="group block">
                  <div>
                    {/* Image Card */}
                    <GlassCard
                      variant="hover"
                      intensity="subtle"
                      className="relative overflow-hidden h-[350px] p-0 mb-4"
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('${project.thumbnail}')`,
                        }}
                      />

                      {/* Category Tag - Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-flex items-center gap-2 bg-warm-sand/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Tag className="w-4 h-4" />
                          <span className="text-sm font-space font-bold text-stone-900">
                            {project.industry}
                          </span>
                        </div>
                      </div>
                    </GlassCard>

                    {/* Content Below Card */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 group-hover:text-warm-sand transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-stone-600 dark:text-neutral-400 font-geist text-sm line-clamp-2">
                        {project.description}
                      </p>
                      <p className="text-xs font-space text-stone-500 dark:text-neutral-500">
                        {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Archive Table View */}
      <section className="container mx-auto px-4 py-20">
        <BlurFade delay={0.7}>
          <h2 className="text-3xl md:text-4xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-12">
            Archive
          </h2>
        </BlurFade>

        <div className="overflow-x-auto">
          <table className="w-full font-space text-sm">
            <thead>
              <tr className="border-b-2 border-stone-300 dark:border-neutral-700">
                <th className="text-left py-4 px-4 font-bold text-stone-900 dark:text-neutral-100">
                  YEAR
                </th>
                <th className="text-left py-4 px-4 font-bold text-stone-900 dark:text-neutral-100">
                  PROJECT
                </th>
                <th className="text-left py-4 px-4 font-bold text-stone-900 dark:text-neutral-100">
                  CLIENT
                </th>
                <th className="text-left py-4 px-4 font-bold text-stone-900 dark:text-neutral-100">
                  INDUSTRY
                </th>
                <th className="text-left py-4 px-4 font-bold text-stone-900 dark:text-neutral-100">
                  LINK
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
                  className="index-row border-b border-stone-200 dark:border-neutral-800"
                >
                  <td className="py-4 px-4 text-stone-600 dark:text-neutral-400">
                    {project.year}
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="text-stone-900 dark:text-neutral-100 hover:text-warm-sand transition-colors font-semibold"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-stone-600 dark:text-neutral-400">
                    {project.client}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-stone-200 dark:bg-neutral-800 rounded-full text-xs">
                      {project.industry}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-warm-sand hover:text-warm-sand-hover transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit
                      </a>
                    ) : (
                      <span className="text-stone-400 dark:text-neutral-600">NDA</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Parallax speed={0.5} direction="up">
          <GlassCard
            variant="static"
            intensity="subtle"
            className="text-center py-20 px-8"
          >
            <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-stone-900 dark:text-neutral-100 mb-6">
              Ready to join them?
            </h2>
            <p className="text-xl text-stone-600 dark:text-neutral-400 font-geist mb-8 max-w-2xl mx-auto">
              Let's build something exceptional together. From concept to launch, we'll engineer a
              digital experience that drives real results.
            </p>
            <Link href="/contact">
              <Button variant="primary" className="text-lg px-12 py-6">
                Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </GlassCard>
        </Parallax>
      </section>
    </main>
  );
}
