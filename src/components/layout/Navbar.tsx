
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from "@/components/ui/button";
import { Home, Menu, X, User, Code, Briefcase, Github, MessageSquare, BookOpen, Mail } from "lucide-react";
import LogoutConfirmationDialog from "@/components/auth/LogoutConfirmationDialog";
import EditModeToggle from "@/components/admin/EditModeToggle";
import MobileHamburgerMenu from '@/components/mobile/MobileHamburgerMenu';
import MobileSidePanel from '@/components/mobile/MobileSidePanel';

const navItems = [
  { label: "Home", path: "/", icon: Home, sectionId: "hero" },
  { label: "Skills", path: "/skills", icon: Code, sectionId: "skills" },
  { label: "Experience", path: "/experience", icon: Briefcase, sectionId: "experience" },
  { label: "Blog", path: "/blog", icon: BookOpen, sectionId: "blog" },
  { label: "GitHub", path: "/github", icon: Github, sectionId: "github" },
  { label: "Projects", path: "/projects", icon: Code, sectionId: "projects" },
  { label: "Connect", path: "/connect", icon: MessageSquare, sectionId: "connect" }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const location = useLocation();
  const { user, isAuthorized, signOut } = useAuth();
  const scrollToSection = useScrollToSection();
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleResize = () => {
      setShowMobileNav(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.path === '/') {
      // Always navigate to home for the home link
      return;
    }
    
    scrollToSection(item.sectionId, item.path);
    setIsOpen(false);
  };

  const isActiveItem = (item: typeof navItems[0]) => {
    if (location.pathname === '/') {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-portfolio-darkest/80 backdrop-blur-md border-b border-portfolio-dark">
        <div className="portfolio-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-white hover:text-portfolio-accent transition-colors">
                <Home className="w-5 h-5" />
                <span className="text-xl font-semibold">Portfolio</span>
              </Link>
              <EditModeToggle />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                item.path === '/' ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`portfolio-navbar-item ${
                      isActiveItem(item) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item)}
                    className={`portfolio-navbar-item ${
                      isActiveItem(item) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              
              {user ? (
                <div className="flex items-center ml-4 space-x-3">
                  <span className="text-portfolio-gray-light">
                    Hi, {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                  </span>
                  {isAuthorized && (
                    <Link to="/contact-messages">
                      <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                        <Mail className="w-4 h-4 mr-2" />
                        Messages
                      </Button>
                    </Link>
                  )}
                  <LogoutConfirmationDialog onLogout={signOut}>
                    <Button 
                      variant="outline" 
                      className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                    >
                      Logout
                    </Button>
                  </LogoutConfirmationDialog>
                </div>
              ) : (
                <Link to="/login" className="ml-4">
                  <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* New Mobile Hamburger Menu - Only visible on mobile */}
      <MobileHamburgerMenu 
        isOpen={isMobilePanelOpen} 
        onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)} 
      />
      
      {/* New Mobile Side Panel */}
      <MobileSidePanel 
        isOpen={isMobilePanelOpen} 
        onClose={() => setIsMobilePanelOpen(false)} 
      />
    </>
  );
};

export default Navbar;
