import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  duration,
  description,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="portfolio-card-hover w-full max-w-xl p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{company}</h3>
        <div className="mb-4 text-gray-400">
          <div className="text-lg">{position}</div>
          <div className="text-sm">{duration}</div>
        </div>
        {isExpanded && (
          <div className="text-gray-300 my-4">
            {description}
          </div>
        )}
        <div className="flex justify-end">
          <button 
            className="p-2 text-gray-400 hover:text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
