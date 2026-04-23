// app/(admin)/product/page.tsx
"use client";

import { useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { GlassCard } from "react-glass-ui";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminProductPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const glassConfig = {
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
  };

  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) throw new Error(uploadError.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath);

      setImageUrl(publicUrl);
      setMessage({ type: "success", text: "✅ Изображение загружено!" });
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: "❌ Ошибка при загрузке" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "❌ Выберите изображение" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "❌ Файл не больше 5MB" });
      return;
    }

    // Превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    const product = {
      name: formData.get("name"),
      brand: formData.get("brand"),
      price: Number(formData.get("price")),
      image: imageUrl,
      description: formData.get("description"),
      category: formData.get("category"),
    };

    if (!product.image) {
      setMessage({ type: "error", text: "❌ Сначала загрузите изображение" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "✅ Товар создан!" });
        formRef.current?.reset();
        setImageUrl("");
        setPreviewUrl("");
      } else {
        setMessage({ type: "error", text: `❌ ${data.error}` });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Ошибка" });
    } finally {
      setIsLoading(false);
    }
  };

  const brands = ["Nike", "Adidas", "New Balance", "Puma", "Reebok", "Asics"];
  const categories = ["Кроссовки", "Одежда", "Аксессуары"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Создать товар
          </h1>
          <p className="text-gray-500 dark:text-white/50">
            Заполните форму и загрузите изображение
          </p>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-center ${
              message.type === "success"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlassCard {...glassConfig}>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Название товара *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white outline-none"
                      placeholder="Air Jordan 1 Retro High OG"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Бренд *
                    </label>
                    <select
                      name="brand"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white outline-none"
                    >
                      <option value="">Выберите бренд</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Цена (BYN) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white outline-none"
                      placeholder="189"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Категория *
                    </label>
                    <select
                      name="category"
                      required
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white outline-none"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Правая колонка */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <GlassCard {...glassConfig}>
                <div className="p-6 space-y-5">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Изображение
                  </h2>

                  <div className="flex flex-col items-center gap-4">
                    {/* Preview */}
                    {previewUrl && (
                      <div className="relative w-full h-48 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}

                    {/* Upload button */}
                    <label className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        disabled={uploadingImage || isLoading}
                        className="hidden"
                      />
                      <div className="w-full px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-center font-semibold cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50">
                        {uploadingImage
                          ? "Загрузка..."
                          : "📸 Загрузить изображение"}
                      </div>
                    </label>

                    {imageUrl && (
                      <p className="text-xs text-green-600 dark:text-green-400 break-all">
                        ✅ Изображение загружено
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>

              <GlassCard {...glassConfig}>
                <div className="p-6 space-y-5">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Описание
                  </h2>

                  <textarea
                    name="description"
                    rows={5}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white outline-none resize-none"
                    placeholder="Краткое описание товара..."
                  />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex gap-4 justify-end"
          >
            <button
              type="button"
              onClick={() => {
                formRef.current?.reset();
                setImageUrl("");
                setPreviewUrl("");
              }}
              disabled={isLoading}
              className="px-8 py-3 rounded-xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/80 font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            >
              Очистить
            </button>
            <button
              type="submit"
              disabled={isLoading || uploadingImage || !imageUrl}
              className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? "Создание..." : "Создать товар"}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
