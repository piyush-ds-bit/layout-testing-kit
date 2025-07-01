
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
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  icon, 
  skills, 
  categoryKey, 
  onAddSkill 
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  const handleEditSkill = (skill: Skill) => {
    console.log('Edit skill:', skill);
    // TODO: Open edit modal
  };

  const handleDeleteSkill = (skill: Skill) => {
    console.log('Delete skill:', skill);
    // TODO: Implement delete with confirmation
  };

  return (
    <div className="portfolio-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
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
          <div key={index} className="group relative flex items-center p-2 rounded-lg bg-portfolio-darker/50 hover:bg-portfolio-darker transition-colors">
            <span className="text-sm mr-2">{skill.icon}</span>
            <span className="text-portfolio-gray-light text-sm flex-1">{skill.name}</span>
            
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
