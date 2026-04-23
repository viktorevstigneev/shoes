export const brands = ["Все", "Nike", "Adidas", "New Balance"];

export const priceRanges = [
  { label: "Все", min: 0, max: Infinity },
  { label: "До 300 BYN", min: 0, max: 300 },
  { label: "300 - 500 BYN", min: 300, max: 500 },
  { label: "500 - 800 BYN", min: 500, max: 800 },
  { label: "От 800 BYN", min: 800, max: Infinity },
];

export type PriceRange = (typeof priceRanges)[0];
