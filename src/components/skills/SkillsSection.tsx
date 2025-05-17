
import React from 'react';
import SkillCategory from './SkillCategory';

const languages = [
  { name: 'C++', icon: '/icons/cpp.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Java', icon: '/icons/java.svg' }
];

const frameworks = [
  { name: 'Flutter', icon: '/icons/flutter.svg' },
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Spring Boot', icon: '/icons/spring.svg' }
];

const databases = [
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'Supabase', icon: '/icons/supabase.svg' }
];

const tools = [
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'Docker', icon: '/icons/docker.svg' },
  { name: 'VS Code', icon: '/icons/vscode.svg' }
];

const SkillsSection: React.FC = () => {
  return (
    <section className="portfolio-section" id="skills">
      <div className="portfolio-container">
        <h2 className="portfolio-heading">Skills</h2>
        
        <div className="space-y-12">
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
