
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="portfolio-section pt-16 md:pt-24">
      <div className="portfolio-container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Hello, I'm <span className="text-portfolio-accent">Piyush Kr. Singh</span>
          </h1>
          
          <h2 className="mt-4 text-xl md:text-2xl text-portfolio-gray-light max-w-2xl mx-auto">
            Data Scientist · AI & ML Enthusiast · Python & Streamlit Developer
          </h2>
          
          <div className="mt-10">
            <Link to="/resume">
              <Button size="lg" className="bg-[#263040] hover:bg-[#1e293b] text-white border border-gray-700 rounded-full px-8 py-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-lg">View Resume</span>
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/skills" className="portfolio-nav-button">
              Skills
            </Link>
            <Link to="/experience" className="portfolio-nav-button">
              Experience
            </Link>
            <Link to="/blog" className="portfolio-nav-button">
              Blog
            </Link>
            <Link to="/github" className="portfolio-nav-button">
              GitHub
            </Link>
            <Link to="/projects" className="portfolio-nav-button">
              Projects
            </Link>
            <Link to="/connect" className="portfolio-nav-button">
              Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
