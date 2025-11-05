import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MorphingCreateIconProps {
  className?: string;
}

export const MorphingCreateIcon = memo(function MorphingCreateIcon({ className }: MorphingCreateIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative", className)}
      animate={{
        rotate: isHovered ? -135 : 0,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ duration: 0.618, ease: [0.4, 0, 0.2, 1] }} // Golden ratio timing
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Main vertical stem - morphs to vertical bar of + */}
          <motion.path
            fill="url(#morphGradient)"
            initial={{ d: "M 18 8 L 36 8 L 36 92 L 18 92 Z" }}
            animate={{ d: isHovered ? "M 40 15 L 60 15 L 60 85 L 40 85 Z" : "M 18 8 L 36 8 L 36 92 L 18 92 Z" }}
            transition={{ duration: 0.618, ease: [0.4, 0, 0.2, 1] }} // Golden ratio timing
          />

          {/* Top bowl of R - morphs to horizontal bar of + */}
          <motion.path
            fill="url(#morphGradient)"
            initial={{
              d: "M 36 8 L 70 8 C 82 8, 88 15, 88 26 C 88 37, 82 44, 70 44 L 36 44 Z",
              opacity: 1
            }}
            animate={{
              d: isHovered ? "M 15 40 L 85 40 L 85 60 L 15 60 Z" : "M 36 8 L 70 8 C 82 8, 88 15, 88 26 C 88 37, 82 44, 70 44 L 36 44 Z",
              opacity: 1
            }}
            transition={{ duration: 0.618, ease: [0.4, 0, 0.2, 1] }} // Golden ratio timing
          />

          {/* Diagonal leg of R - fades out when morphing to + */}
          <motion.path
            d="M 38 44 L 56 44 L 88 92 L 70 92 Z"
            fill="url(#morphGradient)"
            initial={{
              opacity: 1,
              scale: 1
            }}
            animate={{
              opacity: isHovered ? 0 : 1,
              scale: isHovered ? 0.8 : 1
            }}
            transition={{ duration: 0.382, ease: [0.4, 0, 0.2, 1] }} // Golden ratio timing (φ⁻²)
            style={{ transformOrigin: '50% 50%' }}
          />

          {/* Inner cut for dimension - fades out */}
          <motion.circle
            cx="62"
            cy="26"
            r="10"
            fill="var(--primary)"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: isHovered ? 0 : 0.25 }}
            transition={{ duration: 0.382 }} // Golden ratio timing (φ⁻²)
          />

          {/* Sharp accent detail on leg - fades out */}
          <motion.path
            d="M 56 44 L 60 44 L 78 78 L 74 78 Z"
            fill="currentColor"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: isHovered ? 0 : 0.15 }}
            transition={{ duration: 0.382 }} // Golden ratio timing (φ⁻²)
          />
        </motion.g>
      </svg>
    </motion.div>
  );
});
