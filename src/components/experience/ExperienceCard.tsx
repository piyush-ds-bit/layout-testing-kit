
import React from 'react';
import { ChevronDown } from 'lucide-react';

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
  return (
    <div className="flex justify-center">
      <div className="bg-[#1e293b] rounded-xl border border-[#2d3748] p-6 w-full max-w-xl">
        <h3 className="text-2xl font-bold text-white mb-1">{company}</h3>
        <div className="mb-4 text-gray-400">
          <div className="text-lg">{position}</div>
          <div className="text-sm">{duration}</div>
        </div>
        
        <div className="flex justify-end">
          <button className="p-2 text-gray-400 hover:text-white">
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
