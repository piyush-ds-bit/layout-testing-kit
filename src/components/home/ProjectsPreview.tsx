import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useProjectsData } from '@/hooks/useProjectsData';
const ProjectsPreview: React.FC = () => {
  const {
    projects
  } = useProjectsData();

  // Show first 3 projects as featured
  const featuredProjects = projects.slice(0, 3);
  return <section id="projects" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Featured Projects</h2>
          <Link to="/projects" className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        {/* Mobile: Horizontal Carousel */}
        <div className="block md:hidden">
          <Carousel opts={{
          loop: true,
          align: "center",
          skipSnaps: false
        }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredProjects.map(project => <CarouselItem key={project.id} className="pl-4 basis-4/5">
                  <ProjectCard project={project} />
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" />
            <CarouselNext className="right-2 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" />
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map(project => <ProjectCard key={project.id} project={project} className="border-8 border-cyan-900" />)}
        </div>
      </div>
    </section>;
};
export default ProjectsPreview;