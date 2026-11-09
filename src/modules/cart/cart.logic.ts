// Pure: takes a cart, returns a new cart or a number. Never changes its input.
import type { Product } from "../products/products.types";
import type { Cart, CartLine } from "./cart.types";

export function addItem(cart: Cart, id: number): Cart {
  const exists = cart.some((item) => item.id === id);
  if (!exists) {
    return [...cart, { id, quantity: 1 }];
  }
  return cart.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

// A quantity that drops to 0 removes the item
export function changeQuantity(cart: Cart, id: number, amount: number): Cart {
  return cart
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
    .filter((item) => item.quantity > 0);
}

export function removeItem(cart: Cart, id: number): Cart {
  return cart.filter((item) => item.id !== id);
}

// Joins each cart item with its product; ids with no matching product are skipped
export function toCartLines(cart: Cart, products: Product[]): CartLine[] {
  return cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}
