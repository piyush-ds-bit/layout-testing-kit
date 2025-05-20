
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
  const getIcon = (iconName: string) => {
    switch (iconName) {
        
        // Languages
        case 'python':
          return '🐍';
        case 'sql':
          return '🗃️';
        case 'c-plus-plus':
          return '⚙️';
        case 'dart':
          return '🎯';
      
        // Frameworks & Libraries
        case 'fastapi':
          return '🚀';
        case 'pandas':
          return '🐼';
        case 'seaborn':
          return '🌊';
        case 'matplotlib':
          return '📊';
        case 'scikit-learn':
          return '🧠';
        case 'pydantic':
          return '🛡️';
        case 'flutter':
          return '📱';
        case 'streamlit':
          return '📈';
        case 'tensorflow':
          return '🔶';
      
        // Databases
        case 'supabase':
          return '🔋';
        case 'firebase':
          return '🔥';
        case 'mongodb':
          return '🍃';
      
        // Tools
        case 'intellij-idea':
          return '🧠';
        case 'jupyter':
          return '📓';
        case 'google-colab':
          return '🤖';
        case 'kaggle':
          return '🏅';
        case 'pycharm':
          return '🧪';
      
        // Default / fallback
        default:
          return iconName || '🔧';
      }

  };

  return (
    <div className="bg-[#121a29] rounded-xl p-6 border border-[#2d3748]">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3 text-blue-400">{icon}</span>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-[#1e2738] rounded-full py-2 px-4 border border-[#2d3748]"
          >
            <span className="text-xl">{getIcon(skill.icon)}</span>
            <span className="text-gray-200">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
