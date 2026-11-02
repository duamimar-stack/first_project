// Connects the data (products), the logic (filters, cart) and the page (ui)
import './style.css';
import { products } from './products.ts';
import { filterProducts, sortProducts } from './filters.ts';
import {
  addToCart,
  changeQuantity,
  removeFromCart,
  clearCart,
  getCartItems,
  getCartTotal,
  getCartCount,
} from './cart.ts';
import {
  getFilterValues,
  renderProducts,
  renderCatalogTotal,
  renderCart,
  bindEvents,
} from './ui.ts';

function updateProducts() {
  const { search, price, category, sort } = getFilterValues()
  const filtered = filterProducts(products, search, price, category)
  renderProducts(sortProducts(filtered, sort), products.length)
}

function updateCart() {
  renderCart(getCartItems(), getCartTotal(), getCartCount())
}

const cartActions = {
  increase: (id) => changeQuantity(id, 1),
  decrease: (id) => changeQuantity(id, -1),
  remove: (id) => removeFromCart(id),
}

bindEvents({
  onFiltersChange: updateProducts,
  onAddToCart(id) {
    addToCart(id)
    updateCart()
  },
  onCartAction(action, id) {
    cartActions[action](id)
    updateCart()
  },
  onClearCart() {
    clearCart()
    updateCart()
  },
})

// ---------- Start ----------
renderCatalogTotal(products.reduce((sum, product) => sum + product.price, 0))
updateProducts()
updateCart()
