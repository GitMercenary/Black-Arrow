'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import FadeIn from '@/components/animations/FadeIn';
import { WEBSITE_DEV_PROJECTS, CATEGORY_INFO, type WebsiteProject } from '@/lib/data/websiteDevProjects';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

type FilterCategory = 'all' | WebsiteProject['category'];

const filters: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'landing-page', label: 'Landing Pages' },
  { value: 'business-site', label: 'Business Sites' },
  { value: 'custom-web-app', label: 'Web Apps' },
];

interface ProjectShowcaseProps {
  maxItems?: number;
  showFilters?: boolean;
  className?: string;
}

export default function ProjectShowcase({
  maxItems,
  showFilters = true,
  className = '',
}: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = WEBSITE_DEV_PROJECTS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  const projects = maxItems ? filteredProjects.slice(0, maxItems) : filteredProjects;

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && (
        <FadeIn direction="up" duration={0.6}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'bg-warm-sand text-deep-obsidian'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-cloud-dancer/70 hover:bg-warm-sand/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const categoryInfo = CATEGORY_INFO[project.category];
          const CategoryIcon = categoryInfo.icon;

          return (
            <FadeIn key={project.id} direction="up" duration={0.6} delay={index * 0.1}>
              <Card hover={false} className="overflow-hidden group">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />

                  {/* Category badge */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.bg} ${categoryInfo.color}`}>
                    <CategoryIcon size={12} />
                    {categoryInfo.label}
                  </div>

                  {/* Visit link overlay */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-deep-obsidian/40"
                  >
                    <span className="inline-flex items-center gap-2 bg-warm-sand text-deep-obsidian px-5 py-2.5 rounded-lg font-bold text-sm">
                      Visit Live Site
                      <ExternalLink size={14} />
                    </span>
                  </a>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-unbounded font-bold text-gray-900 dark:text-cloud-dancer">
                      {project.title}
                    </h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-sand hover:text-warm-sand/80 transition-colors flex-shrink-0 ml-2"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  <p className="text-gray-600 dark:text-cloud-dancer/70 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 rounded-md text-xs text-gray-600 dark:text-cloud-dancer/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5">
                    {project.highlights.slice(0, 3).map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-sm text-gray-600 dark:text-cloud-dancer/70">
                        <CheckCircle2 size={14} className="text-warm-sand flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
