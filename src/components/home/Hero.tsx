
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="portfolio-section pt-16 md:pt-24">
      <div className="portfolio-container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-fade-in">
            Hello, I'm <span className="text-portfolio-accent">Your Name</span>
          </h1>
          
          <h2 className="mt-6 text-xl md:text-2xl text-portfolio-gray-light max-w-2xl mx-auto animate-slide-in">
            Data Scientist · Machine Learning Enthusiast · Python & Streamlit Developer
          </h2>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/connect">
              <Button size="lg" className="portfolio-button">
                Get In Touch
              </Button>
            </Link>
            
            <Link to="/projects">
              <Button size="lg" className="portfolio-button-outline">
                View Projects
              </Button>
            </Link>
          </div>
          
          <Button asChild className="mt-16 animate-bounce bg-transparent hover:bg-transparent text-portfolio-gray-light hover:text-portfolio-accent" size="icon">
            <a href="#skills">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
