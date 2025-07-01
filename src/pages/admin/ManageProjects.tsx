
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/database';

// Simple modal component for details editing/preview
const DetailsModal: React.FC<{
  open: boolean,
  onClose: () => void,
  onSave: (details: string[] | string) => void,
  details: string[] | string,
}> = ({ open, onClose, onSave, details }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (Array.isArray(details)) setValue(details.join('\n\n'));
    else setValue(details || '');
  }, [details, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-portfolio-dark p-6 rounded-lg max-w-lg w-full relative shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>
        <textarea
          className="portfolio-input min-h-[10rem] mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter project details. Separate sections with a blank line."
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border-portfolio-gray text-portfolio-gray-light"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="portfolio-button"
            type="button"
            onClick={() => {
              // Save as array of sections, split by double line breaks
              const sections = value.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
              onSave(sections.length > 1 ? sections : value.trim());
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [detailsModalProject, setDetailsModalProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    category: 'Deployed',
    image_url: '',
    github_url: '',
    live_url: '',
    technologies: [],
    details: [],
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
      category: 'Deployed',
      image_url: '',
      github_url: '',
      live_url: '',
      technologies: [],
      details: [],
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
      details: project.details || [],
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

  // --- Details modal logic ---
  const handleOpenDetailsModal = (project: Project) => setDetailsModalProject(project);

  const handleSaveDetails = async (details: string[] | string) => {
    if (!detailsModalProject) return;
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ details })
        .eq('id', detailsModalProject.id)
        .select();
      if (error) throw error;
      setProjects(projects.map(p =>
        p.id === detailsModalProject.id ? { ...p, details } : p
      ));
      toast({
        title: "Success",
        description: "Project details updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project details.",
        variant: "destructive",
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
              <option value="Deployed">Deployed</option>
              <option value="In Development">In Development</option>
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

          {/* Project details editable field */}
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Project Details (optional)
            </label>
            <textarea
              name="details"
              value={
                Array.isArray(formData.details)
                  ? (formData.details as string[]).join('\n\n')
                  : (formData.details as string) || ''
              }
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean) })
              }
              className="portfolio-input min-h-[6rem]"
              placeholder="Sections separated by blank lines. Use for detailed breakdown, features, etc."
            />
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
            <div key={project.id} className="portfolio-card flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 text-xs rounded 
                  ${project.category === 'Deployed' ? 'bg-green-700 text-white' : 'bg-yellow-700 text-white'} capitalize`
                }>
                  {project.category}
                </span>
              </div>
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
              <div className="flex gap-2 mt-auto">
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
                <Button
                  onClick={() => handleOpenDetailsModal(project)}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                  type="button"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">No projects added yet.</p>
      )}

      <DetailsModal
        open={!!detailsModalProject}
        onClose={() => setDetailsModalProject(null)}
        onSave={handleSaveDetails}
        details={detailsModalProject?.details || ''}
      />
    </div>
  );
};

export default ManageProjects;
