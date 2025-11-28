import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced 3D Animated Logo Component
const AnimatedLogo3D = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
      // Smooth rotation
      groupRef.current.rotation.y = time * 0.1;
    }

    if (starRef.current) {
      // Multi-axis rotation for the star
      starRef.current.rotation.x = time * 0.3;
      starRef.current.rotation.y = time * 0.5;
      starRef.current.rotation.z = time * 0.2;

      // Pulsing effect
      const scale = 1 + Math.sin(time * 1.5) * 0.15;
      starRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.4;
      ringRef1.current.rotation.y = time * 0.3;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 0.3;
      ringRef2.current.rotation.z = time * 0.4;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  // Create particle field
  const particleCount = 100;
  const particles = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particles[i] = (Math.random() - 0.5) * 8;
    particles[i + 1] = (Math.random() - 0.5) * 8;
    particles[i + 2] = (Math.random() - 0.5) * 8;
  }

  return (
    <group ref={groupRef}>
      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#f97316" transparent opacity={0.6} />
      </points>

      {/* Main 3D Star */}
      <mesh ref={starRef} position={[0, 0.5, 0]}>
        <octahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#ff6b1a"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Outer rotating ring */}
      <mesh ref={ringRef1} position={[0, 0.5, 0]}>
        <torusGeometry args={[2, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner rotating ring */}
      <mesh ref={ringRef2} position={[0, 0.5, 0]}>
        <torusGeometry args={[1.5, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Additional accent spheres */}
      <mesh position={[2.5, 0.5, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[-2.5, 0.5, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, 0.5, 2.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Enhanced lighting */}
      <pointLight position={[3, 3, 3]} intensity={2} color="#f97316" />
      <pointLight position={[-3, -2, -2]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[0, 2, -3]} intensity={1.5} color="#10b981" />
      <spotLight
        position={[0, 5, 0]}
        intensity={1}
        angle={0.5}
        penumbra={1}
        color="#ffffff"
        castShadow
      />
    </group>
  );
};

const AnimatedLogo = () => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedLogo3D />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          enabled={typeof window !== 'undefined' && window.innerWidth > 768}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedLogo;
