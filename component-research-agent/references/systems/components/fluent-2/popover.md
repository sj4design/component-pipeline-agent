---
system: Fluent 2 (Microsoft)
component: Popover
url: https://fluent2.microsoft.design/components/web/react/popover/
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
Fluent 2's Popover is a lightweight overlay for non-modal interactive content, positioned relative to a trigger. It composes as Popover, PopoverTrigger, PopoverSurface (the content container), and uses Fluent's positioning engine for intelligent placement. Unlike Dialog, Popover does not trap focus by default (though trapping can be enabled), making it suitable for persistent contextual controls.

## Key Decisions
1. **Non-modal by default** (HIGH) — Fluent Popover does not trap focus, allowing users to continue interacting with the page. This distinguishes it from Dialog and is suitable for help text, contextual menus, or settings panels that don't require exclusive attention.
2. **trapFocus prop for modal behavior** (HIGH) — When the popover contains a form or requires exclusive interaction, `trapFocus` enables focus trapping, converting it to a modal-like overlay without switching to Dialog.
3. **PopoverSurface as styled container** (MEDIUM) — PopoverSurface provides the Fluent-styled card/surface appearance for popover content, handling elevation, border, and background tokens automatically.

## Notable Props
- `open` / `onOpenChange`: controlled state
- `trapFocus`: enable focus trapping
- `positioning`: placement, offset, fallback positions
- `PopoverTrigger`: trigger with aria-expanded
- `PopoverSurface`: styled content container

## A11y Highlights
- **Keyboard**: Escape closes; Tab navigates content; focus returns to trigger on close
- **Screen reader**: role="dialog" when trapFocus; aria-expanded on trigger; aria-haspopup="dialog"
- **ARIA**: Appropriate roles based on trapFocus setting

## Strengths & Gaps
- **Best at**: Non-modal by default; trapFocus for when needed; Fluent positioning engine; PopoverSurface styling
- **Missing**: No built-in header/body/footer; no arrow prop (separate PopoverArrow available)
