
import React from 'react';
import ExperienceCard from './ExperienceCard';

const experiences = [
   {
    company: "Company C",
    position: "Intern",
    duration: "Jan 2025 - Present",
    description: "Eager to elaborate...."
  },
  {
    company: "Company B",
    position: "Intern",
    duration: "Jan 2025 - Present",
    description: "Eager to elaborate...."
  },
  {
    company: "Self Employed",
    position: "Tuition Teacher(Part-time)",
    duration: "Feb 2021 - Present",
    description: "Provided academic coaching to students from Class 5 to 12. Taught all subjects for Classes 5–8, and Physics, Chemistry, and Mathematics for Classes 9–12.Helped students achieve significant academic improvement, with one scoring 81% (Class 10) and another scoring 75% (Class 12)."
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
