import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataParticle, { ParticleType } from "./DataParticle";

interface AnimatedArrowDownProps {
  isActive: boolean;
  particleType?: ParticleType;
}

const AnimatedArrowDown: React.FC<AnimatedArrowDownProps> = ({ 
  isActive, 
  particleType = "raw" 
}) => {
  const [particles, setParticles] = useState<Array<{ id: string; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 2 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        delay: i * 0.3,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="relative w-7 h-7 mx-auto my-2">
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
          background: "linear-gradient(180deg, transparent, #a855f7, transparent)",
          filter: "blur(4px)",
        }}
      />

      {/* Base arrow SVG */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient 
            id={`arrow-down-gradient-${isActive ? 'active' : 'inactive'}`} 
            x1="0" 
            y1="0" 
            x2="0" 
            y2="32" 
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={isActive ? "#a855f7" : "#a855f7"} />
            <stop offset="1" stopColor={isActive ? "#d946ef" : "#9333ea"} />
          </linearGradient>
        </defs>
        <motion.path
          d="M16 8v16M8 20l8 8 8-8"
          stroke={`url(#arrow-down-gradient-${isActive ? 'active' : 'inactive'})`}
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
            initial={{ top: -10, left: "50%", translateX: "-50%" }}
            animate={{ top: "100%" }}
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

export default AnimatedArrowDown;
