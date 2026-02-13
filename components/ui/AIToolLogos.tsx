'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

const AI_TOOLS = [
  { name: 'Claude', icon: '/icons/4-removebg-preview.png' },
  { name: 'ChatGPT', icon: '/icons/6-removebg-preview.png' },
  { name: 'Gemini', icon: '/icons/7-removebg-preview.png' },
  { name: 'Perplexity', icon: '/icons/5-removebg-preview.png' },
  { name: 'Cursor', icon: '/icons/8-removebg-preview.png' },
  { name: 'GitHub Copilot', icon: '/icons/1-removebg-preview.png' },
  { name: 'v0', icon: '/icons/2-removebg-preview.png' },
  { name: 'GitHub', icon: '/icons/9-removebg-preview.png' },
  { name: 'Vercel', icon: '/icons/3-removebg-preview.png' },
];

export default function AIToolLogos() {
  const allTools = [...AI_TOOLS, ...AI_TOOLS, ...AI_TOOLS];

  return (
    <div className="py-10 bg-white dark:bg-deep-obsidian border-y border-gray-100 dark:border-neutral-800 overflow-hidden">
      <FadeIn direction="up" duration={0.6}>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium mb-8">
          Powered by Leading AI Tools
        </p>
      </FadeIn>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-deep-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-deep-obsidian to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex animate-marquee items-center">
          {allTools.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center"
            >
              <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={160}
                  height={32}
                  className="h-8 w-auto object-contain dark:invert"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
