
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get device information
        const userAgent = navigator.userAgent;
        const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
        
        // Default location info that will be used if API fails
        let locationInfo = { city: 'Unknown', country: 'Unknown' };
        
        // Try to get location information with proper error handling
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const data = await response.json();
            locationInfo = {
              city: data.city || 'Unknown',
              country: data.country_name || 'Unknown'
            };
          } else {
            console.log('Location API returned non-OK status, using fallback');
          }
        } catch (error) {
          // CORS error or network error - use fallback silently
          console.log('Location tracking unavailable, using fallback location');
        }
        
        // Record visit in Supabase (this should work now with fixed RLS)
        const { error } = await supabase.from('visitor_logs').insert([{
          device: `${deviceType} (${navigator.platform})`,
          browser: getBrowserInfo(userAgent),
          city: locationInfo.city,
          country: locationInfo.country,
          user_agent: userAgent.substring(0, 500), // Truncate if too long
          page_url: window.location.pathname,
          referrer: document.referrer || 'Direct'
        }]);
        
        if (error) {
          console.error('Failed to log visitor:', error);
        } else {
          console.log('Visitor tracking recorded successfully');
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
