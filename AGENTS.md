# AGENTS.md — ShopBoard

## Project
ShopBoard is a simple shop front-end: a header with navigation, a hero section,
product cards, and a registration form.

## Stack
- Vite (vanilla template, no framework)
- HTML
- CSS
- Plain JavaScript only when needed

## Commands
- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build

## Project structure
- `index.html` — page markup
- `src/style.css` — all styles
- `src/main.js` — entry script
- `public/` — static assets

## HTML rules
- Semantic HTML first: use `header`, `nav`, `main`, `section`, `article`, `footer`
  instead of generic `div`s wherever an element with meaning exists.
- One `h1` per page; keep heading levels in order (no skipping from `h2` to `h4`).
- Every `img` has a meaningful `alt` (or `alt=""` if purely decorative).
- Every input has a `<label>` connected with `for` / `id`.
- Use native form validation (`required`, `type="email"`, `minlength`, `pattern`)
  before writing any JavaScript validation.
- Buttons are `<button>`, links are `<a>`; never use a `div` as a button.

## CSS rules
- Mobile-first: write base styles for small screens, then add
  `@media (min-width: ...)` queries for larger screens. No `max-width` queries.
- No `!important`.
- Use CSS custom properties (variables) for colors, spacing and font sizes.
- Prefer Flexbox and Grid for layout.
- Use classes for styling, not IDs.

## Accessibility
- Visible focus styles on all interactive elements.
- Sufficient color contrast between text and background.
- The page must be usable with keyboard only.

## Working style
- Explain every change: after each edit, list which files changed and why.
- Make small, focused changes; do not rewrite files that were not part of the task.
- Do not add new dependencies without asking first.
