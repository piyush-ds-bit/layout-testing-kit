
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import SocialLinks from './SocialLinks';
import ContactForm from './ContactForm';

const ConnectSection: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">Let's Connect</h2>
        
        <p className="text-center text-portfolio-gray-light mb-12 max-w-2xl mx-auto">
          Find me on social media or send a direct message to get in touch
        </p>
        
        <SocialLinks />
        
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="portfolio-card">
            <div className="flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-portfolio-accent">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <h3 className="text-xl font-semibold text-white ml-2">Get In Touch</h3>
            </div>
            
            {user ? (
              <ContactForm />
            ) : (
              <div className="text-center py-8">
                <p className="text-portfolio-gray-light mb-6">Please sign in to send a message</p>
                
                <Link to="/login">
                  <Button className="portfolio-button">
                    Sign In / Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
