import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Code, Briefcase, BookOpen, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSectionCard from '@/components/mobile/MobileSectionCard';
import BlogCTA from '@/components/blog/BlogCTA';

const MobileHero: React.FC = () => {
  const navigationCards = [
    {
      to: '/skills',
      label: 'Skills',
      icon: Code,
      description: 'Technical expertise and tools',
    },
    {
      to: '/projects',
      label: 'Projects',
      icon: Briefcase,
      description: 'Portfolio of work',
    },
    {
      to: '/experience',
      label: 'Experience',
      icon: Briefcase,
      description: 'Professional journey',
    },
    {
      to: '/github',
      label: 'GitHub',
      icon: Github,
      description: 'Open source contributions',
    },
    {
      to: '/connect',
      label: 'Connect',
      icon: Mail,
      description: 'Get in touch',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Hero Content Card */}
        <MobileSectionCard className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mobile-gradient-text"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Welcome to My Portfolio
            </motion.h1>
            <p className="text-lg text-portfolio-text/80">
              Explore my work, skills, and professional journey
            </p>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link to="/resume">
                <Button 
                  size="lg"
                  className="mobile-neon-button text-portfolio-accent hover:text-white font-semibold mobile-pulse-glow"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View Resume
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </MobileSectionCard>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-4">
          {navigationCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link to={card.to}>
                  <MobileSectionCard className="p-4 h-full mobile-touch-ripple">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-portfolio-accent/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-portfolio-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-portfolio-text">{card.label}</h3>
                        <p className="text-xs text-portfolio-text/60">{card.description}</p>
                      </div>
                    </div>
                  </MobileSectionCard>
                </Link>
              </motion.div>
            );
          })}
          
          {/* Blog CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="col-span-2"
          >
            <BlogCTA />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;
