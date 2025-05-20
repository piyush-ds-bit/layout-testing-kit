
import React from 'react';
import SkillCategory from './SkillCategory';

const languages = [
  { name: 'Python', icon: 'python' },
  { name: 'SQL', icon: 'sql' },
  { name: 'C++', icon: 'c-plus-plus' },
  { name: 'Dart', icon: 'dart' }
];


const frameworks = [
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Pandas & NumPy', icon: 'pandas' },
  { name: 'Seaborn', icon: 'seaborn' },
  { name: 'Matplotlib', icon: 'matplotlib' },
  { name: 'Scikit-learn', icon: 'scikit-learn' },
  { name: 'Pydantic', icon: 'pydantic' },
  { name: 'Flutter', icon: 'flutter' },
  { name: 'Streamlit', icon: 'streamlit' },
  { name: 'TensorFlow', icon: 'tensorflow' }
];


const databases = [
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Firebase', icon: 'firebase' }
];


const tools = [
  { name: 'IntelliJ IDEA', icon: 'intellij-idea' },
  { name: 'Jupyter Notebook', icon: 'jupyter' },
  { name: 'Google Colab', icon: 'google-colab' },
  { name: 'Kaggle', icon: 'kaggle' },
  { name: 'PyCharm', icon: 'pycharm' }
];


const SkillsSection: React.FC = () => {
  return (
    <section className="bg-[#0c111d] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <SkillCategory title="Languages" icon="💬" skills={languages} />
          <SkillCategory title="Framework" icon="🧰" skills={frameworks} />
          <SkillCategory title="Databases" icon="💾" skills={databases} />
          <SkillCategory title="Tools" icon="🔧" skills={tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
