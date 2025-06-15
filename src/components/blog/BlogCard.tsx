
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

  const canEdit = user && (user.id === post.user_id || isAuthorized);
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
      deleteBlogPost.mutate(post.id!);
    }
  };

  return (
    <Card className="bg-portfolio-grey border-portfolio-dark hover:border-portfolio-accent/50 transition-colors">
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
          {(canEdit || canDelete) && (
            <div className="flex gap-2">
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
  );
};

export default BlogCard;

