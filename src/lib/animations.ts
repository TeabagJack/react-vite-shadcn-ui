/**
 * Animation utility functions and variants for consistent micro-animations
 */

import { Variants } from 'framer-motion';

/**
 * Standard page transition variants
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

/**
 * Fade in/out variants
 */
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale variants for modals and popovers
 */
export const scaleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

/**
 * Slide from bottom variants (for sheets/drawers)
 */
export const slideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '100%',
  },
};

/**
 * Slide from right variants (for sidebars)
 */
export const slideRightVariants: Variants = {
  initial: {
    opacity: 0,
    x: '100%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100%',
  },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/**
 * Stagger item animation
 */
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

/**
 * Standard transition configs
 */
export const transitions = {
  // Fast transition for micro-interactions
  fast: {
    type: 'tween' as const,
    ease: 'easeInOut',
    duration: 0.15,
  },
  // Standard transition for most animations
  standard: {
    type: 'tween' as const,
    ease: 'easeInOut',
    duration: 0.3,
  },
  // Slower transition for page changes
  slow: {
    type: 'tween' as const,
    ease: 'easeInOut',
    duration: 0.5,
  },
  // Spring transition for bouncy effects
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
};

/**
 * Hover scale animation (for buttons)
 */
export const hoverScale = {
  scale: 1.02,
  transition: transitions.fast,
};

/**
 * Tap scale animation (for buttons)
 */
export const tapScale = {
  scale: 0.98,
  transition: transitions.fast,
};
