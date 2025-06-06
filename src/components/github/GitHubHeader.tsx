
import React from 'react';
import { Github } from 'lucide-react';

const GitHubHeader: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <Github className="w-6 h-6 mr-3 text-[#58a6ff]" />
      <h3 className="text-xl font-semibold text-white">GitHub</h3>
    </div>
  );
};

export default GitHubHeader;
