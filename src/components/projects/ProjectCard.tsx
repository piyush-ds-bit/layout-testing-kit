
import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
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
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="portfolio-card overflow-hidden flex flex-col">
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
  );
};

export default ProjectCard;
