
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
  const [lastSupabaseError, setLastSupabaseError] = useState<any>(null);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      setError(null);
      setLastSupabaseError(null);

      console.log('Fetching hero section data...');

      const { data, error: sbError, status } = await supabase
        .from('sections')
        .select('*')
        .eq('name', 'hero')
        .maybeSingle();

      if (sbError) {
        // Show special message for RLS/permission errors
        if (sbError.code === '42501' || sbError.status === 403 || status === 403) {
          setError('You do not have permission to access the hero section. (RLS policy or role issue)');
        } else {
          setError(sbError.message || 'Failed to fetch hero section data.');
        }
        setLastSupabaseError(sbError);
        toast({
          title: 'Error',
          description: sbError.message || 'Failed to fetch hero section data.',
          variant: 'destructive',
        });
        setHeroData(null);
        return;
      }

      if (!data) {
        setHeroData({
          name: '',
          title: '',
          subtitle: '',
          buttonText: 'Get In Touch',
          projectsButtonText: 'View Projects',
          backgroundImage: '',
          profileImage: ''
        });
      } else {
        // If content is stored as JSON, extract it
        const extractedData = data.content && typeof data.content === 'object'
          ? { ...data, ...data.content }
          : data;
        setHeroData(extractedData);
      }
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch hero section data.');
      setLastSupabaseError(error);
      toast({
        title: 'Error',
        description: 'Failed to fetch hero section data.',
        variant: 'destructive',
      });
      setHeroData(null);
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
      setLastSupabaseError(null);

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
        // Update existing record
        const { error: updateError, status } = await supabase
          .from('sections')
          .update(sectionData)
          .eq('id', heroData.id);

        if (updateError) {
          if (updateError.code === '42501' || updateError.status === 403 || status === 403) {
            setError('You do not have permission to update the hero section. (RLS policy or role issue)');
          } else {
            setError(updateError.message || 'Failed to save hero section.');
          }
          setLastSupabaseError(updateError);
          toast({
            title: 'Error',
            description: updateError.message || 'Failed to save hero section.',
            variant: 'destructive',
          });
          throw updateError;
        }

        setHeroData({
          ...heroData,
          ...sectionData,
          ...contentData
        });
      } else {
        // Insert new record
        const { data: insertedData, error: insertError, status } = await supabase
          .from('sections')
          .insert([sectionData])
          .select()
          .single();

        if (insertError) {
          if (insertError.code === '42501' || insertError.status === 403 || status === 403) {
            setError('You do not have permission to create the hero section. (RLS policy or role issue)');
          } else {
            setError(insertError.message || 'Failed to save hero section.');
          }
          setLastSupabaseError(insertError);
          toast({
            title: 'Error',
            description: insertError.message || 'Failed to save hero section.',
            variant: 'destructive',
          });
          throw insertError;
        }

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
          <AlertDescription>
            {error}
            <br />
            {lastSupabaseError ? (
              <span className="text-xs text-orange-300 block mt-2">
                {JSON.stringify(lastSupabaseError, null, 2)}
              </span>
            ) : null}
          </AlertDescription>
          <div className="mt-4">
            <Button onClick={fetchHeroData} variant="outline">
              Retry
            </Button>
          </div>
        </Alert>
      )}

      {loading ? (
        <div className="text-white">Loading hero section data...</div>
      ) : !error && heroData ? (
        <div className="portfolio-card">
          <ContentForm
            section="hero"
            initialData={heroData}
            onSave={handleSaveHero}
            fields={heroFields}
          />
        </div>
      ) : null}
    </div>
  );
};

export default EditHero;

