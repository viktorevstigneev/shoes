"use client";

import { GlassCard } from "react-glass-ui";
import { useTheme } from "@/context/ThemeContext";

interface ProductSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  totalCount: number;
}

export function ProductSort({
  sortBy,
  onSortChange,
  totalCount,
}: ProductSortProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const glassConfig = {
    blur: 17,
    distortion: 25,
    flexibility: 0,
    borderColor: isDark ? "#ffffff" : "#000000",
    borderSize: 1,
    borderRadius: 20,
    borderOpacity: isDark ? 0.3 : 0.15,
    backgroundColor: isDark ? "#000000ff" : "#ffffffff",
    backgroundOpacity: isDark ? 0.3 : 0.5,
    innerLightColor: isDark ? "#ffffff" : "#000000",
    innerLightSpread: 1,
    innerLightBlur: 8,
    innerLightOpacity: isDark ? 0.1 : 0.05,
    outerLightColor: isDark ? "#ffffff" : "#000000",
    outerLightSpread: 1,
    outerLightBlur: 8,
    outerLightOpacity: isDark ? 0.08 : 0.03,
    color: "#ffffff",
    chromaticAberration: 0.3,
    onHoverScale: 1,
    saturation: 110,
    brightness: isDark ? 100 : 98,
  };

  return (
    <div className="mb-6">
      <GlassCard
        {...glassConfig}
        // @ts-ignore
        width={"100%"}
      >
        <div className="p-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Найдено:{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {totalCount}
            </span>
          </p>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-200
              ${
                isDark
                  ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  : "bg-gray-100 text-gray-700 border border-black/10 hover:bg-gray-200"
              }
            `}
          >
            <option
              value="popular"
              className={
                isDark ? "bg-black text-white" : "bg-white text-gray-900"
              }
            >
              По умолчанию
            </option>
            <option
              value="price-asc"
              className={
                isDark ? "bg-black text-white" : "bg-white text-gray-900"
              }
            >
              Сначала дешевле
            </option>
            <option
              value="price-desc"
              className={
                isDark ? "bg-black text-white" : "bg-white text-gray-900"
              }
            >
              Сначала дороже
            </option>
          </select>
        </div>
      </GlassCard>
    </div>
  );
}
