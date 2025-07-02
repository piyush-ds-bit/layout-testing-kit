
import React, { useState, useEffect } from 'react';
import SkillCategory from './SkillCategory';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Skill {
  id: string;
  name: string;
  icon: string;
  category_id: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and skills from Supabase
  const fetchSkillsData = async () => {
    try {
      setLoading(true);
      
      // First get categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Then get skills for each category
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('name');

      if (skillsError) throw skillsError;

      // Group skills by category
      const categoriesWithSkills = (categoriesData || []).map(category => ({
        ...category,
        skills: (skillsData || []).filter(skill => skill.category_id === category.id)
      }));

      setCategories(categoriesWithSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to load skills data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const handleAddSkill = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleSkillAdded = () => {
    fetchSkillsData(); // Refresh data after adding
    setIsModalOpen(false);
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });

      fetchSkillsData(); // Refresh data
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const handleEditSkill = async (skill: Skill, newName: string, newIcon: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({ name: newName, icon: newIcon })
        .eq('id', skill.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill updated successfully",
      });

      fetchSkillsData(); // Refresh data
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">Loading skills...</div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <SkillCategory 
                title={category.name} 
                icon="🔧" 
                skills={category.skills.map(skill => ({ name: skill.name, icon: skill.icon }))}
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
          onSkillAdded={handleSkillAdded}
          categoryId={selectedCategory}
        />
      )}
    </section>
  );
};

export default SkillsSection;
