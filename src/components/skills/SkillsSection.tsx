import React from 'react';
import SkillCategory from './SkillCategory';

const programming = [
  { name: 'Python',    icon: 'python' },
  { name: 'SQL',       icon: 'sql' },
  { name: 'YAML',      icon: 'yaml' },
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
  { name: 'Flutter',   icon: 'flutter' }
];

const databases = [
  { name: 'Supabase', icon: 'supabase' },
  { name: 'SQLite',   icon: 'sqlite' }
];

const Tools = [
  { name: 'IntelliJ',          icon: 'intellijidea' },
  { name: 'Jupyter Notebook',  icon: 'jupyter' },
  { name: 'PyCharm',           icon: 'pycharm' },
  { name: 'Google Colab',      icon: 'googlecolab' },
  { name: 'Kaggle',            icon: 'kaggle' }
];

const otherSkills = [
  { name: 'Problem Solving (LeetCode)', icon: 'leetcode' },
  { name: 'Git',                         icon: 'git' }
];


const SkillsSection: React.FC = () => {
  return (
    <section className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <SkillCategory title="Programming"            icon="💻" skills={programming} />
          <SkillCategory title="Libraries & Frameworks" icon="📚" skills={librariesFrameworks} />
          <SkillCategory title="Web & Tools"            icon="🌐" skills={webTools} />
          <SkillCategory title="Databases"              icon="💾" skills={databases} />
          <SkillCategory title="Tools"                  icon="🛠️" skills={Tools} />
          <SkillCategory title="Other"                  icon="✨" skills={otherSkills} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
