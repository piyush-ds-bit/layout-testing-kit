import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Loader2, Image as ImageIcon, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Achievement } from '@/types/database';
import { ACHIEVEMENT_CATEGORIES } from '@/hooks/useAchievementsData';

interface AdminAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => Promise<Achievement>;
}

const AdminAchievementModal: React.FC<AdminAchievementModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Certifications',
    event_name: '',
    date: '',
    image_url: '',
    file_url: '',
    file_type: 'image' as 'image' | 'pdf'
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('achievements')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('achievements')
        .getPublicUrl(fileName);

      if (type === 'image') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, file_url: publicUrl, file_type: 'pdf' }));
      }

      toast({
        title: 'Success',
        description: 'File uploaded successfully'
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category,
        event_name: formData.event_name.trim() || undefined,
        date: formData.date || undefined,
        image_url: formData.image_url || undefined,
        file_url: formData.file_url || undefined,
        file_type: formData.file_type
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Certifications',
        event_name: '',
        date: '',
        image_url: '',
        file_url: '',
        file_type: 'image'
      });
      onClose();
    } catch (error) {
      // Error handled in hook
    } finally {
      setSaving(false);
    }
  };

  const categories = ACHIEVEMENT_CATEGORIES.filter(c => c !== 'All');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-portfolio-darker border-portfolio-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Add Achievement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., AI Hackathon Winner 2024"
              className="bg-portfolio-card-bg border-portfolio-border"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-portfolio-card-bg border-portfolio-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-portfolio-darker border-portfolio-border">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="event_name">Event Name</Label>
            <Input
              id="event_name"
              value={formData.event_name}
              onChange={(e) => setFormData(prev => ({ ...prev, event_name: e.target.value }))}
              placeholder="e.g., TechFest 2024"
              className="bg-portfolio-card-bg border-portfolio-border"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-portfolio-card-bg border-portfolio-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the achievement..."
              className="bg-portfolio-card-bg border-portfolio-border min-h-[80px]"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Certificate Image</Label>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-portfolio-card-bg border border-portfolio-border rounded-lg hover:border-portfolio-accent/50 transition-colors">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {formData.image_url ? 'Change Image' : 'Upload Image'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'image')}
                  disabled={uploading}
                />
              </label>
              {formData.image_url && (
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* PDF Upload */}
          <div className="space-y-2">
            <Label>Certificate PDF (optional)</Label>
            <label className="cursor-pointer block">
              <div className="flex items-center gap-2 px-4 py-2 bg-portfolio-card-bg border border-portfolio-border rounded-lg hover:border-portfolio-accent/50 transition-colors">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {formData.file_url ? 'PDF Uploaded ✓' : 'Upload PDF'}
                </span>
              </div>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'pdf')}
                disabled={uploading}
              />
            </label>
          </div>

          {uploading && (
            <div className="flex items-center gap-2 text-portfolio-accent">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving || uploading}
              className="bg-portfolio-accent hover:bg-portfolio-accent-dark"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Add Achievement
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAchievementModal;
