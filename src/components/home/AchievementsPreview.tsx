import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { useAchievementsData } from '@/hooks/useAchievementsData';
import AchievementLightbox from '@/components/achievements/AchievementLightbox';
import { Achievement } from '@/types/database';

const AchievementsPreview: React.FC = () => {
  const { achievements, loading } = useAchievementsData();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Show first 6 achievements
  const featuredAchievements = achievements.slice(0, 6);

  const currentIndex = selectedAchievement 
    ? featuredAchievements.findIndex(a => a.id === selectedAchievement.id) 
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedAchievement(featuredAchievements[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < featuredAchievements.length - 1) {
      setSelectedAchievement(featuredAchievements[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <section id="achievements" className="portfolio-section">
        <div className="portfolio-container">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-portfolio-accent" />
              <h2 className="portfolio-heading mb-0">Achievements</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-portfolio-card-bg rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredAchievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="portfolio-section">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-portfolio-accent" />
            <h2 className="portfolio-heading mb-0">Achievements</h2>
          </div>
          <Link 
            to="/achievements" 
            className="flex items-center text-portfolio-accent hover:text-portfolio-accent-dark transition-colors"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Mobile: Horizontal Carousel */}
        <div className="block md:hidden">
          <Carousel
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredAchievements.map((achievement) => (
                <CarouselItem key={achievement.id} className="pl-4 basis-4/5">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAchievement(achievement)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group h-48 bg-portfolio-card-bg border border-portfolio-border"
                  >
                    {achievement.image_url ? (
                      <img
                        src={achievement.image_url}
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-portfolio-accent/20 to-portfolio-dark flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-portfolio-accent/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-portfolio-accent/80 text-white rounded-full mb-1">
                          {achievement.category}
                        </span>
                        <h3 className="text-sm font-semibold text-white line-clamp-2">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" />
            <CarouselNext className="right-2 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent" />
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-3 gap-4">
          {featuredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => setSelectedAchievement(achievement)}
              className="relative rounded-xl overflow-hidden cursor-pointer group h-52 bg-portfolio-card-bg border border-portfolio-border hover:border-portfolio-accent/50 transition-all duration-300"
            >
              {achievement.image_url ? (
                <img
                  src={achievement.image_url}
                  alt={achievement.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-portfolio-accent/20 to-portfolio-dark flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-portfolio-accent/50" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-portfolio-accent/80 text-white rounded-full mb-2">
                    {achievement.category}
                  </span>
                  <h3 className="text-base font-semibold text-white line-clamp-2">
                    {achievement.title}
                  </h3>
                  {achievement.event_name && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                      {achievement.event_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                style={{
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)'
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AchievementLightbox
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < featuredAchievements.length - 1}
      />
    </section>
  );
};

export default AchievementsPreview;
