
import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';
import { useSkillsData } from '@/hooks/useSkillsData';

const SkillsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { skillCategories, loading, addSkill, updateSkill, deleteSkill } = useSkillsData();

  const handleAddSkill = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const categoryConfig = [
    { title: "Programming", icon: "💻", key: "programming" },
    { title: "Libraries & Frameworks", icon: "📚", key: "libraries" },
    { title: "Web & Tools", icon: "🌐", key: "webtools" },
    { title: "Databases", icon: "💾", key: "databases" },
    { title: "Tools", icon: "🛠️", key: "tools" },
    { title: "Other", icon: "✨", key: "other" }
  ];

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8">
          <div className="flex items-center justify-center">
            <div className="text-white">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

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
          {categoryConfig.map((category) => {
            const categoryData = skillCategories.find(c => c.name.toLowerCase().includes(category.key) || category.key.includes(c.name.toLowerCase()));
            const categoryId = categoryData?.id || category.key;
            const categorySkills = categoryData?.skills || [];

            return (
              <div key={category.key} className="relative">
                <SkillCategory 
                  title={category.title} 
                  icon={category.icon} 
                  skills={categorySkills.map(skill => ({ name: skill.name, icon: skill.icon }))}
                  categoryKey={categoryId}
                  onAddSkill={() => handleAddSkill(categoryId)}
                  onEditSkill={(skill) => {
                    // Find the skill in our data to get the ID
                    const skillData = categorySkills.find(s => s.name === skill.name);
                    if (skillData) {
                      console.log('Edit skill:', skillData);
                      // TODO: Open edit modal with skill data
                    }
                  }}
                  onDeleteSkill={(skill) => {
                    // Find the skill in our data to get the ID
                    const skillData = categorySkills.find(s => s.name === skill.name);
                    if (skillData) {
                      deleteSkill(skillData.id);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <AdminSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
          onSubmit={async (skillData) => {
            const success = await addSkill(selectedCategory, skillData);
            if (success) {
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </section>
  );
};

export default SkillsSection;
