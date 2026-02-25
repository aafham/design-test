# design-test

iOS 26-inspired "Liquid Glass" marketing + ordering UI concept for a boutique cake shop.

This repo now contains two implementations:

1. Legacy static prototype (`index.html`, `styles.css`, `app.js`)
2. Refactored Next.js-style component architecture (`app/`, `components/`)

## What Was Added

The refactor introduces a reusable, token-driven UI system focused on hierarchy, readability, consistency, and conversion:

- Theme tokens for light/dark mode (`app/tokens.css`)
- Reusable `GlassCard` primitive with subtle highlight + noise overlay
- Refactored sections: Header, Hero, Best Sellers, Custom Design, Info Chips, Start Order CTA
- Mobile improvements:
  - stacked hero CTAs
  - horizontal snap Best Sellers
  - floating WhatsApp button (desktop) + bottom bar (mobile)
- Accessibility baseline:
  - focus-visible styles
  - keyboard-friendly controls
  - improved text contrast and spacing rhythm

## Key Files

- `app/tokens.css` - design tokens (radius, spacing, glass, shadows, theme values)
- `app/globals.css` - global styles + component utility classes
- `app/layout.tsx` - root layout and global CSS import
- `app/page.tsx` - assembled home page
- `components/GlassCard.tsx` - reusable liquid glass container
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/ProductCard.tsx`
- `components/sections/*` - page sections

## Tech Notes

- Visual language: iOS-style Liquid Glass
- Typography: SF Pro/system stack
- Blur is capped (`--glass-blur: 12px`) for better performance
- Shadow system uses only 2 levels (`--shadow-default`, `--shadow-hover`)

## Running The Project

### Static version

Open `index.html` directly in your browser.

### Next.js-style version

This repo currently includes UI code structure for Next.js (`app/` + `components/`), but no package/build setup was added yet.

To run it as a real Next app, add the usual Next.js project scaffolding (`package.json`, `next`, `react`, `react-dom`, `tsconfig.json`, etc.), then run `next dev`.
