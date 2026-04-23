interface CatalogHeaderProps {
  totalCount: number;
}

export function CatalogHeader({ totalCount }: CatalogHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Каталог
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        {totalCount} моделей
      </p>
    </div>
  );
}
