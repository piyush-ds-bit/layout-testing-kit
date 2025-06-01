
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthorization = async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAuthorized(false);
      return false;
    }

    try {
      // Use the security definer function to check if user is admin
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking authorization:', error);
        setIsAuthorized(false);
        return false;
      }

      setIsAuthorized(data || false);
      return data || false;
    } catch (error) {
      console.error('Error in checkAuthorization:', error);
      setIsAuthorized(false);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event, newSession?.user?.email);
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (event === 'SIGNED_IN' && newSession?.user) {
        // Check authorization after setting user
        setTimeout(async () => {
          await checkAuthorization(newSession.user);
        }, 100);
        
        toast({
          title: "Signed in successfully",
          description: `Welcome, ${newSession.user.email}!`,
        });
      }
      
      if (event === 'SIGNED_OUT') {
        setIsAuthorized(false);
        toast({
          title: "Signed out successfully",
        });
      }

      if (event === 'USER_UPDATED') {
        toast({
          title: "User profile updated",
        });
      }

      setLoading(false);
    });

    // THEN check for existing session
    const setInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user || null);
        
        if (data.session?.user) {
          await checkAuthorization(data.session.user);
        }
      } catch (error) {
        console.error('Error setting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    setInitialUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    loading,
    isAuthorized,
  };
};
