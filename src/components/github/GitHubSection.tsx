
import React from 'react';

const GitHubSection: React.FC = () => {
  // For demonstration, we'll create a static representation of the GitHub activity graph
  const months = ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  
  // Generate random activity levels with more activity
  const generateActivityLevels = () => {
    const levels = [];
    for (let i = 0; i < 100; i++) {
      // Generate more activity in the middle months for demonstration
      const month = i % 10;
      const randomFactor = month > 2 && month < 8 ? 0.8 : 0.4;
      const level = Math.random() < randomFactor ? Math.floor(Math.random() * 4) : 0;
      levels.push(level);
    }
    return levels;
  };
  
  const activityLevels = generateActivityLevels();
  
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">GitHub</h2>
        
        <div className="portfolio-card">
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 text-portfolio-accent">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <h3 className="text-xl font-semibold text-white">GitHub</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-10 gap-1 min-w-[600px]">
              {/* Month labels */}
              {months.map((month, index) => (
                <div key={index} className="text-xs text-portfolio-gray text-center">
                  {month}
                </div>
              ))}
              
              {/* Activity grid */}
              <div className="col-span-10 grid grid-cols-10 gap-1">
                {months.map((_, monthIndex) => (
                  <div key={monthIndex} className="grid grid-rows-7 gap-1">
                    {[...Array(10)].map((_, i) => {
                      const index = monthIndex * 10 + i;
                      const level = activityLevels[index];
                      let bgColor = 'bg-portfolio-darker';
                      
                      if (level === 1) bgColor = 'bg-green-900/30';
                      if (level === 2) bgColor = 'bg-green-700/40';
                      if (level === 3) bgColor = 'bg-green-500/50';
                      
                      return (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-sm ${bgColor} border border-portfolio-dark/50`}
                          title={`${level} contributions`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="col-span-10 flex items-center justify-end mt-4 space-x-2">
                <span className="text-xs text-portfolio-gray">Less</span>
                <div className="w-3 h-3 rounded-sm bg-portfolio-darker border border-portfolio-dark/50"></div>
                <div className="w-3 h-3 rounded-sm bg-green-900/30 border border-portfolio-dark/50"></div>
                <div className="w-3 h-3 rounded-sm bg-green-700/40 border border-portfolio-dark/50"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500/50 border border-portfolio-dark/50"></div>
                <span className="text-xs text-portfolio-gray">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
