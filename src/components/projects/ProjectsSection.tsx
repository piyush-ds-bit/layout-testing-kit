
import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminProjectModal from '@/components/admin/projects/AdminProjectModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
}

const ProjectsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const categories = [
    { id: 'all', label: 'Overview' },
    { id: 'Deployed', label: 'Deployed' },
    { id: 'In Development', label: 'In Development' }
  ];

  const handleAddProject = () => {
    setIsModalOpen(true);
  };

  const handleProjectAdded = () => {
    fetchProjects();
    setIsModalOpen(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="text-center text-white">Loading projects...</div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="portfolio-heading flex-1">All Projects (App, Web & Python)</h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={handleAddProject}
              label="Add Project"
              className="ml-4"
            />
          )}
        </div>
        
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.id 
                  ? 'bg-portfolio-accent text-white' 
                  : 'bg-portfolio-card-bg text-portfolio-gray-light hover:bg-portfolio-accent/20'
              } transition-colors`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={{
                id: parseInt(project.id),
                title: project.title,
                description: project.description,
                image: project.image_url || '',
                category: project.category,
                technologies: project.technologies || [],
                githubUrl: project.github_url || undefined,
                liveUrl: project.live_url || undefined,
              }}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
        
        {activeCategory !== 'all' && (
          <div className="text-center mt-8">
            <button 
              className="inline-flex items-center portfolio-button-outline"
              onClick={() => setActiveCategory('all')}
            >
              Show More Projects
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AdminProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProjectAdded={handleProjectAdded}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
