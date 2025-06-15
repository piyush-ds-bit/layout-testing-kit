
import React, { useState } from "react";
import { mlPipelineSteps } from "./mlPipelineSteps";
import StepNode from "./StepNode";
import Arrow from "./Arrow";

// Tailwind config for animation
// .animate-bounce-x { animation: bounceX 1.2s infinite alternate; }
// @keyframes bounceX { 0% { transform: translateX(0); } 100% { transform: translateX(8px); } }

const MLPipelineVisualization: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      className="portfolio-section py-12 pb-0"
      style={{ position: "relative", zIndex: 3 }}
      id="ml-pipeline"
    >
      <div className="portfolio-container">
        <h2 className="portfolio-heading mb-10">
          ML Pipeline Visualization
        </h2>
        <div className="overflow-x-auto scrollbar-hide px-4 md:px-0">
          <div
            className="
              relative
              flex md:grid gap-0 md:gap-0 items-start justify-center
              px-2 md:px-0
              md:grid-cols-[0.5fr_repeat(9,1fr)_0.5fr]  
              lg:grid-cols-[0.6fr_repeat(9,1fr)_0.6fr]
              xl:grid-cols-[0.8fr_repeat(9,1fr)_0.8fr]
            "
            style={{
              minWidth: "100vw",
              marginLeft: "-1.5rem",
              marginRight: "-1.5rem"
            }}
          >
            <div className="hidden md:block" />
            {mlPipelineSteps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <StepNode
                  step={step}
                  expanded={expandedIndex === idx}
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                />
                {idx < mlPipelineSteps.length - 1 && (
                  <>
                    <div className="hidden md:flex relative" style={{ height: "100%", alignItems: 'center', justifyContent: 'center' }}>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{
                          height: "72px",
                          width: "48px",
                      }}>
                        <Arrow />
                      </div>
                    </div>
                    {/* ARROW: mobile - shown below each node, centered */}
                    <div className="md:hidden flex justify-center">
                      <div className="my-2 flex items-center justify-center">
                        <svg className="w-6 h-6 animate-bounce-x" viewBox="0 0 59 16" fill="none">
                          <defs>
                            <linearGradient id="arrow-grad-mob" x1="0" y1="8" x2="48" y2="8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#4fd1c5"/>
                              <stop offset="1" stopColor="#38b2ac"/>
                            </linearGradient>
                          </defs>
                          <path
                            d="M1 8h44M45 4l7 4-7 4"
                            stroke="url(#arrow-grad-mob)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            filter="url(#glow)"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
            <div className="hidden md:block" />
          </div>
        </div>
        <div className="text-xs text-center text-gray-500 mt-8 select-none">
          Tap/click a step to see the tools and details.
        </div>
      </div>
      <style>
        {`
        @keyframes bounceX { 0% { transform: translateX(0); } 100% { transform: translateX(10px); } }
        .animate-bounce-x { animation: bounceX 1.2s infinite alternate; }
        .pulse { animation: pulseGlow 1.9s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 4px #4fd1c5cc, 0 0 8px #4fd1c588;}
          50% { text-shadow: 0 0 20px #4fd1c5f0, 0 0 12px #4fd1c5a0;}
          100% { text-shadow: 0 0 4px #4fd1c5cc, 0 0 8px #4fd1c588;}
        }
        `}
      </style>
    </section>
  );
};

export default MLPipelineVisualization;
