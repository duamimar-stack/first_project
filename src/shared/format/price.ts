// Prices are stored in whole dollars, e.g. 89 -> "$89"
export function formatPrice(value: number): string {
  return `$${value}`;
}
