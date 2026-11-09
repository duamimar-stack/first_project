// Finds an element and checks its type, or fails loudly,
// so a renamed class in index.html is caught right away.
// Example: getElement(".search-input", HTMLInputElement)
export function getElement<T extends Element>(
  selector: string,
  type: { new (): T; prototype: T },
): T {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}
