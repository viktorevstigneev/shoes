"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThreeDShoe from "./ThreeDShoe";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const backgroundImages = {
    light: {
      main: "/bg22.png",
      overlay: "",
    },
    dark: {
      main: "/bg.jpg",
      overlay: "",
    },
  };

  const currentBg =
    theme === "light" ? backgroundImages.light : backgroundImages.dark;

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Фоновое изображение с параллаксом */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={currentBg.main}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className={`absolute inset-0 z-20 ${currentBg.overlay}`} />

      {/* Основной контент */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая часть с текстом */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="dark:text-white text-5xl md:text-7xl font-bold mb-6 text-black"
              >
                J&V Sneakers
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="dark:text-white text-xl md:text-2xl mb-8 text-black max-w-xl mx-auto lg:mx-0"
              >
                Твой идеальный стиль начинается здесь.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/catalog"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-black dark:bg-white dark:text-black rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10">В каталог</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 ml-2">→</span>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-black dark:text-gray-300 border-2 border-black dark:border-gray-600 rounded-full hover:bg-black hover:text-white dark:hover:border-white dark:hover:text-white transition-all hover:scale-105"
                >
                  Узнать больше
                </Link>
              </motion.div>
            </motion.div>

            {/* Правая часть с 3D */}

            <ThreeDShoe />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
