"use client";

import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { EmptyState } from "@/components/catalog/EmptyState";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { MobileFilterButton } from "@/components/catalog/MobileFilterButton";
import { MobileFilterDrawer } from "@/components/catalog/MobileFilterDrawer";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductSort } from "@/components/catalog/ProductSort";
import { useFilters } from "@/hooks/useFilters";
import { useSort } from "@/hooks/useSort";
import { useState } from "react";

export default function CatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    selectedBrand,
    selectedPrice,
    setSelectedBrand,
    setSelectedPrice,
    filteredProducts,
    resetFilters,
    hasActiveFilters,
  } = useFilters();

  const { sortBy, setSortBy, sortedProducts } = useSort(filteredProducts);

  const activeFiltersCount = [
    selectedBrand !== "Все" && selectedBrand,
    selectedPrice.label !== "Все" && "цена",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen transition-colors duration-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CatalogHeader totalCount={filteredProducts.length} />

        <MobileFilterButton
          onClick={() => setIsFilterOpen(true)}
          hasActiveFilters={hasActiveFilters}
          activeFiltersCount={activeFiltersCount}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            selectedBrand={selectedBrand}
            selectedPrice={selectedPrice}
            onBrandChange={setSelectedBrand}
            onPriceChange={setSelectedPrice}
          />

          <MobileFilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            selectedBrand={selectedBrand}
            selectedPrice={selectedPrice}
            onBrandChange={setSelectedBrand}
            onPriceChange={setSelectedPrice}
            onReset={resetFilters}
          />

          <div className="flex-1">
            <ProductSort
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={filteredProducts.length}
            />

            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
