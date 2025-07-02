
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminActionButtons from '@/components/admin/AdminActionButtons';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceCardProps {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  index: number;
  onDelete: (id: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  company,
  position,
  duration,
  description,
  index,
  onDelete
}) => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    console.log('Edit experience:', { id, company, position, duration, description });
    // TODO: Implement edit modal
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const toggleExpanded = () => setIsExpanded(prev => !prev);

  // Shorten text for collapsed view
  const maxPreviewLength = 120;
  const isLongText = description.length > maxPreviewLength;
  const previewText = isLongText ? description.slice(0, maxPreviewLength) + '...' : description;

  return (
    <div className={`group relative portfolio-card max-w-md mx-auto transition-all duration-300 ${
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

      <div className="text-portfolio-gray-light leading-relaxed transition-all duration-300 ease-in-out">
        {isExpanded ? description : previewText}
      </div>

      {isLongText && (
        <div className="flex justify-end mt-2">
          <button
            className="p-2 text-portfolio-gray-light hover:text-white transition-colors"
            onClick={toggleExpanded}
            aria-label="Toggle Description"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
