"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Float, Sphere, Icosahedron } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// A single floating shape that interacts with physics
function Shape({ position, color, type }: { position: [number, number, number], color: string, type: 'sphere' | 'icosahedron' }) {
  const rigidBodyRef = useRef<any>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (rigidBodyRef.current && Math.abs(deltaY) > 2) {
        // Reduced the force multiplier so they don't get yeeted off-screen
        const force = Math.min(Math.max(deltaY * 0.015, -1), 1); 
        rigidBodyRef.current.applyImpulse({ 
          x: (Math.random() - 0.5) * Math.abs(force), 
          y: force * -0.5, 
          z: (Math.random() - 0.5) * Math.abs(force) 
        }, true);
        
        rigidBodyRef.current.applyTorqueImpulse({ 
          x: Math.random() * force * 0.5, 
          y: Math.random() * force * 0.5, 
          z: Math.random() * force * 0.5 
        }, true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (rigidBodyRef.current) {
      // Apply a very small gentle upward force to keep them floating
      const currentVelocity = rigidBodyRef.current.linvel();
      if (Math.abs(currentVelocity.y) < 0.1) {
        rigidBodyRef.current.applyImpulse({ 
          x: (Math.random() - 0.5) * 0.1, 
          y: (Math.random() - 0.5) * 0.1, 
          z: (Math.random() - 0.5) * 0.1 
        }, true);
      }
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      restitution={1.2} // Extra Bouncy
      linearDamping={0.6}
      angularDamping={0.6}
      gravityScale={0.05} // Very floaty
      colliders={type === 'sphere' ? "ball" : "hull"}
    >
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        {type === 'sphere' ? (
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </Sphere>
        ) : (
          <Icosahedron args={[1, 0]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </Icosahedron>
        )}
      </Float>
    </RigidBody>
  );
}

// Invisible walls to keep objects in view
function Boundaries() {
  const { viewport } = useThree();
  const width = viewport.width;
  const height = viewport.height;
  const depth = 20;

  return (
    <>
      <RigidBody type="fixed" position={[0, -height / 2 - 1, 0]} restitution={1.5}>
        <mesh visible={false}><boxGeometry args={[width * 2, 2, depth]} /><meshBasicMaterial /></mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, height / 2 + 1, 0]} restitution={1.5}>
        <mesh visible={false}><boxGeometry args={[width * 2, 2, depth]} /><meshBasicMaterial /></mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-width / 2 - 1, 0, 0]} restitution={1.5}>
        <mesh visible={false}><boxGeometry args={[2, height * 2, depth]} /><meshBasicMaterial /></mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[width / 2 + 1, 0, 0]} restitution={1.5}>
        <mesh visible={false}><boxGeometry args={[2, height * 2, depth]} /><meshBasicMaterial /></mesh>
      </RigidBody>
      {/* Front and back walls to keep them from flying out */}
      <RigidBody type="fixed" position={[0, 0, 5]} restitution={1}>
        <mesh visible={false}><boxGeometry args={[width * 2, height * 2, 2]} /><meshBasicMaterial /></mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -10]} restitution={1}>
        <mesh visible={false}><boxGeometry args={[width * 2, height * 2, 2]} /><meshBasicMaterial /></mesh>
      </RigidBody>
    </>
  );
}

function Pointer() {
  const ref = useRef<any>(null);
  const { viewport } = useThree();
  
  useFrame(({ pointer }) => {
    if (ref.current) {
      // The pointer coordinates are normalized (-1 to +1)
      ref.current.setNextKinematicTranslation({
        x: (pointer.x * viewport.width) / 2,
        y: (pointer.y * viewport.height) / 2,
        z: 0
      });
    }
  });

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <mesh visible={false}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
    </RigidBody>
  );
}

export default function Background3D() {
  const shapes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 5] as [number, number, number],
      color: Math.random() > 0.5 ? '#f40c3f' : '#6e0419',
      type: Math.random() > 0.5 ? 'sphere' : 'icosahedron' as 'sphere' | 'icosahedron'
    }));
  }, []);

  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-transparent">
      {eventSource && (
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 45 }}
          eventSource={eventSource}
          className="pointer-events-none"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#e50b3b" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#310108" />
          
          <Physics gravity={[0, 0, 0]}>
            <Pointer />
            <Boundaries />
            {shapes.map((shape) => (
              <Shape key={shape.id} position={shape.position} color={shape.color} type={shape.type} />
            ))}
          </Physics>
        </Canvas>
      )}
    </div>
  );
}
