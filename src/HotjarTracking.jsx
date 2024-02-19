import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Assuming you're using Next.js for routing
import { hotjar } from 'react-hotjar';

const HotjarTracking = () => {
  const router = useRouter();

  useEffect(() => {
    hotjar.initialize(3872526, 6); // Initialize Hotjar with your site ID and version
    router.events.on('routeChangeComplete', () => {
      hotjar.identify(); // Identify the user on each route change
    });
    return () => {
      router.events.off('routeChangeComplete', () => {
        hotjar.identify(); // Clean up event listener when component unmounts
      });
    };
  }, [router.events]);

  return null; // HotjarTracking component doesn't render anything
};

export default HotjarTracking;
