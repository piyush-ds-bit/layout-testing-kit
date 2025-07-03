
import React, { useState } from 'react';
import { useProjectsData } from '@/hooks/useProjectsData';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import ProjectCard from './ProjectCard';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminProjectModal from '@/components/admin/projects/AdminProjectModal';

const ProjectsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const { projects, loading, updateProject, deleteProject } = useProjectsData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
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
                id: parseInt(project.id!),
                title: project.title,
                description: project.description,
                image: project.image_url || '/placeholder.svg',
                category: project.category,
                technologies: Array.isArray(project.technologies) ? project.technologies : [],
                githubUrl: project.github_url,
                liveUrl: project.live_url
              }}
              onEdit={async (projectData) => await updateProject(project.id!, projectData)}
              onDelete={async () => await deleteProject(project.id!)}
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
        />
      )}
    </section>
  );
};

export default ProjectsSection;
