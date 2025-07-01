
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  company, 
  position, 
  duration, 
  description, 
  index 
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  const handleEdit = () => {
    console.log('Edit experience:', { company, position, duration, description });
    // TODO: Open edit modal
  };

  const handleDelete = () => {
    console.log('Delete experience:', { company, position });
    // TODO: Implement delete with confirmation
  };

  return (
    <div className={`group relative portfolio-card max-w-md mx-auto ${
      index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
    }`}>
      {isAuthorized && isEditMode && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <AdminActionButtons
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-1">{position}</h3>
        <h4 className="text-portfolio-accent font-medium mb-1">{company}</h4>
        <p className="text-portfolio-gray-light text-sm">{duration}</p>
      </div>
      
      {isExpanded && (
        <div className="text-portfolio-gray-light leading-relaxed my-4">
          {description}
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="p-2 text-portfolio-gray-light hover:text-white transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Description"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
