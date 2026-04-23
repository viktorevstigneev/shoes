import { useState, useMemo, useEffect } from "react";
import { PriceRange, priceRanges } from "@/data/filterConstants";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: string;
  description?: string;
  created_at?: string;
}

export function useFilters() {
  const [selectedBrand, setSelectedBrand] = useState("Все");
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>(
    priceRanges[0],
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем товары из API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrand === "Все" || product.brand === selectedBrand;
      const priceMatch =
        product.price >= selectedPrice.min &&
        product.price <= selectedPrice.max;
      return brandMatch && priceMatch;
    });
  }, [products, selectedBrand, selectedPrice]);

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
    loading,
  };
}
