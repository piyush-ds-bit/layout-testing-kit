import React from 'react';
import ExperienceCard from './ExperienceCard';

const experiences = [
   {
    company: "Self-Initiated",
    position: "Machine Learning & Data Science Developer",
    duration: "2024 - Present",
    description:
      "Building end-to-end data-driven applications like WhatsApp Chat Analyzer, Movie Recommender System, and Insurance Premium Predictor using Python, Streamlit, and various ML libraries. Focused on data preprocessing, model building, deployment, and UI integration."
  },
  {
    company: "AEIE Department, HIT",
    position: "Academic Project Contributor",
    duration: "Aug 2023 - Present",
    description:
      "Learning and working on interdisciplinary academic projects blending electronics and AI, including sensor-based data acquisition systems and analysis using Python. Applied knowledge from instrumentation to real-world predictive modeling."
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
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
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
