// The only file that reads from or writes to the page (the DOM)

// ---------- DOM elements ----------
const productGrid = document.querySelector('.product-grid')
const resultCount = document.querySelector('.result-count')
const catalogTotal = document.querySelector('.catalog-total')
const filtersForm = document.querySelector('.filters')
const searchInput = document.querySelector('.search-input')
const priceFilter = document.querySelector('.price-filter')
const categoryFilter = document.querySelector('.category-filter')
const sortSelect = document.querySelector('.sort-select')
const resetButton = document.querySelector('.reset-filters')
const cartList = document.querySelector('.cart-list')
const cartEmpty = document.querySelector('.cart-empty')
const cartTotal = document.querySelector('.cart-total')
const cartCount = document.querySelector('.cart-count')
const clearCartButton = document.querySelector('.clear-cart')

const formatPrice = (value) => `$${value}`

// ---------- Reading the controls ----------
export function getFilterValues() {
  return {
    search: searchInput.value,
    price: priceFilter.value,
    category: categoryFilter.value,
    sort: sortSelect.value,
  }
}

// ---------- Products ----------
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

export function renderProducts(visible, totalCount) {
  productGrid.innerHTML = visible.length
    ? visible.map(createProductCard).join('')
    : '<p class="no-results">No products match these filters.</p>'

  resultCount.textContent = `Showing ${visible.length} of ${totalCount} products`
}

export function renderCatalogTotal(total) {
  catalogTotal.textContent = `Total value of all products: ${formatPrice(total)}`
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

export function renderCart(items, total, count) {
  cartList.innerHTML = items.map(createCartItem).join('')
  cartEmpty.hidden = items.length > 0
  clearCartButton.hidden = items.length === 0
  cartTotal.textContent = formatPrice(total)
  cartCount.textContent = count
}

// ---------- Events ----------
// Called once from main.js; each handler is plain logic that knows nothing about the DOM
export function bindEvents({ onFiltersChange, onAddToCart, onCartAction, onClearCart }) {
  // One listener on the grid handles every "Add to cart" button (event delegation)
  productGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-id]')
    if (!button) return
    onAddToCart(Number(button.dataset.id))
  })

  cartList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]')
    if (!button) return
    onCartAction(button.dataset.action, Number(button.dataset.id))
  })

  clearCartButton.addEventListener('click', onClearCart)

  // "input" fires on every keystroke, so results update while typing
  searchInput.addEventListener('input', onFiltersChange)

  for (const control of [priceFilter, categoryFilter, sortSelect]) {
    control.addEventListener('change', onFiltersChange)
  }

  // Pressing Enter in the search box must not submit (and reload) the page
  filtersForm.addEventListener('submit', (event) => event.preventDefault())

  resetButton.addEventListener('click', () => {
    searchInput.value = ''
    priceFilter.value = 'all'
    categoryFilter.value = 'all'
    sortSelect.value = 'default'
    onFiltersChange()
  })
}
