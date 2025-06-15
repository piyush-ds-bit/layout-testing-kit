
import React from "react";
import type { MLPipelineStep } from "./mlPipelineSteps";

interface StepNodeProps {
  step: MLPipelineStep;
  expanded: boolean;
  onClick: () => void;
}

const StepNode: React.FC<StepNodeProps> = ({ step, expanded, onClick }) => (
  <div
    className={`
      group flex flex-col items-center
      transition-transform duration-300
      relative z-10
      mx-2 md:mx-0 min-w-[150px] md:min-w-0
    `}
    style={{
      minWidth: 150,
      maxWidth: 172,
    }}
  >
    <button
      className={`
        portfolio-card-hover flex flex-col items-center justify-center
        py-7 px-4 md:p-7
        mb-2 md:mb-0
        bg-[#182437]/80 
        border-2 border-portfolio-accent 
        transition-all
        duration-300
        relative
        group-hover:scale-105
        group-hover:shadow-xl
        active:scale-100
      `}
      style={{
        minWidth: 136,
        maxWidth: 175,
        boxShadow: expanded
          ? "0 0 16px 4px #4fd1c5cc, 0 6px 32px #4fd1c520"
          : undefined,
        transform: expanded ? "scale(1.055)" : undefined
      }}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <div className={`text-3xl md:text-4xl mb-3 select-none pulse`} style={{
        filter: "drop-shadow(0 0 6px #4fd1c5aa)",
      }}>
        {step.icon}
      </div>
      <div className="text-[15px] md:text-lg font-semibold text-white text-center drop-shadow mb-2">
        {step.label}
      </div>
      <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
      {expanded && (
        <div className="animate-fade-in mt-3 mb-2 px-2">
          <div className="text-portfolio-accent font-medium mb-1 text-[14px] text-center">Tools:</div>
          <ul className="space-y-1 text-gray-300 text-[14px] text-left list-disc list-inside">
            {step.tools.map((tool, i) =>
              <li key={i} className="pl-2">{tool}</li>
            )}
          </ul>
          <div className="mt-2 text-gray-400 text-xs text-center">{step.description}</div>
        </div>
      )}
    </button>
  </div>
);

export default StepNode;
