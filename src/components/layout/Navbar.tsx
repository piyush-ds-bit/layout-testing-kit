import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAuthorized } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'GitHub', path: '/github' },
    { name: 'Connect', path: '/connect' },
    ...(isAuthorized ? [{ name: 'Messages', path: '/contact-messages' }] : []),
  ];

  return (
    <nav className="bg-portfolio-darker border-b border-portfolio-dark sticky top-0 z-40">
      <div className="portfolio-container py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-white">
          Piyush
        </Link>

        {/* Mobile Menu Button */}
        {isMobile ? (
          <button
            onClick={toggleMenu}
            className="text-portfolio-gray-light hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        ) : (
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `portfolio-navbar-item ${isActive ? 'active' : ''}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-portfolio-darker border-b border-portfolio-dark py-4">
          <div className="portfolio-container flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `portfolio-navbar-item ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
