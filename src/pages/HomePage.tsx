
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import MobileHero from '@/components/home/MobileHero';
import SkillsPreview from '@/components/home/SkillsPreview';
import ExperiencePreview from '@/components/home/ExperiencePreview';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import GitHubPreview from '@/components/home/GitHubPreview';
import BlogPreview from '@/components/home/BlogPreview';
import ConnectPreview from '@/components/home/ConnectPreview';
import BlogNotification from '@/components/blog/BlogNotification';
import MLPipelineVisualization from '@/components/mlpipeline/MLPipelineVisualization';
import IdentityCardOverlay from '@/components/identity/IdentityCardOverlay';
import MobileSectionCard from '@/components/mobile/MobileSectionCard';
import { useSwipeDetection } from '@/hooks/useSwipeDetection';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePage: React.FC = () => {
  const [showIdentityCard, setShowIdentityCard] = useState(false);
  const isMobile = useIsMobile();

  const { handlers } = useSwipeDetection({
    onSwipeFromLeftComplete: () => setShowIdentityCard(true),
    onSwipeRightToLeftComplete: () => setShowIdentityCard(false),
    threshold: 100
  });

  useEffect(() => {
    // Add event listeners for swipe detection
    document.addEventListener('touchstart', handlers.onTouchStart);
    document.addEventListener('touchmove', handlers.onTouchMove);
    document.addEventListener('touchend', handlers.onTouchEnd);
    document.addEventListener('mousedown', handlers.onMouseDown);
    document.addEventListener('mousemove', handlers.onMouseMove);
    document.addEventListener('mouseup', handlers.onMouseUp);

    return () => {
      document.removeEventListener('touchstart', handlers.onTouchStart);
      document.removeEventListener('touchmove', handlers.onTouchMove);
      document.removeEventListener('touchend', handlers.onTouchEnd);
      document.removeEventListener('mousedown', handlers.onMouseDown);
      document.removeEventListener('mousemove', handlers.onMouseMove);
      document.removeEventListener('mouseup', handlers.onMouseUp);
    };
  }, [handlers]);

  return (
    <>
      <Layout>
        <div className="animate-fade-in">
          {/* Hero Section - Different for mobile */}
          {isMobile ? <MobileHero /> : <Hero />}
          
          {/* ML Pipeline - Same but wrapped differently */}
          {isMobile ? (
            <div className="px-4 py-8">
              <MobileSectionCard>
                <MLPipelineVisualization />
              </MobileSectionCard>
            </div>
          ) : (
            <MLPipelineVisualization />
          )}
          
          {/* Other Sections - Wrapped for mobile */}
          {isMobile ? (
            <div className="space-y-6 px-4 pb-8">
              <MobileSectionCard><SkillsPreview /></MobileSectionCard>
              <MobileSectionCard><ExperiencePreview /></MobileSectionCard>
              <MobileSectionCard><ProjectsPreview /></MobileSectionCard>
              <MobileSectionCard><GitHubPreview /></MobileSectionCard>
              <MobileSectionCard><BlogPreview /></MobileSectionCard>
              <MobileSectionCard><ConnectPreview /></MobileSectionCard>
            </div>
          ) : (
            <>
              <SkillsPreview />
              <ExperiencePreview />
              <ProjectsPreview />
              <GitHubPreview />
              <BlogPreview />
              <ConnectPreview />
            </>
          )}
          
          <BlogNotification />
        </div>
      </Layout>
      
      <IdentityCardOverlay 
        isVisible={showIdentityCard}
        onClose={() => setShowIdentityCard(false)}
      />
    </>
  );
};

export default HomePage;
