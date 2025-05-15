
import React from 'react';

const LeetCodeSection: React.FC = () => {
  // For demonstration, we'll create a static representation of the LeetCode activity graph
  const months = ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  
  // Generate random activity levels
  const generateActivityLevels = () => {
    const levels = [];
    for (let i = 0; i < 100; i++) {
      // Generate more activity in the earlier months for demonstration
      const month = i % 10;
      const randomFactor = month < 2 ? 0.9 : month < 5 ? 0.5 : 0.2;
      const level = Math.random() < randomFactor ? Math.floor(Math.random() * 4) : 0;
      levels.push(level);
    }
    return levels;
  };
  
  const activityLevels = generateActivityLevels();
  
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">LeetCode</h2>
        
        <div className="portfolio-card">
          <div className="flex items-center mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2 text-portfolio-accent">
              <path d="M16.5 9.75L12 12.75L7.5 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 12.75V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M22.5 19.5H1.5L12 3L22.5 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h3 className="text-xl font-semibold text-white">LeetCode</h3>
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

export default LeetCodeSection;
