'use client';

import { useEffect, useState } from 'react';
import { useRegion } from '@/lib/contexts/RegionContext';
import { getCookiePreferences } from '@/lib/utils/cookies';
import Script from 'next/script';

/**
 * Microsoft Clarity Analytics Integration
 *
 * Provides session recordings, heatmaps, and user behavior insights.
 * Free tier includes unlimited sessions and no data limits.
 *
 * Setup Instructions:
 * 1. Create a project at https://clarity.microsoft.com/
 * 2. Get your Project ID from Settings
 * 3. Add NEXT_PUBLIC_CLARITY_PROJECT_ID to your .env.local file
 * 4. Deploy and verify tracking in Clarity dashboard
 *
 * Features enabled:
 * - Session recordings
 * - Heatmaps (click, scroll, area)
 * - Rage clicks detection
 * - Dead clicks detection
 * - Excessive scrolling detection
 * - Quick backs detection
 *
 * Custom tags for better segmentation:
 * - Region (UK, UAE, IND)
 * - Auto-detected vs Manual selection
 */

export default function MicrosoftClarity() {
  const { currentRegion, isAutoDetected } = useRegion();
  const [hasConsent, setHasConsent] = useState(false);

  // Get Clarity Project ID from environment variable
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    // Check if user has consented to analytics cookies
    const preferences = getCookiePreferences();
    setHasConsent(preferences.analytics);
  }, []);

  useEffect(() => {
    // Only run if Clarity is loaded and we have a project ID
    if (typeof window !== 'undefined' && projectId && (window as any).clarity) {
      // Set custom tags for better session segmentation
      (window as any).clarity('set', 'region', currentRegion);
      (window as any).clarity('set', 'region_detection', isAutoDetected ? 'auto' : 'manual');
    }
  }, [currentRegion, isAutoDetected, projectId]);

  // Don't render if:
  // 1. No project ID configured
  // 2. User hasn't consented to analytics cookies
  if (!projectId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Microsoft Clarity: No project ID found. Add NEXT_PUBLIC_CLARITY_PROJECT_ID to .env.local to enable analytics.'
      );
    }
    return null;
  }

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id="microsoft-clarity"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${projectId}");
          `,
        }}
      />
    </>
  );
}
