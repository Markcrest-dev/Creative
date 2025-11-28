import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// Custom hook for advanced 3D animations
export const use3DAnimations = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Handle mouse movement for interactive 3D effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Advanced animation loop with scroll-based effects
  const animate3D = useCallback((state: any, delta: number) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Subtle rotation based on time
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

      // Mouse-based interaction
      if (isIntersecting) {
        groupRef.current.rotation.y += mousePosition.x * 0.005;
        groupRef.current.rotation.x += mousePosition.y * 0.005;
      }

      // Scroll-based scaling effect
      const scale = 1 + Math.sin(scrollY * 0.01) * 0.1;
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [isIntersecting, mousePosition, scrollY]);

  // Morphing effect for advanced 3D objects
  const morphGeometry = useCallback((geometry: THREE.BufferGeometry, targetGeometry: THREE.BufferGeometry, progress: number) => {
    if (!geometry.attributes.position || !targetGeometry.attributes.position) return;

    const positionAttribute = geometry.attributes.position;
    const targetPositionAttribute = targetGeometry.attributes.position;

    if (positionAttribute.count !== targetPositionAttribute.count) return;

    const positions = positionAttribute.array as Float32Array;
    const targetPositions = targetPositionAttribute.array as Float32Array;

    for (let i = 0; i < positions.length; i++) {
      positions[i] = THREE.MathUtils.lerp(positions[i], targetPositions[i], progress);
    }

    positionAttribute.needsUpdate = true;
  }, []);

  // Complex animation sequence
  const runAnimationSequence = useCallback((sequence: Array<(state: any, delta: number) => void>, currentIndex: number) => {
    return (state: any, delta: number) => {
      if (currentIndex < sequence.length) {
        sequence[currentIndex](state, delta);
      }
    };
  }, []);

  return {
    isIntersecting,
    setIsIntersecting,
    mousePosition,
    scrollY,
    meshRef,
    groupRef,
    animate3D,
    morphGeometry,
    runAnimationSequence
  };
};