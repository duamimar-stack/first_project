import './style.css'
import { products } from './products.js'
import {
  addToCart,
  changeQuantity,
  removeFromCart,
  getCartItems,
  getCartTotal,
  getCartCount,
} from './cart.js'

// ---------- DOM elements ----------
const productGrid = document.querySelector('.product-grid')
const resultCount = document.querySelector('.result-count')
const catalogTotal = document.querySelector('.catalog-total')
const priceFilter = document.querySelector('.price-filter')
const categoryFilter = document.querySelector('.category-filter')
const sortSelect = document.querySelector('.sort-select')
const resetButton = document.querySelector('.reset-filters')
const cartList = document.querySelector('.cart-list')
const cartEmpty = document.querySelector('.cart-empty')
const cartTotal = document.querySelector('.cart-total')
const cartCount = document.querySelector('.cart-count')

const formatPrice = (value) => `$${value}`

// ---------- Filter ----------
const priceRanges = {
  all: () => true,
  'under-50': (price) => price < 50,
  '50-100': (price) => price >= 50 && price <= 100,
  'over-100': (price) => price > 100,
}

function filterProducts(list, priceRange, category) {
  return list.filter(
    (product) =>
      priceRanges[priceRange](product.price) &&
      (category === 'all' || product.category === category),
  )
}

// ---------- Sort ----------
function sortProducts(list, order) {
  if (order === 'price-asc') {
    return [...list].sort((a, b) => a.price - b.price)
  }
  if (order === 'price-desc') {
    return [...list].sort((a, b) => b.price - a.price)
  }
  return list
}

// ---------- Map: products -> HTML cards ----------
function createProductCard(product) {
  return `
    <article class="product-card">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button class="button" type="button" data-id="${product.id}">
        Add to cart
      </button>
    </article>
  `
}

function renderProducts() {
  const filtered = filterProducts(
    products,
    priceFilter.value,
    categoryFilter.value,
  )
  const visible = sortProducts(filtered, sortSelect.value)

  productGrid.innerHTML = visible.length
    ? visible.map(createProductCard).join('')
    : '<p class="no-results">No products match these filters.</p>'

  resultCount.textContent = `Showing ${visible.length} of ${products.length} products`
}

// ---------- Cart ----------
function createCartItem(item) {
  return `
    <li class="cart-item">
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-price">${formatPrice(item.price)}</span>
      <div class="quantity-controls">
        <button class="quantity-button" type="button" data-action="decrease" data-id="${item.id}"
          aria-label="Decrease quantity of ${item.name}">−</button>
        <span class="quantity" aria-label="Quantity">${item.quantity}</span>
        <button class="quantity-button" type="button" data-action="increase" data-id="${item.id}"
          aria-label="Increase quantity of ${item.name}">+</button>
      </div>
      <span class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</span>
      <button class="remove-button" type="button" data-action="remove" data-id="${item.id}"
        aria-label="Remove ${item.name} from cart">Remove</button>
    </li>
  `
}

function renderCart() {
  const items = getCartItems()
  cartList.innerHTML = items.map(createCartItem).join('')
  cartEmpty.hidden = items.length > 0
  cartTotal.textContent = formatPrice(getCartTotal())
  cartCount.textContent = getCartCount()
}

// ---------- Events ----------
// One listener on the grid handles every "Add to cart" button (event delegation)
productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]')
  if (!button) return
  addToCart(Number(button.dataset.id))
  renderCart()
})

cartList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]')
  if (!button) return
  const id = Number(button.dataset.id)
  const { action } = button.dataset

  if (action === 'increase') changeQuantity(id, 1)
  if (action === 'decrease') changeQuantity(id, -1)
  if (action === 'remove') removeFromCart(id)
  renderCart()
})

for (const control of [priceFilter, categoryFilter, sortSelect]) {
  control.addEventListener('change', renderProducts)
}

resetButton.addEventListener('click', () => {
  priceFilter.value = 'all'
  categoryFilter.value = 'all'
  sortSelect.value = 'default'
  renderProducts()
})

// ---------- Start ----------
const total = products.reduce((sum, product) => sum + product.price, 0)
catalogTotal.textContent = `Total value of all products: ${formatPrice(total)}`

renderProducts()
renderCart()
