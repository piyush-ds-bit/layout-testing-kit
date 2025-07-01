
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import SocialLinks from './SocialLinks';
import ContactForm from './ContactForm';
import { Mail, MessageSquare } from 'lucide-react';

const ConnectSection: React.FC = () => {
  const { user, isAuthorized } = useAuth();

  return (
    <section className="portfolio-section">
      <div
        className="portfolio-card-hover max-w-4xl mx-auto relative border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Let's Connect</h2>
          {isAuthorized && (
            <Link to="/contact-messages">
              <Button className="bg-portfolio-accent hover:bg-portfolio-accent-dark">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Messages
              </Button>
            </Link>
          )}
        </div>
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Find me on social media or send a direct message to get in touch
        </p>
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white text-center mb-8">Connect With Me</h3>
          <SocialLinks />
        </div>
        <div className="border-t border-[#2d3748] my-12 max-w-2xl mx-auto"></div>
        <div className="max-w-2xl mx-auto">
          {/* Hide the contact form for admins */}
          {isAuthorized ? (
            <div className="text-center text-gray-400 py-12">
              <p>Contact form is hidden for admins.<br />Admins don't need to contact themselves.</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#263040] flex items-center justify-center mb-4">
                  <Mail className="text-portfolio-accent w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>
              </div>
              <div className="bg-[#1e293b] border border-[#2d3748] rounded-xl p-8">
                {user ? (
                  <ContactForm />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-6">Please sign in to send a message</p>
                    <Link to="/login">
                      <Button className="bg-[#4fd1c5] hover:bg-[#38b2ac] text-white font-medium rounded-lg px-8 py-3">
                        Sign In / Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
