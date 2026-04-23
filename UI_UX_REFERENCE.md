# Vista UI — UI/UX reference

Member app (`vista-ui`): design tokens, typography, layout, and common patterns. Values reflect the codebase at the time of writing; when you change tokens or global styles, update this file in the same PR when practical.

---

## 1. Stack and where styles live

| Layer | Role |
|--------|------|
| **React 19 + Vite 7** | App shell |
| **Mantine 8** | Components, theme, normalize |
| **SCSS** | Design tokens, global overrides, feature styles |

**Entry points**

- `src/main.jsx` — `MantineProvider` theme, Mantine style imports (`@mantine/core`, dates, notifications).
- `src/App.jsx` — Imports `src/assets/styles/app.scss` (global app styles after Mantine).
- `index.html` — Google Fonts preconnect + stylesheets for **DM Sans** and **Poppins**.

**Token pipeline**

- `src/assets/styles/utils/_index.scss` forwards: `palette`, `variables`, `spacing`, `platform-colors`, `typography`, `mixins`, `gradients`.
- `app.scss` uses those utilities for `:root` extensions, `body`, form controls, Mantine class overrides, etc.

---

## 2. Color system

### 2.1 CSS custom properties (`src/assets/styles/utils/_palette.scss`)

Defined on `:root`. These are the **canonical hex values** for the product palette.

| Token | Hex |
|--------|-----|
| `--white` | `#ffffff` |
| `--black` | `#000000` |
| `--grey-100` | `#FCFBFF` |
| `--grey-200` | `#F4F4F5` |
| `--grey-300` | `#E4E4E7` |
| `--grey-400` | `#A9A9B2` |
| `--grey-500` | `#71717A` |
| `--grey-600` | `#3F3F46` |
| `--grey-700` | `#27272A` |
| `--grey-800` | `#545454` |
| `--grey-900` | `#121214` |
| `--primary-10` | `#FAF5FF` |
| `--primary-50` | `#F9F5FF` |
| `--primary-100` | `#E6D5FE` |
| `--primary-200` | `#CDACFE` |
| `--primary-300` | `#BB91EB` |
| `--primary-400` | `#A569FF` |
| `--primary-500` | `#B382FD` |
| `--primary-600` | `#A669F8` |
| `--primary-700` | `#9A58FC` |
| `--primary-800` | `#7622D7` |
| `--primary-dark` | `#460078` |
| `--primary-darker` | `#280541` |
| `--success-100` … `--success-500` | `#D1FAF5` → `#017D6D` (see palette file) |
| `--error-100` … `--error-500` | `#FEE5E2` → `#BD2D09` (see palette file) |

Commented **OLD palette** blocks in the same file are historical only; do not use for new UI.

### 2.2 SCSS semantic aliases (`src/assets/styles/utils/_platform-colors.scss`)

SCSS variables point at the CSS variables above. Important mappings:

| Variable | Maps to | Typical use |
|----------|---------|----------------|
| `$primary` | `--primary-800` (`#7622D7`) | Brand actions, focus rings, accents |
| `$primary-light` … `$primary-ultra-lightest` | Lighter primary steps | Hover, backgrounds, pills |
| `$primary-dark` / `$primary-darker` | Darker purples | Hover dark, deep accents |
| `$neutral` … `$neutral-max-darkest` | Grey scale via `--grey-*` | Borders, muted text (note: names follow the file, not literal “lightest = lightest grey”) |
| `$white` / `$black` | `--white` / `--black` | Surfaces and primary text |
| **Text roles** | | |
| `$primary-font` | `$black` | Strong body / primary text |
| `$secondary-font` | `$neutral-max-darkest` | Secondary headings (e.g. `.title` uses `$secondary-font` in `app.scss`) |
| `$tertiary-font` | `$neutral-dark` | Tertiary |
| `$tertiary-light-font` | `$neutral` | Lighter tertiary |
| **Semantic** | | |
| `$success` / `$error` (and `-light*`, `-dark`) | success/error scale | Status |
| `$highlight` / `$highlight-dark` | Align with primary | Highlights |
| `$hero-section-bg` | CSS gradient | Hero-style sections: `linear-gradient(135deg, hsl(275, 32%, 93%) 0%, hsl(280, 100%, 95%) 50%, hsl(320, 100%, 96%) 100%)` |

**Brand in practice:** Interactive purple is centered on **`--primary-800` / `$primary`** (`#7622D7`), with lighter lavenders for surfaces and focus glows (e.g. `rgba(199, 164, 255, 0.2)` in input focus in `app.scss`).

---

## 3. Gradients and mixins

**File:** `src/assets/styles/utils/_gradients.scss`

Named gradients used across marketing/flows (examples): `$shared-gradient`, `$pricing-card-gradient`, `$faq-background-gradient`, `$mentors-background-gradient`, `$create-application-gradient`, `$mentor-applications-gradient`, `$gradient-login-page`, etc. Prefer reusing these variables rather than duplicating hex stops.

**File:** `src/assets/styles/utils/_mixins.scss`

- `@mixin gradient-text-with-underline` — gradient text clip + optional hero underline decoration.
- `@mixin card-shadow` — `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);` (also used by components like session segmented control).

**Cards (global pattern in `app.scss`)**

- `.card`: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`, padding via `calc-spacing(4)`, white background, rounded `calc-spacing(2)`.

---

## 4. Typography

### 4.1 Fonts

| Use | Family | Loaded weights (see `index.html`) |
|-----|--------|-----------------------------------|
| **Body / UI** | **DM Sans** | Variable ital/opsz 100–1000 |
| **Headings (Mantine)** | **Poppins** | 700, 800, 900 |

### 4.2 Mantine theme (`src/main.jsx`)

| Key | Value |
|-----|--------|
| `fontFamily` | `"DM Sans", sans-serif` |
| `headings.fontFamily` | `"Poppins", sans-serif` |
| `headings.fontWeight` | `"800"` |
| `defaultRadius` | `"md"` (Mantine token; aligns with 8px-style rounding used in SCSS) |
| `fontSizes` | `xs` 12px, `sm` 14px, `md` 16px (default), `lg` 18px, `xl` 20px |
| `globalStyles` → `body` | `fontSize: 16px`, `lineHeight: 1.5` |

### 4.3 SCSS (`src/assets/styles/utils/_variables.scss`, `_typography.scss`, `app.scss`)

- `$font-family: DM Sans` (also exposed as `--font-family` on `:root` in `app.scss`).
- Font weights: `$font-light` 300 … `$font-bold` 700.
- **Type scale map** `$header-sizes` in `_typography.scss` (px):  
  `1` 64, `2` 50, `3` 42, `4` 36, `5` 32, `7` 30, `8` 24, `9` 20, `10` 18, `11` 16, `12` 14, `13` 12, `14` 10, `15` 8, `16` 6.  
  (There is no key `6` in the map.)

**Global text utilities (`app.scss`)**

| Class | Pattern |
|--------|---------|
| `.mantine-Title-root.title` | Large centered title; `$secondary-font`; responsive down to `header-sizes` 7 on small screens |
| `.mantine-Title-root.subtitle` | `header-sizes` 9, semibold |
| `.mantine-Text-root.subtitle` | `header-sizes` 4 / 9 responsive |
| `.mantine-Title-root.section-title` | `header-sizes` 8, bold |
| `.mantine-Text-root.description` | `header-sizes` 10 / 11 responsive |

**`:root` in `app.scss`**

- `--default-font-size`: `map.get($header-sizes, 11)` → **16px** on `body` with `line-height: 1.5`.

---

## 5. Layout, spacing, breakpoints

**Spacing** (`src/assets/styles/utils/_spacing.scss`)

- Base: `$spacing-base-size: 8` (px per unit).
- Function: `calc-spacing($n)` → `8 * $n` px (e.g. `calc-spacing(4)` = 32px).

**Breakpoints** (`_variables.scss`, aligned with Mantine comments in repo)

| Name | Width |
|------|--------|
| `$breakpoint-xs` | 450px |
| `$breakpoint-sm` | 650px |
| `$breakpoint-md` | 992px |
| `$breakpoint-lg` | 1200px |
| `$breakpoint-xl` | 1400px |
| `$breakpoint-xxl` | 1900px |

**Layout variable**

- `--header-height: 80px` on `:root` (used with `.fixed` in `app.scss`).

---

## 6. Border radius

From `_variables.scss`:

| Token | Value |
|--------|--------|
| `$border-radius-sm` | 4px |
| `$border-radius-md` | 8px |
| `$border-radius-lg` | 16px |
| `$border-radius-xl` | 24px |

Native `input` / `textarea` use `$border-radius-md` unless overridden by Mantine.

---

## 7. Forms and Mantine overrides (`app.scss`)

**Patterns**

- Default height for single-line inputs: **3.125rem** (50px).
- Borders: neutral greys; **focus** uses `$primary` border + **3px** shadow `rgba(199, 164, 255, 0.2)` (lavender glow).
- Placeholders: `$neutral`.
- Hover: often `var(--grey-600)` border and `var(--grey-150)` background — note `--grey-150` is **not** defined in `_palette.scss` today; it may resolve only where Mantine or another layer defines it. Prefer palette tokens for new code.

**Mantine targets**

- `.mantine-TextInput-input`, `.mantine-Textarea-input`, `.mantine-Select-input` — aligned with global input styling.
- Dropdowns: `.mantine-Select-dropdown`, `.mantine-MultiSelect-dropdown`, `.mantine-TagsInput-dropdown` — border `$primary`, soft purple shadow.
- `.multiselect` / `.tagsinput` — pill sizing, focus-within ring consistent with primary.

**Segmented control** (`.sessions-segmented-control`)

- White background, card shadow, indicator `$primary`, active label `$white` + semibold.

---

## 8. Shared Button

**Files:** `src/shared/components/button/Button.jsx`, `button.scss`

Mantine `Button` with class `btn` plus variant class.

| Variant (app constant) | Behavior (summary) |
|-------------------------|-------------------|
| `filled` | `$primary` background, white text; hover `$highlight-dark` |
| `outlined` | Primary border/text; hover inverts to filled |
| `dark` | `$neutral` background, white text |
| `ghost` | Transparent; hover light primary tint |
| `block-btn` | Extra border/padding variant for outlined-style blocks |

`defaultRadius` in theme is `md`; buttons use `border-radius: calc-spacing(4)` (32px pill-like corners) in SCSS. On viewports ≤ `$breakpoint-md`, height 50px and smaller type (`header-sizes` 12).

---

## 9. Notifications

**File:** `src/shared/notifications.module.scss`

Toasts use **hard-coded** Mantine-style colors (e.g. default blue `#228be6`, success green, error red `#fa5252`) rather than `$primary` / `$error` from the palette. When aligning brand, consider switching these to CSS variables or SCSS aliases in a dedicated change.

**Placement:** `Notifications` in `main.jsx` — `position="top-right"`.

---

## 10. Accessibility and UX notes

- **Body** line-height **1.5** and default **16px** text support readability.
- **Focus:** Visible focus on custom-styled inputs uses border + box-shadow (good direction); ensure new components keep visible focus.
- **Color contrast** for lavender-on-white and purple-on-white should be checked per WCAG when adding new surfaces; this document does not certify compliance.
- **Motion:** Inputs use `transition: all 0.2s ease-in-out` in global styles.

---

## 11. Quick “where to change it”

| Need | File |
|------|------|
| Hex palette | `src/assets/styles/utils/_palette.scss` |
| `$primary` / neutrals / text roles | `src/assets/styles/utils/_platform-colors.scss` |
| Font scale map | `src/assets/styles/utils/_typography.scss` |
| Font family + weights + radii breakpoints | `src/assets/styles/utils/_variables.scss` |
| Mantine font sizes / heading font | `src/main.jsx` |
| Google Fonts list | `index.html` |
| Global forms, titles, cards | `src/assets/styles/app.scss` |
| Page gradients | `src/assets/styles/utils/_gradients.scss` |
| Primary CTA button look | `src/shared/components/button/button.scss` |

---

## Related

- [README](./README.md) — runbook, aliases, routes.
