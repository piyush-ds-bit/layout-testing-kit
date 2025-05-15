
import React from 'react';

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
  // Alternate between left and right side of the timeline
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex ${isEven ? 'justify-end' : 'justify-start'} md:justify-center`}>
      <div 
        className={`portfolio-card max-w-md ${isEven ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'}`}
        style={{
          animationDelay: `${index * 0.2}s`,
        }}
      >
        <h3 className="text-xl text-white font-semibold">{company}</h3>
        <div className="flex flex-col mb-3">
          <span className="text-portfolio-gray-light">{position}</span>
          <span className="text-portfolio-gray text-sm">{duration}</span>
        </div>
        <p className="text-portfolio-gray-light">{description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
