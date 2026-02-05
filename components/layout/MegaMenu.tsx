'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, TrendingUp, Zap, Search, ArrowRight, Briefcase, FileText } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from '../ui/Button';

const SERVICES = [
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    description: 'Headless commerce platforms with AI recommendations',
    href: '/services/ecommerce',
    stat: '₹2.3Cr revenue unlocked',
  },
  {
    icon: TrendingUp,
    title: 'Performance Ads',
    description: 'Google, Meta & LinkedIn campaigns',
    href: '/services/ads',
    stat: '42% lower CAC',
  },
  {
    icon: Zap,
    title: 'Automation & AI',
    description: 'Workflow automation & AI chatbots',
    href: '/services/automation',
    stat: '80 hours/month saved',
  },
  {
    icon: Search,
    title: 'Technical SEO',
    description: 'Core Web Vitals & structured data',
    href: '/services/seo',
    stat: 'Page 3 → Position 2',
  },
];

const QUICK_LINKS = [
  {
    icon: Briefcase,
    title: 'Case Studies',
    href: '/case-studies',
    description: 'Real results from UK, UAE, and India',
  },
  {
    icon: FileText,
    title: 'Blog',
    href: '/blog',
    description: 'Insights on e-commerce & marketing',
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIAudit?: () => void;
}

export default function MegaMenu({ isOpen, onClose, onOpenAIAudit }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onMouseEnter={(e) => e.stopPropagation()}
      className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-deep-obsidian/95 backdrop-blur-xl border-t-2 border-warm-sand shadow-2xl z-90 animate-in fade-in slide-in-from-top-2 duration-200"
      role="menu"
      aria-label="Services mega menu"
      style={{ backdropFilter: 'blur(24px) saturate(180%)' }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-unbounded font-bold text-warm-sand mb-4 uppercase tracking-wider">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={onClose}
                    className={cn(
                      "group p-4 rounded-lg border border-gray-200 dark:border-neutral-700/50",
                      "hover:border-warm-sand/50 hover:bg-gray-100 dark:hover:bg-deep-obsidian/50",
                      "transition-all duration-200"
                    )}
                    role="menuitem"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-warm-sand group-hover:scale-110 transition-transform">
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-unbounded font-bold text-deep-obsidian dark:text-cloud-dancer group-hover:text-warm-sand transition-colors mb-1">
                          {service.title}
                        </h4>
                        <p className="text-sm text-deep-obsidian dark:text-cloud-dancer/60 mb-2">
                          {service.description}
                        </p>
                        <div className="text-xs text-warm-sand/80 font-medium">
                          {service.stat}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="flex-shrink-0 text-deep-obsidian dark:text-cloud-dancer/40 group-hover:text-warm-sand group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/services"
              onClick={onClose}
              className="inline-flex items-center gap-2 mt-6 text-sm text-warm-sand hover:gap-3 transition-all"
              role="menuitem"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick Links & CTA Section */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-unbounded font-bold text-warm-sand mb-4 uppercase tracking-wider">
                Quick Links
              </h3>
              <div className="space-y-2">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-start gap-3 p-3 rounded-lg",
                        "hover:bg-gray-100 dark:hover:bg-deep-obsidian/50 transition-all"
                      )}
                      role="menuitem"
                    >
                      <Icon size={20} className="flex-shrink-0 text-warm-sand/60 group-hover:text-warm-sand transition-colors" />
                      <div>
                        <h4 className="font-hanken font-bold text-deep-obsidian dark:text-cloud-dancer group-hover:text-warm-sand transition-colors text-sm">
                          {link.title}
                        </h4>
                        <p className="text-xs text-deep-obsidian dark:text-cloud-dancer/60">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-warm-sand/10 to-warm-sand/5 border border-warm-sand/30 rounded-lg p-6">
              <h4 className="font-unbounded font-bold text-lg mb-2">
                Ready to Scale?
              </h4>
              <p className="text-sm text-deep-obsidian dark:text-cloud-dancer/70 mb-4">
                Get a free AI audit of your digital presence. No obligations, just actionable insights.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  onClose();
                  onOpenAIAudit?.();
                }}
              >
                Start Your AI Audit
              </Button>
            </div>

            {/* Featured Stat */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-neutral-700/50">
              <div className="text-2xl font-unbounded font-bold text-warm-sand mb-1">
                ₹50Cr+
              </div>
              <div className="text-xs text-deep-obsidian dark:text-cloud-dancer/60">
                Revenue Generated for Clients
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
