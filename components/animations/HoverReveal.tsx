'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverRevealProps {
  children: ReactNode;
  reveal: ReactNode;
  className?: string;
  revealClassName?: string;
}

/**
 * HoverReveal - Reveal content on hover with blur transition
 *
 * Features:
 * - Shows hidden content on hover
 * - Blur fade transition
 * - Museum-like subtle reveal
 * - Perfect for portfolio cards
 *
 * Usage:
 * <HoverReveal
 *   reveal={<div>Hidden info</div>}
 * >
 *   <img src="..." />
 * </HoverReveal>
 */
export default function HoverReveal({
  children,
  reveal,
  className = '',
  revealClassName = '',
}: HoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute inset-0 ${revealClassName}`}
          >
            {reveal}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
