---
system: Fluent 2 (Microsoft)
component: SearchBox
url: https://fluent2.microsoft.design/components/web/react/searchbox/usage
last_verified: 2026-03-28
confidence: high
---

# SearchBox

## Approach
Fluent 2 provides a dedicated SearchBox component, unlike many systems that reuse a text input. The SearchBox is specialized for search interactions: it has a built-in search icon, an integrated clear button that appears when content is entered, and handles the specific keyboard behavior of search inputs (Enter submits, Escape clears). This reflects the prevalence of search in Microsoft's products — Teams search, Outlook search, Azure resource search are all critical features.

## Key Decisions
1. **Dedicated SearchBox component** (HIGH) — Microsoft's products have extensive search requirements. A dedicated component with purpose-built behavior (clear on Escape, search icon, submit on Enter) is more appropriate than a generic input with search styling.
2. **dismiss button integrated** (HIGH) — The X clear button appears automatically when content is entered. This is different from Radix/Chakra where clear buttons must be manually composed.
3. **appearance variants** (MEDIUM) — `"outline"`, `"underline"`, `"filled-darker"`, `"filled-lighter"` matching Fluent's input appearance system. Office search uses the underline appearance; Teams search uses a more prominent outline.

## Notable Props
- `value` / `onChange`: controlled search text
- `onSearch`: callback when user submits (Enter or search button)
- `appearance`: visual variant (matches Input appearances)
- `size`: `"small" | "medium" | "large"`
- `dismiss`: clear button behavior

## A11y Highlights
- **Keyboard**: Enter triggers search; Escape clears; clear button keyboard accessible
- **Screen reader**: Input has implicit search role; clear button labeled; search results should be announced by consumer
- **ARIA**: role="searchbox" or similar; clear button labeled "Dismiss"

## Strengths & Gaps
- **Best at**: Integrated clear button; onSearch callback; purpose-built search semantics; appearance variants
- **Missing**: No built-in suggestion list (combine with Combobox for autocomplete)
