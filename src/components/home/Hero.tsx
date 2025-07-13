
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Code, Briefcase, Github, MessageSquare, PenTool } from 'lucide-react';
import AnimatedGreeting from './AnimatedGreeting';
import BlogCTA from '@/components/blog/BlogCTA';

const Hero: React.FC = () => {
  const navigationCards = [
    { to: "/skills", label: "Skills", icon: Code, description: "Technical expertise" },
    { to: "/experience", label: "Experience", icon: Briefcase, description: "Professional journey" },
    { to: "/github", label: "GitHub", icon: Github, description: "Open source contributions" },
    { to: "/projects", label: "Projects", icon: Code, description: "Portfolio showcase" },
    { to: "/connect", label: "Connect", icon: MessageSquare, description: "Get in touch" }
  ];

  return (
    <section id="hero" className="portfolio-section pt-20 md:pt-24">
      <div className="portfolio-container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
            <AnimatedGreeting />, I'm <span className="text-portfolio-accent">Piyush Kr. Singh</span>
          </h1>
          
          {/* Fallback for JavaScript disabled */}
          <noscript>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4">
              Hello, I'm <span className="text-portfolio-accent">Piyush Kr. Singh</span>
            </h1>
          </noscript>
          
          <h2 className="mt-4 text-lg md:text-2xl text-portfolio-gray-light max-w-2xl mx-auto px-4">
            Data Scientist · AI & ML Enthusiast · Python & Streamlit Developer
          </h2>
          
          <div className="mt-8 md:mt-10">
            <Link to="/resume">
              <Button size="lg" className="bg-portfolio-card-bg-alt hover:bg-portfolio-card-bg text-white border border-portfolio-border rounded-full px-6 py-4 md:px-8 md:py-6 flex items-center gap-2 transition-colors duration-300">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-base md:text-lg">View Resume</span>
              </Button>
            </Link>
          </div>
          
          {/* Modern Mobile Navigation Cards */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 w-full max-w-2xl">
            {navigationCards.map((card, index) => (
              <Link 
                key={card.to} 
                to={card.to} 
                className="group relative overflow-hidden bg-portfolio-card-bg/70 hover:bg-portfolio-card-bg border border-portfolio-border hover:border-portfolio-accent/50 rounded-2xl p-3 md:p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center group-hover:bg-portfolio-accent/20 transition-colors duration-300">
                    <card.icon className="w-5 h-5 md:w-6 md:h-6 text-portfolio-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg font-medium text-white">{card.label}</h3>
                    <p className="text-xs md:text-sm text-portfolio-gray-light mt-1 hidden md:block">{card.description}</p>
                  </div>
                </div>
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </Link>
            ))}
            
            {/* Special Blog Card */}
            <div className="relative">
              <BlogCTA variant="hero" className="w-full h-full group relative overflow-hidden bg-portfolio-card-bg/70 hover:bg-portfolio-card-bg border border-portfolio-border hover:border-portfolio-accent/50 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
