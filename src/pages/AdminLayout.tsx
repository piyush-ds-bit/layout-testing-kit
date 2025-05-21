
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import MobileSidebar from '@/components/admin/MobileSidebar';
import { toast } from '@/components/ui/use-toast';

const AdminLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not loading and not authenticated, redirect to login
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to access the admin area.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-portfolio-darkest">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex h-screen bg-portfolio-darkest">
      {/* Desktop Sidebar */}
      <AdminSidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto bg-portfolio-dark p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
