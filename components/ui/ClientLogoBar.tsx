'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

const CLIENTS = [
  { name: 'Astern Autoparts', location: 'USA', logo: '/logos/astern-autoparts.png' },
  { name: 'Marakk Design Atelier', location: 'India', logo: '/logos/marakk-design-atelier.png' },
  { name: 'Marakk Developers', location: 'India', logo: '/logos/marakk-developers.png' },
  { name: 'Bharath Cycle Hub', location: 'India', logo: '/logos/bharath-cycle-hub.png' },
];

export default function ClientLogoBar() {
  const allClients = [...CLIENTS, ...CLIENTS];

  return (
    <div className="py-10 bg-white dark:bg-deep-obsidian border-y border-gray-100 dark:border-neutral-800 overflow-hidden">
      <FadeIn direction="up" duration={0.6}>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium mb-8">
          Trusted by Businesses in UAE, UK &amp; India
        </p>
      </FadeIn>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-deep-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-deep-obsidian to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex animate-marquee">
          {allClients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center"
            >
              <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center" style={{ minWidth: '160px', height: '56px' }}>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={48}
                    className="h-12 w-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
