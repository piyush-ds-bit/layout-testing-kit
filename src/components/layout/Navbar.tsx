import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from "@/components/ui/button";
import { Home, Menu, X, Code, Briefcase, Github, MessageSquare, BookOpen, Mail, Compass, ChevronDown, ChevronUp } from "lucide-react";
import LogoutConfirmationDialog from "@/components/auth/LogoutConfirmationDialog";
import EditModeToggle from "@/components/admin/EditModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const exploreItems = [
  { label: "Home", path: "/", icon: Home, sectionId: "hero" },
  { label: "Skills", path: "/skills", icon: Code, sectionId: "skills" },
  { label: "Projects", path: "/projects", icon: Code, sectionId: "projects" },
  { label: "Blogs", path: "/blog", icon: BookOpen, sectionId: "blog" },
  { label: "Experience", path: "/experience", icon: Briefcase, sectionId: "experience" },
  { label: "Connect", path: "/connect", icon: MessageSquare, sectionId: "connect" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
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
    if (isOpen) setMobileExploreOpen(false);
  };

  const handleNavClick = (item: typeof exploreItems[0]) => {
    if (item.path === '/') {
      return;
    }
    scrollToSection(item.sectionId, item.path);
    setIsOpen(false);
    setMobileExploreOpen(false);
  };

  const isActiveItem = (item: typeof exploreItems[0]) => {
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
            <nav className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="explore-button flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:text-portfolio-accent">
                    <Compass className="w-5 h-5" />
                    <span>Explore</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="min-w-[200px] bg-portfolio-darkest/95 backdrop-blur-md border border-portfolio-accent/30 shadow-xl shadow-portfolio-accent/10"
                  align="end"
                  sideOffset={8}
                >
                  {exploreItems.map((item) => (
                    <DropdownMenuItem
                      key={item.path}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 text-white hover:bg-portfolio-accent/20 hover:text-portfolio-accent focus:bg-portfolio-accent/20 focus:text-portfolio-accent ${
                        isActiveItem(item) ? 'bg-portfolio-accent/10 text-portfolio-accent' : ''
                      } ${item.label === 'Blogs' ? 'blog-glow-item' : ''}`}
                      onClick={() => {
                        if (item.path === '/') {
                          window.location.href = '/';
                        } else {
                          handleNavClick(item);
                        }
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {user ? (
                <div className="flex items-center ml-2 space-x-3">
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
                    <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                      Logout
                    </Button>
                  </LogoutConfirmationDialog>
                </div>
              ) : (
                <Link to="/login" className="ml-2">
                  <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                    Login
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-white hover:text-portfolio-accent transition-colors" aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden fixed top-[62px] left-0 right-0 bg-portfolio-darkest/95 backdrop-blur-md border-b border-portfolio-dark transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} transition-all duration-300 ease-in-out`}>
          <div className="p-4 space-y-2">
            {/* Explore Accordion */}
            <button
              onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
              className="explore-button w-full flex items-center justify-between px-4 py-3 rounded-lg text-white font-medium transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5" />
                <span>Explore</span>
              </div>
              {mobileExploreOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {/* Explore Sub-items */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExploreOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 space-y-1">
                {exploreItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      if (item.path === '/') {
                        window.location.href = '/';
                        setIsOpen(false);
                      } else {
                        handleNavClick(item);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-200 ${
                      isActiveItem(item) ? 'bg-portfolio-accent/10 text-portfolio-accent' : ''
                    } ${item.label === 'Blogs' ? 'blog-glow-item' : ''}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="pt-4 border-t border-portfolio-dark space-y-2">
                <span className="block px-4 text-portfolio-gray-light text-sm">
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
                  <Button variant="outline" className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                    Logout
                  </Button>
                </LogoutConfirmationDialog>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block pt-4 border-t border-portfolio-dark">
                <Button variant="outline" className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Android-style Bottom Navigation for Mobile */}
      {showMobileNav && (
        <nav className="mobile-bottom-nav md:hidden">
          {exploreItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => {
                if (item.path === '/') {
                  window.location.href = '/';
                } else {
                  handleNavClick(item);
                }
              }}
              className={`mobile-bottom-nav-item ${isActiveItem(item) ? 'active' : ''}`}
            >
              <span className="mobile-bottom-nav-item-icon">
                <item.icon size={20} />
              </span>
              <span className="mobile-bottom-nav-item-label">{item.label}</span>
            </button>
          ))}
          <Link to="/connect" className="mobile-bottom-nav-item">
            <span className="mobile-bottom-nav-item-icon">
              <MessageSquare size={20} />
            </span>
            <span className="mobile-bottom-nav-item-label">Connect</span>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;