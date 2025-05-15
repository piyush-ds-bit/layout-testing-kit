
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ContentForm from '@/components/admin/ContentForm';
import { toast } from '@/components/ui/use-toast';

const EditHero: React.FC = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data, error } = await supabase
          .from('sections')
          .select('*')
          .eq('name', 'hero')
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is no rows returned
          throw error;
        }
        
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch hero section data.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeroData();
  }, []);
  
  const handleSaveHero = async (data: Record<string, any>) => {
    try {
      // Ensure data has the required 'name' field for the sections table
      const sectionData = {
        ...data,
        name: 'hero', // Required field for the sections table
      };
      
      if (heroData) {
        // Update existing record
        const { error } = await supabase
          .from('sections')
          .update(sectionData)
          .eq('id', heroData.id);
        
        if (error) throw error;
        
        // Update local state with the new data
        setHeroData({
          ...heroData,
          ...sectionData
        });
      } else {
        // Insert new record
        const { error } = await supabase
          .from('sections')
          .insert([sectionData]); // Pass an array with the single object
        
        if (error) throw error;
        
        // Fetch the newly created record to get its ID
        const { data: newHero, error: fetchError } = await supabase
          .from('sections')
          .select('*')
          .eq('name', 'hero')
          .single();
          
        if (fetchError) throw fetchError;
        
        setHeroData(newHero);
      }
      
      toast({
        title: 'Success',
        description: 'Hero section has been saved.',
      });
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast({
        title: 'Error',
        description: 'Failed to save hero section.',
        variant: 'destructive',
      });
      throw error;
    }
  };
  
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  const heroFields = [
    { name: 'name', label: 'Your Name', type: 'text' as const, placeholder: 'e.g. John Doe' },
    { name: 'title', label: 'Title/Role', type: 'text' as const, placeholder: 'e.g. Web Developer' },
    { name: 'subtitle', label: 'Subtitle', type: 'text' as const, placeholder: 'e.g. App Developer · Web Developer · Python Developer' },
    { name: 'buttonText', label: 'Contact Button Text', type: 'text' as const, placeholder: 'e.g. Get In Touch' },
    { name: 'projectsButtonText', label: 'Projects Button Text', type: 'text' as const, placeholder: 'e.g. View Projects' },
    { name: 'backgroundImage', label: 'Background Image', type: 'image' as const },
    { name: 'profileImage', label: 'Profile Image', type: 'image' as const },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Edit Hero Section</h1>
      
      <div className="portfolio-card">
        <ContentForm 
          section="hero"
          initialData={heroData} 
          onSave={handleSaveHero}
          fields={heroFields}
        />
      </div>
    </div>
  );
};

export default EditHero;
