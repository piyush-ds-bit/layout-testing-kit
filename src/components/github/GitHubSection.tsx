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
    <section className="portfolio-section bg-portfolio-dark">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <h2 className="portfolio-heading text-white mb-8">GitHub Activity</h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Glassmorphism Container */}
          <div className="relative bg-[#0d1117]/80 backdrop-blur-sm border border-[#21262d]/50 p-8 rounded-2xl shadow-2xl shadow-black/20 hover:border-[#30363d]/80 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Github className="w-6 h-6 mr-3 text-[#58a6ff]" />
              <h3 className="text-xl font-semibold text-white">GitHub</h3>
            </div>

            {/* Calendar Container with Scroll Buttons */}
            <div className="relative">
              {/* Left Scroll Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#21262d]/80 hover:bg-[#30363d] border border-[#30363d] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#21262d]/80 hover:bg-[#30363d] border border-[#30363d] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
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

            {/* Legend */}
            <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-400">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-[#0d1117] border border-[#21262d]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>
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
