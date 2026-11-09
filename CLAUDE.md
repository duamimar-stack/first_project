# ShopBoard

The front end of DH Bags, a small online store.

## Stack

- TypeScript with `"strict": true`, no framework
- Vite for the dev server and build
- Plain CSS with custom properties
- ESLint, Prettier, husky and lint-staged

## Commands

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run typecheck`: check the types
- `npm run lint`: run ESLint
- `npm run format`: format with Prettier

## Folder structure

- `index.html`: page markup
- `public/`: favicon and images the site uses
- `src/main.ts`: connects the modules and has no logic of its own
- `src/modules/<feature>/`: one folder per feature
- `src/shared/`: code used by more than one feature (`api`, `format`, `types`, `ui`)
- `src/styles/`: `base.css` (tokens and shared elements), `layout.css` (page frame), one file per
  feature

## Where a new feature goes

Create `src/modules/<feature>/` and split it by job, using only the files the feature needs:

- `<feature>.types.ts`: its types
- `<feature>.guards.ts`: type guards for data from outside the code
- `<feature>.logic.ts`: pure functions, no `document`, `fetch` or `localStorage`
- `<feature>.state.ts`: the data it holds and saves
- `<feature>.api.ts`: its server calls, through `shared/api/client.ts`
- `<feature>.ui.ts`: draws the feature and listens to its events

Add its styles to `src/styles/<feature>.css`, import them in `main.ts`, and connect the module
there. Move code to `src/shared/` only when a second feature needs it.

# Rules

- Do not change the original products array when sorting.
- Add event listeners only one time, not every time the page updates.
- Only UI files can change the page (the DOM): one `<feature>.ui.ts` per feature, plus
  `shared/ui/toast.ts` for toasts.

## TypeScript

- No `any`, no `as` casts and no `!`. Check unknown data with a type guard.

## HTML

- Use semantic elements, one `h1` per page, and keep heading levels in order.
- Every input has a `<label>` connected with `for` and `id`.
- Every `img` has an `alt` (`alt=""` if it is decorative).
- Buttons are `<button>` and links are `<a>`.

## CSS

- Mobile-first: `min-width` queries only.
- Use the tokens in `base.css` for colors, spacing and font sizes. See `DESIGN.md`.
- No `!important`. Style with classes, not IDs.

## Working style

- Make small, focused changes.
- Do not add dependencies without asking first.
