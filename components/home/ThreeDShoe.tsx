"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
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

// Компонент с 3D моделью
function ShoeModel({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  // Загружаем GLB модель в зависимости от темы
  const { scene } = useGLTF(modelPath);

  // Клонируем сцену, чтобы не мутировать оригинал
  const clonedScene = scene.clone();

  useFrame((state) => {
    if (groupRef.current) {
      // Вращение при скролле (от начальной позиции)
      const rotationY = scrollYProgress.get() * Math.PI * 2;
      groupRef.current.rotation.y = rotationY;

      // Добавляем начальный поворот на 180 градусов
      groupRef.current.rotation.y += Math.PI;

      // Наклон при скролле
      groupRef.current.rotation.x =
        Math.sin(scrollYProgress.get() * Math.PI) * 0.2;

      // Плавное движение вверх-вниз
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  // Меняем материалы в зависимости от темы
  useFrame(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (theme === "dark") {
          // Затемняем для темной темы
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.emissiveIntensity = 0.1;
                mat.roughness = 0.6;
              });
            } else {
              child.material.emissiveIntensity = 0.1;
              child.material.roughness = 0.6;
            }
          }
        } else {
          // Делаем ярче для светлой темы
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.emissiveIntensity = 0.2;
                mat.roughness = 0.3;
              });
            } else {
              child.material.emissiveIntensity = 0.2;
              child.material.roughness = 0.3;
            }
          }
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={2.8} />
    </group>
  );
}

// Основной компонент с Canvas
export default function ThreeDShoe() {
  const { theme } = useTheme();
  const [modelPath, setModelPath] = useState("/shoes/n3.glb");

  // Меняем модель при смене темы
  useEffect(() => {
    setModelPath(theme === "light" ? "/shoes/n2.glb" : "/shoes/n2.glb");
  }, [theme]);

  // Предзагружаем обе модели
  useEffect(() => {
    useGLTF.preload("/shoes/n3.glb");
    useGLTF.preload("/shoes/n2.glb");
  }, []);

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        shadows
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
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
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

        {/* Подсветка снизу */}
        <pointLight position={[0, -2, 0]} intensity={0.4} color="#FBBF24" />

        {/* 3D Модель с загрузкой */}
        <Suspense
          key={modelPath}
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Загрузка 3D модели...
                </p>
              </div>
            </Html>
          }
        >
          <ShoeModel modelPath={modelPath} />

          {/* Окружение для рефлексов */}
          <Environment preset="city" />

          {/* Эффект частиц */}
          <Sparkles
            count={30}
            scale={[5, 5, 5]}
            size={0.3}
            color={theme === "light" ? "#8B5CF6" : "#A78BFA"}
            opacity={0.3}
          />
        </Suspense>

        {/* Орбитальный контроль - зум отключен */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          rotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
