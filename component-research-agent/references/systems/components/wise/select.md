---
system: Wise Design
component: Select
url: https://wise.design/components/select
last_verified: 2026-03-28
confidence: low
---

# Select

## Approach
Wise's Select is used for currency selection (a core Wise workflow), country selection, and account type selection in their financial product. Currency selection is a particularly demanding use case — with 50+ currencies, the select likely has search/filter capability making it closer to a combobox than a native select. The component reflects Wise's clean design with clear selected value display.

## Key Decisions
1. **Currency/country selection focus** (HIGH) — The select component is optimized for Wise's primary use case of selecting from long lists of currencies and countries, likely requiring type-ahead filtering.
2. **Clean flag/icon support** (MEDIUM) — Currency options likely display currency flags/icons, making this a custom select rather than native.
3. **Search capability** (MEDIUM) — With 50+ currencies, searchable filtering is likely a core feature.

## Notable Props
- `value`: Selected value
- `onChange`: Selection callback
- `options`: Option list
- `searchable`: Filter/search capability

## A11y Highlights
- **Keyboard**: Type-ahead or search-based navigation expected
- **Screen reader**: Currency/option announcement
- **ARIA**: Combobox pattern likely for searchable variant

## Strengths & Gaps
- **Best at**: Currency and country selection for financial products; flag/icon option rendering
- **Missing**: Low confidence — limited public documentation
