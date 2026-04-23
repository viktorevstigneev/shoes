import { useState, useMemo } from "react";

export function useSort(products: any[]) {
  const [sortBy, setSortBy] = useState("popular");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === "price-asc") return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      return sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [products, sortBy]);

  return { sortBy, setSortBy, sortedProducts };
}
