# AGENTS.md — Instructions for coding agents working on this repo

## Content
- **Content lives only in `src/lib/content.ts`** — never hardcode copy in components.
  All text, CV data, section labels, and brand data are exported as typed constants from
  this single file. Components import from it.

## Design Tokens
- **Design tokens live only in `src/styles.css` `:root` / `@theme`** — never hardcode
  hex colors in components. Use `var(--amber)` or Tailwind classes like `text-amber`.

## Routing
- **`routeTree.gen.ts` is generated** by the TanStack Router plugin — never hand-edit it.
  It is auto-regenerated on `bun run dev` or `bun run generate-routes`.

## Animation Performance Rules
- Animate **`transform` and `opacity` only**, everywhere.
- Two explicitly scoped exceptions:
  1. `clip-path` on `wipe-curtain.tsx` (scroll-scrubbed section heading reveal)
  2. `clip-path` on `project-card.tsx` (hover spec-sheet circle mask)
- No `box-shadow` on large/frequently-animated elements (the sector-rail dot glow
  is a small, fixed-size exception).
- No `backdrop-filter`, no large blurred gradients.

## Reduced Motion
- **Respect `prefers-reduced-motion`** in any new animated component.
- Use the `useReducedMotion()` hook from `src/hooks/use-reduced-motion.ts`.
- Lenis smooth scrolling is disabled; R3F hero scene is not mounted;
  wipe-curtain scrubbing is skipped; one-shot reveals still fire but
  the global CSS rule zeroes their transition-duration.
- Content must **never** get stuck hidden or mid-animation under reduced motion.
