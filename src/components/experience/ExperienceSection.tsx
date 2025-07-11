
import React, { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminExperienceModal from '@/components/admin/experience/AdminExperienceModal';
import EditExperienceModal from '@/components/admin/experience/EditExperienceModal';
import { useExperienceData, Experience } from '@/hooks/useExperienceData';

const ExperienceSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  
  const {
    experiences,
    loading,
    formatDuration,
    addExperience,
    updateExperience,
    deleteExperience
  } = useExperienceData();

  const handleAddExperience = () => {
    setIsModalOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
  };

  const handleDeleteExperience = async (experience: Experience) => {
    if (confirm(`Are you sure you want to delete the experience at ${experience.company}?`)) {
      await deleteExperience(experience.id);
    }
  };

  const handleUpdateExperience = async (id: string, updates: Partial<Experience>) => {
    await updateExperience(id, updates);
    setEditingExperience(null);
  };

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center text-white">
          Loading experiences...
        </div>
      </section>
    );
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
                  experience={experience}
                  duration={formatDuration(experience.start_date, experience.end_date, experience.current)}
                  index={index}
                  onEdit={handleEditExperience}
                  onDelete={handleDeleteExperience}
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
          onAddExperience={addExperience}
        />
      )}
      
      {editingExperience && (
        <EditExperienceModal
          isOpen={!!editingExperience}
          onClose={() => setEditingExperience(null)}
          experience={editingExperience}
          onUpdate={handleUpdateExperience}
        />
      )}
    </section>
  );
};

export default ExperienceSection;
