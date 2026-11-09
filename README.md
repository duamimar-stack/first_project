# ShopBoard

ShopBoard is the front end of DH Bags, a small online store for handbags, shoes and accessories.
It is written in TypeScript with no framework and built with Vite.

## Features

- Product catalog loaded from a remote API
- Search by name, filter by price and category, sort by price
- Shopping cart with quantities, a running total and a count in the header
- The cart is saved in `localStorage` and survives a page reload
- Registration form with native browser validation (a demo: no account is created)
- Mobile-first layout that works from phone to desktop

## Getting started

You need Node.js and npm.

```sh
npm install
npm run dev
```

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Starts the development server                 |
| `npm run build`        | Builds the site into `dist/`                  |
| `npm run preview`      | Serves the production build locally           |
| `npm run typecheck`    | Checks the types with the TypeScript compiler |
| `npm run lint`         | Runs ESLint                                   |
| `npm run format`       | Formats every file with Prettier              |
| `npm run format:check` | Checks the formatting without changing files  |

A husky pre-commit hook runs ESLint and Prettier on staged files through lint-staged.

## Project structure

```text
index.html            Page markup
public/               Favicon and images
src/
  main.ts             Connects the modules
  modules/
    products/         Catalog: API, types, guards, logic, UI
    cart/             Cart: state, types, guards, logic, UI
    register/         Register form events
  shared/
    api/              fetch wrapper
    format/           Price formatting
    types/            Shared type guards
    ui/               DOM lookup and toast
  styles/             Design tokens, layout and module styles
```

The design system is described in [DESIGN.md](DESIGN.md), the bugs found along the way are in
[debugging-log.md](debugging-log.md), and the rules for working on the code are in
[CLAUDE.md](CLAUDE.md).
