
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import AdminAddButton from '@/components/admin/AdminAddButton';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategoryProps {
  title: string;
  icon: string;
  skills: Skill[];
  categoryKey: string;
  onAddSkill: () => void;
  onEditSkill?: (skill: Skill) => void;
  onDeleteSkill?: (skill: Skill) => void;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  skills, 
  categoryKey, 
  onAddSkill,
  onEditSkill,
  onDeleteSkill
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  const handleEditSkill = (skill: Skill) => {
    console.log('Edit skill:', skill);
    if (onEditSkill) {
      onEditSkill(skill);
    }
  };

  const handleDeleteSkill = (skill: Skill) => {
    console.log('Delete skill:', skill);
    if (onDeleteSkill) {
      onDeleteSkill(skill);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      // Programming
      case 'python': return '🐍';
      case 'dart': return '🎯';
      case 'html5': return '🌐';

      // Libraries & Frameworks
      case 'pandas': return '🐼';
      case 'numpy': return '➗';
      case 'matplotlib': return '📊';
      case 'seaborn': return '🌊';
      case 'scikitlearn': return '🧠';
      case 'tensorflow': return '🔶';

      // Web & Tools
      case 'streamlit': return '📈';
      case 'fastapi': return '🚀';
      case 'pydantic': return '🛡️';
      case 'flutter': return '📱';
      case 'docker': return '🐳';

      // Databases
      case 'supabase': return '🔋';

      // Tools
      case 'intellijidea': return '🧠';
      case 'jupyter': return '📓';
      case 'pycharm': return '🧪';
      case 'googlecolab': return '🤖';
      case 'kaggle': return '🏅';

      // Other
      case 'problemsolving': return '🧩';

      // Fallback
      default: return '🔹';
    }
  };

  return (
    <div className="portfolio-card-hover p-6 bg-[#1a202c] rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-3xl mr-3 text-blue-400">{icon}</span>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
        </div>
        {isAuthorized && isEditMode && (
          <AdminAddButton
            onAdd={onAddSkill}
            label="Add"
            className="text-sm px-2 py-1"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative flex items-center gap-2 py-2 px-4 rounded-full bg-[#1e2738] border border-[#2d3748] transition-colors hover:bg-[#2a3448]"
          >
            <span className="text-xl">{getIcon(skill.icon)}</span>
            <span className="text-gray-200 text-sm flex-1">{skill.name}</span>

            {isAuthorized && isEditMode && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <AdminActionButtons
                  onEdit={() => handleEditSkill(skill)}
                  onDelete={() => handleDeleteSkill(skill)}
                  className="scale-75"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
