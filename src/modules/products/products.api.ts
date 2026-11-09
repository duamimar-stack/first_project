// Gets products from the server and turns the server's shape into a Product
import { getJson } from "../../shared/api/client";
import type { Category, Product } from "./products.types";

const PRODUCTS_URL = "https://shopboard-api.vercel.app/api/products";

// What the server sends
interface ProductResponse {
  id: number;
  title: string;
  category_name: Category;
  price_cents: number;
  in_stock: boolean;
}

interface ProductsResponse {
  items: ProductResponse[];
  total: number;
}

function toProduct(item: ProductResponse): Product {
  return {
    id: item.id,
    name: item.title,
    category: item.category_name,
    // The server sends cents, the app works in dollars: 8900 -> 89
    price: item.price_cents / 100,
    inStock: item.in_stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await getJson<ProductsResponse>(PRODUCTS_URL);
  return data.items.map(toProduct);
}
