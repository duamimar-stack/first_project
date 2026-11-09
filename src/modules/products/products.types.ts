export type Category = "Bags" | "Shoes" | "Accessories";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  inStock: boolean;
}

// Values of the <option> elements in the filter form
export type PriceRange = "all" | "under-50" | "50-100" | "over-100";
export type SortOrder = "default" | "price-asc" | "price-desc";

export interface ProductFilters {
  search: string;
  price: PriceRange;
  category: Category | "all";
  sort: SortOrder;
}
