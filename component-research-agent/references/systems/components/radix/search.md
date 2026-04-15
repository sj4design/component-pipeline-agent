---
system: Radix UI (WorkOS)
component: Search (no dedicated component — use TextField with search type)
url: https://www.radix-ui.com/themes/docs/components/text-field
last_verified: 2026-03-28
confidence: high
---

# Search

## Approach
Radix UI does not have a dedicated Search component. Search inputs in Radix are implemented using the standard TextField with `type="search"` or with a custom input using the TextField.Slot pattern for icons. This is consistent with Radix's philosophy of not building high-level opinionated components when the native HTML element (input[type="search"]) already handles the core functionality. The native search input provides clear-on-escape behavior and semantic search type for browser/AT.

## Key Decisions
1. **No dedicated Search component** (MEDIUM) — The native `type="search"` provides search semantics and a clear button on most browsers. Radix adds slot-based icon support via TextField.Slot without needing a separate component.
2. **TextField.Slot for search icon** (MEDIUM) — The search icon is placed via TextField.Slot, keeping the implementation pattern consistent with all other TextField icon use cases.

## Notable Props
- TextField `type="search"`: native search semantics
- TextField.Slot: for magnifying glass icon placement

## A11y Highlights
- **Keyboard**: Escape clears search input (native browser behavior for type="search")
- **Screen reader**: Native search input semantics; role="search" on the form wrapper
- **ARIA**: Wrapping form with role="search" and aria-label provides search landmark for screen readers

## Strengths & Gaps
- **Best at**: Native search semantics; consistent with TextField patterns
- **Missing**: No search suggestions/autocomplete; no result announcement; no dedicated search primitive
