
import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Bug3D from './Bug3D';

const RoamingBug: React.FC = () => {
  const [bugPosition, setBugPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });

  // Convert screen coordinates to 3D world coordinates
  const screenTo3D = useCallback((x: number, y: number): [number, number, number] => {
    const normalizedX = (x / screenDimensions.width) * 2 - 1;
    const normalizedY = -(y / screenDimensions.height) * 2 + 1;
    return [normalizedX * 5, normalizedY * 3, 0];
  }, [screenDimensions]);

  // Generate random position on screen
  const getRandomPosition = useCallback((): [number, number, number] => {
    const x = Math.random() * screenDimensions.width;
    const y = Math.random() * screenDimensions.height;
    return screenTo3D(x, y);
  }, [screenTo3D, screenDimensions]);

  // Update screen dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Bug behavior logic
  useEffect(() => {
    if (screenDimensions.width === 0) return;

    const bugLifecycle = () => {
      // Hide the bug
      setIsVisible(false);
      
      // Wait before appearing (2-8 seconds)
      const hideTime = 2000 + Math.random() * 6000;
      
      setTimeout(() => {
        // Set new starting position
        const newPos = getRandomPosition();
        setBugPosition(newPos);
        setTargetPosition(newPos);
        setIsVisible(true);
        
        // Start roaming
        let roamingInterval: NodeJS.Timeout;
        const startRoaming = () => {
          roamingInterval = setInterval(() => {
            setTargetPosition(getRandomPosition());
          }, 1500 + Math.random() * 2000); // Move every 1.5-3.5 seconds
        };
        
        startRoaming();
        
        // Disappear after roaming (8-15 seconds)
        const roamTime = 8000 + Math.random() * 7000;
        setTimeout(() => {
          clearInterval(roamingInterval);
          bugLifecycle(); // Start the cycle again
        }, roamTime);
        
      }, hideTime);
    };

    // Start the first cycle after a short delay
    const initialDelay = setTimeout(bugLifecycle, 3000);
    
    return () => {
      clearTimeout(initialDelay);
    };
  }, [getRandomPosition, screenDimensions]);

  if (screenDimensions.width === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'normal' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Bug3D 
          position={bugPosition}
          targetPosition={targetPosition}
          isVisible={isVisible}
        />
      </Canvas>
    </div>
  );
};

export default RoamingBug;
