import React from "react";
import { motion } from "framer-motion";

export type ParticleType = "raw" | "processed" | "features" | "predictions";

interface DataParticleProps {
  id: string;
  type: ParticleType;
  position: { x: number; y: number };
  delay?: number;
}

const particleColors: Record<ParticleType, string> = {
  raw: "#3b82f6", // Blue
  processed: "#eab308", // Yellow
  features: "#22c55e", // Green
  predictions: "#a855f7", // Purple
};

const particleGlows: Record<ParticleType, string> = {
  raw: "0 0 12px #3b82f6aa, 0 0 6px #3b82f6cc",
  processed: "0 0 12px #eab308aa, 0 0 6px #eab308cc",
  features: "0 0 12px #22c55eaa, 0 0 6px #22c55ecc",
  predictions: "0 0 12px #a855f7aa, 0 0 6px #a855f7cc",
};

const DataParticle: React.FC<DataParticleProps> = ({ id, type, position, delay = 0 }) => {
  return (
    <motion.div
      key={id}
      className="absolute pointer-events-none z-50"
      initial={{ x: position.x, y: position.y, opacity: 0, scale: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.8],
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeInOut",
      }}
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: particleColors[type],
        boxShadow: particleGlows[type],
      }}
    />
  );
};

export default DataParticle;
