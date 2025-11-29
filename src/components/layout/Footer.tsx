
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolio-light-darker dark:bg-portfolio-darker py-8 border-t border-portfolio-light-border dark:border-portfolio-dark">
      <div className="portfolio-container">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-portfolio-light-text-muted dark:text-portfolio-gray text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-portfolio-light-text-muted dark:text-portfolio-gray-light hover:text-portfolio-accent transition-colors text-sm">
              Home
            </Link>
            <Link to="/projects" className="text-portfolio-light-text-muted dark:text-portfolio-gray-light hover:text-portfolio-accent transition-colors text-sm">
              Projects
            </Link>
            <Link to="/connect" className="text-portfolio-light-text-muted dark:text-portfolio-gray-light hover:text-portfolio-accent transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
