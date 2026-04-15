---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: medium
---

# Combobox

## Approach
Orbit does not ship a generic Combobox primitive. This gap is explained by the fact that Kiwi.com's most prominent autocomplete interaction — the airport/city search input — is a highly specialized, domain-specific component that combines geolocation, IATA code lookup, recent searches, and keyboard navigation in ways that would not fit a generic combobox API. Rather than abstracting this into a reusable primitive that might not serve the travel domain well, Kiwi.com implements autocomplete search as a bespoke feature component. For simpler selection needs (e.g., nationality, currency, country), Orbit uses a standard `Select` component without typeahead filtering. The result is a component library that handles both extremes — raw `Select` and a custom search widget — but lacks a composable middle-ground Combobox for teams that need filterable selection without building from scratch.

## Key Decisions
1. **Domain-specific over generic** (HIGH) — The airport search UX has requirements (IATA codes, recent history, geo-suggestions) that would make a generic combobox API unworkably complex or insufficiently specialized.
2. **Standard Select for simple cases** (MEDIUM) — When a finite, non-filterable list suffices (currency, language preference), Orbit's `Select` covers the need without additional complexity.
3. **No mid-tier filterable select** (MEDIUM) — Teams needing a filterable dropdown for non-travel data (e.g., internal admin tools built on Orbit) have no reusable primitive and must compose one themselves.

## Notable Props
- N/A — no Combobox component exists. See `Select` for basic dropdown needs.

## A11y Highlights
- **Keyboard**: N/A (no generic component)
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — gap in the library.
- **Missing**: A generic filterable combobox. Teams needing this pattern should consider Downshift or Radix UI's combobox primitive alongside Orbit's styling tokens.
