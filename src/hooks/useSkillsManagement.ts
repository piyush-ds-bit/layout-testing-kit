
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Skill, SkillCategory } from '@/types/database';

export const useSkillsManagement = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  
  // Fetch skill categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      if (data) {
        setCategories(data as SkillCategory[]);
        if (data.length > 0 && !selectedCategory) {
          setSelectedCategory(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch skill categories.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch skills for selected category
  const fetchSkills = async () => {
    if (!selectedCategory) return;
    
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category_id', selectedCategory)
        .order('name');
      
      if (error) throw error;
      
      if (data) {
        setSkills(data as Skill[]);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch skills.',
        variant: 'destructive',
      });
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (selectedCategory) {
      fetchSkills();
    }
  }, [selectedCategory]);
  
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSkill.name || !selectedCategory) return;
    
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([
          {
            name: newSkill.name,
            icon: newSkill.icon || '🔧',
            category_id: selectedCategory,
          },
        ])
        .select();
      
      if (error) throw error;
      
      if (data) {
        setSkills([...skills, data[0] as Skill]);
        setNewSkill({ name: '', icon: '' });
        
        toast({
          title: 'Success',
          description: 'Skill added successfully.',
        });
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setSkills(skills.filter((skill) => skill.id !== id));
      
      toast({
        title: 'Success',
        description: 'Skill deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill.',
        variant: 'destructive',
      });
    }
  };
  
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoryName) return;
    
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .insert([{ name: newCategoryName }])
        .select();
      
      if (error) throw error;
      
      if (data) {
        await fetchCategories();
        setNewCategoryName('');
        setAddingCategory(false);
        setSelectedCategory(data[0].id);
        
        toast({
          title: 'Success',
          description: 'Category added successfully.',
        });
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: 'Error',
        description: 'Failed to add category.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    if (!id || categories.length <= 1) return;
    
    try {
      // First, delete all skills in this category
      const { error: skillsError } = await supabase
        .from('skills')
        .delete()
        .eq('category_id', id);
      
      if (skillsError) throw skillsError;
      
      // Then delete the category
      const { error } = await supabase
        .from('skill_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update categories and select a new one if needed
      const updatedCategories = categories.filter(cat => cat.id !== id);
      setCategories(updatedCategories);
      
      if (selectedCategory === id && updatedCategories.length > 0) {
        setSelectedCategory(updatedCategories[0].id);
      }
      
      toast({
        title: 'Success',
        description: 'Category and its skills deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category.',
        variant: 'destructive',
      });
    }
  };

  return {
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
  };
};
