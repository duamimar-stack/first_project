// Pure: takes data, returns data. No document, fetch or localStorage.
import type { PriceRange, Product, ProductFilters, SortOrder } from "./products.types";

const priceRanges: Record<PriceRange, (price: number) => boolean> = {
  all: () => true,
  "under-50": (price) => price < 50,
  "50-100": (price) => price >= 50 && price <= 100,
  "over-100": (price) => price > 100,
};

export function searchProducts(list: Product[], query: string): Product[] {
  // Lowercase both sides so "BAG", "bag" and "Bag" all match
  const search = query.trim().toLowerCase();
  return list.filter((product) => product.name.toLowerCase().includes(search));
}

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return searchProducts(list, filters.search).filter(
    (product) =>
      priceRanges[filters.price](product.price) &&
      (filters.category === "all" || product.category === filters.category),
  );
}

// Sorts a copy, so the original products array keeps its order
export function sortProducts(list: Product[], order: SortOrder): Product[] {
  if (order === "price-asc") {
    return [...list].sort((a, b) => a.price - b.price);
  }
  if (order === "price-desc") {
    return [...list].sort((a, b) => b.price - a.price);
  }
  return list;
}

// Search + filters + sort together: the list the page should show
export function visibleProducts(list: Product[], filters: ProductFilters): Product[] {
  return sortProducts(filterProducts(list, filters), filters.sort);
}

export function catalogTotal(list: Product[]): number {
  return list.reduce((sum, product) => sum + product.price, 0);
}
