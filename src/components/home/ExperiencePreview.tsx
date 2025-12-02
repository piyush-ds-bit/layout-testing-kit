import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useExperienceData } from '@/hooks/useExperienceData';
const ExperiencePreview: React.FC = () => {
  const {
    experiences,
    loading,
    formatDuration
  } = useExperienceData();
  if (loading) {
    return <section id="experience" className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center text-white">
          Loading experiences...
        </div>
      </section>;
  }
  const previewExperiences = experiences.slice(0, 2);
  return <section id="experience" className="portfolio-section">
      <div style={{
      boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
    }} className="max-w-4xl mx-auto relative bg-[#182437]/70 border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8 transition-all duration-300 border-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Experience</h2>
          <Link to="/experience" className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-portfolio-accent/30"></div>
          <div className="space-y-16">
            {previewExperiences.map((experience, index) => <div key={experience.id} className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#0f1624] border-4 border-portfolio-accent"></div>
                <div className={`group relative portfolio-card max-w-md mx-auto transition-all duration-300 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{experience.position}</h3>
                    <h4 className="text-portfolio-accent font-medium mb-1">{experience.company}</h4>
                    <p className="text-portfolio-gray-light text-sm">{formatDuration(experience.start_date, experience.end_date, experience.current)}</p>
                  </div>
                  <div className="text-portfolio-gray-light leading-relaxed">
                    {experience.description.length > 120 ? experience.description.slice(0, 120) + '...' : experience.description}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ExperiencePreview;