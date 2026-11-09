import type { Product } from "../products/products.types";

// What is saved: only the product id and how many
export interface CartItem {
  id: number;
  quantity: number;
}

export type Cart = CartItem[];

// What is shown: the full product plus its quantity
export interface CartLine extends Product {
  quantity: number;
}

// Values of data-action on the cart buttons
export type CartAction = "increase" | "decrease" | "remove";
