
import React, { useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'piyush-ds-bit';

const GitHubSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading text-white mb-8">GitHub Activity</h2>
        
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Enhanced Glassmorphism Container */}
          <div className="portfolio-card relative p-8 hover:shadow-2xl">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Github className="w-6 h-6 mr-3 text-portfolio-accent" />
              <h3 className="text-xl font-semibold text-white">GitHub Contributions</h3>
            </div>

            {/* Calendar Container with Scroll Buttons */}
            <div className="relative">
              {/* Left Scroll Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 portfolio-button-outline rounded-full flex items-center justify-center backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 portfolio-button-outline rounded-full flex items-center justify-center backdrop-blur-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Calendar Scroll Container */}
              <div 
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide mx-12 py-4"
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <div className="min-w-fit">
                  <GitHubCalendar
                    username={GITHUB_USERNAME}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={3}
                    fontSize={12}
                    theme={{
                      dark: [
                        '#0d1117',
                        '#0e4429',
                        '#006d32', 
                        '#26a641',
                        '#39d353'
                      ]
                    }}
                    style={{
                      color: '#8b949e'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-400">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-[#0d1117] border border-[#21262d] transition-all duration-200 hover:scale-125"></div>
                <div className="w-3 h-3 rounded-sm bg-[#0e4429] transition-all duration-200 hover:scale-125"></div>
                <div className="w-3 h-3 rounded-sm bg-[#006d32] transition-all duration-200 hover:scale-125"></div>
                <div className="w-3 h-3 rounded-sm bg-[#26a641] transition-all duration-200 hover:scale-125"></div>
                <div className="w-3 h-3 rounded-sm bg-[#39d353] transition-all duration-200 hover:scale-125"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
