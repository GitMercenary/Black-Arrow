'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Service intent types
export type ServiceIntent =
  | 'website-development'
  | 'landing-page'
  | 'business-site'
  | 'custom-web-app'
  | null;

interface ServiceIntentContextType {
  lastVisitedService: ServiceIntent;
  currentPage: string;
  shouldShowSticky: boolean;
  shouldShowServiceBar: boolean;
  stickyContent: {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    showPrice: boolean;
  } | null;
}

const ServiceIntentContext = createContext<ServiceIntentContextType | undefined>(undefined);

const STORAGE_KEY = 'bat-service-intent';

// Website development related paths
const WD_PATHS = [
  '/services/website-development',
  '/services/website-development/landing-page',
  '/services/website-development/business-site',
  '/services/website-development/custom-web-app',
];

// Portfolio paths that should trigger website-development intent
const PORTFOLIO_PATHS = ['/portfolio'];

export function ServiceIntentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lastVisitedService, setLastVisitedService] = useState<ServiceIntent>(null);

  // Determine current page type
  const currentPage = pathname;

  // Check if currently on a WD page
  const isOnWDPage = WD_PATHS.some(path => pathname.startsWith(path));

  // Check if on portfolio
  const isOnPortfolio = PORTFOLIO_PATHS.some(path => pathname.startsWith(path));

  // Track service intent based on path changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Determine what service intent to set based on current path
    let newIntent: ServiceIntent = null;

    if (pathname === '/services/website-development/landing-page') {
      newIntent = 'landing-page';
    } else if (pathname === '/services/website-development/business-site') {
      newIntent = 'business-site';
    } else if (pathname === '/services/website-development/custom-web-app') {
      newIntent = 'custom-web-app';
    } else if (pathname === '/services/website-development') {
      newIntent = 'website-development';
    } else if (pathname.startsWith('/portfolio')) {
      // If coming from portfolio, set general website-development intent
      // but only if no specific service was visited before
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        newIntent = 'website-development';
      }
    }

    // Only update if visiting a relevant page
    if (newIntent) {
      setLastVisitedService(newIntent);
      sessionStorage.setItem(STORAGE_KEY, newIntent);
    } else {
      // Load from storage if not on a relevant page
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLastVisitedService(stored as ServiceIntent);
      }
    }
  }, [pathname]);

  // Determine if sticky should show
  // Show sticky when: user has visited a WD page AND is NOT currently on a WD page
  const shouldShowSticky = lastVisitedService !== null && !isOnWDPage;

  // Determine if service bar should show (bottom bar on WD pages)
  const shouldShowServiceBar = isOnWDPage;

  // Generate sticky content based on last visited service
  const getStickyContent = (): ServiceIntentContextType['stickyContent'] => {
    if (!lastVisitedService) return null;

    switch (lastVisitedService) {
      case 'landing-page':
        return {
          title: 'Landing Page',
          subtitle: 'Starting at £350',
          cta: 'Get Started',
          href: '/services/website-development/landing-page',
          showPrice: true,
        };
      case 'business-site':
        return {
          title: 'Business Site',
          subtitle: 'Professional web presence',
          cta: 'Get Quote',
          href: '/services/website-development/business-site',
          showPrice: false,
        };
      case 'custom-web-app':
        return {
          title: 'Custom Web App',
          subtitle: 'Tailored solutions',
          cta: 'Get Quote',
          href: '/services/website-development/custom-web-app',
          showPrice: false,
        };
      case 'website-development':
      default:
        return {
          title: 'Website Development',
          subtitle: 'Explore our packages',
          cta: 'View Options',
          href: '/services/website-development',
          showPrice: false,
        };
    }
  };

  const stickyContent = getStickyContent();

  return (
    <ServiceIntentContext.Provider
      value={{
        lastVisitedService,
        currentPage,
        shouldShowSticky,
        shouldShowServiceBar,
        stickyContent,
      }}
    >
      {children}
    </ServiceIntentContext.Provider>
  );
}

export function useServiceIntent() {
  const context = useContext(ServiceIntentContext);
  if (context === undefined) {
    throw new Error('useServiceIntent must be used within a ServiceIntentProvider');
  }
  return context;
}
