// Draws products and reads the filter controls. Does not calculate or save.
import "../../styles/products.css";
import { formatPrice } from "../../shared/format/price";
import { getElement } from "../../shared/ui/dom";
import type { Category, Product, ProductFilters } from "./products.types";

const productGrid = getElement<HTMLElement>(".product-grid");
const resultCount = getElement<HTMLElement>(".result-count");
const catalogTotalText = getElement<HTMLElement>(".catalog-total");
const filtersForm = getElement<HTMLFormElement>(".filters");
const searchInput = getElement<HTMLInputElement>(".search-input");
const priceFilter = getElement<HTMLSelectElement>(".price-filter");
const categoryFilter = getElement<HTMLSelectElement>(".category-filter");
const sortSelect = getElement<HTMLSelectElement>(".sort-select");
const resetButton = getElement<HTMLButtonElement>(".reset-filters");

// One illustration per category; replace with real photos in ./images/
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
      <button class="button" type="button" data-id="${product.id}"
        ${product.inStock ? "" : "disabled"}>
        ${product.inStock ? "Add to cart" : "Out of stock"}
      </button>
    </article>
  `;
}

// The option values in index.html match the ProductFilters types
export function getFilterValues(): ProductFilters {
  return {
    search: searchInput.value,
    price: priceFilter.value as ProductFilters["price"],
    category: categoryFilter.value as ProductFilters["category"],
    sort: sortSelect.value as ProductFilters["sort"],
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
    const button = (event.target as Element).closest<HTMLButtonElement>("button[data-id]");
    if (!button) return;
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
