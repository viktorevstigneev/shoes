// src/app/(home)/page.tsx

import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
