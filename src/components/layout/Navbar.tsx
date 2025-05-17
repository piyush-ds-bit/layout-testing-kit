
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Home, Menu, X, User, Code, Briefcase, Github, MessageSquare } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Skills", path: "/skills", icon: Code },
  { label: "Experience", path: "/experience", icon: Briefcase },
  { label: "LeetCode", path: "/leetcode", icon: Code },
  { label: "GitHub", path: "/github", icon: Github },
  { label: "Projects", path: "/projects", icon: Code },
  { label: "Connect", path: "/connect", icon: MessageSquare }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

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
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`portfolio-navbar-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <div className="flex items-center ml-4 space-x-3">
                  <span className="text-portfolio-gray-light">
                    Hi, {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                  </span>
                  <Button 
                    variant="outline" 
                    className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                  {user && (
                    <Link to="/admin">
                      <Button variant="outline" className="border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                        Dashboard
                      </Button>
                    </Link>
                  )}
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
              <Link
                key={item.path}
                to={item.path}
                className={`portfolio-navbar-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <span className="text-portfolio-gray-light">
                  Hi, {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                </span>
                <Button 
                  variant="outline" 
                  className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
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
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-bottom-nav-item-icon">
                <item.icon size={20} />
              </span>
              <span className="mobile-bottom-nav-item-label">{item.label}</span>
            </Link>
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
