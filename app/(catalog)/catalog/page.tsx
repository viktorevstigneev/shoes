"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/catalog/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const brands = ["Все", "Nike", "Adidas", "New Balance"];
const priceRanges = [
  { label: "Все", min: 0, max: Infinity },
  { label: "До 300 BYN", min: 0, max: 300 },
  { label: "300 - 500 BYN", min: 300, max: 500 },
  { label: "500 - 800 BYN", min: 500, max: 800 },
  { label: "От 800 BYN", min: 800, max: Infinity },
];

export default function CatalogPage() {
  const [selectedBrand, setSelectedBrand] = useState("Все");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const brandMatch =
      selectedBrand === "Все" || product.brand === selectedBrand;
    const priceMatch =
      product.price >= selectedPrice.min && product.price <= selectedPrice.max;
    return brandMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Каталог
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filteredProducts.length} моделей
          </p>
        </div>

        {/* Мобильная кнопка фильтров */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Фильтры
              </span>
            </div>
            {(selectedBrand !== "Все" || selectedPrice.label !== "Все") && (
              <span className="px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-full">
                {
                  [
                    selectedBrand !== "Все" && selectedBrand,
                    selectedPrice.label !== "Все" && "цена",
                  ].filter(Boolean).length
                }
              </span>
            )}
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Десктопные фильтры */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Бренды
              </h3>
              <div className="space-y-1 mb-8">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
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
                    onClick={() => setSelectedPrice(range)}
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
          </aside>

          {/* Мобильная шторка фильтров */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 z-50 shadow-2xl lg:hidden flex flex-col"
                >
                  {/* Заголовок шторки */}
                  <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Фильтры
                    </h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
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

                  {/* Контент фильтров */}
                  <div className="flex-1 overflow-y-auto p-5">
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Бренды
                      </h3>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
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
                            onClick={() => setSelectedPrice(range)}
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

                  {/* Кнопки действий */}
                  <div className="p-5 border-t border-gray-200 dark:border-gray-800 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedBrand("Все");
                        setSelectedPrice(priceRanges[0]);
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Сбросить
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      Применить
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Товары */}
          <div className="flex-1">
            {/* Сортировка */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-6 flex justify-between items-center border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Найдено:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {filteredProducts.length}
                </span>
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gray-400 cursor-pointer"
              >
                <option value="popular">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </div>

            {/* Сетка товаров */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Ничего не найдено
                </p>
                <button
                  onClick={() => {
                    setSelectedBrand("Все");
                    setSelectedPrice(priceRanges[0]);
                  }}
                  className="mt-4 text-gray-900 dark:text-white underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
