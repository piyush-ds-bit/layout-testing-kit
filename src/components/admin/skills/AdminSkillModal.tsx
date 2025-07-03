
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AdminSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const AdminSkillModal: React.FC<AdminSkillModalProps> = ({ 
  isOpen, 
  onClose, 
  category 
}) => {
  const [skillName, setSkillName] = useState('');
  const [skillIcon, setSkillIcon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill name",
        variant: "destructive",
      });
      return;
    }

    console.log('Add skill:', { name: skillName, icon: skillIcon, category });
    
    // TODO: Implement skill addition to database
    toast({
      title: "Skill added successfully!",
      description: `${skillName} has been added to ${category}`,
    });
    
    // Reset form
    setSkillName('');
    setSkillIcon('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-portfolio-card-bg border border-portfolio-dark rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Add New Skill</h3>
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
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
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
              value={skillIcon}
              onChange={(e) => setSkillIcon(e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-white placeholder-portfolio-gray-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="e.g. ⚛️ or 'react'"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
            >
              Add Skill
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

export default AdminSkillModal;
