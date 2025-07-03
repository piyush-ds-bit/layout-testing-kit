
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skill, SkillCategory } from '@/types/database';

export const useSkillsData = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skill[]>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categories, error: categoriesError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;
      
      // Fetch skills
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('name');
      
      if (skillsError) throw skillsError;
      
      setSkillCategories(categories || []);
      
      // Group skills by category
      const groupedSkills: Record<string, Skill[]> = {};
      (skills || []).forEach(skill => {
        if (!groupedSkills[skill.category_id]) {
          groupedSkills[skill.category_id] = [];
        }
        groupedSkills[skill.category_id].push(skill);
      });
      
      setSkillsByCategory(groupedSkills);
    } catch (error) {
      console.error('Error fetching skills data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch skills data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (categoryId: string, skillData: { name: string; icon: string }) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ ...skillData, category_id: categoryId }])
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setSkillsByCategory(prev => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), data]
      }));

      toast({
        title: 'Success',
        description: 'Skill added successfully.',
      });

      return data;
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateSkill = async (skillId: string, skillData: { name: string; icon: string }) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', skillId)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setSkillsByCategory(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(categoryId => {
          updated[categoryId] = updated[categoryId].map(skill =>
            skill.id === skillId ? data : skill
          );
        });
        return updated;
      });

      toast({
        title: 'Success',
        description: 'Skill updated successfully.',
      });

      return data;
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to update skill.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      // Update local state
      setSkillsByCategory(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(categoryId => {
          updated[categoryId] = updated[categoryId].filter(skill => skill.id !== skillId);
        });
        return updated;
      });

      toast({
        title: 'Success',
        description: 'Skill deleted successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const addCategory = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;

      setSkillCategories(prev => [...prev, data]);
      setSkillsByCategory(prev => ({ ...prev, [data.id]: [] }));

      toast({
        title: 'Success',
        description: 'Category added successfully.',
      });

      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: 'Error',
        description: 'Failed to add category.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      // First delete all skills in this category
      const { error: skillsError } = await supabase
        .from('skills')
        .delete()
        .eq('category_id', categoryId);

      if (skillsError) throw skillsError;

      // Then delete the category
      const { error } = await supabase
        .from('skill_categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      // Update local state
      setSkillCategories(prev => prev.filter(cat => cat.id !== categoryId));
      setSkillsByCategory(prev => {
        const updated = { ...prev };
        delete updated[categoryId];
        return updated;
      });

      toast({
        title: 'Success',
        description: 'Category and its skills deleted successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    skillCategories,
    skillsByCategory,
    loading,
    addSkill,
    updateSkill,
    deleteSkill,
    addCategory,
    deleteCategory,
    refetch: fetchData,
  };
};
