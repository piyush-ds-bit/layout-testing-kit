
import React, { useState } from "react";
import { Wrench, Settings } from "lucide-react";
import { motion } from "framer-motion";

interface PipelineStepProps {
  step: any;
  expanded: boolean;
  onClick: () => void;
  isMobile: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="inline w-6 h-6 text-portfolio-accent" />,
  settings: <Settings className="inline w-6 h-6 text-portfolio-accent" />,
};

const PipelineStep: React.FC<PipelineStepProps> = ({ step, expanded, onClick, isMobile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // For mobile, use the existing tap-to-expand behavior
  if (isMobile) {
    return (
      <button
        className={`
          portfolio-card-hover flex flex-col items-center justify-center
          py-6 px-3 mb-2
          bg-[#182437]/80 border-2 border-portfolio-accent
          transition-all duration-300 relative
          ${expanded ? "z-20" : ""}
          w-full min-w-[240px] max-w-[320px] mx-auto
        `}
        style={{
          minWidth: 240,
          maxWidth: 320,
          boxShadow: expanded
            ? "0 0 16px 4px #a855f7cc, 0 6px 32px #a855f720"
            : undefined,
          transform: expanded ? "scale(1.055)" : undefined
        }}
        aria-expanded={expanded}
        onClick={onClick}
      >
        <div className={`text-2xl mb-2 select-none pulse`} style={{
          filter: "drop-shadow(0 0 6px #a855f7aa)",
        }}>
          {iconMap[step.icon] ?? step.icon}
        </div>
        <div className="text-sm font-semibold text-white text-center drop-shadow mb-1">
          {step.label}
        </div>
        <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
        {expanded && (
          <div className="animate-fade-in mt-2 mb-0 px-1">
            <div className="text-portfolio-accent font-medium mb-1 text-xs text-center">
              Tools:
            </div>
            <ul className="space-y-1 text-gray-300 text-xs text-left list-disc list-inside">
              {step.tools.map((tool: string, i: number) =>
                <li key={i} className="pl-2">{tool}</li>
              )}
            </ul>
            <div className="mt-2 text-gray-400 text-[11px] text-center">
              {step.description}
            </div>
          </div>
        )}
      </button>
    );
  }

  // For desktop, use the flip card animation
  return (
    <div 
      className="relative"
      style={{
        minWidth: 136,
        maxWidth: 175,
        height: 160, // Fixed height to prevent layout shift
        perspective: 1000,
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {/* Front side */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <button
            className={`
              portfolio-card-hover flex flex-col items-center justify-center
              w-full h-full py-7 px-4
              bg-[#182437]/80 border-2 border-portfolio-accent
              transition-all duration-300
            `}
          >
            <div className={`text-4xl mb-3 select-none pulse`} style={{
              filter: "drop-shadow(0 0 6px #a855f7aa)",
            }}>
              {iconMap[step.icon] ?? step.icon}
            </div>
            <div className="text-lg font-semibold text-white text-center drop-shadow mb-2">
              {step.label}
            </div>
            <div className="w-1 h-1 bg-portfolio-accent rounded-full" />
          </button>
        </motion.div>

        {/* Back side */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className={`
            flex flex-col items-center justify-start
            w-full h-full py-4 px-3
            bg-[#182437]/90 border-2 border-portfolio-accent
            overflow-hidden
          `}>
            <div className="text-portfolio-accent font-medium mb-2 text-sm text-center">
              Tools:
            </div>
            <div className="flex-1 w-full overflow-y-auto scrollbar-hide">
              <ul className="space-y-1 text-gray-300 text-xs text-left list-disc list-inside">
                {step.tools.map((tool: string, i: number) =>
                  <li key={i} className="pl-2">{tool}</li>
                )}
              </ul>
              <div className="mt-3 text-gray-400 text-xs text-center">
                {step.description}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PipelineStep;
