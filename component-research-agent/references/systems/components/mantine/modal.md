---
system: Mantine
component: Modal
url: https://mantine.dev/core/modal/
last_verified: 2026-03-28
confidence: high
---

# Modal

## Approach
Mantine's Modal is feature-complete with a particularly clean API. It handles all standard modal needs plus some extras: fullscreen mode, centered alignment, outside click configuration, and a `Drawer` variant in the same package. Mantine's Modal uses a portal by default, handles scroll locking, and integrates with Mantine's transition system for customizable animations. A standout feature is `modals manager` — a programmatic API for opening modals from anywhere in the code without rendering modal components in JSX.

## Key Decisions
1. **Modals manager for programmatic control** (HIGH) — Mantine provides a `modals.open()` / `modals.close()` API that lets developers open modals programmatically, similar to notification/toast APIs. This is extremely useful in async workflows where a modal needs to appear after an API call completes deep in a service layer.
2. **fullScreen prop** (MEDIUM) — `fullScreen` mode expands the modal to cover the full viewport, useful for mobile interfaces or immersive editing workflows. It transitions smoothly between regular and fullscreen modes.
3. **transition prop** (MEDIUM) — Accepts a Mantine transition name or transition config, allowing the modal entrance/exit to use any of Mantine's built-in transitions (fade, scale, slide-up, rotate-left, etc.) without custom CSS.

## Notable Props
- `opened` / `onClose`: controlled state
- `title`: modal heading (auto-linked for aria-labelledby)
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "auto" | "100%"` or number for px
- `fullScreen`: boolean
- `centered`: vertically centers the modal
- `transition` / `transitionProps`: animation configuration
- `closeOnClickOutside` / `closeOnEscape`: dismiss behavior

## A11y Highlights
- **Keyboard**: Focus trapped; Escape closes (configurable); Tab/Shift+Tab cycle
- **Screen reader**: `role="dialog"`; title automatically linked via `aria-labelledby`; background `aria-hidden`
- **ARIA**: `aria-modal="true"`; `aria-labelledby` set automatically from title prop

## Strengths & Gaps
- **Best at**: Programmatic modals API; transition variety; fullScreen mode; size string flexibility
- **Missing**: No alertdialog variant in core (though NativeScrollArea can be used for long content); no built-in confirmation dialog abstraction
