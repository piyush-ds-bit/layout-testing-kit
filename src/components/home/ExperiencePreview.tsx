
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ExperienceCard from '@/components/experience/ExperienceCard';

const experiences = [
  {
    company: "AEIE Department, HIT",
    position: "Academic Project Contributor",
    duration: "Aug 2023 - Present",
    description:
      "Learning and working on interdisciplinary academic projects blending electronics and AI, including sensor-based data acquisition systems and analysis using Python. Applied knowledge from instrumentation to real-world predictive modeling."
  },
  {
    company: "Self-Employed",
    position: "Tuition Teacher (Part-Time)",
    duration: "Feb 2021 - Present",
    description:
      "Provided academic coaching to students from Class 5 to 12. Taught all subjects for Classes 5–8, and Physics, Chemistry, and Mathematics for Classes 9–12. Helped students achieve significant academic improvement, with one scoring 81% (Class 10) and another scoring 75% (Class 12)."
  }
];

const ExperiencePreview: React.FC = () => {
  return (
    <section id="experience" className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Experience</h2>
          <Link 
            to="/experience" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-portfolio-accent/30"></div>
          <div className="space-y-16">
            {experiences.slice(0, 2).map((experience, index) => (
              <div key={index} className="relative">
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

export default ExperiencePreview;
