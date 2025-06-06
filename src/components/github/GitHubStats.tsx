
import React from 'react';

interface GitHubStatsProps {
  totalContributions: number;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ totalContributions }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
      <div className="text-[#58a6ff] text-sm">
        <span className="font-medium">{totalContributions}</span> contributions in the last year
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm contrib-level-0 border border-[#1b1f23]"></div>
          <div className="w-3 h-3 rounded-sm contrib-level-1 border border-[#1b1f23]"></div>
          <div className="w-3 h-3 rounded-sm contrib-level-2 border border-[#1b1f23]"></div>
          <div className="w-3 h-3 rounded-sm contrib-level-3 border border-[#1b1f23]"></div>
          <div className="w-3 h-3 rounded-sm contrib-level-4 border border-[#1b1f23]"></div>
        </div>
        <span className="text-xs text-gray-400">More</span>
      </div>
    </div>
  );
};

export default GitHubStats;
