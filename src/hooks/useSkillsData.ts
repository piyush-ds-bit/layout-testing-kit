import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface SkillCategory {
  id: string;
  name: string;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  category_id: string;
  created_at?: string;
}

export interface SkillWithCategory extends Skill {
  category?: SkillCategory;
}

export const useSkillsData = () => {
  const [skills, setSkills] = useState<SkillWithCategory[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch skill categories",
        variant: "destructive",
      });
    }
  };

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          category:skill_categories(*)
        `)
        .order('name');
      
      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      });
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchSkills()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Add category
  const addCategory = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .insert([{ name }])
        .select()
        .single();
      
      if (error) throw error;
      
      setCategories(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Category added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  // Add skill
  const addSkill = async (name: string, icon: string, categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ name, icon, category_id: categoryId }])
        .select(`
          *,
          category:skill_categories(*)
        `)
        .single();
      
      if (error) throw error;
      
      setSkills(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  // Update skill
  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          category:skill_categories(*)
        `)
        .single();
      
      if (error) throw error;
      
      setSkills(prev => prev.map(skill => skill.id === id ? data : skill));
      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
    }
  };

  // Delete skill
  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setSkills(prev => prev.filter(skill => skill.id !== id));
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      // First check if category has skills
      const { data: categorySkills } = await supabase
        .from('skills')
        .select('id')
        .eq('category_id', id);
      
      if (categorySkills && categorySkills.length > 0) {
        toast({
          title: "Error",
          description: "Cannot delete category with existing skills",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('skill_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  return {
    skills,
    categories,
    loading,
    addCategory,
    addSkill,
    updateSkill,
    deleteSkill,
    deleteCategory,
    refetchSkills: fetchSkills,
    refetchCategories: fetchCategories,
  };
};
