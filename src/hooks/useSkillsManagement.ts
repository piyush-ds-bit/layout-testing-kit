
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useSkillsManagement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = async (categoryId: string, skillData: { name: string; icon: string }) => {
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSkill = async (skillId: string, skillData: { name: string; icon: string }) => {
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

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
    addSkill,
    updateSkill,
    deleteSkill,
    isSubmitting
  };
};
