
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminProjectModal from '@/components/admin/projects/AdminProjectModal';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'WhatsApp Buddy',
    description: 'Developed a Streamlit-based WhatsApp chat analyzer with sentiment analysis, word clouds,user stats, and emoji insights using Pandas and Matplotlib/Seaborn.',
    image: '/lovable-uploads/Whatsapp_3.png',
    category: 'Deployed',
    technologies: ['Python', 'Streamlit', 'Pandas&Seaborn'],
    githubUrl: 'https://github.com/piyush-ds-bit/whatsapp_chat_analyzer',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Piyush Portfolio',
    description: 'Developed a personal portfolio website using lovable.ai and Firebase with an admin panel forreal-time content updates, showcasing projects, skills, and contact information.',
    image: '/lovable-uploads/portfolio_1.png',
    category: 'Deployed',
    technologies: ['lovable.ai', 'Supabase', 'SQLite'],
    githubUrl: 'https://github.com/piyush-ds-bit/Portfolio-website',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'MovieMate',
    description: 'Built a content-based movie recommender using Bag-of-Words with a dataset of 5000+ movies.',
    image: '/lovable-uploads/Moviemate_3.png',
    category: 'Deployed',
    technologies: ['Python', 'ScikitLearn', 'Streamlit'],
    githubUrl: 'https://github.com/piyush-ds-bit/Movie-Recommender-System',
    liveUrl: '#',
  },
  {
    id: 4,
    title: 'Patient Partner',
    description: 'Developed an insurance premium prediction app using Streamlit frontend and FastAPI backend. It takes user inputs like age, gender, BMI, and smoking habits to predict premium cost.',
    image: '/lovable-uploads/insurance_1.png',
    category: 'In Development',
    technologies: ['Python', 'FastAPI','Streamlit'],
    githubUrl: '#',
  }
];

const ProjectsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
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
            <ProjectCard key={project.id} project={project} />
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
