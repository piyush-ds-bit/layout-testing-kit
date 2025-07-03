
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Experience } from '@/types/database';

export const useExperienceData = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDuration = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate);
    const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (current) {
      return `${startMonth} - Present`;
    }
    
    if (endDate) {
      const end = new Date(endDate);
      const endMonth = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return `${startMonth} - ${endMonth}`;
    }
    
    return startMonth;
  };

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;

      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch experiences.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
        title: 'Success',
        description: 'Experience added successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error adding experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to add experience.',
        variant: 'destructive',
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

      setExperiences(prev => prev.map(exp => exp.id === id ? data : exp));

      toast({
        title: 'Success',
        description: 'Experience updated successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to update experience.',
        variant: 'destructive',
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
        title: 'Success',
        description: 'Experience deleted successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete experience.',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    formatDuration,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences,
  };
};
