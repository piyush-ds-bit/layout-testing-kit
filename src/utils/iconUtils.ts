// Utility functions for skill and category icons

export const getCategoryIcon = (categoryName: string): string => {
  switch (categoryName.toLowerCase()) {
    case 'programming': return '💻';
    case 'libraries & frameworks': return '📚';
    case 'web & tools': return '🌐';
    case 'databases': return '💾';
    case 'tools': return '🛠️';
    case 'other': return '✨';
    default: return '✨'; // Default to Other category icon
  }
};

export const getSkillIcon = (iconName: string, categoryName?: string): string => {
  if (!iconName) {
    // If no skill icon, fallback to category icon
    return categoryName ? getCategoryIcon(categoryName) : '🔹';
  }

  switch (iconName.toLowerCase()) {
    // Programming
    case 'python': return '🐍';
    case 'dart': return '🎯';
    case 'html5': return '🌐';

    // Libraries & Frameworks
    case 'pandas': return '🐼';
    case 'numpy': return '➗';
    case 'matplotlib': return '📊';
    case 'seaborn': return '🌊';
    case 'scikit-learn': return '🧠';
    case 'tensorflow': return '🔶';

    // Web & Tools
    case 'streamlit': return '📈';
    case 'fastapi': return '🚀';
    case 'pydantic': return '🛡️';
    case 'flutter': return '📱';
    case 'docker': return '🐳';

    // Databases
    case 'supabase': return '🔋';

    // Tools
    case 'intellij': return '🧠';
    case 'jupyter': return '📓';
    case 'pycharm': return '🧪';
    case 'google-colab': return '🤖';
    case 'kaggle': return '🏅';

    // Other
    case 'problemsolving': return '🧩';

    // Fallback to category icon if skill icon not found
    default: return categoryName ? getCategoryIcon(categoryName) : '🔹';
  }
};
