import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  created_at?: string;
}

export const useExperienceData = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences
  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast({
        title: "Error",
        description: "Failed to fetch experiences",
        variant: "destructive",
      });
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchExperiences();
      setLoading(false);
    };
    loadData();
  }, []);

  // Format duration for display
  const formatDuration = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate);
    const end = current ? new Date() : endDate ? new Date(endDate) : new Date();
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const endMonth = current ? 'Present' : end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    return `${startMonth} - ${endMonth}`;
  };

  // Add experience
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
      return data;
    } catch (error) {
      console.error('Error adding experience:', error);
      toast({
        title: "Error",
        description: "Failed to add experience",
        variant: "destructive",
      });
    }
  };

  // Update experience
  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setExperiences(prev => prev.map(exp => exp.id === id ? data : exp));
      toast({
        title: "Success",
        description: "Experience updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: "Error",
        description: "Failed to update experience",
        variant: "destructive",
      });
    }
  };

  // Delete experience
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
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  return {
    experiences,
    loading,
    formatDuration,
    addExperience,
    updateExperience,
    deleteExperience,
    refetchExperiences: fetchExperiences,
  };
};