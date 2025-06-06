
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/database';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      
      return data as BlogPost[];
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const { user, isAuthorized } = useAuth();

  return useMutation({
    mutationFn: async (blogPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'tag'>) => {
      if (!user) {
        throw new Error('You must be logged in to create a blog post');
      }

      const tag = isAuthorized ? 'admin' : 'user';
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...blogPost,
          user_id: user.id,
          tag,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating blog post:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: 'Blog post created',
        description: 'Your blog post has been published successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error creating blog post',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: 'Blog post updated',
        description: 'Your blog post has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating blog post',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: 'Blog post deleted',
        description: 'Your blog post has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting blog post',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
