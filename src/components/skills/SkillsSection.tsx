
import React from 'react';
import SkillCategory from './SkillCategory';

const languages = [
  { name: 'Python', icon: '🐍' },
  { name: 'SQL', icon: '🗄️' },
];

const frameworks = [
  { name: 'TensorFlow', icon: '🔶' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'Scikit-learn', icon: '📚' },
  { name: 'Pandas', icon: '🐼' },
  { name: 'Streamlit', icon: '📈' },
  { name: 'Flask', icon: '🍶' },
  { name: 'Seaborn', icon: '📊' },
  { name: 'Matplotlib', icon: '📉' },
  { name: 'NumPy', icon: '🔢' },
];

const databases = [
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'SQLite', icon: '📦' },
  { name: 'Supabase', icon: '⚡' },
];

const tools = [
  { name: 'Jupyter Notebook', icon: '📓' },
  { name: 'VS Code', icon: '🔷' },
  { name: 'PyCharm', icon: '🐍' },
  { name: 'IntelliJ IDEA', icon: '🧠' },
  { name: 'Git & GitHub', icon: '🐙' },
  { name: 'MLflow', icon: '📊' },
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
