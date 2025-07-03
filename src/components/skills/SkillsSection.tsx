
import React, { useState } from 'react';
import { useSkillsData } from '@/hooks/useSkillsData';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import SkillCategory from './SkillCategory';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';

const SkillsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const { skillCategories, skillsByCategory, loading } = useSkillsData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleAddSkill = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-white">Loading skills...</div>;
  }

  return (
    <section className="portfolio-section">
      <div 
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8 
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="portfolio-heading flex-1">Technical Skills</h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={() => setIsModalOpen(true)}
              label="Add Category"
              className="ml-4"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {skillCategories.map(category => (
            <SkillCategory 
              key={category.id}
              title={category.name} 
              icon="💻" 
              skills={skillsByCategory[category.id!] || []} 
              categoryKey={category.id!}
              onAddSkill={handleAddSkill}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AdminSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
        />
      )}
    </section>
  );
};

export default SkillsSection;
