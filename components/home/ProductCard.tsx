"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
}

export default function ProductCard({ product, isHovered }: ProductCardProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <Link href={`/catalog/${product.id}`}>
      <div
        className={`group relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer
          ${
            isDarkTheme
              ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white dark:bg-gray-800 border border-black/20"
          }
        `}
      >
        {/* Изображение с тенью */}
        <div
          className={`relative overflow-hidden h-80 ${
            isDarkTheme
              ? "bg-gradient-to-br from-white/5 to-white/0"
              : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          }`}
        >
          {/* Тень кроссовка */}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-20 rounded-full blur-xl z-0
              ${isDarkTheme ? "bg-white/20" : "bg-black/20 dark:bg-black/40"}
            `}
          />

          <motion.div
            animate={isHovered ? { scale: 1.08, y: -8 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            className="relative w-full h-full z-10"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Эффект блика при ховере */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={
              isHovered
                ? { opacity: 0.3, x: "100%" }
                : { opacity: 0, x: "-100%" }
            }
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg]"
          />
        </div>

        {/* Контент карточки */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-xs font-medium tracking-wide uppercase ${
                isDarkTheme
                  ? "text-white/60"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {product.brand}
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 text-yellow-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          <h3
            className={`text-lg font-semibold mb-2 line-clamp-1 ${
              isDarkTheme ? "text-white" : "text-gray-900 dark:text-white"
            }`}
          >
            {product.name}
          </h3>

          <p
            className={`text-sm mb-4 line-clamp-1 ${
              isDarkTheme ? "text-white/50" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {product.category || "Кроссовки"}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span
                className={`text-2xl font-bold ${
                  isDarkTheme ? "text-white" : "text-gray-900 dark:text-white"
                }`}
              >
                {product.price.toLocaleString()} BYN
              </span>
            </div>

            {/* Кнопка корзины */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden group/btn p-2.5 rounded-xl transition-colors duration-300
                ${
                  isDarkTheme
                    ? "bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-black dark:hover:bg-white"
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                console.log("Added to cart:", product.id);
              }}
            >
              <svg
                className={`w-5 h-5 transition-colors duration-300
                  ${
                    isDarkTheme
                      ? "text-white/80 group-hover/btn:text-white"
                      : "text-gray-600 dark:text-gray-400 group-hover/btn:text-white dark:group-hover/btn:text-black"
                  }
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Анимированная линия */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4 }}
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkTheme
              ? "bg-gradient-to-r from-white/50 to-white"
              : "bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white"
          }`}
        />
      </div>
    </Link>
  );
}
