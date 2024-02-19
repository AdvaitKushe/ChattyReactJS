import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

const HotjarTracking = () => {
  useEffect(() => {
    hotjar.initialize(3872526, 6); // Initialize Hotjar with your site ID and version
  }, []);

  return null; // HotjarTracking component doesn't render anything
};

export default HotjarTracking;
