import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  category: string;
  date: string | null;
  event_name: string | null;
  image_url: string | null;
  file_url: string | null;
  file_type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type AchievementInsert = Omit<Achievement, 'id' | 'created_at' | 'updated_at'>;

export const useAchievementsData = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast({
        title: "Error",
        description: "Failed to fetch achievements",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchAchievements();
      setLoading(false);
    };
    loadData();
  }, []);

  const uploadFile = async (file: File): Promise<{ url: string; type: string } | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('achievements')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('achievements')
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        type: file.type.startsWith('image/') ? 'image' : 'pdf'
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
      return null;
    }
  };

  const addAchievement = async (achievementData: AchievementInsert, file?: File) => {
    try {
      let fileData = null;
      if (file) {
        fileData = await uploadFile(file);
        if (!fileData) return;
      }

      const insertData = {
        ...achievementData,
        file_url: fileData?.url || achievementData.file_url,
        file_type: fileData?.type || achievementData.file_type,
        image_url: fileData?.type === 'image' ? fileData.url : achievementData.image_url,
      };

      const { data, error } = await supabase
        .from('achievements')
        .insert([insertData])
        .select()
        .single();
      
      if (error) throw error;
      
      setAchievements(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Achievement added successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding achievement:', error);
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive",
      });
    }
  };

  const updateAchievement = async (id: string, updates: Partial<Achievement>, file?: File) => {
    try {
      let fileData = null;
      if (file) {
        fileData = await uploadFile(file);
        if (!fileData) return;
      }

      const updateData = {
        ...updates,
        ...(fileData && {
          file_url: fileData.url,
          file_type: fileData.type,
          image_url: fileData.type === 'image' ? fileData.url : updates.image_url,
        }),
      };

      const { data, error } = await supabase
        .from('achievements')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      setAchievements(prev => prev.map(a => a.id === id ? data : a));
      toast({
        title: "Success",
        description: "Achievement updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating achievement:', error);
      toast({
        title: "Error",
        description: "Failed to update achievement",
        variant: "destructive",
      });
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const achievement = achievements.find(a => a.id === id);
      
      // Delete file from storage if exists
      if (achievement?.file_url) {
        const fileName = achievement.file_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('achievements').remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setAchievements(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Success",
        description: "Achievement deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    }
  };

  return {
    achievements,
    loading,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    refetchAchievements: fetchAchievements,
  };
};
