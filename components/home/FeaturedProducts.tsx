"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { GlassButton } from "react-glass-ui";
import { useTheme } from "@/context/ThemeContext";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: string;
}

export default function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featured = products.slice(0, 3);

  const { theme } = useTheme();

  return (
    <section
      ref={ref}
      className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
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

// Современная карточка
function ProductCard({
  product,
  isHovered,
}: {
  product: Product;
  isHovered: boolean;
}) {
  return (
    <Link href={`/catalog/${product.id}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer">
        {/* Изображение с тенью */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 h-80">
          {/* Тень кроссовка */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-black/20 dark:bg-black/40 rounded-full blur-xl z-0" />

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
            <span className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
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

          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-1">
            {product.category || "Кроссовки"}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.price.toLocaleString()} BYN
              </span>
            </div>

            {/* Кнопка корзины - современная */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group/btn p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-black dark:hover:bg-white transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                console.log("Added to cart:", product.id);
              }}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300"
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
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white"
        />
      </div>
    </Link>
  );
}
