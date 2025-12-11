import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Achievement } from '@/types/database';
import { toast } from '@/hooks/use-toast';

export const ACHIEVEMENT_CATEGORIES = [
  'All',
  'Hackathons',
  'Certifications',
  'Events',
  'Awards',
  'Projects Completed'
] as const;

export type AchievementCategory = typeof ACHIEVEMENT_CATEGORIES[number];

export const useAchievementsData = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('All');

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      
      // Type-cast the data to Achievement[]
      const typedData: Achievement[] = (data || []).map(item => ({
        ...item,
        file_type: (item.file_type as 'image' | 'pdf') || 'image'
      }));
      
      setAchievements(typedData);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast({
        title: 'Error',
        description: 'Failed to load achievements',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([achievement])
        .select()
        .single();

      if (error) throw error;

      const typedData: Achievement = {
        ...data,
        file_type: (data.file_type as 'image' | 'pdf') || 'image'
      };

      setAchievements(prev => [typedData, ...prev]);
      toast({
        title: 'Success',
        description: 'Achievement added successfully'
      });
      return typedData;
    } catch (error) {
      console.error('Error adding achievement:', error);
      toast({
        title: 'Error',
        description: 'Failed to add achievement',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updateAchievement = async (id: string, updates: Partial<Achievement>) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const typedData: Achievement = {
        ...data,
        file_type: (data.file_type as 'image' | 'pdf') || 'image'
      };

      setAchievements(prev => prev.map(a => a.id === id ? typedData : a));
      toast({
        title: 'Success',
        description: 'Achievement updated successfully'
      });
      return typedData;
    } catch (error) {
      console.error('Error updating achievement:', error);
      toast({
        title: 'Error',
        description: 'Failed to update achievement',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAchievements(prev => prev.filter(a => a.id !== id));
      toast({
        title: 'Success',
        description: 'Achievement deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete achievement',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  useEffect(() => {
    fetchAchievements();
  }, []);

  return {
    achievements,
    filteredAchievements,
    loading,
    selectedCategory,
    setSelectedCategory,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    refetch: fetchAchievements
  };
};
