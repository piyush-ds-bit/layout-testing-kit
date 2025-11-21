import React from "react";
import { motion } from "framer-motion";

interface ParticleEffectsProps {
  trigger: boolean;
  x: number;
  y: number;
  type?: "burst" | "sparkle" | "confetti";
}

const ParticleEffects: React.FC<ParticleEffectsProps> = ({ 
  trigger, 
  x, 
  y, 
  type = "burst" 
}) => {
  if (!trigger) return null;

  const particleCount = type === "confetti" ? 20 : 8;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <div className="absolute pointer-events-none z-50" style={{ left: x, top: y }}>
      {particles.map((i) => {
        const angle = (360 / particleCount) * i;
        const distance = type === "confetti" ? 100 : 50;
        const endX = Math.cos((angle * Math.PI) / 180) * distance;
        const endY = Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: type === "confetti" 
                ? ["#3b82f6", "#eab308", "#22c55e", "#a855f7"][i % 4]
                : "#a855f7",
              boxShadow: "0 0 8px currentColor",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: endX,
              y: endY,
              opacity: 0,
              scale: type === "sparkle" ? [1, 1.5, 0] : 0,
            }}
            transition={{
              duration: type === "confetti" ? 1.2 : 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleEffects;
