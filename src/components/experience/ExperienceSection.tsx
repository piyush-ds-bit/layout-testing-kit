
import React, { useState, useEffect } from 'react';
import ExperienceCard from './ExperienceCard';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AdminAddButton from '@/components/admin/AdminAddButton';
import AdminExperienceModal from '@/components/admin/experience/AdminExperienceModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string;
}

// Fallback data when no data is available from Supabase
const fallbackExperiences = [
  {
    id: 'fallback-1',
    company: "AEIE Department, HIT",
    position: "Academic Project Contributor",
    start_date: "2023-08-01",
    end_date: null,
    current: true,
    description: "Learning and working on interdisciplinary academic projects blending electronics and AI, including sensor-based data acquisition systems and analysis using Python. Applied knowledge from instrumentation to real-world predictive modeling."
  },
  {
    id: 'fallback-2',
    company: "Self-Employed",
    position: "Tuition Teacher (Part-Time)",
    start_date: "2021-02-01",
    end_date: null,
    current: true,
    description: "Provided academic coaching to students from Class 5 to 12. Taught all subjects for Classes 5–8, and Physics, Chemistry, and Mathematics for Classes 9–12. Helped students achieve significant academic improvement, with one scoring 81% (Class 10) and another scoring 75% (Class 12)."
  }
];

const ExperienceSection: React.FC = () => {
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;

      // If no data from Supabase, use fallback data
      if (!data || data.length === 0) {
        setExperiences(fallbackExperiences);
      } else {
        setExperiences(data || []);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Use fallback data on error
      setExperiences(fallbackExperiences);
      toast({
        title: "Using default experiences",
        description: "Could not load experiences from database, showing default content",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddExperience = () => {
    setIsModalOpen(true);
  };

  const handleExperienceAdded = () => {
    fetchExperiences();
    setIsModalOpen(false);
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });

      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (startDate: string, endDate: string | null, current: boolean) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = current ? 'Present' : (endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present');
    return `${start} - ${end}`;
  };

  if (loading) {
    return (
      <section className="portfolio-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">Loading experiences...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-section">
      <div
        className="max-w-4xl mx-auto relative bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-8
        transition-all duration-300"
        style={{
          boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="portfolio-heading flex-1">Work Experience</h2>
          {isAuthorized && isEditMode && (
            <AdminAddButton
              onAdd={handleAddExperience}
              label="Add Experience"
              className="ml-4"
            />
          )}
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-portfolio-accent/30"></div>
          
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#0f1624] border-4 border-portfolio-accent"></div>
                
                <ExperienceCard 
                  id={experience.id}
                  company={experience.company}
                  position={experience.position}
                  duration={formatDuration(experience.start_date, experience.end_date, experience.current)}
                  description={experience.description}
                  index={index}
                  onDelete={handleDeleteExperience}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AdminExperienceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onExperienceAdded={handleExperienceAdded}
        />
      )}
    </section>
  );
};

export default ExperienceSection;
