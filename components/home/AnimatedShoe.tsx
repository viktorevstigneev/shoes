"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function AnimatedShoe() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Вращение по оси Y при скролле
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // Наклон по оси X
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);
  // Позиция по Y для параллакса
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Масштаб
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  // Разные картинки для темной и светлой темы
  const shoeImage =
    theme === "light"
      ? "/shoes/kik-l.png" // Светлая версия
      : "/shoes/sneaker-dark.png"; // Темная версия

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center"
    >
      <motion.div
        style={{
          rotateY,
          rotateX,
          y,
          scale,
        }}
        className="relative w-80 h-80 md:w-[500px] md:h-[500px] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* 3D эффект через тени */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

        <motion.img
          src={shoeImage}
          alt="3D Sneaker"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter:
              theme === "dark"
                ? "brightness(1.1) contrast(1.1)"
                : "brightness(1)",
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        />

        {/* Блики для 3D эффекта */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)",
            opacity: theme === "light" ? 0.6 : 0.3,
          }}
        />
      </motion.div>
    </div>
  );
}
