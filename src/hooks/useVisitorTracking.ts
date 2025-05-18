
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get device information
        const userAgent = navigator.userAgent;
        const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
        
        // Try to get location information
        let locationInfo = { city: 'Unknown', country: 'Unknown' };
        
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const data = await response.json();
            locationInfo = {
              city: data.city || 'Unknown',
              country: data.country_name || 'Unknown'
            };
          }
        } catch (error) {
          console.error('Error fetching location info:', error);
        }
        
        // Record visit in Supabase
        const { error } = await supabase.from('visitor_logs').insert([
          {
            device: `${deviceType} (${navigator.platform})`,
            browser: getBrowserInfo(userAgent),
            city: locationInfo.city,
            country: locationInfo.country,
            user_agent: userAgent.substring(0, 500), // Truncate if too long
            page_url: window.location.pathname,
            referrer: document.referrer || 'Direct'
          }
        ]);
        
        if (error) {
          console.error('Failed to log visitor:', error);
        }
      } catch (err) {
        console.error('Error in visitor tracking:', err);
      }
    };
    
    // Helper function to determine browser
    const getBrowserInfo = (userAgent: string) => {
      if (userAgent.includes('Firefox')) return 'Firefox';
      if (userAgent.includes('Chrome')) return 'Chrome';
      if (userAgent.includes('Safari')) return 'Safari';
      if (userAgent.includes('Edge')) return 'Edge';
      if (userAgent.includes('Opera')) return 'Opera';
      if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
      return 'Unknown';
    };
    
    // Track the visitor
    trackVisitor();
    
  }, []);
};
