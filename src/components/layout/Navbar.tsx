
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from "@/components/ui/button";
import { Home, Menu, X, User, Code, Briefcase, Github, MessageSquare, BookOpen, Mail } from "lucide-react";
import LogoutConfirmationDialog from "@/components/auth/LogoutConfirmationDialog";
import EditModeToggle from "@/components/admin/EditModeToggle";

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

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-portfolio-accent transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`md:hidden fixed top-[62px] left-0 right-0 bg-portfolio-darkest border-b border-portfolio-dark transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="portfolio-container py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              item.path === '/' ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`portfolio-navbar-item ${
                    isActiveItem(item) ? "active" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`portfolio-navbar-item text-left ${
                    isActiveItem(item) ? "active" : ""
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            
            {user && (
              <div className="flex flex-col space-y-2 pt-2">
                <span className="text-portfolio-gray-light">
                  Hi, {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                </span>
                {isAuthorized && (
                  <Link to="/contact-messages" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                )}
                <LogoutConfirmationDialog onLogout={signOut}>
                  <Button 
                    variant="outline" 
                    className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                  >
                    Logout
                  </Button>
                </LogoutConfirmationDialog>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Android-style Bottom Navigation for Mobile */}
      {showMobileNav && (
        <nav className="mobile-bottom-nav md:hidden">
          {navItems.slice(0, 5).map((item) => (
            item.path === '/' ? (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-bottom-nav-item ${isActiveItem(item) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mobile-bottom-nav-item-icon">
                  <item.icon size={20} />
                </span>
                <span className="mobile-bottom-nav-item-label">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`mobile-bottom-nav-item ${isActiveItem(item) ? 'active' : ''}`}
              >
                <span className="mobile-bottom-nav-item-icon">
                  <item.icon size={20} />
                </span>
                <span className="mobile-bottom-nav-item-label">{item.label}</span>
              </button>
            )
          ))}
          <Link to="/connect" className="mobile-bottom-nav-item">
            <span className="mobile-bottom-nav-item-icon">
              <User size={20} />
            </span>
            <span className="mobile-bottom-nav-item-label">Account</span>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
