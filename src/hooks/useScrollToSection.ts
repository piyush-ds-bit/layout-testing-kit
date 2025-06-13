
import { useLocation, useNavigate } from 'react-router-dom';

export const useScrollToSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string, routePath: string) => {
    if (location.pathname === '/') {
      // On homepage - scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // On other pages - navigate to route
      navigate(routePath);
    }
  };

  return scrollToSection;
};
