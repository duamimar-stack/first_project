# DH Bags Design

Every value below is a custom property in `src/styles/base.css`. Styles use the tokens, not raw
values, so a change in one place reaches the whole site.

## Reference and direction

The reference is the minimal store look of Celine: a lot of white space, small uppercase labels,
square corners and very little color. The large serif headlines come from fashion magazines such
as Vogue.

ShopBoard keeps that calm look and improves on it where those stores are often weak:

- **Readable small text.** Pale gold fails contrast on white, so gold is split into `--gold` for
  lines and `--gold-text` for text.
- **Mobile first.** Base styles are for phones. Larger screens are added with `min-width` queries.
- **Comfortable touch targets.** Icon-sized buttons use `--tap-size` (44px).
- **Visible keyboard focus.** Every link, button and form control gets a gold outline.

## Color

| Token            | Value     | Use                         |
| ---------------- | --------- | --------------------------- |
| `--black`        | `#111111` | Headings, buttons, footer   |
| `--white`        | `#ffffff` | Page background             |
| `--ivory`        | `#f5f1ea` | Register section background |
| `--gold`         | `#b08d57` | Lines and accents only      |
| `--gold-text`    | `#7a5c2e` | Small gold text             |
| `--text`         | `#4a4a4a` | Body text                   |
| `--text-muted`   | `#6f6f6f` | Placeholders                |
| `--text-on-dark` | `#b5b5b5` | Small text on black         |
| `--border`       | `#e6e1d8` | Dividers                    |

## Typography

Headings use Cormorant Garamond (`--serif`). Everything else uses the system font (`--sans`).

| Token         | Size                   | Use                    |
| ------------- | ---------------------- | ---------------------- |
| `--font-xs`   | 12px                   | Labels, buttons, nav   |
| `--font-s`    | 14px                   | Form hints             |
| `--font-m`    | 16px                   | Body text, inputs      |
| `--font-l`    | 20px                   | Hero text, messages    |
| `--font-h3`   | 22px                   | Product and cart names |
| `--font-logo` | 26px                   | Logo text              |
| `--font-h2`   | 36px, 48px from 1024px | Section titles         |
| `--font-h1`   | 44px, 72px from 1024px | Hero title             |

Uppercase labels use `--tracking-wide`. Inputs stay at 16px so phones do not zoom in on focus.

## Spacing

The scale is `--space-xs` 4px, `--space-s` 8px, `--space-m` 16px, `--space-l` 32px, `--space-xl`
64px and `--space-xxl` 96px. `--space-field` (12px) is only for the inside of form controls.

## Components

- **Button:** `.button` is solid black. `.button-secondary` is the outlined version. Both invert
  on hover, and corners stay square. A disabled button fades to 40% and ignores hover.
- **Form field:** an uppercase label above an input with only a bottom border.
- **Toast:** a black bar with a gold line, shown at the bottom of the screen.

## Layout

| Width     | Changes                                                  |
| --------- | -------------------------------------------------------- |
| Below 600 | One column                                               |
| 600px     | Two columns of products and filters                      |
| 900px     | Three columns of products, row of filters, two-part hero |
| 1024px    | Larger headings                                          |

Content stops growing at `--page-width` (1280px).
