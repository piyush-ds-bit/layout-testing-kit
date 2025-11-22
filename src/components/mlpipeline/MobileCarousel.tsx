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
const CarouselWrapper: React.FC<MobileCarouselProps> = ({
  steps,
  stepStatuses = [],
  currentStep = -1
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const {
    api
  } = useCarousel();

  // Auto-scroll to current step when animation is playing
  useEffect(() => {
    if (api && currentStep >= 0 && currentStep < steps.length) {
      api.scrollTo(currentStep);
    }
  }, [currentStep, api, steps.length]);

  // Fallback if no steps
  if (!steps || steps.length === 0) {
    return <div className="flex items-center justify-center min-h-[350px] text-gray-400">
        <p>No pipeline steps available</p>
      </div>;
  }
  return <>
      <CarouselContent className="flex items-stretch min-h-[350px] -ml-4">
          {steps.map((step, idx) => <CarouselItem key={idx} className="pl-4 pr-4 py-6 basis-full md:basis-4/5">
              <PipelineStep step={step} expanded={expandedIndex === idx} onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)} isMobile={true} status={stepStatuses[idx]} />
            </CarouselItem>)}
        </CarouselContent>
        {/* Arrows */}
        <CarouselPrevious className="left-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" aria-label="Previous Step">
          <ArrowLeft />
        </CarouselPrevious>
        <CarouselNext className="right-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" aria-label="Next Step">
          <ArrowRight />
        </CarouselNext>
      </>;
};
const MobileCarousel: React.FC<MobileCarouselProps> = props => {
  return <div className="block md:hidden w-full min-h-[400px] overflow-hidden">
      <div className="relative w-full min-h-[380px] max-w-full mx-auto p-1 rounded-3xl" style={{
      background: 'linear-gradient(135deg, hsl(var(--portfolio-accent)), hsl(270, 80%, 60%))',
      padding: '2px'
    }}>
        <div className="bg-portfolio-dark rounded-3xl overflow-hidden">
          <Carousel className="relative w-full min-h-[380px] max-w-full mx-auto">
            <CarouselWrapper {...props} />
          </Carousel>
        </div>
      </div>
      <p className="text-xs text-center text-gray-400 mt-4 px-4">
        Tap/click a step to see the tools and details.
      </p>
    </div>;
};
export default MobileCarousel;