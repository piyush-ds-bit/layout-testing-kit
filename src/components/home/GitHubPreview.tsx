import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GitHubSection from '@/components/github/GitHubSection';
const GitHubPreview: React.FC = () => {
  return <section id="github" className="portfolio-section bg-portfolio-dark">
      <div style={{
      boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
    }} className="max-w-4xl mx-auto relative bg-[#182437]/70 border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8 transition-all duration-300 border-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">GitHub Activity</h2>
          <Link to="/github" className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <GitHubSection />
      </div>
    </section>;
};
export default GitHubPreview;