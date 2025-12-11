import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trophy } from 'lucide-react';
import AchievementCard from './AchievementCard';
import AchievementLightbox from './AchievementLightbox';
import AdminAchievementModal from '../admin/achievements/AdminAchievementModal';
import EditAchievementModal from '../admin/achievements/EditAchievementModal';
import { useAchievementsData, ACHIEVEMENT_CATEGORIES, AchievementCategory } from '@/hooks/useAchievementsData';
import { Achievement } from '@/types/database';
import { useAdminEdit } from '@/context/AdminEditContext';
import { Button } from '@/components/ui/button';

const AchievementsSection: React.FC = () => {
  const {
    filteredAchievements,
    loading,
    selectedCategory,
    setSelectedCategory,
    addAchievement,
    updateAchievement,
    deleteAchievement
  } = useAchievementsData();

  const { isEditMode } = useAdminEdit();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const currentIndex = selectedAchievement 
    ? filteredAchievements.findIndex(a => a.id === selectedAchievement.id) 
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedAchievement(filteredAchievements[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredAchievements.length - 1) {
      setSelectedAchievement(filteredAchievements[currentIndex + 1]);
    }
  };

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-portfolio-accent" />
            <h2 className="portfolio-heading mb-0">Achievements & Certificates</h2>
          </div>
          
          {isEditMode && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-portfolio-accent hover:bg-portfolio-accent-dark gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ACHIEVEMENT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as AchievementCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-portfolio-accent text-white shadow-lg shadow-portfolio-accent/30'
                  : 'bg-portfolio-card-bg text-gray-400 hover:text-white hover:bg-portfolio-card-bg-alt border border-portfolio-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-portfolio-card-bg rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            style={{
              gridAutoRows: '10px'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onClick={setSelectedAchievement}
                  onEdit={setEditingAchievement}
                  onDelete={deleteAchievement}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-portfolio-accent/30 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {selectedCategory === 'All' 
                ? 'No achievements yet. Start adding your accomplishments!'
                : `No achievements in "${selectedCategory}" category.`}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AchievementLightbox
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < filteredAchievements.length - 1}
      />

      {/* Add Modal */}
      <AdminAchievementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addAchievement}
      />

      {/* Edit Modal */}
      <EditAchievementModal
        achievement={editingAchievement}
        onClose={() => setEditingAchievement(null)}
        onSave={updateAchievement}
      />
    </section>
  );
};

export default AchievementsSection;
