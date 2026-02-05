'use client';

import { useEffect } from 'react';

/**
 * ViewportFix Component
 *
 * Forces viewport recalculation on mount to fix mobile viewport issues.
 * Addresses the problem where fixed elements don't recalculate position
 * until scroll events occur, caused by font loading and initial render calculations.
 */
export default function ViewportFix() {
  useEffect(() => {
    // Force viewport recalculation after fonts load
    const forceRecalc = () => {
      // Trigger a scroll event to force recalculation
      window.scrollTo(0, window.scrollY);

      // Force browser reflow
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    };

    // Run after a short delay to ensure fonts are loaded
    const timer = setTimeout(forceRecalc, 100);

    // Also run when fonts are fully loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(forceRecalc);
    }

    return () => clearTimeout(timer);
  }, []);

  return null; // This component renders nothing
}
