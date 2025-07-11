
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Group } from 'three';

interface Bug3DProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  isVisible: boolean;
}

const Bug3D: React.FC<Bug3DProps> = ({ position, targetPosition, isVisible }) => {
  const bugRef = useRef<Group>(null);
  const wingLeftRef = useRef<Mesh>(null);
  const wingRightRef = useRef<Mesh>(null);
  
  const lerpSpeed = 0.02;
  
  useFrame((state) => {
    if (!bugRef.current || !isVisible) return;
    
    // Smooth movement towards target
    const currentPos = bugRef.current.position;
    const target = new Vector3(...targetPosition);
    currentPos.lerp(target, lerpSpeed);
    
    // Wing flapping animation
    const wingFlap = Math.sin(state.clock.elapsedTime * 20) * 0.3;
    if (wingLeftRef.current) {
      wingLeftRef.current.rotation.z = wingFlap;
    }
    if (wingRightRef.current) {
      wingRightRef.current.rotation.z = -wingFlap;
    }
    
    // Subtle floating motion
    const float = Math.sin(state.clock.elapsedTime * 3) * 0.1;
    bugRef.current.position.y += float * 0.1;
  });
  
  return (
    <group ref={bugRef} position={position} visible={isVisible} scale={0.5}>
      {/* Bug body - red ladybug */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshLambertMaterial color="#dc2626" />
      </mesh>
      
      {/* Bug head - darker red */}
      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshLambertMaterial color="#991b1b" />
      </mesh>
      
      {/* Black spots on the body */}
      <mesh position={[-0.03, 0.05, 0.02]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      <mesh position={[0.03, 0.05, 0.02]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.04, 0.02]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      
      {/* Left wing - transparent with slight red tint */}
      <mesh ref={wingLeftRef} position={[-0.05, 0.02, 0]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[0.08, 0.15]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Right wing - transparent with slight red tint */}
      <mesh ref={wingRightRef} position={[0.05, 0.02, 0]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.08, 0.15]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Antennae - black */}
      <mesh position={[-0.02, 0.05, 0.1]}>
        <cylinderGeometry args={[0.002, 0.002, 0.04]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      <mesh position={[0.02, 0.05, 0.1]}>
        <cylinderGeometry args={[0.002, 0.002, 0.04]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
    </group>
  );
};

export default Bug3D;
