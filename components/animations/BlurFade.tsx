'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inView?: boolean;
  className?: string;
}

/**
 * BlurFade - Fade in with blur transition (2026 aesthetic)
 *
 * Features:
 * - Blur from 10px to 0px while fading in
 * - Optional y-axis movement
 * - Minimal, purposeful motion
 * - Used sparingly for key elements only
 *
 * Usage:
 * <BlurFade delay={0.2}>
 *   <h1>Title</h1>
 * </BlurFade>
 */
export default function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 0,
  inView = true,
  className = '',
}: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: yOffset }}
      animate={
        inView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(10px)', y: yOffset }
      }
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
