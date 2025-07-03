
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import { useSkillsData } from '@/hooks/useSkillsData';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';
import EditSkillModal from '@/components/admin/skills/EditSkillModal';
import { Skill } from '@/types/database';

interface SkillCategoryProps {
  title: string;
  icon: string;
  skills: Skill[];
  categoryKey: string;
  onAddSkill: (categoryId: string) => void;
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
  const { deleteSkill } = useSkillsData();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const handleDeleteSkill = async (skillId: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
    }
  };

  return (
    <div className="group relative bg-portfolio-card-bg/50 backdrop-blur-sm border border-portfolio-card-border rounded-xl p-6 hover:bg-portfolio-card-bg/70 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {isAuthorized && isEditMode && (
          <AdminAddButton
            onAdd={() => onAddSkill(categoryKey)}
            label="Add Skill"
            size="sm"
          />
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill.id} className="group/skill relative">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-portfolio-darker text-portfolio-gray-light border border-portfolio-dark hover:border-portfolio-accent transition-colors">
              {skill.icon && <span className="mr-1">{skill.icon}</span>}
              {skill.name}
            </span>
            {isAuthorized && isEditMode && (
              <div className="absolute -top-2 -right-2 opacity-0 group-hover/skill:opacity-100 transition-opacity">
                <AdminActionButtons
                  onEdit={() => setEditingSkill(skill)}
                  onDelete={() => handleDeleteSkill(skill.id!)}
                  size="xs"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {editingSkill && (
        <EditSkillModal
          isOpen={true}
          onClose={() => setEditingSkill(null)}
          skill={editingSkill}
          onUpdate={async (skillId, skillData) => {
            const { updateSkill } = useSkillsData();
            return await updateSkill(skillId, skillData);
          }}
        />
      )}
    </div>
  );
};

export default SkillCategory;
