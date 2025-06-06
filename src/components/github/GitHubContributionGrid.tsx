
import React from 'react';

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface GitHubContributionGridProps {
  weeks: Week[];
  monthSpans: { month: string; start: number; end: number }[];
}

const GitHubContributionGrid: React.FC<GitHubContributionGridProps> = ({ weeks, monthSpans }) => {
  // Function to get contribution level and corresponding styles
  const getContributionLevel = (count: number) => {
    if (count === 0) return { level: 0, class: 'contrib-level-0' };
    if (count < 5) return { level: 1, class: 'contrib-level-1' };
    if (count < 10) return { level: 2, class: 'contrib-level-2' };
    if (count < 20) return { level: 3, class: 'contrib-level-3' };
    return { level: 4, class: 'contrib-level-4' };
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Month Labels */}
        <div className="grid grid-cols-53 gap-1 mb-2 ml-8">
          {monthSpans.map((span, index) => (
            <div
              key={index}
              className="text-xs text-gray-400 text-left"
              style={{ 
                gridColumn: `${span.start + 2} / span ${Math.max(1, span.end - span.start + 1)}` 
              }}
            >
              {span.month.split(' ')[0]}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="flex gap-1">
          {/* Days of the week labels */}
          <div className="grid grid-rows-7 gap-1 text-xs text-gray-400 pr-2">
            <div></div>
            <div className="flex items-center">Mon</div>
            <div></div>
            <div className="flex items-center">Wed</div>
            <div></div>
            <div className="flex items-center">Fri</div>
            <div></div>
          </div>

          {/* Contribution Grid */}
          <div className="grid grid-cols-53 gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.contributionDays.map((day, dayIndex) => {
                  const { class: levelClass } = getContributionLevel(day.contributionCount);
                  const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                  const tooltip = `${formattedDate}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`;
                  
                  return (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm border border-[#1b1f23] transition-all duration-200 hover:scale-110 hover:border-gray-500 cursor-pointer ${levelClass}`}
                      title={tooltip}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributionGrid;
