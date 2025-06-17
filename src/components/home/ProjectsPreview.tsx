
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';

const featuredProjects = [
  {
    id: 1,
    title: 'WhatsApp Buddy',
    description: 'Developed a Streamlit-based WhatsApp chat analyzer with sentiment analysis, word clouds, user stats, and emoji insights using Pandas and Matplotlib/Seaborn.',
    image: '/whatsapp.jpg',
    category: 'Deployed',
    technologies: ['Python', 'Streamlit', 'Pandas&Seaborn'],
    githubUrl: 'https://github.com/piyush-ds-bit/whatsapp_chat_analyzer',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Piyush Portfolio',
    description: 'Developed a personal portfolio website using lovable.ai and Firebase with an admin panel for real-time content updates, showcasing projects, skills, and contact information.',
    image: '/portfolio.jpg',
    category: 'Deployed',
    technologies: ['lovable.ai', 'Supabase', 'SQLite'],
    githubUrl: 'https://github.com/piyush-ds-bit/Portfolio-website',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'MovieMate',
    description: 'Built a content-based movie recommender using Bag-of-Words with a dataset of 5000+ movies.',
    image: '/moviemate.jpg',
    category: 'In Development',
    technologies: ['Python', 'ScikitLearn', 'Streamlit'],
    githubUrl: 'https://github.com/piyush-ds-bit/Movie-Recommender-System',
  }
];

const ProjectsPreview: React.FC = () => {
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
