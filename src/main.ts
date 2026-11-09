// Connects the modules. Has no logic of its own.
// Shared (styles first, so each module's own CSS loads after them)
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/products.css";
import "./styles/cart.css";
import "./styles/toast.css";
import { showToast } from "./shared/ui/toast";

// Products
import type { Product } from "./modules/products/products.types";
import { getProducts } from "./modules/products/products.api";
import { catalogTotal, visibleProducts } from "./modules/products/products.logic";
import {
  bindProductEvents,
  getFilterValues,
  renderCatalogTotal,
  renderProducts,
  renderProductsError,
} from "./modules/products/products.ui";

// Cart
import type { CartAction } from "./modules/cart/cart.types";
import {
  addToCart,
  changeQuantity,
  clearCart,
  getCart,
  removeFromCart,
} from "./modules/cart/cart.state";
import { cartCount, cartTotal, toCartLines } from "./modules/cart/cart.logic";
import { bindCartEvents, renderCart } from "./modules/cart/cart.ui";

// Register
import { bindRegisterEvents } from "./modules/register/register.ui";

let products: Product[] = [];

function updateProducts(): void {
  renderProducts(visibleProducts(products, getFilterValues()), products.length);
}

function updateCart(): void {
  const lines = toCartLines(getCart(), products);
  renderCart(lines, cartTotal(lines), cartCount(lines));
}

const cartActions: Record<CartAction, (id: number) => void> = {
  increase: (id) => changeQuantity(id, 1),
  decrease: (id) => changeQuantity(id, -1),
  remove: (id) => removeFromCart(id),
};

// Listeners are added once, here, never inside an update
bindProductEvents({
  onFiltersChange: updateProducts,
  onAddToCart(id) {
    addToCart(id);
    updateCart();
    showToast("Added to cart");
  },
});

bindCartEvents({
  onCartAction(action, id) {
    cartActions[action](id);
    updateCart();
  },
  onClearCart() {
    clearCart();
    updateCart();
  },
});

bindRegisterEvents({
  onRegister() {
    showToast("Demo form: no account was created", 4000);
  },
});

async function start(): Promise<void> {
  try {
    products = await getProducts(); // get
  } catch (error) {
    console.error(error);
    renderProductsError("Products could not be loaded. Please refresh the page.");
    return;
  }
  renderCatalogTotal(catalogTotal(products)); // draw
  updateProducts();
  updateCart();
}

void start();
