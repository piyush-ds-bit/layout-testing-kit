import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface Experience {
  id?: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
}

const ManageExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
  });
  
  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('start_date', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          setExperiences(data);
        }
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
    
    fetchExperiences();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
    
    // If "current" is checked, clear the end_date
    if (name === 'current' && (e.target as HTMLInputElement).checked) {
      setFormData(prev => ({ ...prev, end_date: '' }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      current: false,
      description: '',
    });
    setEditingExperience(null);
  };
  
  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      current: experience.current,
      description: experience.description,
    });
  };
  
  const handleDeleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setExperiences(experiences.filter((exp) => exp.id !== id));
      
      toast({
        title: 'Success',
        description: 'Experience deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete experience.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.position || !formData.start_date) {
      toast({
        title: 'Missing fields',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.current && !formData.end_date) {
      toast({
        title: 'End date required',
        description: 'Please provide an end date or mark as current position.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      if (editingExperience) {
        // Update existing experience
        const { data, error } = await supabase
          .from('experiences')
          .update(formData)
          .eq('id', editingExperience.id)
          .select();
        
        if (error) throw error;
        
        if (data) {
          setExperiences(experiences.map((exp) => 
            exp.id === editingExperience.id ? data[0] : exp
          ));
          
          toast({
            title: 'Success',
            description: 'Experience updated successfully.',
          });
        }
      } else {
        // Add new experience
        const { data, error } = await supabase
          .from('experiences')
          .insert([formData])
          .select();
        
        if (error) throw error;
        
        if (data) {
          setExperiences([...experiences, data[0]]);
          
          toast({
            title: 'Success',
            description: 'Experience added successfully.',
          });
        }
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to save experience.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">
        {editingExperience ? 'Edit Experience' : 'Add New Experience'}
      </h1>
      
      <div className="portfolio-card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Company*
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="portfolio-input"
                placeholder="e.g. Acme Inc."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Position*
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="portfolio-input"
                placeholder="e.g. Web Developer"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Start Date*
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="portfolio-input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="portfolio-input"
                disabled={formData.current}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleInputChange}
              className="w-4 h-4 text-portfolio-accent bg-portfolio-dark border-portfolio-gray-light rounded focus:ring-portfolio-accent focus:ring-2"
            />
            <label htmlFor="current" className="ml-2 text-sm text-portfolio-gray-light">
              Current Position
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="portfolio-input"
              rows={4}
              placeholder="Describe your roles and responsibilities..."
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="portfolio-button">
              {editingExperience ? 'Update Experience' : 'Add Experience'}
            </Button>
            
            {editingExperience && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-portfolio-gray text-portfolio-gray-light"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
      
      <h2 className="text-xl text-white mb-4">Work Experience</h2>
      
      {experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((experience) => {
            const startDate = new Date(experience.start_date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            });
            
            const endDate = experience.current
              ? 'Present'
              : experience.end_date
                ? new Date(experience.end_date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                : '';
            
            return (
              <div key={experience.id} className="portfolio-card flex flex-col md:flex-row md:justify-between">
                <div>
                  <h3 className="text-white font-medium">{experience.company}</h3>
                  <div className="text-portfolio-gray-light">{experience.position}</div>
                  <div className="text-sm text-portfolio-gray">
                    {startDate} - {endDate}
                  </div>
                  <p className="text-portfolio-gray-light mt-2">{experience.description}</p>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    onClick={() => handleEditExperience(experience)}
                    variant="outline"
                    className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                  >
                    Edit
                  </Button>
                  
                  <Button
                    onClick={() => handleDeleteExperience(experience.id!)}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">No experiences added yet.</p>
      )}
    </div>
  );
};

export default ManageExperience;
