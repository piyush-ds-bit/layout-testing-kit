
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LeetCodeActivity {
  date: string;
  level: number; // 0-3 representing activity level
}

const LeetCodeSection: React.FC = () => {
  const [activities, setActivities] = useState<LeetCodeActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const months = ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  
  useEffect(() => {
    const fetchLeetCodeActivity = async () => {
      try {
        // For demonstration purposes, we'll continue with generated data
        // since LeetCode doesn't have an open public API
        // In a real implementation, you would call an API endpoint
        
        // Using the username: _piyushkrsingh_
        // Note: Fetching real LeetCode data requires server-side scraping
        // or a third-party API service as LeetCode doesn't provide an official API
        
        setLoading(true);
        
        // Generate some realistic-looking data based on provided screenshot
        const generatedActivities = generateActivityData();
        setActivities(generatedActivities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching LeetCode activity:', error);
        setError('Failed to load LeetCode activity data');
        setLoading(false);
      }
    };
    
    fetchLeetCodeActivity();
  }, []);
  
  // Generate data that looks similar to the screenshot
  const generateActivityData = (): LeetCodeActivity[] => {
    const activities: LeetCodeActivity[] = [];
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    // Generate activity for each day of the past year
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      // For August-September (shown in the image with higher activity)
      const month = d.getMonth();
      const isAugust = month === 7;
      const isSeptember = month === 8;
      
      let activityProbability = 0.1; // Base probability for most months
      if (isAugust || isSeptember) {
        activityProbability = 0.6; // Higher activity in Aug-Sept as shown in the image
      }
      
      // Generate activity level (0-3)
      let level = 0;
      if (Math.random() < activityProbability) {
        // Weighted more towards lower levels but with some high activity days
        const rand = Math.random();
        if (rand < 0.6) level = 1;
        else if (rand < 0.85) level = 2;
        else level = 3;
      }
      
      activities.push({
        date: d.toISOString().split('T')[0],
        level
      });
    }
    
    return activities;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

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
                      const activity = activities[index];
                      const level = activity?.level || 0;
                      let bgColor = 'bg-portfolio-darker';
                      
                      if (level === 1) bgColor = 'bg-green-900/30';
                      if (level === 2) bgColor = 'bg-green-700/40';
                      if (level === 3) bgColor = 'bg-green-500/50';
                      
                      return (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-sm ${bgColor} border border-portfolio-dark/50 transition-all hover:scale-125`}
                          title={`${activity?.level || 0} problems solved`}
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
