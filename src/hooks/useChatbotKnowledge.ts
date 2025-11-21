import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { personalInfo, projectHighlights } from '@/data/chatbotKnowledge';

interface KnowledgeBase {
  projects: any[];
  skills: any[];
  experiences: any[];
  blogPosts: any[];
  personalInfo: typeof personalInfo;
  projectHighlights: typeof projectHighlights;
}

export const useChatbotKnowledge = () => {
  const [knowledge, setKnowledge] = useState<KnowledgeBase>({
    projects: [],
    skills: [],
    experiences: [],
    blogPosts: [],
    personalInfo,
    projectHighlights,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledge();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchKnowledge, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchKnowledge = async () => {
    try {
      const [projectsRes, skillsRes, experiencesRes, blogRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*, skill_categories(name)'),
        supabase.from('experiences').select('*').order('start_date', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setKnowledge({
        projects: projectsRes.data || [],
        skills: (skillsRes.data || []).map(s => ({
          ...s,
          category_name: s.skill_categories?.name || 'Other',
        })),
        experiences: experiencesRes.data || [],
        blogPosts: blogRes.data || [],
        personalInfo,
        projectHighlights,
      });
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  return { knowledge, loading };
};
