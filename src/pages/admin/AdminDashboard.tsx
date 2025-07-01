
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const adminSections = [
    {
      title: 'Edit Hero Section',
      description: 'Update the hero section text and images.',
      link: '/admin/hero',
    },
    {
      title: 'Manage Skills',
      description: 'Add, edit, or remove skills from your portfolio.',
      link: '/admin/skills',
    },
    {
      title: 'Manage Experience',
      description: 'Update your work experience entries.',
      link: '/admin/experience',
    },
    {
      title: 'Manage Projects',
      description: 'Add or edit projects in your portfolio.',
      link: '/admin/projects',
    },
    {
      title: 'Contact Messages',
      description: 'View messages sent through the contact form.',
      link: '/admin/messages',
    },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {adminSections.map((section, index) => (
          <Link key={index} to={section.link} className="block">
            <div className="portfolio-card h-full transition-all hover:scale-105 duration-300">
              <h2 className="text-xl font-medium text-white mb-3">{section.title}</h2>
              <p className="text-portfolio-gray-light mb-4">{section.description}</p>
              <div className="text-portfolio-accent hover:text-portfolio-accent-dark transition-colors">
                Manage →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
