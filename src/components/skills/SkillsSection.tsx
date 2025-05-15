
import React from 'react';
import SkillCategory from './SkillCategory';

const languages = [
  { name: 'Python', icon: '🐍' },
  { name: 'Dart', icon: '🎯' },
  { name: 'Java', icon: '☕' },
  { name: 'C++', icon: '🧮' },
];

const frameworks = [
  { name: 'Flutter', icon: '🦋' },
  { name: 'React', icon: '⚛️' },
  { name: 'Pygame', icon: '🎮' },
];

const databases = [
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Supabase', icon: '⚡' },
];

const tools = [
  { name: 'VS Code', icon: '🔷' },
  { name: 'Docker', icon: '🐳' },
  { name: 'IntelliJ IDEA', icon: '🧠' },
  { name: 'PyCharm', icon: '🐍' },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="portfolio-section" id="skills">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCategory title="Languages" icon="</ >" skills={languages} />
          <SkillCategory title="Framework" icon="🧩" skills={frameworks} />
          <SkillCategory title="Databases" icon="💾" skills={databases} />
          <SkillCategory title="Tools" icon="🔧" skills={tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
