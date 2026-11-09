// Draws the cart and hears its buttons. Does not calculate or save.
import { formatPrice } from "../../shared/format/price";
import { getElement } from "../../shared/ui/dom";
import type { CartAction, CartLine } from "./cart.types";

const cartList = getElement<HTMLUListElement>(".cart-list");
const cartEmpty = getElement<HTMLElement>(".cart-empty");
const cartTotalText = getElement<HTMLElement>(".cart-total");
const cartCountText = getElement<HTMLElement>(".cart-count");
const clearCartButton = getElement<HTMLButtonElement>(".clear-cart");

function createCartLine(line: CartLine): string {
  return `
    <li class="cart-item">
      <span class="cart-item-name">${line.name}</span>
      <span class="cart-item-price">${formatPrice(line.price)}</span>
      <div class="quantity-controls">
        <button class="quantity-button" type="button" data-action="decrease" data-id="${line.id}"
          aria-label="Decrease quantity of ${line.name}">−</button>
        <span class="quantity" aria-label="Quantity">${line.quantity}</span>
        <button class="quantity-button" type="button" data-action="increase" data-id="${line.id}"
          aria-label="Increase quantity of ${line.name}">+</button>
      </div>
      <span class="cart-item-subtotal">${formatPrice(line.price * line.quantity)}</span>
      <button class="remove-button" type="button" data-action="remove" data-id="${line.id}"
        aria-label="Remove ${line.name} from cart">Remove</button>
    </li>
  `;
}

// total and count arrive already calculated: the UI only draws them
export function renderCart(lines: CartLine[], total: number, count: number): void {
  cartList.innerHTML = lines.map(createCartLine).join("");
  cartEmpty.hidden = lines.length > 0;
  clearCartButton.hidden = lines.length === 0;
  cartTotalText.textContent = formatPrice(total);
  cartCountText.textContent = String(count);
}

interface CartHandlers {
  onCartAction: (action: CartAction, id: number) => void;
  onClearCart: () => void;
}

// Called once from main.ts
export function bindCartEvents({ onCartAction, onClearCart }: CartHandlers): void {
  cartList.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("button[data-action]");
    if (!button) return;
    onCartAction(button.dataset.action as CartAction, Number(button.dataset.id));
  });

  clearCartButton.addEventListener("click", onClearCart);
}
