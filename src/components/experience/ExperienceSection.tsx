
import React from 'react';
import ExperienceCard from './ExperienceCard';

const experiences = [
  {
    company: "Taar",
    position: "Intern",
    duration: "Jan 2025 - Present",
    description: "Working on mobile application development using Flutter and Dart."
  },
  {
    company: "NutriScan App",
    position: "Intern",
    duration: "Jul 2024 - Jan 2025",
    description: "Developed a nutrition tracking application that uses computer vision to identify food items."
  }
];

const ExperienceSection: React.FC = () => {
  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">Work Experience</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-portfolio-accent/30"></div>
          
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#0f1624] border-4 border-portfolio-accent"></div>
                
                <ExperienceCard 
                  company={experience.company}
                  position={experience.position}
                  duration={experience.duration}
                  description={experience.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
