
import React from 'react';

const links = [
  {
    name: 'Twitter',
    icon: '/social/twitter.svg',
    url: 'https://twitter.com/',
    label: 'X',
  },
  {
    name: 'Instagram',
    icon: '/social/instagram.svg',
    url: 'https://instagram.com/',
    label: 'Instagram',
  },
  {
    name: 'LinkedIn',
    icon: '/social/linkedin.svg',
    url: 'https://linkedin.com/',
    label: 'LinkedIn',
  },
  {
    name: 'YouTube',
    icon: '/social/youtube.svg',
    url: 'https://youtube.com/',
    label: 'YouTube',
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <div className="social-icon-container mb-2">
            <img src={link.icon} alt={link.name} className="w-8 h-8" />
          </div>
          <span className="text-gray-400 text-sm">{link.label}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
