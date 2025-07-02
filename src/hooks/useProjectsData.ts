
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export interface Project {
  id: string; // Changed from number to string to match Supabase UUID
  title: string;
  description: string;
  image_url?: string;
  category: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
  details?: string[] | string;
  created_at?: string;
}

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackProjects: Project[] = [
    {
      id: '1',
      title: 'WhatsApp Buddy',
      description: 'Developed a Streamlit-based WhatsApp chat analyzer with sentiment analysis, word clouds, user stats, and emoji insights using Pandas and Matplotlib/Seaborn.',
      image_url: '/lovable-uploads/Whatsapp_3.png',
      category: 'Deployed',
      technologies: ['Python', 'Streamlit', 'Pandas&Seaborn'],
      github_url: 'https://github.com/piyush-ds-bit/whatsapp_chat_analyzer',
      live_url: '#',
    },
    {
      id: '2',
      title: 'Piyush Portfolio',
      description: 'Developed a personal portfolio website using lovable.ai and Firebase with an admin panel for real-time content updates, showcasing projects, skills, and contact information.',
      image_url: '/lovable-uploads/portfolio_1.png',
      category: 'Deployed',
      technologies: ['lovable.ai', 'Supabase', 'SQLite'],
      github_url: 'https://github.com/piyush-ds-bit/Portfolio-website',
      live_url: '#',
    },
    {
      id: '3',
      title: 'MovieMate',
      description: 'Built a content-based movie recommender using Bag-of-Words with a dataset of 5000+ movies.',
      image_url: '/lovable-uploads/Moviemate_3.png',
      category: 'Deployed',
      technologies: ['Python', 'ScikitLearn', 'Streamlit'],
      github_url: 'https://github.com/piyush-ds-bit/Movie-Recommender-System',
      live_url: '#',
    },
    {
      id: '4',
      title: 'Patient Partner',
      description: 'Developed an insurance premium prediction app using Streamlit frontend and FastAPI backend. It takes user inputs like age, gender, BMI, and smoking habits to predict premium cost.',
      image_url: '/lovable-uploads/insurance_1.png',
      category: 'In Development',
      technologies: ['Python', 'FastAPI', 'Streamlit'],
      github_url: '#',
    }
  ];

  // Helper function to convert Json to string[] | string
  const convertDetailsFromJson = (details: Json | null): string[] | string | undefined => {
    if (!details) return undefined;
    if (typeof details === 'string') return details;
    if (Array.isArray(details)) return details as string[];
    return undefined;
  };

  // Helper function to convert string[] | string to Json for database
  const convertDetailsToJson = (details: string[] | string | undefined): Json => {
    if (!details) return null;
    return details as Json;
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Convert the data to match our Project interface
        const convertedData: Project[] = data.map(project => ({
          ...project,
          details: convertDetailsFromJson(project.details)
        }));
        setProjects(convertedData);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (projectData: Omit<Project, 'id' | 'created_at'>) => {
    try {
      // Convert details to Json format for database
      const dataForDb = {
        ...projectData,
        details: convertDetailsToJson(projectData.details)
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([dataForDb])
        .select()
        .single();

      if (error) throw error;

      // Convert the returned data back to our Project interface
      const convertedProject: Project = {
        ...data,
        details: convertDetailsFromJson(data.details)
      };

      setProjects(prev => [convertedProject, ...prev]);

      toast({
        title: "Success",
        description: "Project added successfully",
      });

      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Omit<Project, 'id' | 'created_at'>>) => {
    try {
      // Convert details to Json format for database
      const dataForDb = {
        ...projectData,
        details: projectData.details ? convertDetailsToJson(projectData.details) : undefined
      };

      const { data, error } = await supabase
        .from('projects')
        .update(dataForDb)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Convert the returned data back to our Project interface
      const convertedProject: Project = {
        ...data,
        details: convertDetailsFromJson(data.details)
      };

      setProjects(prev => prev.map(project => 
        project.id === id ? convertedProject : project
      ));

      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(project => project.id !== id));

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};
