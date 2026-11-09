// Gets products from the server and turns the server's shape into a Product
import { getJson } from "../../shared/api/client";
import { isRecord } from "../../shared/types/guards";
import { isCategory } from "./products.guards";
import type { Category, Product } from "./products.types";

const PRODUCTS_URL = "https://shopboard-api.vercel.app/api/products";

// One product as the server sends it
interface ProductResponse {
  id: number;
  title: string;
  category_name: Category;
  price_cents: number;
  in_stock: boolean;
}

function isProductResponse(value: unknown): value is ProductResponse {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    isCategory(value.category_name) &&
    typeof value.price_cents === "number" &&
    typeof value.in_stock === "boolean"
  );
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

// The server sends { items: [...], total }; items that do not match the expected shape are skipped
export async function getProducts(): Promise<Product[]> {
  const data = await getJson(PRODUCTS_URL);
  if (!isRecord(data) || !Array.isArray(data.items)) {
    throw new Error("Unexpected products response");
  }
  return data.items.filter(isProductResponse).map(toProduct);
}
