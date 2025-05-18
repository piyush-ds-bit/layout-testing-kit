
import React from 'react';
import { useSkillsManagement } from '@/hooks/useSkillsManagement';
import CategoryList from '@/components/admin/skills/CategoryList';
import AddSkillForm from '@/components/admin/skills/AddSkillForm';
import SkillList from '@/components/admin/skills/SkillList';

const ManageSkills: React.FC = () => {
  const {
    categories,
    loading,
    selectedCategory,
    skills,
    newSkill,
    newCategoryName,
    addingCategory,
    setSelectedCategory,
    setNewSkill,
    setNewCategoryName,
    setAddingCategory,
    handleAddSkill,
    handleDeleteSkill,
    handleAddCategory,
    handleDeleteCategory
  } = useSkillsManagement();
  
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Manage Skills</h1>
      
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleDeleteCategory={handleDeleteCategory}
        addingCategory={addingCategory}
        setAddingCategory={setAddingCategory}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
      />
      
      {selectedCategory && (
        <>
          <AddSkillForm
            handleAddSkill={handleAddSkill}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
          />
          
          <SkillList
            skills={skills}
            handleDeleteSkill={handleDeleteSkill}
          />
        </>
      )}
    </div>
  );
};

export default ManageSkills;
