import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAchievementsData, Achievement } from '@/hooks/useAchievementsData';
import { useAuth } from '@/context/AuthContext';
import { useAdminEdit } from '@/context/AdminEditContext';
import AchievementCard from './AchievementCard';
import AchievementPreviewModal from './AchievementPreviewModal';
import AdminAchievementModal from '@/components/admin/achievements/AdminAchievementModal';
import EditAchievementModal from '@/components/admin/achievements/EditAchievementModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const categories = ['All', 'Certificate', 'Award', 'Recognition', 'Competition'];

const AchievementsSection: React.FC = () => {
  const { achievements, loading, addAchievement, updateAchievement, deleteAchievement } = useAchievementsData();
  const { isAuthorized } = useAuth();
  const { isEditMode } = useAdminEdit();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewAchievement, setPreviewAchievement] = useState<Achievement | null>(null);
  const [editAchievement, setEditAchievement] = useState<Achievement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const showAdminControls = isAuthorized && isEditMode;

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteAchievement(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-portfolio-accent" />
      </div>
    );
  }

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Achievements</h1>
          <p className="text-muted-foreground">Certificates, awards, and recognitions</p>
        </div>

        {showAdminControls && (
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-portfolio-accent hover:bg-portfolio-accent-dark"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? 'bg-portfolio-accent hover:bg-portfolio-accent-dark'
                : 'border-portfolio-dark hover:bg-portfolio-card-bg'
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filteredAchievements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <Award className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No achievements yet</h3>
          <p className="text-muted-foreground">
            {showAdminControls
              ? 'Click "Add Achievement" to add your first achievement.'
              : 'Achievements will appear here once added.'}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AchievementCard
                achievement={achievement}
                onView={setPreviewAchievement}
                onEdit={setEditAchievement}
                onDelete={setDeleteTarget}
                showAdminControls={showAdminControls}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Preview Modal */}
      <AchievementPreviewModal
        achievement={previewAchievement}
        isOpen={!!previewAchievement}
        onClose={() => setPreviewAchievement(null)}
      />

      {/* Add Modal */}
      <AdminAchievementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addAchievement}
      />

      {/* Edit Modal */}
      <EditAchievementModal
        achievement={editAchievement}
        isOpen={!!editAchievement}
        onClose={() => setEditAchievement(null)}
        onUpdate={updateAchievement}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-portfolio-card-bg border-portfolio-dark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Achievement</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-portfolio-dark">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AchievementsSection;
