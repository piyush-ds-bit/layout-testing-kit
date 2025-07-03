
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import EditProjectModal from '@/components/admin/projects/EditProjectModal';
import { Project } from '@/types/database';

interface ProjectCardProject {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectCardProject;
  onEdit?: (projectData: Partial<Omit<Project, 'id' | 'created_at'>>) => Promise<boolean>;
  onDelete?: () => Promise<boolean>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await onDelete?.();
    }
  };

  // Convert to database format for edit modal
  const projectData: Project = {
    id: project.id.toString(),
    title: project.title,
    description: project.description,
    category: project.category,
    image_url: project.image,
    github_url: project.githubUrl,
    live_url: project.liveUrl,
    technologies: project.technologies,
    created_at: new Date().toISOString()
  };

  return (
    <>
      <div className="group portfolio-card overflow-hidden flex flex-col relative">
        {isAuthorized && isEditMode && onEdit && onDelete && (
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <AdminActionButtons
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        
        <p className="text-portfolio-gray-light mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-portfolio-darker text-portfolio-gray-light rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 mt-auto">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
            >
              GitHub
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
            >
              Live Demo
            </a>
          )}
          
          <Link 
            to={`/projects/${project.id}`}
            className="text-sm text-portfolio-accent hover:text-portfolio-accent-dark transition-colors ml-auto"
          >
            View Details →
          </Link>
        </div>
      </div>

      {isEditModalOpen && onEdit && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={projectData}
          onUpdate={onEdit}
        />
      )}
    </>
  );
};

export default ProjectCard;
