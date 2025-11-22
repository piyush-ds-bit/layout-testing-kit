import React, { useState } from "react";
import MobileCarousel from "./MobileCarousel";
import DesktopPyramid from "./DesktopPyramid";
import PipelineControls from "./PipelineControls";
import PipelineMetrics from "./PipelineMetrics";
import { mlPipelineSteps } from "@/data/mlPipelineSteps";
import { usePipelineAnimation } from "@/hooks/usePipelineAnimation";
import { BarChart3 } from "lucide-react";
const MLPipelineVisualization: React.FC = () => {
  const animation = usePipelineAnimation();
  const [showMetrics, setShowMetrics] = useState(false);

  // Debug logs
  console.log('ML Pipeline Steps:', mlPipelineSteps);
  console.log('Animation State:', {
    currentStep: animation.currentStep,
    stepStatuses: animation.stepStatuses
  });
  return <section className="portfolio-section py-6 md:py-12" style={{
    position: "relative",
    zIndex: 3
  }} id="ml-pipeline">
      <div className="portfolio-container">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7 md:mb-10">
          <h2 className="portfolio-heading">
            ML Pipeline Visualization
          </h2>
          <div className="flex items-center gap-3">
            <button onClick={animation.toggleSound} className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${animation.soundEnabled ? "bg-portfolio-accent/20 hover:bg-portfolio-accent/30 text-portfolio-accent" : "bg-gray-700/50 hover:bg-gray-700/70 text-gray-400"}`}>
              {animation.soundEnabled ? "🔊" : "🔇"} Sound
            </button>
            <button onClick={() => setShowMetrics(!showMetrics)} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-portfolio-accent/20 hover:bg-portfolio-accent/30 transition-colors text-sm text-portfolio-accent">
              <BarChart3 className="w-4 h-4" />
              {showMetrics ? "Hide" : "Show"} Metrics
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            {/* Control Panel */}
            <div className="justify-center mb-6 gap-0 flex flex-col">
              <PipelineControls isPlaying={animation.isPlaying} isPaused={animation.isPaused} loop={animation.loop} speed={animation.speed} onPlay={animation.play} onPause={animation.pause} onStop={animation.stop} onToggleLoop={animation.toggleLoop} onSpeedChange={animation.setSpeed} />
            </div>

            {/* Pipeline Visualizations */}
            <MobileCarousel steps={mlPipelineSteps} stepStatuses={animation.stepStatuses} currentStep={animation.currentStep} />
            <DesktopPyramid steps={mlPipelineSteps} stepStatuses={animation.stepStatuses} currentStep={animation.currentStep} isTransitioning={animation.isTransitioning} />

            <div className="hidden md:block text-xs text-center text-gray-500 mt-7 select-none">
              Click play to watch data flow through the pipeline, or hover steps for details.
            </div>
          </div>

          {/* Metrics Sidebar - Desktop Only */}
          <div className="hidden md:block">
            <PipelineMetrics metrics={animation.metrics} isVisible={showMetrics} />
          </div>
        </div>
      </div>
      <style>
        {`
          .pulse { animation: pulseGlow 1.9s cubic-bezier(0.4,0,0.6,1) infinite; }
          @keyframes pulseGlow {
            0% { text-shadow: 0 0 4px #a855f7cc, 0 0 8px #a855f788;}
            50% { text-shadow: 0 0 20px #a855f7f0, 0 0 12px #a855f7a0;}
            100% { text-shadow: 0 0 4px #a855f7cc, 0 0 8px #a855f788;}
          }
        `}
      </style>
    </section>;
};
export default MLPipelineVisualization;