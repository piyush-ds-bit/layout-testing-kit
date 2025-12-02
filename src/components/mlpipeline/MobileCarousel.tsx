
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PipelineStep from "./PipelineStep";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface MobileCarouselProps {
  steps: any[];
  stepStatuses?: PipelineStepStatus[];
  currentStep?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const MobileCarousel: React.FC<MobileCarouselProps> = ({ steps, stepStatuses = [], currentStep = -1 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Fallback if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-400">
        <p>No pipeline steps available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setFlippedIndex(null);
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < steps.length - 1) {
      setDirection(1);
      setFlippedIndex(null);
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div className="block md:hidden w-full py-6 relative">
      {/* Step Indicator */}
      <div className="text-center text-gray-400 text-sm mb-4 font-medium">
        Step {activeIndex + 1} of {steps.length}
      </div>

      {/* Main Card Container */}
      <div className="relative px-14 min-h-[320px] flex items-center justify-start">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          className={`
            absolute left-2 top-1/2 -translate-y-1/2 z-20 
            w-10 h-10 rounded-full 
            bg-portfolio-dark/90 border-2 border-portfolio-accent 
            text-portfolio-accent flex items-center justify-center 
            shadow-lg transition-all duration-300
            ${activeIndex === 0 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-portfolio-accent hover:text-white active:scale-95'}
          `}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Animated Card Container */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              <PipelineStep
                step={steps[activeIndex]}
                expanded={flippedIndex === activeIndex}
                onClick={() => setFlippedIndex(flippedIndex === activeIndex ? null : activeIndex)}
                isMobile={true}
                status={stepStatuses[activeIndex]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          disabled={activeIndex === steps.length - 1}
          className={`
            absolute right-2 top-1/2 -translate-y-1/2 z-20 
            w-10 h-10 rounded-full 
            bg-portfolio-dark/90 border-2 border-portfolio-accent 
            text-portfolio-accent flex items-center justify-center 
            shadow-lg transition-all duration-300
            ${activeIndex === steps.length - 1 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:bg-portfolio-accent hover:text-white active:scale-95'}
          `}
          aria-label="Next step"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > activeIndex ? 1 : -1);
              setFlippedIndex(null);
              setActiveIndex(idx);
            }}
            className={`
              h-2 rounded-full transition-all duration-300
              ${idx === activeIndex 
                ? 'bg-portfolio-accent w-6' 
                : 'bg-gray-600 w-2 hover:bg-gray-500'}
            `}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>

      {/* Instructions */}
      <p className="text-sm text-center text-gray-400 mt-4 px-4">
        Tap card to flip • Use arrows to navigate
      </p>
    </div>
  );
};

export default MobileCarousel;
