
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SkillCategory from '@/components/skills/SkillCategory';

const programming = [
  
  { name: 'Python', icon: 'python' },
  { name: 'HTML/CSS', icon: 'html5' }
];

const librariesFrameworks = [
  { name: 'Pandas', icon: 'pandas' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'TensorFlow', icon: 'tensorflow' }
];

const SkillsPreview: React.FC = () => {
  // Empty handler for preview - admin functionality not available on home page
  const handleAddSkill = () => {
    // No-op for preview
  };

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
          <SkillCategory 
            title="Programming" 
            icon="💻" 
            skills={programming} 
            categoryKey="programming"
            onAddSkill={handleAddSkill}
          />
          <SkillCategory 
            title="Libraries & Frameworks" 
            icon="📚" 
            skills={librariesFrameworks} 
            categoryKey="libraries"
            onAddSkill={handleAddSkill}
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
