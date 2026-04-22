"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  PerspectiveCamera,
  Html,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// Компонент с 3D моделькой
function ShoeModel({ scrollProgress = 0 }) {
  const groupRef = useRef<THREE.Group>(null);

  // Загружаем модель
  const { scene } = useGLTF("/shoes/n2.glb");

  // Клонируем сцену
  const clonedScene = scene.clone();

  useFrame((state) => {
    if (groupRef.current) {
      // Вращение от скролла
      const rotationY = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.y = rotationY + Math.PI; // + Math.PI это 180 градусов

      // Наклон от скролла
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;

      // Плавное движение вверх-вниз
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={2.8} />
    </group>
  );
}

// Стекломорфный прелоадер
function GlassLoader() {
  return (
    <Html center>
      <div className="relative">
        <div className="relative flex flex-col items-center justify-center gap-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-full backdrop-blur-2xl bg-white/20 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-2xl animate-spin-slow">
              <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/60 blur-[1px]" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/40 blur-[1px]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-white/20" />
            </div>
            <div className="absolute inset-[-2px] rounded-full border-2 border-transparent border-t-purple-500/60 border-r-pink-500/60 animate-spin" />
          </div>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Html>
  );
}

// Основной компонент с Canvas
export default function ThreeDShoe() {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Отслеживаем скролл на странице
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Вызываем сразу для начального значения

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Предзагружаем модель
  useGLTF.preload("/shoes/n2.glb");

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [5, 3, 8], fov: 45 }}
        className="cursor-grab active:cursor-grabbing"
        gl={{ preserveDrawingBuffer: true }}
      >
        <PerspectiveCamera makeDefault position={[5, 3, 8]} />

        {/* Освещение */}
        <ambientLight intensity={theme === "light" ? 0.7 : 0.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={{ width: 1024, height: 1024 }}
        />

        <pointLight
          position={[-3, 4, 2]}
          intensity={0.8}
          color={theme === "light" ? "#8B5CF6" : "#6366F1"}
        />

        <pointLight
          position={[3, 2, 4]}
          intensity={0.8}
          color={theme === "light" ? "#EC4899" : "#EC4899"}
        />

        <pointLight
          position={[0, 1, -3]}
          intensity={0.5}
          color={theme === "light" ? "#3B82F6" : "#60A5FA"}
        />

        <pointLight position={[0, -2, 0]} intensity={0.4} color="#FBBF24" />

        {/* 3D Модель с загрузкой */}
        <Suspense fallback={<GlassLoader />}>
          <ShoeModel scrollProgress={scrollProgress} />

          <Environment preset="city" />

          <Sparkles
            count={30}
            scale={[5, 5, 5]}
            size={0.3}
            color={theme === "light" ? "#8B5CF6" : "#A78BFA"}
            opacity={0.3}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
