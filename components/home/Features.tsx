"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { GlassCard } from "react-glass-ui";

const features = [
  {
    title: "Бесплатная примерка",
    description: "Закажи до 3 пар домой и выбери идеальную",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  {
    title: "Кэшбэк 10%",
    description: "Возвращаем 10% от каждой покупки на бонусный счет",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5a10 10 0 0 1 0 14"/><path d="M7 5a10 10 0 0 0 0 14"/></svg>`,
  },
  {
    title: "Экспресс-доставка",
    description: "По Минску за 2 часа, по Беларуси от 1 дня",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  },
  {
    title: "Сезонные скидки",
    description: "До -50% на коллекции прошлого сезона",
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9 9 10-10-9-9z"/><path d="M7 7h.01"/></svg>`,
  },
];

export default function Features() {
  const { theme } = useTheme();

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Преимущества
          </h2>
          <p
            className={`mt-6 text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Всё, что нужно для комфортных покупок
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <GlassCard
                blur={78}
                distortion={10}
                flexibility={20}
                borderColor={theme === "dark" ? "#ffffff" : "#000000"}
                borderSize={1}
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
                className="transition-all duration-300 w-full"
                // @ts-ignore
                width={"100%"}
              >
                {/* SVG иконка */}
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                  style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                />
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
