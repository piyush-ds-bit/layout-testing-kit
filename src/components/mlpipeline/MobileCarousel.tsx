
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PipelineStep from "./PipelineStep";

interface MobileCarouselProps {
  steps: any[];
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ steps }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="block md:hidden w-full">
      <Carousel className="relative w-full">
        <CarouselContent className="flex items-stretch">
          {steps.map((step, idx) => (
            <CarouselItem key={step.label} className="flex items-center justify-center px-2 py-4">
              <PipelineStep
                step={step}
                expanded={expandedIndex === idx}
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                isMobile={true}
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
      </Carousel>
    </div>
  );
};

export default MobileCarousel;
