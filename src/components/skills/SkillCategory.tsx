
import React from 'react';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategoryProps {
  title: string;
  icon: string;
  skills: Skill[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  return (
    <div className="portfolio-card">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-portfolio-darker border border-portfolio-dark px-4 py-2 rounded-lg flex items-center gap-2 text-portfolio-gray-light hover:border-portfolio-accent transition-all duration-200"
          >
            <span className="text-xl">{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
