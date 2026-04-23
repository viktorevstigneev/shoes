interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl">
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Ничего не найдено
      </p>
      <button
        onClick={onReset}
        className="mt-4 text-gray-900 dark:text-white underline"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
