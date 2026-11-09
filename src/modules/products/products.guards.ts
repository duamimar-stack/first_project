// Checks that an unknown value is one of the products module's types
import type { Category, PriceRange, ProductFilters, SortOrder } from "./products.types";

const categories: Category[] = ["Bags", "Shoes", "Accessories"];
const priceRanges: PriceRange[] = ["all", "under-50", "50-100", "over-100"];
const sortOrders: SortOrder[] = ["default", "price-asc", "price-desc"];

export function isCategory(value: unknown): value is Category {
  return categories.some((category) => category === value);
}

export function isCategoryFilter(value: unknown): value is ProductFilters["category"] {
  return value === "all" || isCategory(value);
}

export function isPriceRange(value: unknown): value is PriceRange {
  return priceRanges.some((range) => range === value);
}

export function isSortOrder(value: unknown): value is SortOrder {
  return sortOrders.some((order) => order === value);
}
