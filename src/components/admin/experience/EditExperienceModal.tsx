import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Experience } from '@/hooks/useExperienceData';

interface EditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience;
  onUpdate: (id: string, updates: Partial<Experience>) => Promise<void>;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({
  isOpen,
  onClose,
  experience,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    company: experience.company,
    position: experience.position,
    start_date: experience.start_date,
    end_date: experience.end_date || '',
    current: experience.current,
    description: experience.description
  });

  useEffect(() => {
    setFormData({
      company: experience.company,
      position: experience.position,
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      current: experience.current,
      description: experience.description
    });
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates = {
      ...formData,
      end_date: formData.current ? null : formData.end_date || null
    };
    
    await onUpdate(experience.id, updates);
    onClose();
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-portfolio-card-bg border border-portfolio-dark rounded-lg p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Edit Experience</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-portfolio-gray-light hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Position
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
                disabled={formData.current}
                className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-portfolio-accent disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => handleChange('current', e.target.checked)}
              className="w-4 h-4 text-portfolio-accent bg-portfolio-darker border-portfolio-dark rounded focus:ring-portfolio-accent"
            />
            <label htmlFor="current" className="text-sm text-portfolio-gray-light">
              Currently working here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent resize-none"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
            >
              Update Experience
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-portfolio-dark text-portfolio-gray-light hover:bg-portfolio-darker"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExperienceModal;