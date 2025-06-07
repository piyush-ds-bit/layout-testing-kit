
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ContentForm from '@/components/admin/ContentForm';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditHero: React.FC = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchHeroData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching hero section data...');
      
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('name', 'hero')
        .maybeSingle();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Hero data fetched:', data);
      
      if (data) {
        // If content is stored as JSON, extract it
        const extractedData = data.content && typeof data.content === 'object' 
          ? { ...data, ...data.content }
          : data;
        
        setHeroData(extractedData);
      } else {
        // Initialize with empty data structure
        setHeroData({
          name: '',
          title: '',
          subtitle: '',
          buttonText: 'Get In Touch',
          projectsButtonText: 'View Projects',
          backgroundImage: '',
          profileImage: ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching hero data:', error);
      setError(error.message || 'Failed to fetch hero section data.');
      toast({
        title: 'Error',
        description: 'Failed to fetch hero section data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHeroData();
  }, []);
  
  const handleSaveHero = async (data: Record<string, any>) => {
    try {
      setError(null);
      
      console.log('Saving hero data:', data);
      
      // Prepare the content object
      const contentData = {
        name: data.name || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        buttonText: data.buttonText || 'Get In Touch',
        projectsButtonText: data.projectsButtonText || 'View Projects',
        backgroundImage: data.backgroundImage || '',
        profileImage: data.profileImage || ''
      };
      
      // Prepare the section data for database
      const sectionData = {
        name: 'hero',
        title: data.title || '',
        subtitle: data.subtitle || '',
        content: contentData,
        is_visible: true,
        updated_at: new Date().toISOString()
      };
      
      if (heroData?.id) {
        console.log('Updating existing hero section with ID:', heroData.id);
        // Update existing record
        const { error } = await supabase
          .from('sections')
          .update(sectionData)
          .eq('id', heroData.id);
        
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        
        // Update local state
        setHeroData({
          ...heroData,
          ...sectionData,
          ...contentData
        });
      } else {
        console.log('Creating new hero section');
        // Insert new record
        const { data: insertedData, error } = await supabase
          .from('sections')
          .insert([sectionData])
          .select()
          .single();
        
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        
        console.log('New hero section created:', insertedData);
        
        // Update local state with the new record
        setHeroData({
          ...insertedData,
          ...contentData
        });
      }
      
      toast({
        title: 'Success',
        description: 'Hero section has been saved.',
      });
    } catch (error: any) {
      console.error('Error saving hero data:', error);
      setError(error.message || 'Failed to save hero section.');
      toast({
        title: 'Error',
        description: 'Failed to save hero section.',
        variant: 'destructive',
      });
      throw error;
    }
  };
  
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
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <div className="mt-4">
            <Button onClick={fetchHeroData} variant="outline">
              Retry
            </Button>
          </div>
        </Alert>
      )}
      
      {loading ? (
        <div className="text-white">Loading hero section data...</div>
      ) : (
        <div className="portfolio-card">
          <ContentForm 
            section="hero"
            initialData={heroData} 
            onSave={handleSaveHero}
            fields={heroFields}
          />
        </div>
      )}
    </div>
  );
};

export default EditHero;
