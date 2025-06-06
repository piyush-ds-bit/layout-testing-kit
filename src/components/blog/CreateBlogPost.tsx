
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCreateBlogPost } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const CreateBlogPost: React.FC = () => {
  const { user } = useAuth();
  const createBlogPost = useCreateBlogPost();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(user?.user_metadata?.name || user?.email?.split('@')[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      return;
    }

    createBlogPost.mutate({
      title: title.trim(),
      content: content.trim(),
      author_name: authorName.trim(),
    });

    // Reset form
    setTitle('');
    setContent('');
  };

  if (!user) {
    return (
      <Card className="bg-portfolio-dark border-portfolio-dark">
        <CardContent className="p-6">
          <p className="text-portfolio-gray-light text-center">
            Please log in to create blog posts.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-portfolio-dark border-portfolio-dark">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            required
            className="bg-portfolio-darkest border-portfolio-gray text-white placeholder:text-portfolio-gray"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            required
            className="bg-portfolio-darkest border-portfolio-gray text-white placeholder:text-portfolio-gray"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content..."
            rows={6}
            required
            className="bg-portfolio-darkest border-portfolio-gray text-white placeholder:text-portfolio-gray"
          />
          <Button 
            type="submit" 
            disabled={!title.trim() || !content.trim() || !authorName.trim() || createBlogPost.isPending}
            className="bg-portfolio-accent hover:bg-portfolio-accent-dark text-white w-full"
          >
            {createBlogPost.isPending ? 'Publishing...' : 'Publish Blog Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlogPost;
