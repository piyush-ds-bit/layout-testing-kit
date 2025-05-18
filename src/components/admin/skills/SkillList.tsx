
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Skill } from '@/types/database';

interface SkillListProps {
  skills: Skill[];
  handleDeleteSkill: (id: string) => void;
}

const SkillList: React.FC<SkillListProps> = ({ skills, handleDeleteSkill }) => {
  return (
    <div>
      <h2 className="text-xl text-white mb-4">Current Skills</h2>
      
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="portfolio-card flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{skill.icon}</span>
                <span className="text-portfolio-gray-light">{skill.name}</span>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => handleDeleteSkill(skill.id!)}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-portfolio-gray-light">No skills added for this category yet.</p>
      )}
    </div>
  );
};

export default SkillList;
