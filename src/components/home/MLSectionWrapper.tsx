import React from 'react';
import MLPipelineVisualization from '@/components/mlpipeline/MLPipelineVisualization';
import MLSandboxSection from '@/components/ml-sandbox/MLSandboxSection';

const MLSectionWrapper: React.FC = () => {
  return (
    <section className="portfolio-section py-6 md:py-12" style={{
      position: "relative",
      zIndex: 3
    }}>
      <div className="w-full px-4">
        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ML Pipeline - Left Side */}
          <div className="w-full lg:flex-1.3 lg:min-w-0">
            <div className="h-full">
              <MLPipelineVisualization />
            </div>
          </div>
          
          {/* ML Sandbox - Right Side */}
          <div className="w-full lg:flex-0.7 lg:min-w-0">
            <MLSandboxSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLSectionWrapper;
