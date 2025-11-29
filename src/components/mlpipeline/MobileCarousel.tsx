
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
    <div className="block md:hidden w-full py-6">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-portfolio-accent scrollbar-track-transparent px-4 pb-2">
        <div className="flex gap-4 min-w-max">
          {steps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="flex-shrink-0 w-[280px]"
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
      </div>
      <p className="text-sm text-center text-gray-400 mt-4 px-4">
        Scroll horizontally • Tap a card to flip
      </p>
    </div>
  );
};

export default MobileCarousel;
