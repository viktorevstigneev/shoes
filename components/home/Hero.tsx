"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThreeDShoe from "./ThreeDShoe";
import { GlassButton } from "react-glass-ui";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const backgroundImages = {
    light: {
      main: "/3dBg222.png",
    },
    dark: {
      main: "/3dBg1.png",
    },
  };

  const currentBg =
    theme === "light" ? backgroundImages.light : backgroundImages.dark;
  const is3DTheme = theme === "dark";

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${currentBg.main})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed",
      }}
    >
      {/* Слой с 3D кроссовками на фоне — показываем только для dark темы (3D) */}
      {is3DTheme && (
        <div className="absolute inset-0 pointer-events-none">
          <ThreeDShoe />
        </div>
      )}

      {/* Основной контент поверх всего */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Левая часть с текстом */}
            <div className="text-center lg:text-left">
              <h1 className="dark:text-white text-5xl md:text-7xl font-bold mb-6 text-black">
                J&V Sneakers
              </h1>

              <p className="dark:text-white text-xl md:text-2xl mb-12 text-black max-w-xl mx-auto lg:mx-0">
                Твой идеальный стиль начинается здесь.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link href="/catalog" className="block sm:w-[200px] w-full">
                  <GlassButton
                    blur={1}
                    distortion={15}
                    flexibility={25}
                    borderRadius={40}
                    borderSize={1.5}
                    borderOpacity={0.4}
                    borderColor={theme === "dark" ? "#ffffff" : "#000000"}
                    backgroundColor={theme === "dark" ? "#000000" : "#ffffff"}
                    backgroundOpacity={0.15}
                    innerLightColor="#ffffff"
                    innerLightSpread={2}
                    innerLightBlur={15}
                    innerLightOpacity={0.25}
                    outerLightColor="#ffffff"
                    outerLightSpread={3}
                    outerLightBlur={20}
                    outerLightOpacity={0.15}
                    color={theme === "dark" ? "#ffffff" : "#000000"}
                    chromaticAberration={1.5}
                    onHoverScale={1.05}
                    saturation={120}
                    brightness={105}
                    className="transition-all duration-300 w-full !flex !items-center !justify-center"
                  >
                    <span className="whitespace-nowrap sm:whitespace-normal">
                      В каталог
                    </span>
                  </GlassButton>
                </Link>

                <Link href="/about" className="block sm:w-[200px] w-full">
                  <GlassButton
                    blur={1}
                    distortion={8}
                    flexibility={20}
                    borderRadius={40}
                    borderSize={1}
                    borderOpacity={0.3}
                    borderColor={theme === "dark" ? "#ffffff" : "#000000"}
                    backgroundColor={theme === "dark" ? "#000000" : "#ffffff"}
                    backgroundOpacity={0.08}
                    innerLightColor="#ffffff"
                    innerLightSpread={1}
                    innerLightBlur={10}
                    innerLightOpacity={0.15}
                    outerLightColor="#ffffff"
                    outerLightSpread={2}
                    outerLightBlur={15}
                    outerLightOpacity={0.1}
                    color={theme === "dark" ? "#ffffffcc" : "#000000cc"}
                    chromaticAberration={1}
                    onHoverScale={1.05}
                    saturation={110}
                    brightness={102}
                    className="transition-all duration-300 w-full !flex !items-center !justify-center"
                  >
                    <span className="flex items-center justify-center gap-2 whitespace-nowrap sm:whitespace-normal">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Узнать больше
                    </span>
                  </GlassButton>
                </Link>
              </div>
            </div>

            {/* Правая часть пустая */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
