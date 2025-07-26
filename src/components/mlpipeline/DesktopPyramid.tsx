
import React, { useState } from "react";
import PipelineStep from "./PipelineStep";
import { ArrowDown, ArrowRightSvg } from "./ArrowComponents";

interface DesktopPyramidProps {
  steps: any[];
}

const DesktopPyramid: React.FC<DesktopPyramidProps> = ({ steps }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Pyramid rows for desktop layout
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4, 7);
  const row3 = steps.slice(7, 9);

  // Helper for pipeline node, calculates global index
  const renderNode = (step: any, idx: number, gIdx: number) => (
    <React.Fragment key={step.label}>
      <PipelineStep
        step={step}
        expanded={expandedIndex === gIdx}
        onClick={() => setExpandedIndex(expandedIndex === gIdx ? null : gIdx)}
        isMobile={false}
      />
    </React.Fragment>
  );

  return (
    <div className="hidden md:flex flex-col items-center gap-0 w-full">
      {/* Row 1 - 4 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row1.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx, idx)}
            {idx < row1.length - 1 && <ArrowRightSvg />}
          </React.Fragment>
        ))}
      </div>
      {/* Down arrow to row 2 */}
      <div className="flex justify-center mb-2 md:mb-6">
        <ArrowDown />
      </div>
      {/* Row 2 - 3 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row2.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx, idx + 4)}
            {idx < row2.length - 1 && <ArrowRightSvg />}
          </React.Fragment>
        ))}
      </div>
      {/* Down arrow to row 3 */}
      <div className="flex justify-center mb-2 md:mb-6">
        <ArrowDown />
      </div>
      {/* Row 3 - 2 steps */}
      <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
        {row3.map((step, idx) => (
          <React.Fragment key={step.label}>
            {renderNode(step, idx, idx+7)}
            {idx < row3.length - 1 && <ArrowRightSvg />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DesktopPyramid;
