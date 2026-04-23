import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { PriceRange, priceRanges } from "@/data/filterConstants";

export function useFilters() {
  const [selectedBrand, setSelectedBrand] = useState("Все");
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>(
    priceRanges[0],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrand === "Все" || product.brand === selectedBrand;
      const priceMatch =
        product.price >= selectedPrice.min &&
        product.price <= selectedPrice.max;
      return brandMatch && priceMatch;
    });
  }, [selectedBrand, selectedPrice]);

  const resetFilters = () => {
    setSelectedBrand("Все");
    setSelectedPrice(priceRanges[0]);
  };

  const hasActiveFilters =
    selectedBrand !== "Все" || selectedPrice.label !== "Все";

  return {
    selectedBrand,
    selectedPrice,
    setSelectedBrand,
    setSelectedPrice,
    filteredProducts,
    resetFilters,
    hasActiveFilters,
  };
}
