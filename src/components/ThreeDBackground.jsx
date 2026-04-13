import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const InteractiveSwarm = ({ isDark, mouseRef, particleCount }) => {
  const count = particleCount;
  const meshRef = useRef();

  // Create initial particle field - shaped like a galaxy/wave
  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Widespread galaxy distribution
      const r = 35 * Math.sqrt(Math.random()); 
      const theta = Math.random() * 2 * Math.PI;
      
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = (Math.random() - 0.5) * 12;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { positions: pos, originalPositions: orig };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Slow cinematic global swirl of the whole system
    meshRef.current.rotation.z = time * 0.02;

    // Convert normalized mouse coordinates to 3D Viewport space
    const mx = (mouseRef.current.x * state.viewport.width) / 2;
    const my = (mouseRef.current.y * state.viewport.height) / 2;

    const posAttr = meshRef.current.geometry.attributes.position;
    const pa = posAttr.array;

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Default breathing/wave motion
        let nx = ox + Math.sin(time + ox * 0.1) * 0.8;
        let ny = oy + Math.cos(time + oy * 0.1) * 0.8;
        let nz = oz + Math.sin(time + oz * 0.1) * 0.8;

        // Determine if mouse is interacting
        // The mesh rotates over time, so basic XY distance creates a beautiful dynamic leading/trailing "vortex"
        const dx = nx - mx;
        const dy = ny - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Highly attractive interactive vortex repulsion
        if (dist < 6) {
            const force = (6 - dist) / 6;
            // Particles scatter violently and pop forward towards the camera
            nx += dx * force * 0.3;
            ny += dy * force * 0.3;
            nz += force * 4; 
        }

        pa[i3] = nx;
        pa[i3 + 1] = ny;
        pa[i3 + 2] = nz;
    }
    
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        // Glows gold in dark mode, and black in light mode!
        color={isDark ? '#f1c40f' : '#000000'}
        size={isDark ? 0.12 : 0.08}
        sizeAttenuation
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.8 : 0.8}
      />
    </points>
  );
};

const ThreeDBackground = () => {
  const { isDark } = useTheme();
  const [particleCount, setParticleCount] = useState(4800);
  const [dpr, setDpr] = useState([1, 1.25]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setParticleCount(reduce.matches ? 900 : 4800);
      setDpr(reduce.matches ? [1, 1] : [1, 1.25]);
    };
    apply();
    reduce.addEventListener('change', apply);
    return () => reduce.removeEventListener('change', apply);
  }, []);

  // Track global mouse position so the canvas can remain pointerEvents: 'none'
  // ensuring users can still click the website!
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none', // Prevents blocking clicks on real elements
        opacity: 0.8,
      }}
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <InteractiveSwarm isDark={isDark} mouseRef={mouseRef} particleCount={particleCount} />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
