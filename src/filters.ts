// Pure functions only: they take data in and return new data, no DOM

const priceRanges = {
  all: () => true,
  'under-50': (price) => price < 50,
  '50-100': (price) => price >= 50 && price <= 100,
  'over-100': (price) => price > 100,
}

export function filterProducts(list, search, priceRange, category) {
  // Lowercase both sides so "BAG", "bag" and "Bag" all match
  const query = search.trim().toLowerCase()
  return list.filter(
    (product) =>
      product.name.toLowerCase().includes(query) &&
      priceRanges[priceRange](product.price) &&
      (category === 'all' || product.category === category),
  )
}

// Sorts a copy, so the original products array keeps its order
export function sortProducts(list, order) {
  if (order === 'price-asc') {
    return [...list].sort((a, b) => a.price - b.price)
  }
  if (order === 'price-desc') {
    return [...list].sort((a, b) => b.price - a.price)
  }
  return list
}
