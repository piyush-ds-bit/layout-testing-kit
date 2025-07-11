
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSkillsData } from '@/hooks/useSkillsData';
import { getCategoryIcon, getSkillIcon } from '@/utils/iconUtils';

const SkillsPreview: React.FC = () => {
  const { skills, categories, loading } = useSkillsData();

  if (loading) {
    return (
      <section id="skills" className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center text-white">
          Loading skills...
        </div>
      </section>
    );
  }

  // Get first two categories with their skills for preview
  const previewCategories = categories.slice(0, 2).map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category_id === category.id)
  }));

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
          {previewCategories.map((category) => (
            <div key={category.id} className="portfolio-card-hover p-6 bg-[#1a202c] rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-3 text-blue-400">{getCategoryIcon(category.name)}</span>
                  <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.slice(0, 4).map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 py-2 px-4 rounded-full bg-[#1e2738] border border-[#2d3748]"
                  >
                    <span className="text-xl">{getSkillIcon(skill.icon || '', category.name)}</span>
                    <span className="text-gray-200 text-sm flex-1">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
