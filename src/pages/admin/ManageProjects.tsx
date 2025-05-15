import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/database';

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    category: 'app',
    image_url: '',
    github_url: '',
    live_url: '',
    technologies: [],
  });
  const [techInput, setTechInput] = useState('');
  
  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('title');
        
        if (error) throw error;
        
        if (data) {
          setProjects(data as Project[]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch projects.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleTechAdd = () => {
    if (!techInput.trim()) return;
    
    setFormData({
      ...formData,
      technologies: [...formData.technologies, techInput.trim()],
    });
    
    setTechInput('');
  };
  
  const handleTechRemove = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'app',
      image_url: '',
      github_url: '',
      live_url: '',
      technologies: [],
    });
    setTechInput('');
    setEditingProject(null);
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `project_image_${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('content').getPublicUrl(filePath);
      
      setFormData({ ...formData, image_url: data.publicUrl });
      
      toast({
        title: 'Image uploaded',
        description: 'Project image has been uploaded.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload project image.',
        variant: 'destructive',
      });
    }
  };
  
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies || [],
    });
  };
  
  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setProjects(projects.filter((project) => project.id !== id));
      
      toast({
        title: 'Success',
        description: 'Project deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: 'Missing fields',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      if (editingProject) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id)
          .select();
        
        if (error) throw error;
        
        if (data) {
          setProjects(projects.map((proj) => 
            proj.id === editingProject.id ? data[0] as Project : proj
          ));
          
          toast({
            title: 'Success',
            description: 'Project updated successfully.',
          });
        }
      } else {
        // Add new project
        const { data, error } = await supabase
          .from('projects')
          .insert([formData])
          .select();
        
        if (error) throw error;
        
        if (data) {
          setProjects([...projects, data[0] as Project]);
          
          toast({
            title: 'Success',
            description: 'Project added successfully.',
          });
        }
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project.',
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
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </h1>
      
      <div className="portfolio-card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Project Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="portfolio-input"
              placeholder="e.g. Bingo Dashboard"
              required
            />
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
              rows={3}
              placeholder="Brief description of the project..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Category*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="portfolio-input"
              required
            >
              <option value="app">App Development</option>
              <option value="web">Web Development</option>
              <option value="python">Python Project</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Project Image
            </label>
            <div className="space-y-2">
              {formData.image_url && (
                <div className="w-full h-40 overflow-hidden rounded-lg border border-portfolio-dark">
                  <img 
                    src={formData.image_url} 
                    alt={formData.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <input
                type="file"
                id="project-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <Button
                type="button"
                onClick={() => document.getElementById('project-image')?.click()}
                variant="outline"
                className="w-full border-portfolio-dark text-portfolio-gray-light"
              >
                {formData.image_url ? 'Change Image' : 'Upload Image'}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                name="github_url"
                value={formData.github_url || ''}
                onChange={handleInputChange}
                className="portfolio-input"
                placeholder="e.g. https://github.com/username/repo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Live URL
              </label>
              <input
                type="url"
                name="live_url"
                value={formData.live_url || ''}
                onChange={handleInputChange}
                className="portfolio-input"
                placeholder="e.g. https://yourproject.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Technologies
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="portfolio-input flex-grow"
                placeholder="e.g. React"
              />
              <Button
                type="button"
                onClick={handleTechAdd}
                variant="outline"
                className="border-portfolio-accent text-portfolio-accent"
              >
                Add
              </Button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-portfolio-darker text-portfolio-gray-light px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleTechRemove(index)}
                    className="text-portfolio-gray hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="portfolio-button">
              {editingProject ? 'Update Project' : 'Add Project'}
            </Button>
            
            {editingProject && (
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
      
      <h2 className="text-xl text-white mb-4">Projects</h2>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <h3 className="text-white font-medium">{project.title}</h3>
              <p className="text-portfolio-gray-light mt-1 mb-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies && project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 bg-portfolio-darker text-portfolio-gray-light rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleEditProject(project)}
                  variant="outline"
                  className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                >
                  Edit
                </Button>
                
                <Button
                  onClick={() => handleDeleteProject(project.id!)}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">No projects added yet.</p>
      )}
    </div>
  );
};

export default ManageProjects;
