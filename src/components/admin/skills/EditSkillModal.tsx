import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SkillWithCategory } from '@/hooks/useSkillsData';

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillWithCategory;
  onUpdate: (id: string, updates: { name: string; icon?: string }) => Promise<void>;
}

const EditSkillModal: React.FC<EditSkillModalProps> = ({
  isOpen,
  onClose,
  skill,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    name: skill.name,
    icon: skill.icon || ''
  });

  useEffect(() => {
    setFormData({
      name: skill.name,
      icon: skill.icon || ''
    });
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(skill.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-portfolio-card-bg border border-portfolio-dark rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Edit Skill</h3>
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
              Skill Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="e.g. React"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Icon
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="e.g. react or ⚛️"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
            >
              Update Skill
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

export default EditSkillModal;