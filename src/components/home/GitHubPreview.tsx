
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GitHubSection from '@/components/github/GitHub Section';

const GitHubPreview: React.FC = () => {
  return (
    <section id="github" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">GitHub Activity</h2>
          <Link 
            to="/github" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-all duration-300 hover:transform hover:translate-x-1"
          >
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="animate-fade-in">
          <GitHubSection />
        </div>
      </div>
    </section>
  );
};

export default GitHubPreview;
