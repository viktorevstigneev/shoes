import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

// Простая синхронная функция
function getProductById(id: string) {
  return products.find((p) => p.id === Number(id));
}

// SSR - генерация метаданных (params теперь асинхронный)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Разворачиваем Promise params
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Товар не найден",
    };
  }

  // ЖЕСТКО ЗАДАЁМ ДОМЕН - без всяких условий и проверок
  const fullImageUrl = `https://jandv-sneakers.onrender.com${product.image}`;

  return {
    title: `${product.name} | J&V Sneakers`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [fullImageUrl],
    },
  };
}

// SSR - страница товара (params тоже асинхронный)
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Разворачиваем Promise params
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Хлебные крошки */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
            Главная
          </Link>
          {" / "}
          <Link
            href="/catalog"
            className="hover:text-gray-900 dark:hover:text-white"
          >
            Каталог
          </Link>
          {" / "}
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая часть - изображение */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <div className="relative h-96 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Правая часть - информация */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                5 отзывов
              </span>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.price} BYN
              </span>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all">
                Добавить в корзину
              </button>
              <button className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-semibold hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all">
                Добавить в избранное
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Оригинальная продукция</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Гарантия 30 дней</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Быстрая доставка</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
