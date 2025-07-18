
import React, { useState } from "react";
import { Wrench, Settings } from "lucide-react";

interface PipelineStepProps {
  step: any;
  isMobile: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="inline w-6 h-6 text-portfolio-accent" />,
  settings: <Settings className="inline w-6 h-6 text-portfolio-accent" />,
};

const PipelineStep: React.FC<PipelineStepProps> = ({ step, isMobile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className={`
        flip-card-container relative transition-all duration-700 ease-in-out
        ${isMobile ? "w-full min-w-[240px] max-w-[320px] mx-auto" : ""}
      `}
      style={{
        minWidth: isMobile ? 240 : 136,
        maxWidth: isMobile ? 320 : 175,
        height: isMobile ? 180 : (isFlipped && !isMobile ? "auto" : 160),
        minHeight: isMobile ? 180 : 160,
        perspective: "1000px",
      }}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
          flip-card relative w-full h-full transition-transform duration-700 ease-in-out
          ${isFlipped ? "flipped" : ""}
        `}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Face */}
        <div
          className={`
            flip-card-face flip-card-front absolute w-full h-full
            portfolio-card-hover flex flex-col items-center justify-center
            py-6 px-3 md:py-7 md:px-4
            bg-[#182437]/80 border-2 border-portfolio-accent
            transition-all duration-300 cursor-pointer
            ${isFlipped ? "z-10" : "z-20"}
          `}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: isFlipped
              ? "0 0 16px 4px #a855f7cc, 0 6px 32px #a855f720"
              : undefined,
          }}
        >
          <div className={`text-2xl md:text-4xl mb-2 md:mb-3 select-none pulse`} style={{
            filter: "drop-shadow(0 0 6px #a855f7aa)",
          }}>
            {iconMap[step.icon] ?? step.icon}
          </div>
          <div className="text-sm md:text-lg font-semibold text-white text-center drop-shadow mb-1 md:mb-2">
            {step.label}
          </div>
          <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
        </div>

        {/* Back Face */}
        <div
          className={`
            flip-card-face flip-card-back absolute w-full h-full
            portfolio-card-hover flex flex-col items-center justify-center
            py-6 px-3 md:py-7 md:px-4
            bg-[#182437]/80 border-2 border-portfolio-accent
            transition-all duration-300 cursor-pointer
            ${isFlipped ? "z-20" : "z-10"}
          `}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: isFlipped
              ? "0 0 16px 4px #a855f7cc, 0 6px 32px #a855f720"
              : undefined,
          }}
        >
          <div className="text-portfolio-accent font-medium mb-2 text-xs md:text-[14px] text-center">
            Tools:
          </div>
          <ul className="space-y-1 text-gray-300 text-xs md:text-[14px] text-left list-disc list-inside mb-3">
            {step.tools.map((tool: string, i: number) =>
              <li key={i} className="pl-2">{tool}</li>
            )}
          </ul>
          <div className="text-gray-400 text-[11px] md:text-xs text-center">
            {step.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineStep;
