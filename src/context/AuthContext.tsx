
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of authorized admin emails
const AUTHORIZED_EMAILS = ['piyushjuly04@gmail.com'];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthorization = (userEmail: string | undefined) => {
    if (!userEmail) return false;
    return AUTHORIZED_EMAILS.includes(userEmail.toLowerCase());
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      setIsAuthorized(checkAuthorization(newSession?.user?.email));
      setLoading(false);
      
      if (event === 'SIGNED_IN' && newSession) {
        const userEmail = newSession.user.email;
        const authorized = checkAuthorization(userEmail);
        
        if (authorized) {
          toast({
            title: "Admin access granted",
            description: `Welcome back, ${userEmail}!`,
          });
        } else {
          toast({
            title: "Access restricted",
            description: "You don't have admin privileges for this application.",
            variant: "destructive",
          });
        }
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
    });

    // THEN check for existing session
    const setInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user || null);
        setIsAuthorized(checkAuthorization(data.session?.user?.email));
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

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (!data.user) {
        toast({
          title: "Login failed",
          description: "No user found with these credentials",
          variant: "destructive",
        });
        throw new Error("No user found");
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      // Use window.location.origin and redirect to home after login for both envs
      const redirectPath = window.location.origin + '/';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectPath,
        },
      });
      if (error) {
        toast({
          title: "Google login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Google login failed",
        description: error?.message || "An unexpected error occurred during Google authentication.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAuthorized, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
