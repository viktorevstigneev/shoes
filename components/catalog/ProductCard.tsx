"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/catalog/${product.id}`}>
        {/* Блок с изображением */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Тень под кроссовком */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-16 bg-black/10 dark:bg-black/30 rounded-full blur-xl" />

          {/* Затемнение при наведении */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            className="absolute inset-0 bg-black z-10"
          />

          {/* Кнопка быстрого просмотра */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4 z-20"
          >
            <button className="w-full bg-white text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm">
              Быстрый просмотр
            </button>
          </motion.div>
        </div>

        {/* Контент */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {product.brand}
            </p>
            <div className="flex gap-0.5">
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

          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {product.price.toLocaleString()} BYN
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-white transition-colors group/btn"
              onClick={(e) => {
                e.preventDefault();
                console.log("Added to cart:", product.id);
              }}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/btn:text-white dark:group-hover/btn:text-gray-900 transition-colors"
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
      </Link>
    </motion.div>
  );
}
