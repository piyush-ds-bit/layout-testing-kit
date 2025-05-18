
import { Json } from "@/integrations/supabase/types";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  user_id?: string;
  read: boolean;
  created_at: string;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  created_at?: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
  created_at?: string;
}

export interface Skill {
  id?: string;
  name: string;
  icon?: string;
  category_id: string;
  created_at?: string;
}

export interface SkillCategory {
  id?: string;
  name: string;
  created_at?: string;
}

export interface VisitorLog {
  id?: string;
  device: string;
  browser: string;
  city: string;
  country: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  created_at?: string;
}
