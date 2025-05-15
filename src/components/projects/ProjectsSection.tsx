
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Bingo Dashboard',
    description: 'A mobile app for playing bingo with friends, featuring leaderboards and multiplayer.',
    image: '/placeholder.svg',
    category: 'app',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Get It Done',
    description: 'A task management app with time tracking features.',
    image: '/placeholder.svg',
    category: 'app',
    technologies: ['Flutter', 'Dart', 'SQLite'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Grocery Categories',
    description: 'An app to organize grocery shopping by categories.',
    image: '/placeholder.svg',
    category: 'app',
    technologies: ['Flutter', 'Dart'],
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Monster Catch',
    description: 'A Python game where you catch monsters.',
    image: '/placeholder.svg',
    category: 'python',
    technologies: ['Python', 'Pygame'],
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Stone Paper Scissors',
    description: 'A web implementation of the classic game with computer vision.',
    image: '/placeholder.svg',
    category: 'web',
    technologies: ['JavaScript', 'TensorFlow.js'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 6,
    title: 'Moon Mission Simulator',
    description: 'A 3D simulation of a moon landing mission.',
    image: '/placeholder.svg',
    category: 'python',
    technologies: ['Python', 'Pygame'],
    githubUrl: '#',
  },
];

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'app', label: 'App Development' },
    { id: 'web', label: 'Web & Python' }
  ];
  
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">All Projects (App, Web & Python)</h2>
        
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
    </section>
  );
};

export default ProjectsSection;
