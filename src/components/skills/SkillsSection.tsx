
import React, { useState } from 'react';
import SkillCategory from './SkillCategory';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminSkillModal from '@/components/admin/skills/AdminSkillModal';

const programming = [
  { name: 'Python',    icon: 'python' },
  { name: 'Dart',      icon: 'dart' },
  { name: 'HTML/CSS',  icon: 'html5' }
];

const librariesFrameworks = [
  { name: 'Pandas',        icon: 'pandas' },
  { name: 'NumPy',         icon: 'numpy' },
  { name: 'Matplotlib',    icon: 'matplotlib' },
  { name: 'Seaborn',       icon: 'seaborn' },
  { name: 'Scikit‑learn',  icon: 'scikitlearn' },
  { name: 'TensorFlow',    icon: 'tensorflow' }
];

const webTools = [
  { name: 'Streamlit', icon: 'streamlit' },
  { name: 'FastAPI',   icon: 'fastapi' },
  { name: 'Pydantic',  icon: 'pydantic' },
  { name: 'Flutter',   icon: 'flutter' },
  { name: 'Docker',    icon: 'docker' },
];

const databases = [
  { name: 'Supabase', icon: 'supabase' },
];

const Tools = [
  { name: 'IntelliJ',          icon: 'intellijidea' },
  { name: 'Jupyter Notebook',  icon: 'jupyter' },
  { name: 'PyCharm',           icon: 'pycharm' },
  { name: 'Google Colab',      icon: 'googlecolab' },
  { name: 'Kaggle',            icon: 'kaggle' }
];

const otherSkills = [
  { name: 'Problem Solving', icon: 'problemsolving' },
];

const SkillsSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleAddSkill = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const categories = [
    { title: "Programming", icon: "💻", skills: programming, key: "programming" },
    { title: "Libraries & Frameworks", icon: "📚", skills: librariesFrameworks, key: "libraries" },
    { title: "Web & Tools", icon: "🌐", skills: webTools, key: "webtools" },
    { title: "Databases", icon: "💾", skills: databases, key: "databases" },
    { title: "Tools", icon: "🛠️", skills: Tools, key: "tools" },
    { title: "Other", icon: "✨", skills: otherSkills, key: "other" }
  ];

  return (
    <section className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white text-center flex-1">
            Skills
          </h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={() => handleAddSkill('')}
              label="Add Skill Category"
              className="ml-4"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.key} className="relative">
              <SkillCategory 
                title={category.title} 
                icon={category.icon} 
                skills={category.skills}
                categoryKey={category.key}
                onAddSkill={() => handleAddSkill(category.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AdminSkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
        />
      )}
    </section>
  );
};

export default SkillsSection;
