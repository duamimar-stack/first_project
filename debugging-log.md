# Debugging Log

Bugs found while building ShopBoard, oldest first. File names are the ones the
project had at the time; the code now lives in `src/modules` and `src/styles`.

## Bug 1

- **What I saw:** After replacing the starter markup in `index.html`, `src/main.js` would crash on load with `TypeError: Cannot set properties of null (setting 'innerHTML')`.
- **Type:** runtime
- **How I found it:** Read `src/main.js` before changing the page: the Vite starter code wrote its demo into `#app`, and the new `index.html` no longer had an element with `id="app"`.
- **Cause:** `document.querySelector('#app')` returned `null`, so `.innerHTML` was set on `null`.
- **Fix:** Removed the Vite starter code from `src/main.js`. It became the real entry file that renders the shop.
- **Did I use AI? For what?** Yes, Claude spotted the missing `#app` element and fixed it before the error showed up in the browser.

## Bug 2

- **What I saw:** The site ran and the products showed, but the header, hero, register form and footer looked unstyled.
- **Type:** logic (CSS)
- **How I found it:** Checked that the CSS was loading (`import './style.css'` in `src/main.js`, so it was), then compared the selectors in `src/style.css` with the classes in `index.html`.
- **Cause:** `src/style.css` was still the Vite starter stylesheet. Its rules targeted demo elements that no longer existed (`#app`, `#center`, `#next-steps`, `.counter`), and there were no rules for `.site-header`, `.hero-title`, `.register-form` or `.site-footer`. CSS only applies when a selector matches an element.
- **Fix:** Rewrote `src/style.css` mobile-first with the same color and font variables, removed the dead starter rules, and added styles for every section. Checked the result with screenshots at phone and desktop width.
- **Did I use AI? For what?** Yes, Claude found the selector mismatch and rewrote the stylesheet.

## Bug 3

- **What I saw:** The "Clear cart" button should hide when the cart is empty (`clearCartButton.hidden = true`), but it would still be visible.
- **Type:** logic (CSS)
- **How I found it:** Reviewing the CSS before testing: the button also has the class `.button`, which sets `display: inline-block`.
- **Cause:** The `hidden` attribute only works through the browser's default `display: none`, and any CSS rule that sets `display` overrides it.
- **Fix:** Added `.clear-cart[hidden] { display: none; }` (now in `src/styles/cart.css`), then confirmed in a browser test that the button is hidden when the cart is empty and visible when it has items.
- **Did I use AI? For what?** Yes, Claude caught the conflict and wrote the fix and the test.
