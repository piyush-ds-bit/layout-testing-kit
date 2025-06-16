
import React from "react";
import MobileCarousel from "./MobileCarousel";
import DesktopPyramid from "./DesktopPyramid";
import { mlPipelineSteps } from "@/data/mlPipelineSteps";

const MLPipelineVisualization: React.FC = () => {
  return (
    <section
      className="portfolio-section py-10 pb-0 md:py-12"
      style={{ position: "relative", zIndex: 3 }}
      id="ml-pipeline"
    >
      <div className="portfolio-container">
        <h2 className="portfolio-heading mb-7 md:mb-10">
          ML Pipeline Visualization
        </h2>
        <MobileCarousel steps={mlPipelineSteps} />
        <DesktopPyramid steps={mlPipelineSteps} />
        <div className="text-xs text-center text-gray-500 mt-7 select-none">
          Tap/click a step to see the tools and details.
        </div>
      </div>
      <style>
        {`
          .pulse { animation: pulseGlow 1.9s cubic-bezier(0.4,0,0.6,1) infinite; }
          @keyframes pulseGlow {
            0% { text-shadow: 0 0 4px #06b6d4cc, 0 0 8px #06b6d488;}
            50% { text-shadow: 0 0 20px #06b6d4f0, 0 0 12px #06b6d4a0;}
            100% { text-shadow: 0 0 4px #06b6d4cc, 0 0 8px #06b6d488;}
          }
        `}
      </style>
    </section>
  );
};

export default MLPipelineVisualization;
