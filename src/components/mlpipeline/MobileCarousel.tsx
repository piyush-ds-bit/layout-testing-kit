
import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PipelineStep from "./PipelineStep";
import { PipelineStepStatus } from "@/hooks/usePipelineAnimation";

interface MobileCarouselProps {
  steps: any[];
  stepStatuses?: PipelineStepStatus[];
  currentStep?: number;
}

const CarouselWrapper: React.FC<MobileCarouselProps> = ({ steps, stepStatuses = [], currentStep = -1 }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { api } = useCarousel();

  // Auto-scroll to current step when animation is playing
  useEffect(() => {
    if (api && currentStep >= 0 && currentStep < steps.length) {
      api.scrollTo(currentStep);
    }
  }, [currentStep, api, steps.length]);

  // Fallback if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[350px] text-gray-400">
        <p>No pipeline steps available</p>
      </div>
    );
  }

  return (
    <>
      <CarouselContent className="flex items-stretch min-h-[350px] -ml-2">
          {steps.map((step, idx) => (
            <CarouselItem key={step.label} className="flex items-center justify-center pl-2 pr-2 py-4 min-h-[350px] basis-full">
              <PipelineStep
                step={step}
                expanded={expandedIndex === idx}
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                isMobile={true}
                status={stepStatuses[idx]}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Arrows */}
        <CarouselPrevious
          className="left-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent"
          aria-label="Previous Step"
        >
          <ArrowLeft />
        </CarouselPrevious>
        <CarouselNext
          className="right-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent"
          aria-label="Next Step"
        >
          <ArrowRight />
        </CarouselNext>
      </>
  );
};

const MobileCarousel: React.FC<MobileCarouselProps> = (props) => {
  return (
    <div className="block md:hidden w-full min-h-[400px] overflow-hidden">
      <Carousel className="relative w-full min-h-[380px] max-w-full mx-auto">
        <CarouselWrapper {...props} />
      </Carousel>
    </div>
  );
};

export default MobileCarousel;
