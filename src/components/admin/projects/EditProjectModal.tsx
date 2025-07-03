
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
  details?: string[] | string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (projectData: Partial<Omit<Project, 'id' | 'created_at'>>) => Promise<boolean>;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  project,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'In Development',
    technologies: '',
    github_url: '',
    live_url: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project && isOpen) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image_url: project.image_url || '',
        category: project.category || 'In Development',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        details: Array.isArray(project.details) ? project.details.join('\n') : (project.details || '')
      });
    }
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitting(true);

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image_url: formData.image_url.trim() || undefined,
      category: formData.category,
      technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean) : [],
      github_url: formData.github_url.trim() || undefined,
      live_url: formData.live_url.trim() || undefined,
      details: formData.details ? formData.details.split('\n').map(detail => detail.trim()).filter(Boolean) : undefined
    };
    
    try {
      const success = await onSubmit(projectData);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-portfolio-card-bg border border-portfolio-dark rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Edit Project</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-portfolio-gray-light hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="Project title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent resize-none"
              placeholder="Project description"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => handleChange('image_url', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              required
              disabled={isSubmitting}
            >
              <option value="Deployed">Deployed</option>
              <option value="In Development">In Development</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Technologies
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="React, TypeScript, Node.js (comma separated)"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => handleChange('github_url', e.target.value)}
                className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                placeholder="https://github.com/username/repo"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Live URL
              </label>
              <input
                type="url"
                value={formData.live_url}
                onChange={(e) => handleChange('live_url', e.target.value)}
                className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                placeholder="https://example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Details
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => handleChange('details', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent resize-none"
              placeholder="Additional details (one per line)"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Project'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-portfolio-dark text-portfolio-gray-light hover:bg-portfolio-darker"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
