
import React from "react";
import { Wrench, Settings } from "lucide-react";

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

const PipelineStep: React.FC<PipelineStepProps> = ({ step, expanded, onClick, isMobile }) => (
  <button
    className={`
      portfolio-card-hover flex flex-col items-center justify-center
      py-6 px-3 md:py-7 md:px-4 mb-2 md:mb-0
      bg-[#182437]/80 border-2 border-portfolio-accent
      transition-all duration-300 relative
      ${expanded ? "z-20" : ""}
      ${isMobile ? "w-full min-w-[240px] max-w-[320px] mx-auto" : ""}
    `}
    style={{
      minWidth: isMobile ? 240 : 136,
      maxWidth: isMobile ? 320 : 175,
      boxShadow: expanded
        ? "0 0 16px 4px #4fd1c5cc, 0 6px 32px #4fd1c520"
        : undefined,
      transform: expanded ? "scale(1.055)" : undefined
    }}
    aria-expanded={expanded}
    onClick={onClick}
  >
    <div className={`text-2xl md:text-4xl mb-2 md:mb-3 select-none pulse`} style={{
      filter: "drop-shadow(0 0 6px #4fd1c5aa)",
    }}>
      {iconMap[step.icon] ?? step.icon}
    </div>
    <div className="text-sm md:text-lg font-semibold text-white text-center drop-shadow mb-1 md:mb-2">
      {step.label}
    </div>
    <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
    {expanded && (
      <div className="animate-fade-in mt-2 md:mt-3 mb-0 px-1 md:px-2">
        <div className="text-portfolio-accent font-medium mb-1 text-xs md:text-[14px] text-center">
          Tools:
        </div>
        <ul className="space-y-1 text-gray-300 text-xs md:text-[14px] text-left list-disc list-inside">
          {step.tools.map((tool: string, i: number) =>
            <li key={i} className="pl-2">{tool}</li>
          )}
        </ul>
        <div className="mt-2 text-gray-400 text-[11px] md:text-xs text-center">
          {step.description}
        </div>
      </div>
    )}
  </button>
);

export default PipelineStep;
