
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSkillsData } from '@/hooks/useSkillsData';
import SkillCategory from '@/components/skills/SkillCategory';

const SkillsPreview: React.FC = () => {
  const { skillCategories, skillsByCategory, loading } = useSkillsData();

  // Empty handler for preview - admin functionality not available on home page
  const handleAddSkill = () => {
    // No-op for preview
  };

  if (loading) {
    return <div className="text-white">Loading skills...</div>;
  }

  return (
    <section id="skills" className="portfolio-section">
      <div 
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8 mb-8 
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Skills</h2>
          <Link 
            to="/skills" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {skillCategories.slice(0, 2).map(category => (
            <SkillCategory 
              key={category.id}
              title={category.name} 
              icon="💻" 
              skills={skillsByCategory[category.id!] || []} 
              categoryKey={category.id!}
              onAddSkill={handleAddSkill}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
