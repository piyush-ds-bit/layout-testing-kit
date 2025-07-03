
import React from 'react';
import { useSkillsData } from '@/hooks/useSkillsData';
import CategoryList from '@/components/admin/skills/CategoryList';
import AddSkillForm from '@/components/admin/skills/AddSkillForm';
import SkillList from '@/components/admin/skills/SkillList';

const ManageSkills: React.FC = () => {
  const { skillCategories, loading, addSkill, deleteSkill } = useSkillsData();
  
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Manage Skills</h1>
      
      <div className="space-y-6">
        {skillCategories.map(category => (
          <div key={category.id} className="bg-portfolio-card-bg p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">{category.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between bg-portfolio-darker p-3 rounded">
                  <div className="flex items-center space-x-2">
                    <span>{skill.icon}</span>
                    <span className="text-white">{skill.name}</span>
                  </div>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSkills;
