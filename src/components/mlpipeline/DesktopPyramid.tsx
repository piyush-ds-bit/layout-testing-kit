
import React, { useState } from "react";
import PipelineStep from "./PipelineStep";
import AnimatedArrowRight from "./AnimatedArrowRight";
import AnimatedArrowDown from "./AnimatedArrowDown";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface DesktopPyramidProps {
  steps: any[];
  stepStatuses?: PipelineStepStatus[];
  currentStep?: number;
  isTransitioning?: boolean;
}

const DesktopPyramid: React.FC<DesktopPyramidProps> = ({ 
  steps, 
  stepStatuses = [], 
  currentStep = -1,
  isTransitioning = false
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Arrow should only be active when transitioning FROM the current completed step
  const isArrowActive = (fromStepIndex: number) => {
    return isTransitioning && 
           stepStatuses[fromStepIndex] === "complete" && 
           fromStepIndex === currentStep;
  };

  // Pyramid rows for desktop layout
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4, 7);
  const row3 = steps.slice(7, 9);

  // Helper for pipeline node
  const renderNode = (step: any, gIdx: number) => (
    <PipelineStep
      step={step}
      expanded={expandedIndex === gIdx}
      onClick={() => setExpandedIndex(expandedIndex === gIdx ? null : gIdx)}
      isMobile={false}
      status={stepStatuses[gIdx]}
    />
  );

  const getParticleType = (idx: number) => {
    if (idx < 3) return "raw";
    if (idx < 6) return "processed";
    return "predictions";
  };

  return (
    <div className="hidden md:flex flex-col items-center gap-0 w-full">
      {/* Row 1 - 4 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row1.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx)}
            {idx < row1.length - 1 && (
              <AnimatedArrowRight 
                isActive={isArrowActive(idx)} 
                particleType={getParticleType(idx)} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Down arrow to row 2 */}
      <div className="flex justify-center mb-2 md:mb-6">
        <AnimatedArrowDown isActive={isArrowActive(3)} particleType="processed" />
      </div>
      {/* Row 2 - 3 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row2.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx + 4)}
            {idx < row2.length - 1 && (
              <AnimatedArrowRight 
                isActive={isArrowActive(idx + 4)} 
                particleType={getParticleType(idx + 4)} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Down arrow to row 3 */}
      <div className="flex justify-center mb-2 md:mb-6">
        <AnimatedArrowDown isActive={isArrowActive(6)} particleType="predictions" />
      </div>
      {/* Row 3 - 2 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row3.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx + 7)}
            {idx < row3.length - 1 && (
              <AnimatedArrowRight 
                isActive={isArrowActive(idx + 7)} 
                particleType="predictions" 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DesktopPyramid;
