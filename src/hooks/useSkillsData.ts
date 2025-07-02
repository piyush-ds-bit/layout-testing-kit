
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category_id: string;
}

export interface SkillCategory {
  id: string;
  name: string;
}

export const useSkillsData = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<{ [categoryId: string]: Skill[] }>({});
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    programming: [
      { id: 'fallback-1', name: 'Python', icon: 'python', category_id: 'programming' },
      { id: 'fallback-2', name: 'Dart', icon: 'dart', category_id: 'programming' },
      { id: 'fallback-3', name: 'HTML/CSS', icon: 'html5', category_id: 'programming' }
    ],
    libraries: [
      { id: 'fallback-4', name: 'Pandas', icon: 'pandas', category_id: 'libraries' },
      { id: 'fallback-5', name: 'NumPy', icon: 'numpy', category_id: 'libraries' },
      { id: 'fallback-6', name: 'Matplotlib', icon: 'matplotlib', category_id: 'libraries' },
      { id: 'fallback-7', name: 'Seaborn', icon: 'seaborn', category_id: 'libraries' },
      { id: 'fallback-8', name: 'Scikit‑learn', icon: 'scikitlearn', category_id: 'libraries' },
      { id: 'fallback-9', name: 'TensorFlow', icon: 'tensorflow', category_id: 'libraries' }
    ],
    webtools: [
      { id: 'fallback-10', name: 'Streamlit', icon: 'streamlit', category_id: 'webtools' },
      { id: 'fallback-11', name: 'FastAPI', icon: 'fastapi', category_id: 'webtools' },
      { id: 'fallback-12', name: 'Pydantic', icon: 'pydantic', category_id: 'webtools' },
      { id: 'fallback-13', name: 'Flutter', icon: 'flutter', category_id: 'webtools' },
      { id: 'fallback-14', name: 'Docker', icon: 'docker', category_id: 'webtools' }
    ],
    databases: [
      { id: 'fallback-15', name: 'Supabase', icon: 'supabase', category_id: 'databases' }
    ],
    tools: [
      { id: 'fallback-16', name: 'IntelliJ', icon: 'intellijidea', category_id: 'tools' },
      { id: 'fallback-17', name: 'Jupyter Notebook', icon: 'jupyter', category_id: 'tools' },
      { id: 'fallback-18', name: 'PyCharm', icon: 'pycharm', category_id: 'tools' },
      { id: 'fallback-19', name: 'Google Colab', icon: 'googlecolab', category_id: 'tools' },
      { id: 'fallback-20', name: 'Kaggle', icon: 'kaggle', category_id: 'tools' }
    ],
    other: [
      { id: 'fallback-21', name: 'Problem Solving', icon: 'problemsolving', category_id: 'other' }
    ]
  };

  const fallbackCategories = [
    { id: 'programming', name: 'Programming' },
    { id: 'libraries', name: 'Libraries & Frameworks' },
    { id: 'webtools', name: 'Web & Tools' },
    { id: 'databases', name: 'Databases' },
    { id: 'tools', name: 'Tools' },
    { id: 'other', name: 'Other' }
  ];

  const fetchData = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('skill_categories')
        .select('*');

      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*');

      if (!categoriesError && !skillsError && categoriesData && skillsData) {
        setCategories(categoriesData);
        
        const skillsByCategory: { [categoryId: string]: Skill[] } = {};
        skillsData.forEach((skill) => {
          if (!skillsByCategory[skill.category_id]) {
            skillsByCategory[skill.category_id] = [];
          }
          skillsByCategory[skill.category_id].push(skill);
        });
        setSkills(skillsByCategory);
      } else {
        // Use fallback data
        setCategories(fallbackCategories);
        setSkills(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
      setCategories(fallbackCategories);
      setSkills(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSkill = async (name: string, icon: string, categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ name, icon: icon || '🔧', category_id: categoryId }])
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => ({
        ...prev,
        [categoryId]: [...(prev[categoryId] || []), data]
      }));

      toast({
        title: "Success",
        description: "Skill added successfully",
      });

      return true;
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSkill = async (id: string, name: string, icon: string) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update({ name, icon })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => {
        const newSkills = { ...prev };
        Object.keys(newSkills).forEach(categoryId => {
          newSkills[categoryId] = newSkills[categoryId].map(skill =>
            skill.id === id ? data : skill
          );
        });
        return newSkills;
      });

      toast({
        title: "Success",
        description: "Skill updated successfully",
      });

      return true;
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSkills(prev => {
        const newSkills = { ...prev };
        Object.keys(newSkills).forEach(categoryId => {
          newSkills[categoryId] = newSkills[categoryId].filter(skill => skill.id !== id);
        });
        return newSkills;
      });

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });

      return true;
    } catch (error) {
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
    categories,
    skills,
    loading,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchData
  };
};
