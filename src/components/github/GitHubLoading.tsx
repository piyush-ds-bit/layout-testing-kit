
import React from 'react';

const GitHubLoading: React.FC = () => {
  return (
    <section className="portfolio-section bg-portfolio-dark">
      <div className="portfolio-container">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-accent"></div>
        </div>
      </div>
    </section>
  );
};

export default GitHubLoading;
