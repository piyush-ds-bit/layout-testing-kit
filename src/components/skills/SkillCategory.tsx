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
    switch (iconName.toLowerCase()) {
      // Programming
      case 'python': return '🐍';
      case 'sql': return '🗃️';
      case 'yaml': return '📄';
      case 'dart': return '🎯';
      case 'html5': return '🌐';

      // Libraries & Frameworks
      case 'pandas': return '🐼';
      case 'numpy': return '➗';
      case 'matplotlib': return '📊';
      case 'seaborn': return '🌊';
      case 'scikit-learn': return '🧠';
      case 'tensorflow': return '🔶';

      // Web & Tools
      case 'streamlit': return '📈';
      case 'fastapi': return '🚀';
      case 'pydantic': return '🛡️';
      case 'flutter': return '📱';

      // Databases
      case 'supabase': return '🔋';
      case 'sqlite': return '💾';

      // Tools
      case 'intellij': return '🧠';
      case 'jupyter': return '📓';
      case 'pycharm': return '🧪';
      case 'google-colab': return '🤖';
      case 'kaggle': return '🏅';

      // Other
      case 'git': return '🔧';
      case 'leetcode': return '🧩';

      // Fallback
      default: return '🔹';
    }
  };

  return (
    <div className="portfolio-card-hover p-6">
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
