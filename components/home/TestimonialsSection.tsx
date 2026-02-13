'use client';

import Section from '@/components/ui/Section';
import { ShoppingCart, TrendingUp, Search } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function TestimonialsSection() {
  return (
    <Section className="bg-gray-100 dark:bg-neutral-900">
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
          <div className="bg-white dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-warm-sand/20 flex items-center justify-center">
                <ShoppingCart size={20} className="text-warm-sand" />
              </div>
              <div>
                <p className="font-unbounded font-bold text-warm-sand">Founder</p>
                <p className="text-sm text-gray-400 dark:text-gray-400">Astern Autoparts, USA</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
              &quot;They took our entire 9,000-part catalogue and built a search system that actually works. Customers find what they need in seconds now, not minutes on the phone.&quot;
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.6}>
          <div className="bg-white dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-warm-sand/20 flex items-center justify-center">
                <Search size={20} className="text-warm-sand" />
              </div>
              <div>
                <p className="font-unbounded font-bold text-warm-sand">Director</p>
                <p className="text-sm text-gray-400 dark:text-gray-400">Marakk Design Atelier, India</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
              &quot;Our portfolio finally does our work justice. The site captures the elegance of our designs and has become our best sales tool for new consultations.&quot;
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3} duration={0.6}>
          <div className="bg-white dark:bg-deep-obsidian border border-warm-sand/20 rounded-lg p-8 hover:border-warm-sand/40 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-warm-sand/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-warm-sand" />
              </div>
              <div>
                <p className="font-unbounded font-bold text-warm-sand">Managing Director</p>
                <p className="text-sm text-gray-400 dark:text-gray-400">Marakk Developers, India</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
              &quot;The property platform with location-based browsing changed how we present listings. Buyers can explore neighbourhoods before they even call us.&quot;
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
