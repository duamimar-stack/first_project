import { products } from './products.js'

const STORAGE_KEY = 'shopboard-cart'

// The cart only stores ids and quantities: [{ id: 1, quantity: 2 }, ...]
let cart = loadCart()

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    // Keep only entries that still match a real product with a valid quantity
    return saved.filter(
      (item) =>
        products.some((product) => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
  } catch {
    return []
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Storage can be blocked (e.g. private mode); the cart still works for this visit
  }
}

export function addToCart(id) {
  const item = cart.find((entry) => entry.id === id)
  if (item) {
    item.quantity += 1
  } else {
    cart.push({ id, quantity: 1 })
  }
  saveCart()
}

export function changeQuantity(id, amount) {
  const item = cart.find((entry) => entry.id === id)
  if (!item) return
  item.quantity += amount
  if (item.quantity <= 0) {
    removeFromCart(id)
    return
  }
  saveCart()
}

export function removeFromCart(id) {
  cart = cart.filter((entry) => entry.id !== id)
  saveCart()
}

// Joins each cart entry with its product so the UI gets name and price too
export function getCartItems() {
  return cart.map((entry) => ({
    ...products.find((product) => product.id === entry.id),
    quantity: entry.quantity,
  }))
}

export function getCartTotal() {
  return getCartItems().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
}

export function getCartCount() {
  return cart.reduce((count, entry) => count + entry.quantity, 0)
}
