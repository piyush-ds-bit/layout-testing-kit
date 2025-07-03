
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string | null;
  category_id: string;
}

export const useSkillsData = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackCategories: SkillCategory[] = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      skills: [
        { id: '1', name: 'React', icon: '⚛️', category_id: 'frontend' },
        { id: '2', name: 'TypeScript', icon: '🔷', category_id: 'frontend' },
        { id: '3', name: 'JavaScript', icon: '🟨', category_id: 'frontend' },
        { id: '4', name: 'HTML/CSS', icon: '🎨', category_id: 'frontend' },
        { id: '5', name: 'Tailwind CSS', icon: '🎨', category_id: 'frontend' },
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      skills: [
        { id: '6', name: 'Python', icon: '🐍', category_id: 'backend' },
        { id: '7', name: 'FastAPI', icon: '⚡', category_id: 'backend' },
        { id: '8', name: 'SQL', icon: '🗄️', category_id: 'backend' },
        { id: '9', name: 'PostgreSQL', icon: '🐘', category_id: 'backend' },
      ]
    },
    {
      id: 'tools',
      name: 'Tools & Technologies',
      skills: [
        { id: '10', name: 'Git', icon: '📝', category_id: 'tools' },
        { id: '11', name: 'Docker', icon: '🐳', category_id: 'tools' },
        { id: '12', name: 'AWS', icon: '☁️', category_id: 'tools' },
      ]
    }
  ];

  const fetchSkillsData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name');

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('name');

      if (!categoriesError && !skillsError && categoriesData && skillsData) {
        // Group skills by category
        const groupedCategories: SkillCategory[] = categoriesData.map(category => ({
          ...category,
          skills: skillsData.filter(skill => skill.category_id === category.id)
        }));

        setSkillCategories(groupedCategories);
      } else {
        console.log('Using fallback skills data');
        setSkillCategories(fallbackCategories);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
      setSkillCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const addSkill = async (categoryId: string, skillData: { name: string; icon: string }) => {
    try {
      console.log('Adding skill:', { categoryId, skillData });
      
      const { data, error } = await supabase
        .from('skills')
        .insert({
          category_id: categoryId,
          name: skillData.name,
          icon: skillData.icon || '🔧'
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding skill:', error);
        throw error;
      }

      console.log('Skill added successfully:', data);
      
      // Update the local state immediately
      setSkillCategories(prev => 
        prev.map(category => 
          category.id === categoryId 
            ? { ...category, skills: [...category.skills, data] }
            : category
        )
      );

      toast({
        title: "Success",
        description: "Skill added successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add skill",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSkill = async (skillId: string, skillData: { name: string; icon: string }) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update({
          name: skillData.name,
          icon: skillData.icon
        })
        .eq('id', skillId)
        .select()
        .single();

      if (error) throw error;

      // Update the local state
      setSkillCategories(prev => 
        prev.map(category => ({
          ...category,
          skills: category.skills.map(skill => 
            skill.id === skillId ? data : skill
          )
        }))
      );

      toast({
        title: "Success",
        description: "Skill updated successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
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

      // Update the local state
      setSkillCategories(prev => 
        prev.map(category => ({
          ...category,
          skills: category.skills.filter(skill => skill.id !== skillId)
        }))
      );

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    skillCategories,
    loading,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchSkillsData
  };
};
