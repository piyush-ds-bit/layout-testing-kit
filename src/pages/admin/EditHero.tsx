
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
      
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('name', 'hero')
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setHeroData(data);
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
      
      // Ensure data has the required 'name' field for the sections table
      const sectionData = {
        ...data,
        name: 'hero', // Required field for the sections table
      };
      
      if (heroData?.id) {
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
        await fetchHeroData();
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
