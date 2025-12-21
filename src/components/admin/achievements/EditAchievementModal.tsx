import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Achievement } from '@/hooks/useAchievementsData';

interface EditAchievementModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Achievement>, file?: File) => Promise<any>;
}

const categories = ['Certificate', 'Award', 'Recognition', 'Competition'];

const EditAchievementModal: React.FC<EditAchievementModalProps> = ({ 
  achievement,
  isOpen, 
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Certificate',
    date: '',
    event_name: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (achievement) {
      setFormData({
        title: achievement.title,
        description: achievement.description || '',
        category: achievement.category,
        date: achievement.date || '',
        event_name: achievement.event_name || '',
      });
      setFile(null);
    }
  }, [achievement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!achievement) return;
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const updateData: Partial<Achievement> = {
      title: formData.title,
      description: formData.description || null,
      category: formData.category,
      date: formData.date || null,
      event_name: formData.event_name || null,
    };
    
    const result = await onUpdate(achievement.id, updateData, file || undefined);
    
    setIsSubmitting(false);

    if (result) {
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const isValid = selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf';
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or PDF file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-portfolio-card-bg border border-portfolio-dark rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Edit Achievement</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="Enter achievement title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent resize-none"
              placeholder="Brief description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={formData.event_name}
              onChange={(e) => handleChange('event_name', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              placeholder="e.g., Hackathon 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 bg-portfolio-darker border border-portfolio-dark rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Replace Certificate File (optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="edit-achievement-file"
              />
              <label
                htmlFor="edit-achievement-file"
                className="flex items-center justify-center gap-2 w-full px-3 py-4 bg-portfolio-darker border border-dashed border-portfolio-dark rounded-md text-muted-foreground hover:border-portfolio-accent hover:text-foreground cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>{file ? file.name : 'Click to upload new file'}</span>
              </label>
            </div>
            {achievement.file_url && !file && (
              <p className="text-xs text-muted-foreground mt-1">
                Current file will be kept unless you upload a new one.
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-portfolio-dark text-muted-foreground hover:bg-portfolio-darker"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAchievementModal;
