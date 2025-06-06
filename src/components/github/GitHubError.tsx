
import React from 'react';

interface GitHubErrorProps {
  error: string;
}

const GitHubError: React.FC<GitHubErrorProps> = ({ error }) => {
  return (
    <section className="portfolio-section bg-portfolio-dark">
      <div className="portfolio-container">
        <div className="text-center py-12 text-red-400">
          <p>{error}</p>
        </div>
      </div>
    </section>
  );
};

export default GitHubError;
