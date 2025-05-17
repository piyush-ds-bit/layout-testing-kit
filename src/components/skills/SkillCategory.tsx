
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
    <div className="bg-[#121a29] rounded-xl p-6 border border-[#2d3748]">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="skill-tag"
          >
            <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
