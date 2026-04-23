import { brands, PriceRange, priceRanges } from "@/data/filterConstants";
import { GlassCard } from "react-glass-ui";
import { useTheme } from "@/context/ThemeContext";

interface FilterSidebarProps {
  selectedBrand: string;
  selectedPrice: PriceRange;
  onBrandChange: (brand: string) => void;
  onPriceChange: (price: PriceRange) => void;
}

export function FilterSidebar({
  selectedBrand,
  selectedPrice,
  onBrandChange,
  onPriceChange,
}: FilterSidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const glassConfig = {
    blur: 37,
    distortion: 39,
    flexibility: 0,
    borderColor: isDark ? "#ffffff" : "#000000",
    borderSize: 1,
    borderRadius: 30,
    borderOpacity: isDark ? 0.4 : 0.2,
    backgroundColor: isDark ? "#000000ff" : "#ffffffff",
    backgroundOpacity: isDark ? 0.3 : 0.5,
    innerLightColor: isDark ? "#ffffff" : "#000000",
    innerLightSpread: 1,
    innerLightBlur: 10,
    innerLightOpacity: isDark ? 0.15 : 0.05,
    outerLightColor: isDark ? "#ffffff" : "#000000",
    outerLightSpread: 1,
    outerLightBlur: 10,
    outerLightOpacity: isDark ? 0.1 : 0.05,
    color: "#ffffff",
    chromaticAberration: 0.1,
    onHoverScale: 1.02,
    saturation: 114,
    brightness: isDark ? 100 : 95,
  };

  return (
    <aside className="hidden lg:block lg:w-72 flex-shrink-0">
      <div className="sticky top-24">
        <GlassCard {...glassConfig}>
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Бренды
            </h3>
            <div className="space-y-1 mb-8">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => onBrandChange(brand)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedBrand === brand
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Цена (BYN)
            </h3>
            <div className="space-y-1">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => onPriceChange(range)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedPrice.label === range.label
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </aside>
  );
}