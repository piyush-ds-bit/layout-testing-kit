
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContentFormProps {
  section: string;
  initialData?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'toggle';
    placeholder?: string;
  }>;
}

const ContentForm: React.FC<ContentFormProps> = ({ section, initialData, onSave, fields }) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Determine which bucket to use based on the section and field
    const bucketName = section === 'hero' || fieldName.includes('Image') || fieldName.includes('image') 
      ? 'hero-images' 
      : 'contact-uploads';
    
    setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${section}_${fieldName}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log(`Uploading file to bucket: ${bucketName}, path: ${filePath}`);
      
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      console.log('File uploaded successfully, URL:', data.publicUrl);
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: data.publicUrl
      }));
      
      toast({
        title: 'File uploaded',
        description: 'The file has been uploaded successfully.',
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'There was an error uploading the file.',
        variant: 'destructive',
      });
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add section identifier and metadata
      const dataToSave = {
        ...formData,
        section,
        updated_at: new Date().toISOString(),
      };
      
      console.log('Saving data:', dataToSave);
      
      // Call the onSave callback
      await onSave(dataToSave);
      
      toast({
        title: 'Content saved',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast({
        title: 'Save failed',
        description: error.message || 'There was an error saving your changes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label htmlFor={field.name} className="block text-sm font-medium text-portfolio-gray-light">
            {field.label}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              rows={5}
              className="portfolio-input"
              placeholder={field.placeholder}
            />
          ) : field.type === 'image' ? (
            <div className="space-y-2">
              {formData[field.name] && (
                <div className="w-full h-40 overflow-hidden rounded-lg border border-portfolio-dark">
                  <img 
                    src={formData[field.name]} 
                    alt={field.label} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <input
                type="file"
                id={field.name}
                name={field.name}
                accept="image/*"
                onChange={(e) => handleUpload(e, field.name)}
                className="hidden"
                disabled={uploadingFiles[field.name]}
              />
              
              <Button
                type="button"
                onClick={() => document.getElementById(field.name)?.click()}
                variant="outline"
                className="w-full border-portfolio-dark text-portfolio-gray-light hover:border-portfolio-accent"
                disabled={loading || uploadingFiles[field.name]}
              >
                {uploadingFiles[field.name] 
                  ? 'Uploading...' 
                  : formData[field.name] 
                    ? 'Change Image' 
                    : 'Upload Image'
                }
              </Button>
            </div>
          ) : field.type === 'toggle' ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleInputChange}
                className="w-4 h-4 text-portfolio-accent bg-portfolio-dark border-portfolio-gray-light rounded focus:ring-portfolio-accent focus:ring-2"
              />
              <label htmlFor={field.name} className="ml-2 text-sm text-portfolio-gray-light">
                {field.label}
              </label>
            </div>
          ) : (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              className="portfolio-input"
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      
      <Button
        type="submit"
        className="portfolio-button"
        disabled={loading || Object.values(uploadingFiles).some(Boolean)}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
};

export default ContentForm;
