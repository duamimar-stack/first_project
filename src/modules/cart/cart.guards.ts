// Checks that an unknown value is one of the cart module's types
import { isRecord } from "../../shared/types/guards";
import type { CartAction, CartItem } from "./cart.types";

const cartActions: CartAction[] = ["increase", "decrease", "remove"];

// localStorage can hold anything, so each saved item is checked before it is trusted
export function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    Number.isInteger(value.id) &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

// The data-action attribute of a cart button
export function isCartAction(value: unknown): value is CartAction {
  return cartActions.some((action) => action === value);
}
