
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
  created_at?: string;
}

export const useExperienceData = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackExperiences: Experience[] = [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Full Stack Developer',
      start_date: '2023-01-01',
      current: true,
      description: 'Developing web applications using React, TypeScript, and Node.js. Working on microservices architecture and cloud deployment strategies.',
    },
    {
      id: '2',
      company: 'Digital Innovation Co.',
      position: 'Frontend Developer',
      start_date: '2022-01-01',
      end_date: '2022-12-31',
      description: 'Built responsive user interfaces using React and modern CSS frameworks. Collaborated with UX designers to implement pixel-perfect designs.',
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

  const addExperience = async (experienceData: Omit<Experience, 'id' | 'created_at'>) => {
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
    } catch (error: any) {
      console.error('Error adding experience:', error);
      toast({
        title: "Error",
        description: "Failed to add experience",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateExperience = async (id: string, experienceData: Partial<Omit<Experience, 'id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(experienceData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setExperiences(prev => prev.map(experience => 
        experience.id === id ? data : experience
      ));

      toast({
        title: "Success",
        description: "Experience updated successfully",
      });

      return true;
    } catch (error: any) {
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

      setExperiences(prev => prev.filter(experience => experience.id !== id));

      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    experiences,
    loading,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences
  };
};
