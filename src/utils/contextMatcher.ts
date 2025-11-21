import { personalInfo, projectHighlights } from '@/data/chatbotKnowledge';

interface KnowledgeBase {
  projects: any[];
  skills: any[];
  experiences: any[];
  blogPosts: any[];
}

export const extractKeywords = (text: string): string[] => {
  const normalized = text.toLowerCase();
  // Remove punctuation and split into words
  const words = normalized.replace(/[^\w\s]/g, ' ').split(/\s+/);
  // Remove common stop words
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might']);
  return words.filter(word => word.length > 2 && !stopWords.has(word));
};

export const matchesProjects = (keywords: string[], text: string): boolean => {
  const projectKeywords = ['project', 'built', 'created', 'developed', 'whatsapp', 'moviemate', 'movie', 'insurance', 'portfolio', 'buddy', 'recommender', 'predictor', 'website'];
  return keywords.some(k => projectKeywords.includes(k)) || 
         text.toLowerCase().includes('what did you build') ||
         text.toLowerCase().includes('what have you built');
};

export const matchesSkills = (keywords: string[], text: string): boolean => {
  const skillKeywords = ['skill', 'technology', 'technologies', 'python', 'machine', 'learning', 'tensorflow', 'pandas', 'numpy', 'docker', 'fastapi', 'streamlit', 'know', 'familiar', 'experience'];
  return keywords.some(k => skillKeywords.includes(k)) ||
         text.toLowerCase().includes('what can you do') ||
         text.toLowerCase().includes('what do you know');
};

export const matchesExperience = (keywords: string[], text: string): boolean => {
  const expKeywords = ['experience', 'work', 'worked', 'job', 'company', 'event', 'competition', 'hackathon', 'achievement', 'participated', 'represented'];
  return keywords.some(k => expKeywords.includes(k));
};

export const matchesEducation = (keywords: string[], text: string): boolean => {
  const eduKeywords = ['education', 'college', 'university', 'degree', 'study', 'studying', 'student', 'batch', 'haldia', 'btech'];
  return keywords.some(k => eduKeywords.includes(k));
};

export const matchesBlogTopics = (keywords: string[], text: string): boolean => {
  const blogKeywords = ['blog', 'article', 'wrote', 'written', 'post', 'read', 'publish'];
  return keywords.some(k => blogKeywords.includes(k));
};

export const matchesContact = (keywords: string[], text: string): boolean => {
  const contactKeywords = ['contact', 'email', 'reach', 'connect', 'message', 'talk', 'get in touch', 'hire'];
  return keywords.some(k => contactKeywords.includes(k)) ||
         text.toLowerCase().includes('get in touch') ||
         text.toLowerCase().includes('reach out');
};

export const isGeneralQuestion = (text: string): boolean => {
  const generalPatterns = ['who', 'about', 'tell me', 'introduce', 'yourself', 'piyush'];
  return generalPatterns.some(pattern => text.toLowerCase().includes(pattern));
};

export const isNavigationRequest = (text: string): boolean => {
  const navKeywords = ['navigate', 'go to', 'take me', 'show me', 'visit', 'section', 'page'];
  return navKeywords.some(keyword => text.toLowerCase().includes(keyword));
};

export const getRelevantContext = (userMessage: string, knowledgeBase: KnowledgeBase): string => {
  const keywords = extractKeywords(userMessage);
  const sections: string[] = [];
  
  // Always include personal intro for general questions
  if (isGeneralQuestion(userMessage)) {
    sections.push(`ABOUT PIYUSH:\n${personalInfo.fullIntroduction}\n\nGoals: ${personalInfo.professionalGoals.shortTerm}`);
  }
  
  // Match projects
  if (matchesProjects(keywords, userMessage)) {
    const projectContext = knowledgeBase.projects.slice(0, 4).map(p => 
      `- ${p.title}: ${p.description}\n  Tech: ${p.technologies?.join(', ') || 'N/A'}\n  Links: ${p.github_url || ''} ${p.live_url || ''}`
    ).join('\n\n');
    sections.push(`PROJECTS:\n${projectContext}`);
  }
  
  // Match skills
  if (matchesSkills(keywords, userMessage)) {
    const skillsByCategory = knowledgeBase.skills.reduce((acc: any, skill: any) => {
      const cat = skill.category_name || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill.name);
      return acc;
    }, {});
    
    const skillContext = Object.entries(skillsByCategory)
      .map(([cat, skills]) => `${cat}: ${(skills as string[]).join(', ')}`)
      .join('\n');
    sections.push(`TECHNICAL SKILLS:\n${skillContext}`);
  }
  
  // Match experience
  if (matchesExperience(keywords, userMessage)) {
    const expContext = knowledgeBase.experiences.slice(0, 3).map(e => 
      `- ${e.position} at ${e.company} (${e.start_date} - ${e.current ? 'Present' : e.end_date})\n  ${e.description}`
    ).join('\n\n');
    sections.push(`EXPERIENCE:\n${expContext}`);
    
    const achievements = personalInfo.achievements.join('\n- ');
    sections.push(`ACHIEVEMENTS:\n- ${achievements}`);
  }
  
  // Match education
  if (matchesEducation(keywords, userMessage)) {
    sections.push(`EDUCATION:\n${personalInfo.education} at ${personalInfo.college}\nBatch: ${personalInfo.batch}`);
  }
  
  // Match blog
  if (matchesBlogTopics(keywords, userMessage)) {
    const blogContext = knowledgeBase.blogPosts.slice(0, 3).map(b => 
      `- ${b.title} (${b.tag})\n  ${b.content.substring(0, 150)}...`
    ).join('\n\n');
    if (blogContext) {
      sections.push(`BLOG POSTS:\n${blogContext}`);
    }
  }
  
  // Match contact
  if (matchesContact(keywords, userMessage)) {
    sections.push(`CONTACT:\nVisitors can use the contact form on the website to reach out to Piyush. Navigate to the "Connect" section of the website.`);
  }
  
  // If no specific match, provide general overview
  if (sections.length === 0) {
    sections.push(`ABOUT PIYUSH:\n${personalInfo.fullIntroduction}`);
    sections.push(`KEY SKILLS: ${Object.values(personalInfo.coreSkills).flat().slice(0, 8).join(', ')}`);
  }
  
  return sections.join('\n\n---\n\n');
};
