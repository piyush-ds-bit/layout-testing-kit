
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SkillCategory from '@/components/skills/SkillCategory';

const programming = [
  { name: 'Python', icon: 'python' },
  { name: 'SQL', icon: 'sql' },
  { name: 'HTML/CSS', icon: 'html5' }
];

const librariesFrameworks = [
  { name: 'Pandas', icon: 'pandas' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'TensorFlow', icon: 'tensorflow' }
];

const SkillsPreview: React.FC = () => {
  return (
    <section id="skills" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="portfolio-heading">Skills</h2>
          <Link 
            to="/skills" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SkillCategory title="Programming" icon="💻" skills={programming} />
          <SkillCategory title="Libraries & Frameworks" icon="📚" skills={librariesFrameworks} />
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
