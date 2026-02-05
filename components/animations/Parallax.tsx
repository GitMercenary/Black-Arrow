'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0.5 = half speed, 2 = double speed
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * Parallax - Subtle parallax scroll effect for 2026 aesthetic
 *
 * Features:
 * - Smooth parallax movement based on scroll
 * - Configurable speed and direction
 * - Optimized with useTransform
 * - Subtle by default (speed: 0.5)
 *
 * Usage:
 * <Parallax speed={0.5} direction="up">
 *   <img src="..." />
 * </Parallax>
 */
export default function Parallax({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const { scrollY } = useScroll();

  // Calculate element position on mount and resize
  useEffect(() => {
    if (!ref.current) return;

    const onResize = () => {
      if (ref.current) {
        setElementTop(ref.current.offsetTop);
        setClientHeight(window.innerHeight);
      }
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Calculate parallax range
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);

  // Transform scroll to parallax movement
  const yRange = useTransform(
    scrollY,
    [initial, final],
    [0, (final - initial) * speed * (direction === 'down' ? 1 : -1)]
  );

  const xRange = useTransform(
    scrollY,
    [initial, final],
    [0, (final - initial) * speed * (direction === 'right' ? 1 : -1)]
  );

  const transform: { y?: MotionValue<number>; x?: MotionValue<number> } = {};

  if (direction === 'up' || direction === 'down') {
    transform.y = yRange;
  } else {
    transform.x = xRange;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={transform}>{children}</motion.div>
    </div>
  );
}
