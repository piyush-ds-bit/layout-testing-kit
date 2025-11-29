
import React, { useState } from "react";
import { motion } from "framer-motion";
import PipelineStep from "./PipelineStep";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface MobileCarouselProps {
  steps: any[];
  stepStatuses?: PipelineStepStatus[];
  currentStep?: number;
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ steps, stepStatuses = [], currentStep = -1 }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Fallback if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-400">
        <p>No pipeline steps available</p>
      </div>
    );
  }

  return (
    <div className="block md:hidden w-full px-4 py-6">
      <div className="space-y-4 max-w-md mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <PipelineStep
              step={step}
              expanded={flippedIndex === idx}
              onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
              isMobile={true}
              status={stepStatuses[idx]}
            />
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-center text-gray-400 mt-6 px-4">
        Tap a card to flip and see tools & details
      </p>
    </div>
  );
};

export default MobileCarousel;
