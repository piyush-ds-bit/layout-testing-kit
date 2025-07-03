
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProjectsData } from '@/hooks/useProjectsData';
import ProjectCard from '@/components/projects/ProjectCard';

const ProjectsPreview: React.FC = () => {
  const { projects, loading } = useProjectsData();

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
  }

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
          {projects.slice(0, 3).map(project => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
