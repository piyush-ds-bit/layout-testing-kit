
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddSkillFormProps {
  handleAddSkill: (e: React.FormEvent) => void;
  newSkill: { name: string; icon: string };
  setNewSkill: React.Dispatch<React.SetStateAction<{ name: string; icon: string }>>;
}

const AddSkillForm: React.FC<AddSkillFormProps> = ({ handleAddSkill, newSkill, setNewSkill }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl text-white mb-4">Add New Skill</h2>
      
      <form onSubmit={handleAddSkill} className="portfolio-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="portfolio-input"
              placeholder="e.g. React"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
              Icon (emoji or text)
            </label>
            <input
              type="text"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              className="portfolio-input"
              placeholder="e.g. ⚛️"
              maxLength={2}
            />
          </div>
        </div>
        
        <Button type="submit" className="portfolio-button">
          <Plus className="w-4 h-4 mr-1" />
          Add Skill
        </Button>
      </form>
    </div>
  );
};

export default AddSkillForm;
