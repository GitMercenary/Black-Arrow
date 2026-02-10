'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RegionCode, REGIONS } from '@/lib/constants/regions';

interface RegionContextType {
  currentRegion: RegionCode;
  setRegion: (region: RegionCode) => void;
  regionData: typeof REGIONS[RegionCode];
  isAutoDetected: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

// Map country codes to our regions
const COUNTRY_TO_REGION: Record<string, RegionCode> = {
  // UK and territories
  GB: 'UK',
  // UAE
  AE: 'UAE',
  // India
  IN: 'IND',
};

const REGION_STORAGE_KEY = 'bat-region-preference';

// Fallback: Detect region from timezone
function detectRegionFromTimezone(): RegionCode {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // UK timezones
  if (timezone.includes('London') || timezone.includes('Europe/London')) {
    return 'UK';
  }

  // UAE timezones
  if (timezone.includes('Dubai') || timezone.includes('Asia/Dubai')) {
    return 'UAE';
  }

  // India timezones
  if (timezone.includes('Kolkata') || timezone.includes('Asia/Kolkata') ||
      timezone.includes('Mumbai') || timezone.includes('Delhi')) {
    return 'IND';
  }

  // Default to UK for other timezones
  return 'UK';
}

async function detectRegionFromIP(): Promise<RegionCode | null> {
  // Try multiple IP geolocation services for better reliability
  // All services must use HTTPS to avoid mixed content errors
  const services = [
    {
      name: 'ipapi.co',
      url: 'https://ipapi.co/json/',
      extract: (data: any) => data.country_code
    },
    {
      name: 'ipwho.is',
      url: 'https://ipwho.is/',
      extract: (data: any) => data.country_code
    }
  ];

  for (const service of services) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(service.url, {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const data = await response.json();
      const countryCode = await service.extract(data);

      if (countryCode && COUNTRY_TO_REGION[countryCode]) {
        return COUNTRY_TO_REGION[countryCode];
      }
    } catch (error) {
      // Try next service
      continue;
    }
  }

  // All services failed
  return null;
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<RegionCode>('UK');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    async function initializeRegion() {
      if (typeof window === 'undefined') return;

      // Priority 1: Check hostname for subdomain (ae., in.)
      const hostname = window.location.hostname;
      if (hostname.startsWith('ae.')) {
        setCurrentRegion('UAE');
        return;
      } else if (hostname.startsWith('in.')) {
        setCurrentRegion('IND');
        return;
      }

      // Priority 2: Check localStorage for saved preference
      const savedRegion = localStorage.getItem(REGION_STORAGE_KEY);
      if (savedRegion && (savedRegion === 'UK' || savedRegion === 'UAE' || savedRegion === 'IND')) {
        setCurrentRegion(savedRegion as RegionCode);
        return;
      }

      // Priority 3: Auto-detect from IP using ipapi.co
      const detectedRegion = await detectRegionFromIP();
      if (detectedRegion) {
        setCurrentRegion(detectedRegion);
        setIsAutoDetected(true);
        // Save auto-detected region to localStorage
        localStorage.setItem(REGION_STORAGE_KEY, detectedRegion);
      } else {
        // Priority 4: Fallback to timezone-based detection
        const timezoneRegion = detectRegionFromTimezone();
        setCurrentRegion(timezoneRegion);
        setIsAutoDetected(true);
        localStorage.setItem(REGION_STORAGE_KEY, timezoneRegion);
      }
    }

    initializeRegion();
  }, []);

  const handleSetRegion = (region: RegionCode) => {
    setCurrentRegion(region);
    setIsAutoDetected(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(REGION_STORAGE_KEY, region);
    }
  };

  const regionData = REGIONS[currentRegion];

  return (
    <RegionContext.Provider
      value={{
        currentRegion,
        setRegion: handleSetRegion,
        regionData,
        isAutoDetected
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
