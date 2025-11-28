import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Compact 3D Animated Logo for Header/Navigation
const CompactLogo3D = () => {
    const starRef = useRef<THREE.Mesh>(null!);
    const ringRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (starRef.current) {
            // Multi-axis rotation for the star
            starRef.current.rotation.x = time * 0.3;
            starRef.current.rotation.y = time * 0.5;
            starRef.current.rotation.z = time * 0.2;

            // Pulsing effect
            const scale = 1 + Math.sin(time * 1.5) * 0.1;
            starRef.current.scale.set(scale, scale, scale);
        }

        if (ringRef.current) {
            ringRef.current.rotation.x = time * 0.4;
            ringRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <group>
            {/* Main 3D Star */}
            <mesh ref={starRef} position={[0, 0, 0]}>
                <octahedronGeometry args={[0.5, 1]} />
                <meshStandardMaterial
                    color="#f97316"
                    emissive="#ff6b1a"
                    emissiveIntensity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Rotating ring */}
            <mesh ref={ringRef} position={[0, 0, 0]}>
                <torusGeometry args={[0.8, 0.04, 16, 100]} />
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

            {/* Lighting */}
            <pointLight position={[2, 2, 2]} intensity={1.5} color="#f97316" />
            <pointLight position={[-2, -1, -1]} intensity={1} color="#3b82f6" />
        </group>
    );
};

const CompactAnimatedLogo = () => {
    return (
        <div className="w-10 h-10 md:w-12 md:h-12">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <CompactLogo3D />
            </Canvas>
        </div>
    );
};

export default CompactAnimatedLogo;
