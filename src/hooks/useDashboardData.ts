import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LatestProject {
  id: string;
  title: string;
  description: string;
  live_url?: string | null;
}

interface LatestAchievement {
  id: string;
  title: string;
  category: string;
  date?: string | null;
}

interface LatestBlog {
  id: string;
  title: string;
  created_at: string;
}

interface DashboardData {
  currentlyWorkingOn: string;
  latestProject: LatestProject | null;
  latestAchievement: LatestAchievement | null;
  latestBlog: LatestBlog | null;
  loading: boolean;
}

export const useDashboardData = (): DashboardData => {
  const [latestProject, setLatestProject] = useState<LatestProject | null>(null);
  const [latestAchievement, setLatestAchievement] = useState<LatestAchievement | null>(null);
  const [latestBlog, setLatestBlog] = useState<LatestBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch latest project
        const { data: projectData } = await supabase
          .from('projects')
          .select('id, title, description, live_url')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (projectData) {
          setLatestProject(projectData);
        }

        // Fetch latest achievement
        const { data: achievementData } = await supabase
          .from('achievements')
          .select('id, title, category, date')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (achievementData) {
          setLatestAchievement(achievementData);
        }

        // Fetch latest blog
        const { data: blogData } = await supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (blogData) {
          setLatestBlog(blogData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    currentlyWorkingOn: "Building a modern tuition management platform and experimenting with Food Vision AI",
    latestProject,
    latestAchievement,
    latestBlog,
    loading,
  };
};
