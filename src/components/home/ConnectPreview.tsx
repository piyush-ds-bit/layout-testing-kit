
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SocialLinks from '@/components/connect/SocialLinks';

const ConnectPreview: React.FC = () => {
  return (
    <section id="connect" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Let's Connect</h2>
          <Link 
            to="/connect" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Find me on social media or send a direct message to get in touch
          </p>
          
          <SocialLinks />
          
          <div className="mt-8">
            <Link 
              to="/connect"
              className="inline-block bg-portfolio-accent hover:bg-portfolio-accent-dark text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Send Message
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectPreview;
