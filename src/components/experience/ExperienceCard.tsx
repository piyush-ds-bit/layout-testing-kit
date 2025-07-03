
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import EditExperienceModal from '@/components/admin/experience/EditExperienceModal';

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current?: boolean;
  description: string;
}

interface ExperienceCardProps {
  experience: Experience;
  onEdit?: (id: string, experienceData: Partial<Experience>) => Promise<boolean>;
  onDelete?: () => Promise<boolean>;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onEdit, onDelete }) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const handleEdit = () => {
    console.log('Edit experience:', experience);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (experienceData: Partial<Experience>) => {
    if (onEdit) {
      return await onEdit(experience.id, experienceData);
    }
    return false;
  };

  const handleDelete = async () => {
    if (onDelete && window.confirm(`Are you sure you want to delete this experience at "${experience.company}"?`)) {
      await onDelete();
    }
  };

  return (
    <>
      <div className="group portfolio-card relative">
        {isAuthorized && isEditMode && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <AdminActionButtons
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1">{experience.position}</h3>
            <p className="text-portfolio-accent font-medium mb-2">{experience.company}</p>
          </div>
          <div className="text-sm text-portfolio-gray-light">
            {formatDate(experience.start_date)} - {
              experience.current ? 'Present' : 
              experience.end_date ? formatDate(experience.end_date) : 'Present'
            }
          </div>
        </div>
        
        <p className="text-portfolio-gray-light leading-relaxed">{experience.description}</p>
      </div>

      {isEditModalOpen && (
        <EditExperienceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          experience={experience}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default ExperienceCard;
