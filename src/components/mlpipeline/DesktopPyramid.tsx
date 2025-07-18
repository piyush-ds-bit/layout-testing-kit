
import React from "react";
import PipelineStep from "./PipelineStep";
import { ArrowDown, ArrowRightSvg } from "./ArrowComponents";

interface DesktopPyramidProps {
  steps: any[];
}

const DesktopPyramid: React.FC<DesktopPyramidProps> = ({ steps }) => {
  // Pyramid rows for desktop layout
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4, 7);
  const row3 = steps.slice(7, 9);

  // Helper for pipeline node
  const renderNode = (step: any, idx: number) => (
    <React.Fragment key={step.label}>
      <PipelineStep
        step={step}
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
            {renderNode(step, idx)}
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
            {renderNode(step, idx)}
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
            {renderNode(step, idx)}
            {idx < row3.length - 1 && <ArrowRightSvg />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DesktopPyramid;
