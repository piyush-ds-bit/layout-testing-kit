import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface MobileSectionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const MobileSectionCard: React.FC<MobileSectionCardProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible } = useScrollAnimation(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative bg-portfolio-card-bg/80 backdrop-blur-xl rounded-2xl border border-portfolio-accent/20 shadow-lg overflow-hidden ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated gradient border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
            filter: 'blur(8px)',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default MobileSectionCard;
