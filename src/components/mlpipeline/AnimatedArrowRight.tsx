import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataParticle, { ParticleType } from "./DataParticle";

interface AnimatedArrowRightProps {
  isActive: boolean;
  particleType?: ParticleType;
}

const AnimatedArrowRight: React.FC<AnimatedArrowRightProps> = ({ 
  isActive, 
  particleType = "raw" 
}) => {
  const [particles, setParticles] = useState<Array<{ id: string; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        delay: i * 0.2,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="relative w-9 h-6 my-auto">
      {/* Animated gradient trail */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isActive ? [0, 0.6, 0] : 0,
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
          filter: "blur(4px)",
        }}
      />

      {/* Base arrow SVG */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 32 16" fill="none">
        <defs>
          <linearGradient 
            id={`arrow-right-gradient-${isActive ? 'active' : 'inactive'}`} 
            x1="0" 
            y1="8" 
            x2="32" 
            y2="8" 
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={isActive ? "#a855f7" : "#a855f7"} />
            <stop offset="1" stopColor={isActive ? "#d946ef" : "#9333ea"} />
          </linearGradient>
        </defs>
        <motion.path
          d="M2 8h24M25 4l5 4-5 4"
          stroke={`url(#arrow-right-gradient-${isActive ? 'active' : 'inactive'})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeWidth: isActive ? [3, 4, 3] : 3,
          }}
          transition={{
            duration: 1,
            repeat: isActive ? Infinity : 0,
          }}
        />
      </svg>

      {/* Data particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{ left: -10, top: "50%", translateY: "-50%" }}
            animate={{ left: "100%" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            <DataParticle
              id={particle.id}
              type={particleType}
              position={{ x: 0, y: 0 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedArrowRight;
