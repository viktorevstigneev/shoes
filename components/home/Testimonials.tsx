"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { GlassCard } from "react-glass-ui";

const reviews = [
  {
    name: "Анна К.",
    text: "Кроссовки приехали через день. Качество отличное, всё как на фото. Спасибо!",
    rating: 5,
  },
  {
    name: "Илья М.",
    text: "Примерял три пары, оставил одну. Вернул две без проблем. Сервис топ.",
    rating: 5,
  },
  {
    name: "София Д.",
    text: "Очень красивый сайт, удобно выбирать. В тёмной теме вообще космос.",
    rating: 4,
  },
];

export default function Testimonials() {
  const { theme } = useTheme();

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Фон с размытыми кругами */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-gray-950" : "bg-gray-100"
          }`}
        />

        {/* Размытые круги */}
        {theme === "dark" ? (
          <>
            <div className="absolute top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-20 -left-20 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gray-500/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`text-4xl md:text-6xl font-semibold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Говорят наши клиенты
          </h2>
          <p
            className={`mt-6 text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            1000+ довольных покупателей
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <GlassCard
                blur={77}
                distortion={40}
                flexibility={20}
                borderColor={theme === "dark" ? "#ffffff" : "#000000"}
                borderSize={0}
                borderRadius={20}
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
                chromaticAberration={0}
                onHoverScale={1}
                saturation={250}
                brightness={100}
                padding="24px"
                className="transition-all duration-300"
              >
                {/* Звезды рейтинга */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>

                {/* Текст отзыва */}
                <p
                  className={`text-base leading-relaxed mb-4 italic ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  “{review.text}”
                </p>

                {/* Имя клиента */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="text-sm font-semibold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        проверенный покупатель
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
