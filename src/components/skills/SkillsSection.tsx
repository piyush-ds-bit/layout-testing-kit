
import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';
import EditSkillModal from '@/components/admin/skills/EditSkillModal';
import { useSkillsData, SkillWithCategory } from '@/hooks/useSkillsData';

const SkillsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingSkill, setEditingSkill] = useState<SkillWithCategory | null>(null);
  
  const {
    skills,
    categories,
    loading,
    addSkill,
    updateSkill,
    deleteSkill,
    addCategory
  } = useSkillsData();

  const handleAddSkill = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleEditSkill = (skill: SkillWithCategory) => {
    setEditingSkill(skill);
  };

  const handleDeleteSkill = async (skill: SkillWithCategory) => {
    if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      await deleteSkill(skill.id);
    }
  };

  const handleUpdateSkill = async (id: string, updates: { name: string; icon?: string }) => {
    await updateSkill(id, updates);
    setEditingSkill(null);
  };

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center text-white">
          Loading skills...
        </div>
      </section>
    );
  }

  // Group skills by category
  const skillsByCategory = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category_id === category.id)
  }));

  return (
    <section className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white text-center flex-1">
            Skills
          </h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={() => handleAddSkill('')}
              label="Add Skill Category"
              className="ml-4"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillsByCategory.map((category) => (
            <div key={category.id} className="relative">
              <SkillCategory 
                title={category.name} 
                icon="🔹" 
                skills={category.skills}
                categoryKey={category.id}
                onAddSkill={() => handleAddSkill(category.id)}
                onEditSkill={handleEditSkill}
                onDeleteSkill={handleDeleteSkill}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AdminSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
          onAddSkill={addSkill}
          categories={categories}
        />
      )}
      
      {editingSkill && (
        <EditSkillModal
          isOpen={!!editingSkill}
          onClose={() => setEditingSkill(null)}
          skill={editingSkill}
          onUpdate={handleUpdateSkill}
        />
      )}
    </section>
  );
};

export default SkillsSection;
