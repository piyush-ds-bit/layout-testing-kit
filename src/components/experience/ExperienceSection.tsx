
import React, { useState } from 'react';
import { useExperienceData } from '@/hooks/useExperienceData';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import ExperienceCard from './ExperienceCard';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminExperienceModal from '@/components/admin/experience/AdminExperienceModal';

const ExperienceSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const { experiences, loading, formatDuration, updateExperience, deleteExperience } = useExperienceData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExperience = () => {
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-white">Loading experiences...</div>;
  }

  return (
    <section className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="portfolio-heading flex-1">Work Experience</h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={handleAddExperience}
              label="Add Experience"
              className="ml-4"
            />
          )}
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-portfolio-accent/30"></div>
          
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#0f1624] border-4 border-portfolio-accent"></div>
                
                <ExperienceCard 
                  id={experience.id!}
                  company={experience.company}
                  position={experience.position}
                  duration={formatDuration(experience.start_date, experience.end_date, experience.current)}
                  description={experience.description}
                  index={index}
                  onEdit={async (experienceData) => await updateExperience(experience.id!, experienceData)}
                  onDelete={async () => await deleteExperience(experience.id!)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AdminExperienceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ExperienceSection;
