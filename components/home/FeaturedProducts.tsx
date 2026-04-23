"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { GlassButton } from "react-glass-ui";
import { useTheme } from "@/context/ThemeContext";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featured = products.slice(0, 3);
  const { theme } = useTheme();

  return (
    <section ref={ref} className="py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Популярное сейчас
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Самые горячие модели этого сезона
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Карточки */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative"
            >
              <ProductCard
                product={product}
                isHovered={hoveredId === product.id}
              />
            </motion.div>
          ))}
        </div>

        {/* Кнопка "Смотреть все" */}
        <div className="text-center mt-16">
          <Link href="/catalog">
            <GlassButton
              blur={17}
              distortion={400}
              flexibility={20}
              borderColor={theme === "dark" ? "#ffffff" : "#000000"}
              borderSize={1}
              borderRadius={47}
              borderOpacity={0.4}
              backgroundColor={theme === "dark" ? "#000000" : "#ffffff"}
              backgroundOpacity={0}
              innerLightColor="#ffffff"
              innerLightSpread={1}
              innerLightBlur={10}
              innerLightOpacity={0}
              outerLightColor="#ffffff"
              outerLightSpread={1}
              outerLightBlur={10}
              outerLightOpacity={0}
              color={theme === "dark" ? "#ffffff" : "#000000"}
              chromaticAberration={3.5}
              onHoverScale={1.05}
              saturation={250}
              brightness={110}
              className="transition-all duration-300"
            >
              <span className="flex items-center gap-2 px-6">
                Смотреть все кроссовки
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </GlassButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
