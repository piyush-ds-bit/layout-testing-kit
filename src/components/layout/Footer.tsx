import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-portfolio-darker py-8 border-t border-portfolio-dark">
      <div className="portfolio-container">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-portfolio-gray text-sm mx-[160px]">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            
            
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;