import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code2, Briefcase, FolderKanban, BookOpen, Award, Cpu, MessageCircle, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useActiveSection } from '@/hooks/useActiveSection';
const navItems = [{
  label: 'Home',
  path: '/',
  icon: Home,
  sectionId: 'hero'
}, {
  label: 'Skills',
  path: '/skills',
  icon: Code2,
  sectionId: 'skills'
}, {
  label: 'Experience',
  path: '/experience',
  icon: Briefcase,
  sectionId: 'experience'
}, {
  label: 'Projects',
  path: '/projects',
  icon: FolderKanban,
  sectionId: 'projects'
}, {
  label: 'Blog',
  path: '/blog',
  icon: BookOpen,
  sectionId: 'blog'
}, {
  label: 'Achievements',
  path: '/achievements',
  icon: Award,
  sectionId: 'achievements'
}, {
  label: 'ML Pipeline',
  path: '/#ml-pipeline',
  icon: Cpu,
  sectionId: 'ml-pipeline'
}, {
  label: 'Connect',
  path: '/connect',
  icon: MessageCircle,
  sectionId: 'connect'
}];
const socialLinks = [{
  name: 'GitHub',
  icon: Github,
  url: 'https://github.com/piyushkrsingh'
}, {
  name: 'LinkedIn',
  icon: Linkedin,
  url: 'https://www.linkedin.com/in/piyushkrsingh-/'
}, {
  name: 'Twitter',
  icon: Twitter,
  url: 'https://twitter.com/_piyushkrsingh_'
}, {
  name: 'Email',
  icon: Mail,
  url: 'mailto:piyushjuly04@gmail.com'
}];
const LeftSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToSection = useScrollToSection();
  const activeSection = useActiveSection();
  const handleNavClick = (item: typeof navItems[0]) => {
    if (location.pathname === '/') {
      // On homepage - scroll to section
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // On other pages - navigate to route
      navigate(item.path);
    }
  };
  const isActiveItem = (item: typeof navItems[0]) => {
    if (location.pathname === '/') {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.path;
  };
  return <aside className="fixed left-0 top-0 h-screen w-[240px] bg-portfolio-darker/95 border-r border-portfolio-border/50 backdrop-blur-xl z-40 hidden lg:flex flex-col">
      {/* Profile Photo */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="p-6 flex justify-center py-[100px]">
        <button onClick={() => navigate('/')} className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-accent to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <img src="/profile_image.jpeg" alt="Profile" className="relative w-20 h-20 rounded-full border-2 border-portfolio-accent/50 object-cover transition-transform duration-300 group-hover:scale-105" />
        </button>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 overflow-y-auto scrollbar-thin py-0">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isActiveItem(item);
          return <motion.li key={item.label} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3,
            delay: index * 0.05
          }}>
                <button onClick={() => handleNavClick(item)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${isActive ? 'bg-portfolio-accent/20 text-portfolio-accent border border-portfolio-accent/30' : 'text-gray-400 hover:bg-portfolio-card-bg hover:text-white'}`}>
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-portfolio-accent' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {/* Active indicator glow */}
                  {isActive && <motion.div className="absolute left-0 w-1 h-8 bg-portfolio-accent rounded-r-full" layoutId="activeIndicator" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.3
              }} />}
                </button>
              </motion.li>;
        })}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="p-4 border-t border-portfolio-border/50">
        <div className="flex justify-center gap-3">
          {socialLinks.map(social => {
          const Icon = social.icon;
          return <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-portfolio-card-bg/50 text-gray-400 hover:text-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300" whileHover={{
            scale: 1.1,
            y: -2
          }} whileTap={{
            scale: 0.95
          }} title={social.name}>
                <Icon className="w-5 h-5" />
              </motion.a>;
        })}
        </div>
      </div>
    </aside>;
};
export default LeftSidebar;