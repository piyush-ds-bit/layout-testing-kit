
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useProjectsData } from '@/hooks/useProjectsData';

const ProjectsPreview: React.FC = () => {
  const { projects, loading } = useProjectsData();

  if (loading) {
    return (
      <section id="projects" className="portfolio-section">
        <div className="portfolio-container">
          <div className="flex items-center justify-center">
            <div className="text-white">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show first 3 projects for preview
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Featured Projects</h2>
          <Link 
            to="/projects" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
