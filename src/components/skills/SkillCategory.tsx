
import React from 'react';
import { 
  FaCode,
  FaPython, 
  FaJava, 
  FaReact, 
  FaDocker 
} from 'react-icons/fa';
import { 
  SiCplusplus,
  SiFlutter,
  SiPython,
  SiMongodb,
  SiSupabase,
  SiVisualstudiocode as VSCodeIcon,
  SiIntellijidea,
  SiPycharm
} from 'react-icons/si';
import { DiDart } from 'react-icons/di';

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategoryProps {
  title: string;
  icon: string;
  skills: Skill[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dart':
        return <DiDart className="w-5 h-5 text-blue-400" />;
      case 'python':
        return <FaPython className="w-5 h-5 text-yellow-400" />;
      case 'java':
        return <FaJava className="w-5 h-5 text-orange-500" />;
      case 'c-plus-plus':
        return <SiCplusplus className="w-5 h-5 text-blue-500" />;
      case 'flutter':
        return <SiFlutter className="w-5 h-5 text-cyan-400" />;
      case 'pygame':
        return <SiPython className="w-5 h-5 text-yellow-300" />;
      case 'react':
        return <FaReact className="w-5 h-5 text-blue-400" />;
      case 'mongodb':
        return <SiMongodb className="w-5 h-5 text-green-500" />;
      case 'supabase':
        return <SiSupabase className="w-5 h-5 text-green-400" />;
      case 'visual-studio-code':
        return <VSCodeIcon className="w-5 h-5 text-blue-500" />;
      case 'docker':
        return <FaDocker className="w-5 h-5 text-blue-500" />;
      case 'intellij-idea':
        return <SiIntellijidea className="w-5 h-5 text-pink-500" />;
      case 'pycharm':
        return <SiPycharm className="w-5 h-5 text-green-500" />;
      default:
        return <span className="text-xl">{icon}</span>;
    }
  };

  return (
    <div className="bg-[#121a29] rounded-xl p-6 border border-[#2d3748]">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3 text-blue-400">{icon}</span>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-[#1e2738] rounded-full py-2 px-4 border border-[#2d3748]"
          >
            {getIcon(skill.icon)}
            <span className="text-gray-200">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
