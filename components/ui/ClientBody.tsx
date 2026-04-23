"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const backgroundImages = {
    light: "/sampleBg.png", // фон для светлой темы (карандаш)
    dark: "/sampleBgBl.png", // фон для тёмной темы (3D)
  };

  const currentBg = backgroundImages[theme as keyof typeof backgroundImages];

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </main>
  );
}
