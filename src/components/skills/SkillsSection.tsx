
import React from 'react';
import SkillCategory from './SkillCategory';
import { 
  Dart, 
  Python, 
  CPlus as CPlusPlus,
  Flutter,
  Pygame,
  React as ReactIcon, 
  Supabase,
  VisualStudioCode,
  Docker,
  IntellijIdea,
  Pycharm
} from 'lucide-react';

const languages = [
  { name: 'Dart', icon: 'dart' },
  { name: 'Python', icon: 'python' },
  { name: 'Java', icon: 'java' },
  { name: 'C++', icon: 'c-plus-plus' }
];

const frameworks = [
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Pygame', icon: 'pygame' },
  { name: 'React', icon: 'react' }
];

const databases = [
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Supabase', icon: 'supabase' }
];

const tools = [
  { name: 'Visual Studio Code', icon: 'visual-studio-code' },
  { name: 'Docker', icon: 'docker' },
  { name: 'IntelliJ IDEA', icon: 'intellij-idea' },
  { name: 'PyCharm', icon: 'pycharm' }
];

const SkillsSection: React.FC = () => {
  return (
    <section className="bg-[#0c111d] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <SkillCategory title="Languages" icon="</>" skills={languages} />
          <SkillCategory title="Framework" icon="☰" skills={frameworks} />
          <SkillCategory title="Databases" icon="🔄" skills={databases} />
          <SkillCategory title="Tools" icon="🛠️" skills={tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
