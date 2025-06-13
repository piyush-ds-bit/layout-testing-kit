
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GitHubSection from '@/components/github/GitHubSection';

const GitHubPreview: React.FC = () => {
  return (
    <section id="github" className="portfolio-section bg-portfolio-dark">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">GitHub Activity</h2>
          <Link 
            to="/github" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <GitHubSection />
      </div>
    </section>
  );
};

export default GitHubPreview;
