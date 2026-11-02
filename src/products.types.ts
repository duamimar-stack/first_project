export type Category = "Bags" | "Shoes" | "Accessories";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  inStock: boolean;
}