
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PipelineStep from "./PipelineStep";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface MobileCarouselProps {
  steps: any[];
  stepStatuses?: PipelineStepStatus[];
  currentStep?: number;
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ steps, stepStatuses = [], currentStep = -1 }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fallback if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-400">
        <p>No pipeline steps available</p>
      </div>
    );
  }

  const scrollToCard = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth * 0.85; // 85% of viewport width (card size)
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="block md:hidden w-full py-6 relative">
      {/* Left Arrow */}
      <button
        onClick={() => scrollToCard('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-portfolio-dark/90 border-2 border-portfolio-accent text-portfolio-accent flex items-center justify-center shadow-lg hover:bg-portfolio-accent hover:text-white transition-all duration-300"
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide px-4 pb-2 snap-x snap-mandatory"
        style={{
          scrollPaddingLeft: '1rem',
        }}
      >
        <div className="flex gap-4 min-w-max pl-2 pr-2">
          {steps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="flex-shrink-0 snap-start"
              style={{ width: 'calc(85vw)' }}
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

      {/* Right Arrow */}
      <button
        onClick={() => scrollToCard('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-portfolio-dark/90 border-2 border-portfolio-accent text-portfolio-accent flex items-center justify-center shadow-lg hover:bg-portfolio-accent hover:text-white transition-all duration-300"
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <p className="text-sm text-center text-gray-400 mt-4 px-4">
        Swipe or use arrows • Tap a card to flip
      </p>
    </div>
  );
};

export default MobileCarousel;
