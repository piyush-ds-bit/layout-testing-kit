
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current?: boolean;
  description: string;
}

export const useExperienceData = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackExperiences = [
    {
      id: 'fallback-1',
      company: "Self-Initiated",
      position: "Machine Learning & Data Science Developer",
      start_date: "2024-01-01",
      current: true,
      description: "Building end-to-end data-driven applications like WhatsApp Chat Analyzer, Movie Recommender System, and Insurance Premium Predictor using Python, Streamlit, and various ML libraries. Focused on data preprocessing, model building, deployment, and UI integration."
    },
    {
      id: 'fallback-2',
      company: "AEIE Department, HIT",
      position: "Academic Project Contributor",
      start_date: "2023-08-01",
      current: true,
      description: "Learning and working on interdisciplinary academic projects blending electronics and AI, including sensor-based data acquisition systems and analysis using Python. Applied knowledge from instrumentation to real-world predictive modeling."
    },
    {
      id: 'fallback-3',
      company: "Self Employed",
      position: "Tuition Teacher(Part-time)",
      start_date: "2021-02-01",
      current: true,
      description: "Provided academic coaching to students from Class 5 to 12. Taught all subjects for Classes 5–8, and Physics, Chemistry, and Mathematics for Classes 9–12. Helped students achieve significant academic improvement, with one scoring 81% (Class 10) and another scoring 75% (Class 12)."
    }
  ];

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (!error && data && data.length > 0) {
        setExperiences(data);
      } else {
        setExperiences(fallbackExperiences);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setExperiences(fallbackExperiences);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const addExperience = async (experienceData: Omit<Experience, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([experienceData])
        .select()
        .single();

      if (error) throw error;

      setExperiences(prev => [data, ...prev]);

      toast({
        title: "Success",
        description: "Experience added successfully",
      });

      return true;
    } catch (error) {
      console.error('Error adding experience:', error);
      toast({
        title: "Error",
        description: "Failed to add experience",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateExperience = async (id: string, experienceData: Partial<Experience>) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(experienceData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setExperiences(prev => prev.map(exp => 
        exp.id === id ? data : exp
      ));

      toast({
        title: "Success",
        description: "Experience updated successfully",
      });

      return true;
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: "Error",
        description: "Failed to update experience",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExperiences(prev => prev.filter(exp => exp.id !== id));

      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
      return false;
    }
  };

  const formatDuration = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate);
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startYear = start.getFullYear();
    
    if (current) {
      return `${startMonth} ${startYear} - Present`;
    }
    
    if (endDate) {
      const end = new Date(endDate);
      const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
      const endYear = end.getFullYear();
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
    
    return `${startMonth} ${startYear}`;
  };

  return {
    experiences,
    loading,
    addExperience,
    updateExperience,
    deleteExperience,
    formatDuration,
    refetch: fetchExperiences
  };
};
