
import React, { useState } from 'react';
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
  onEditSkill?: (skill: any, newName: string, newIcon: string) => void;
  onDeleteSkill?: (skillId: string) => void;
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
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const handleEditSkill = (skill: Skill, index: number) => {
    setEditingSkill({ ...skill, index });
    setEditName(skill.name);
    setEditIcon(skill.icon);
  };

  const handleSaveEdit = () => {
    if (onEditSkill && editingSkill) {
      onEditSkill(editingSkill, editName, editIcon);
      setEditingSkill(null);
      setEditName('');
      setEditIcon('');
    }
  };

  const handleDeleteSkill = (skill: Skill, index: number) => {
    if (onDeleteSkill) {
      // For now, we'll use the index as ID since we don't have actual IDs
      onDeleteSkill(`${categoryKey}_${index}`);
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
      case 'scikit-learn': return '🧠';
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
      case 'intellij': return '🧠';
      case 'jupyter': return '📓';
      case 'pycharm': return '🧪';
      case 'google-colab': return '🤖';
      case 'kaggle': return '🏅';

      // Other
      case 'problemsolving': return '🧩';

      // Fallback
      default: return iconName || '🔹';
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
            {editingSkill?.index === index ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  className="w-8 bg-transparent text-xl text-center"
                  placeholder="🔹"
                />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 bg-transparent text-gray-200 text-sm border-b border-portfolio-accent focus:outline-none"
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-400 text-xs"
                >
                  ✓
                </button>
                <button
                  onClick={() => setEditingSkill(null)}
                  className="text-red-500 hover:text-red-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <span className="text-xl">{getIcon(skill.icon)}</span>
                <span className="text-gray-200 text-sm flex-1">{skill.name}</span>

                {isAuthorized && isEditMode && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <AdminActionButtons
                      onEdit={() => handleEditSkill(skill, index)}
                      onDelete={() => handleDeleteSkill(skill, index)}
                      className="scale-75"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
