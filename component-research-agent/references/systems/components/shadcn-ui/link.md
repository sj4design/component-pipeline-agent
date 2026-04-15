---
system: shadcn/ui
component: Link (no dedicated component)
url: https://ui.shadcn.com
last_verified: 2026-03-28
confidence: high
---

# Link

## Approach
shadcn/ui does not have a dedicated Link component. Links are either native HTML anchors (with Tailwind styling) or the project's router Link component (Next.js Link, React Router Link) styled with Tailwind utility classes. The Button with variant="link" provides a button styled to look like a link for action contexts. This reflects shadcn/ui's view that a Link component adds no meaningful value over a styled anchor.

## Key Decisions
1. **No dedicated component** (HIGH) — Native `<a>` with className="text-primary underline-offset-4 hover:underline" is the pattern; no component abstraction needed.
2. **Button variant="link"** (HIGH) — For button semantics with link appearance (triggering actions, not navigation), Button's "link" variant is the correct approach.
3. **Router-native links** (MEDIUM) — Projects use their router's Link component directly (Next.js Link, etc.) with Tailwind styling, avoiding vendor lock-in.

## Notable Props
- Not applicable — use native `<a>` or router Link
- Button `variant="link"` for button-with-link-appearance

## A11y Highlights
- **Keyboard**: Native anchor activation
- **Screen reader**: Native link semantics from HTML anchor
- **ARIA**: Native anchor; developer adds aria-label for ambiguous link text

## Strengths & Gaps
- **Best at**: Framework-agnostic; no unnecessary abstraction; Button[variant=link] for action-links
- **Missing**: No external link indicator; no muted variant; no standardized link styling across the project
