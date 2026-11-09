// Holds the cart and keeps it in localStorage. No document.
import { addItem, changeQuantity as changeItemQuantity, removeItem } from "./cart.logic";
import { isCartItem } from "./cart.guards";
import type { Cart } from "./cart.types";

const STORAGE_KEY = "shopboard-cart";

let cart: Cart = loadCart();

function loadCart(): Cart {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function saveCart(next: Cart): void {
  cart = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be blocked (e.g. private mode); the cart still works for this visit
  }
}

export function getCart(): Cart {
  return cart;
}

export function addToCart(id: number): void {
  saveCart(addItem(cart, id));
}

export function changeQuantity(id: number, amount: number): void {
  saveCart(changeItemQuantity(cart, id, amount));
}

export function removeFromCart(id: number): void {
  saveCart(removeItem(cart, id));
}

export function clearCart(): void {
  cart = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Same as above: nothing to remove if storage is blocked
  }
}
