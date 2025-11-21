export const formatProjectContext = (projects: any[]): string => {
  return projects.map((p, idx) => 
    `${idx + 1}. ${p.title}
   - Description: ${p.description}
   - Technologies: ${p.technologies?.join(', ') || 'N/A'}
   - GitHub: ${p.github_url || 'N/A'}
   - Live: ${p.live_url || 'N/A'}`
  ).join('\n\n');
};

export const formatSkillContext = (skills: any[]): string => {
  const grouped = skills.reduce((acc: any, skill: any) => {
    const category = skill.category_name || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {});
  
  return Object.entries(grouped)
    .map(([category, skillList]) => `${category}:\n  ${(skillList as string[]).join(', ')}`)
    .join('\n\n');
};

export const formatExperienceContext = (experiences: any[]): string => {
  return experiences.map((exp, idx) => 
    `${idx + 1}. ${exp.position} at ${exp.company}
   - Duration: ${exp.start_date} - ${exp.current ? 'Present' : exp.end_date}
   - Description: ${exp.description}`
  ).join('\n\n');
};

export const formatBlogContext = (posts: any[]): string => {
  return posts.map((post, idx) => 
    `${idx + 1}. ${post.title} [${post.tag}]
   - By: ${post.author_name}
   - Preview: ${post.content.substring(0, 200)}...`
  ).join('\n\n');
};

export const truncateContext = (context: string, maxTokens: number = 2000): string => {
  // Rough estimate: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  if (context.length <= maxChars) return context;
  
  return context.substring(0, maxChars) + '\n\n[Context truncated for length...]';
};
