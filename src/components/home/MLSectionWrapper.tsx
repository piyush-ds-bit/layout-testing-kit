import React from 'react';
import MLPipelineVisualization from '@/components/mlpipeline/MLPipelineVisualization';
import MLSandboxSection from '@/components/ml-sandbox/MLSandboxSection';
const MLSectionWrapper: React.FC = () => {
  return <section className="portfolio-section py-6 md:py-12" style={{
    position: "relative",
    zIndex: 3
  }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-6">
        {/* ML Pipeline - Left Side */}
          <div className="w-full lg:w-1/2">
            <div className="h-full">
              <MLPipelineVisualization className="border-8" />
            </div>
          </div>
          
          {/* ML Sandbox - Right Side */}
          <div className="w-full lg:w-1/2">
            <MLSandboxSection className="border-8" />
          </div>
        </div>
      </div>
    </section>;
};
export default MLSectionWrapper;