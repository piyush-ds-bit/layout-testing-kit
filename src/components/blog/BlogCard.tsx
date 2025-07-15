import React, { useState } from 'react';
import { BlogPost } from '@/types/database';
import { useAuth } from '@/context/AuthContext';
import { useUpdateBlogPost, useDeleteBlogPost } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import BlogShareButton from './BlogShareButton';

interface BlogCardProps {
  post: BlogPost;
}

// Helper function to truncate text at word boundaries
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const sub = text.substring(0, maxLength);
  const lastSpace = sub.lastIndexOf(' ');
  return sub.substring(0, lastSpace > 0 ? lastSpace : maxLength);
}

const TRUNCATE_LENGTH = 300;

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { user, isAuthorized } = useAuth();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  // For View More/Less logic
  const [expanded, setExpanded] = useState(false);
  const isLong = post.content.length > TRUNCATE_LENGTH;
  const previewContent = truncateText(post.content, TRUNCATE_LENGTH);

  // Only allow user to edit their own post (admin or not)
  const canEdit = user && user.id === post.user_id;

  // Allow delete for admin (isAuthorized) or post author
  const canDelete = user && (user.id === post.user_id || isAuthorized);

  const handleSave = () => {
    updateBlogPost.mutate({
      id: post.id!,
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost.mutate(post.id!, {
        onError: (error: any) => {
          toast({
            title: "Error deleting blog post",
            description: error.message || "There was a problem deleting the blog post.",
            variant: "destructive"
          });
        }
      });
    }
  };

  return (
    <div className="portfolio-card-hover mb-6">
      <Card className="bg-transparent border-none shadow-none p-0">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-white text-xl">{post.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={post.tag === 'admin' ? 'default' : 'secondary'}
                  className={post.tag === 'admin' ? 'bg-portfolio-accent text-white' : 'bg-portfolio-gray text-white'}
                >
                  {post.author_name} • {post.tag}
                </Badge>
                <div className="flex items-center text-portfolio-gray-light text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(post.created_at!), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Share button - visible to everyone */}
              <BlogShareButton post={post} />
              
              {/* Edit and Delete buttons - only for authorized users */}
              {(canEdit || canDelete) && (
                <div className="flex gap-2">
                {/* Only show Edit if author (even if admin) */}
                {canEdit && (
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-portfolio-dark border-portfolio-dark">
                      <DialogHeader>
                        <DialogTitle className="text-white">Edit Blog Post</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Blog title"
                          className="bg-portfolio-darkest border-portfolio-gray text-white"
                        />
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          placeholder="Write your blog content..."
                          rows={8}
                          className="bg-portfolio-darkest border-portfolio-gray text-white"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSave} className="bg-portfolio-accent hover:bg-portfolio-accent-dark text-white">
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)} className="border-portfolio-gray text-portfolio-gray-light">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {/* Delete allowed for author or admin */}
                {canDelete && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDelete}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-portfolio-gray-light whitespace-pre-wrap">
            {!isLong ? (
              post.content
            ) : (
              <>
                {expanded ? post.content : `${previewContent}... `}
                <button
                  className="ml-1 text-portfolio-accent hover:underline transition-colors font-semibold bg-transparent border-none outline-none p-0"
                  onClick={() => setExpanded((e) => !e)}
                  aria-label={expanded ? "Show less" : "Show more"}
                  style={{ cursor: 'pointer' }}
                >
                  {expanded ? 'less' : 'more'}
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;
