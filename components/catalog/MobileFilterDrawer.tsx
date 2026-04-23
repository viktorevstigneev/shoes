import { brands, PriceRange, priceRanges } from "@/data/filterConstants";
import { motion, AnimatePresence } from "framer-motion";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBrand: string;
  selectedPrice: PriceRange;
  onBrandChange: (brand: string) => void;
  onPriceChange: (price: PriceRange) => void;
  onReset: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedBrand,
  selectedPrice,
  onBrandChange,
  onPriceChange,
  onReset,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 shadow-2xl lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Фильтры
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Бренды
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => onBrandChange(brand)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedBrand === brand
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Цена (BYN)
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => onPriceChange(range)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedPrice.label === range.label
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-800 flex gap-3">
              <button
                onClick={onReset}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Сбросить
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Применить
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
