interface MobileFilterButtonProps {
  onClick: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
}

export function MobileFilterButton({
  onClick,
  hasActiveFilters,
  activeFiltersCount,
}: MobileFilterButtonProps) {
  return (
    <div className="lg:hidden mb-4">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Фильтры
          </span>
        </div>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
