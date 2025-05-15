
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Skill, SkillCategory } from '@/types/database';

const ManageSkills: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' });
  
  // Fetch skill categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('skill_categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        if (data) {
          setCategories(data as SkillCategory[]);
          if (data.length > 0) {
            setSelectedCategory(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch skill categories.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch skills for selected category
  useEffect(() => {
    const fetchSkills = async () => {
      if (!selectedCategory) return;
      
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('category_id', selectedCategory)
          .order('name');
        
        if (error) throw error;
        
        if (data) {
          setSkills(data as Skill[]);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch skills.',
          variant: 'destructive',
        });
      }
    };
    
    if (selectedCategory) {
      fetchSkills();
    }
  }, [selectedCategory]);
  
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSkill.name || !selectedCategory) return;
    
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([
          {
            name: newSkill.name,
            icon: newSkill.icon || '🔧',
            category_id: selectedCategory,
          },
        ])
        .select();
      
      if (error) throw error;
      
      if (data) {
        setSkills([...skills, data[0] as Skill]);
        setNewSkill({ name: '', icon: '' });
        
        toast({
          title: 'Success',
          description: 'Skill added successfully.',
        });
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setSkills(skills.filter((skill) => skill.id !== id));
      
      toast({
        title: 'Success',
        description: 'Skill deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Manage Skills</h1>
      
      <div className="mb-8">
        <h2 className="text-xl text-white mb-4">Skill Categories</h2>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-portfolio-accent text-white'
                  : 'bg-portfolio-card-bg text-portfolio-gray-light hover:bg-portfolio-darker'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedCategory && (
        <>
          <div className="mb-8">
            <h2 className="text-xl text-white mb-4">Add New Skill</h2>
            
            <form onSubmit={handleAddSkill} className="portfolio-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="portfolio-input"
                    placeholder="e.g. React"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-portfolio-gray-light mb-1">
                    Icon (emoji or text)
                  </label>
                  <input
                    type="text"
                    value={newSkill.icon}
                    onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                    className="portfolio-input"
                    placeholder="e.g. ⚛️"
                    maxLength={2}
                  />
                </div>
              </div>
              
              <Button type="submit" className="portfolio-button">
                Add Skill
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl text-white mb-4">Current Skills</h2>
            
            {skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="portfolio-card flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{skill.icon}</span>
                      <span className="text-portfolio-gray-light">{skill.name}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-portfolio-gray-light">No skills added for this category yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageSkills;
