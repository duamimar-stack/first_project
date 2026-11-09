// Draws products and reads the filter controls. Does not calculate or save.
import { formatPrice } from "../../shared/format/price";
import { getElement } from "../../shared/ui/dom";
import { isCategoryFilter, isPriceRange, isSortOrder } from "./products.guards";
import type { Category, Product, ProductFilters } from "./products.types";

const productGrid = getElement(".product-grid", HTMLElement);
const resultCount = getElement(".result-count", HTMLElement);
const catalogTotalText = getElement(".catalog-total", HTMLElement);
const filtersForm = getElement(".filters", HTMLFormElement);
const searchInput = getElement(".search-input", HTMLInputElement);
const priceFilter = getElement(".price-filter", HTMLSelectElement);
const categoryFilter = getElement(".category-filter", HTMLSelectElement);
const sortSelect = getElement(".sort-select", HTMLSelectElement);
const resetButton = getElement(".reset-filters", HTMLButtonElement);

// One illustration per category, served from public/images/
const categoryImages: Record<Category, string> = {
  Bags: "/images/bags.svg",
  Shoes: "/images/shoes.svg",
  Accessories: "/images/accessories.svg",
};

function productImage(product: Product): string {
  return categoryImages[product.category];
}

function createProductCard(product: Product): string {
  return `
    <article class="product-card">
      <img class="product-image" src="${productImage(product)}" alt=""
        width="400" height="500" />
      <h3 class="product-name">${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button class="button button-secondary" type="button" data-id="${product.id}"
        ${product.inStock ? "" : "disabled"}>
        ${product.inStock ? "Add to cart" : "Out of stock"}
      </button>
    </article>
  `;
}

// The option values in index.html match the ProductFilters types;
// an unexpected value falls back to the default option
export function getFilterValues(): ProductFilters {
  const price = priceFilter.value;
  const category = categoryFilter.value;
  const sort = sortSelect.value;
  return {
    search: searchInput.value,
    price: isPriceRange(price) ? price : "all",
    category: isCategoryFilter(category) ? category : "all",
    sort: isSortOrder(sort) ? sort : "default",
  };
}

export function renderProducts(visible: Product[], totalCount: number): void {
  productGrid.innerHTML = visible.length
    ? visible.map(createProductCard).join("")
    : '<p class="no-results">No products match these filters.</p>';

  resultCount.textContent = `Showing ${visible.length} of ${totalCount} products`;
}

export function renderProductsError(message: string): void {
  productGrid.innerHTML = "";
  const error = document.createElement("p");
  error.className = "no-results";
  error.setAttribute("role", "alert");
  error.textContent = message;
  productGrid.append(error);
  resultCount.textContent = "";
}

export function renderCatalogTotal(total: number): void {
  catalogTotalText.textContent = `Total value of all products: ${formatPrice(total)}`;
}

interface ProductHandlers {
  onFiltersChange: () => void;
  onAddToCart: (id: number) => void;
}

// Called once from main.ts
export function bindProductEvents({ onFiltersChange, onAddToCart }: ProductHandlers): void {
  // One listener on the grid handles every "Add to cart" button (event delegation)
  productGrid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("button[data-id]");
    if (!(button instanceof HTMLButtonElement)) return;
    onAddToCart(Number(button.dataset.id));
  });

  // "input" fires on every keystroke, so results update while typing
  searchInput.addEventListener("input", onFiltersChange);

  for (const control of [priceFilter, categoryFilter, sortSelect]) {
    control.addEventListener("change", onFiltersChange);
  }

  // Pressing Enter in the search box must not submit (and reload) the page
  filtersForm.addEventListener("submit", (event) => event.preventDefault());

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    priceFilter.value = "all";
    categoryFilter.value = "all";
    sortSelect.value = "default";
    onFiltersChange();
  });
}
