// app/(about)/about/page.tsx
"use client";

import { useTheme } from "@/context/ThemeContext";
import { GlassCard } from "react-glass-ui";
import { motion } from "framer-motion";

// Конфигурация для GlassCard (переиспользуем)
const getGlassConfig = (isDark: boolean) => ({
  blur: 17,
  distortion: 35,
  flexibility: 0,
  borderColor: isDark ? "#ffffff" : "#000000",
  borderSize: 1,
  borderRadius: 30,
  borderOpacity: isDark ? 0.4 : 0.2,
  backgroundColor: isDark ? "#000000ff" : "#ffffffff",
  backgroundOpacity: isDark ? 0.3 : 0.6,
  innerLightColor: isDark ? "#ffffff" : "#000000",
  innerLightSpread: 1,
  innerLightBlur: 10,
  innerLightOpacity: isDark ? 0.15 : 0.05,
  outerLightColor: isDark ? "#ffffff" : "#000000",
  outerLightSpread: 1,
  outerLightBlur: 10,
  outerLightOpacity: isDark ? 0.1 : 0.05,
  color: "#ffffff",
  chromaticAberration: 0.5,
  onHoverScale: 1,
  saturation: 110,
  brightness: isDark ? 100 : 98,
});

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const glassConfig = getGlassConfig(isDark);

  // Данные для карточки магазина
  const shopInfo = {
    name: "J&V Sneakers Store",
    address: "г. Минск, ул. Притыцкого, 29, ТЦ «Тивали»",
    phone: "+375 (29) 123-45-67",
    email: "info@jvsneakers.by",
    workingHours: [
      { days: "ПН-ПТ", time: "10:00 - 21:00" },
      { days: "СБ-ВС", time: "11:00 - 20:00" },
    ],
    metro: "ст. м. Спортивная (15 мин пешком)",
  };

  return (
    <div className="min-h-screen pt-32 pb-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            О нас
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
            J&V Sneakers — это не просто магазин. Это место, где streetwear
            культура встречается с комфортом и качеством.
          </p>
        </motion.div>

        {/* Основная сетка */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Текстовая часть */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard {...glassConfig}>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Наша философия
                </h2>
                <p className="text-gray-600 dark:text-white/70 mb-6 leading-relaxed">
                  Мы основали J&V Sneakers с одной простой идеей: каждый
                  заслуживает носить качественную и стильную обувь, не
                  переплачивая. Мы тщательно отбираем каждую модель,
                  сотрудничаем напрямую с производителями и гарантируем
                  подлинность каждой пары.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Почему выбирают нас?
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>100% гарантия подлинности</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Бесплатная примерка в магазине</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>
                      Программа лояльности и скидки постоянным клиентам
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Экспресс-доставка по Минску за 2 часа</span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </motion.div>

          {/* Карточка с контактами */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard
              {...glassConfig} // @ts-ignore
              width={"100%"}
            >
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Контакты
                </h2>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
                      Адрес
                    </h3>
                    <p className="text-gray-800 dark:text-white/90">
                      {shopInfo.address}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-white/50 mt-1">
                      {shopInfo.metro}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
                      Режим работы
                    </h3>
                    {shopInfo.workingHours.map((schedule) => (
                      <div
                        key={schedule.days}
                        className="flex justify-between text-gray-800 dark:text-white/90"
                      >
                        <span>{schedule.days}</span>
                        <span>{schedule.time}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
                      Контактные данные
                    </h3>
                    <p className="text-gray-800 dark:text-white/90">
                      Телефон:{" "}
                      <a
                        href={`tel:${shopInfo.phone.replace(/\s/g, "")}`}
                        className="hover:underline transition-colors"
                      >
                        {shopInfo.phone}
                      </a>
                    </p>
                    <p className="text-gray-800 dark:text-white/90">
                      Email:{" "}
                      <a
                        href={`mailto:${shopInfo.email}`}
                        className="hover:underline transition-colors"
                      >
                        {shopInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Блок с картой */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <GlassCard
            {...glassConfig}
            // @ts-ignore
            width={"100%"}
          >
            <div className="p-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Как нас найти
              </h2>

              {/* Яндекс Карта */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                <iframe
                  src="https://yandex.by/map-widget/v1/?indoorLevel=1&ll=27.484630%2C53.907700&mode=search&oid=1771652016&ol=biz&z=17.2"
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  title="J&V Sneakers на карте"
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-between items-start mt-6 text-sm">
                <div className="text-gray-600 dark:text-white/70">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Точный адрес:
                  </span>{" "}
                  ул. Притыцкого, 29, ТЦ «Тивали», 1 этаж
                </div>
                <a
                  href="https://yandex.by/maps/org/tivali/1771652016/?indoorLevel=1&ll=27.484630%2C53.907700&z=17.56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm underline transition-colors ${
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Открыть в Яндекс Картах →
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Блок с дополнительной информацией (о бренде/команде) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <GlassCard {...glassConfig}>
            <div className="p-8">
              <blockquote className="text-lg italic text-gray-700 dark:text-white/80">
                «Мы верим, что кроссовки — это больше, чем обувь. Это способ
                самовыражения, часть твоего образа и истории.»
              </blockquote>
              <p className="mt-4 text-gray-500 dark:text-white/50">
                — Основатели бренда J&V Sneakers
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
