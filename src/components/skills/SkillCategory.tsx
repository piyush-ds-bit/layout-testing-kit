import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import AdminAddButton from '@/components/admin/AdminAddButton';
import { getSkillIcon } from '@/utils/iconUtils';

interface Skill {
  id: string;
  name: string;
  icon?: string;
  category_id: string;
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
    onEditSkill?.(skill);
  };

  const handleDeleteSkill = (skill: Skill) => {
    onDeleteSkill?.(skill);
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
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group relative flex items-center gap-2 py-2 px-4 rounded-full bg-[#1e2738] border border-[#2d3748] transition-colors hover:bg-[#2a3448]"
          >
            <span className="text-xl">{getSkillIcon(skill.icon || '', title)}</span>
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
