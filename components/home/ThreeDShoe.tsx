"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
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

  useFrame(() => {
    if (groupRef.current) {
      // При скролле от 0 до 1:
      // - позиция Y меняется от 3 (вверху) до 0 (на земле)
      // - вращение X меняется от наклона к горизонтали

      // Падение вниз: startY=3, endY=0
      const targetY = 3 - scrollProgress * 3;
      // Наклон при падении: от 0.8 до 0
      const targetRotX = (2 - scrollProgress) * 0.8;
      const targetRotZ = (0.1 - scrollProgress) * 3;

      groupRef.current.position.y = targetY;
      groupRef.current.rotation.x = targetRotX;
      groupRef.current.rotation.z = targetRotZ;

      // Вращение по Y для красоты
      groupRef.current.rotation.y = scrollProgress * Math.PI;
      groupRef.current.rotation.x = scrollProgress * Math.PI*2;
      // groupRef.current.rotation.z = scrollProgress * Math.PI;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]} rotation={[0.8, 0, 0]}>
      <primitive object={clonedScene} scale={2.5} />
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
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Предзагружаем модель
  useGLTF.preload("/shoes/n2.glb");

  return (
    <div className="w-full h-full relative">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 5, 5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* Камера сверху-спереди - смотрим на кроссовок сверху вниз */}
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

        {/* Освещение */}
        <ambientLight intensity={theme === "light" ? 0.6 : 0.3} />

        {/* Основной свет сверху */}
        <directionalLight
          position={[0, 8, 2]}
          intensity={1.5}
          castShadow
          shadow-mapSize={{ width: 1024, height: 1024 }}
        />

        {/* Заполняющий свет спереди */}
        <directionalLight
          position={[0, 2, 5]}
          intensity={0.6}
          color={theme === "light" ? "#ffffff" : "#8B5CF6"}
        />

        {/* Контровый свет сзади */}
        <pointLight
          position={[0, 3, -4]}
          intensity={0.5}
          color={theme === "light" ? "#FBBF24" : "#EC4899"}
        />

        {/* Боковые акценты */}
        <pointLight
          position={[-3, 4, 2]}
          intensity={0.5}
          color={theme === "light" ? "#3B82F6" : "#6366F1"}
        />

        <pointLight
          position={[3, 4, 2]}
          intensity={0.5}
          color={theme === "light" ? "#EC4899" : "#A78BFA"}
        />

        {/* Свет снизу для бликов */}
        <pointLight position={[0, -2, 0]} intensity={0.3} color="#FBBF24" />

        {/* 3D Модель с загрузкой */}
        <Suspense fallback={<GlassLoader />}>
          <ShoeModel scrollProgress={scrollProgress} />

          <Environment preset="city" />

          <Sparkles
            count={30}
            scale={[6, 6, 6]}
            size={0.2}
            color={theme === "light" ? "#8B5CF6" : "#A78BFA"}
            opacity={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
