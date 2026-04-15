---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Nord does not provide a dedicated Combobox component — a searchable, filterable dropdown combining free-text input with a suggestion list. This gap reflects the specialized nature of clinical autocomplete in healthcare software: medical terminology databases (ICD-10 codes, SNOMED CT, medication names from drug formularies, procedure codes) require domain-specific search logic, ranking algorithms, and terminology validation that goes far beyond what a generic UI combobox component could encode. A simple combobox suggesting arbitrary filtered strings is insufficient and potentially dangerous when the domain requires suggesting only valid ICD codes, approved formulary medications, or billable procedure codes. Nord provides `<nord-select>` for structured, bounded-set selection (appropriate for condition categories, appointment types, status values) and expects clinical autocomplete to be implemented at the application layer with the specialized medical data services that power it. The search infrastructure is the complex part; the input field surface uses `<nord-input>` with application-controlled suggestion rendering.

## Key Decisions
1. **Absent by design — medical terminology requires application-layer logic** (HIGH) — Drug name autocomplete, ICD code search, and procedure code lookup require real-time queries against certified medical databases (e.g., RxNorm, SNOMED, ICD-10-CM). A generic combobox component cannot encode this — the UI shell is trivial compared to the data service, and providing only the UI shell would encourage incorrect use.
2. **`<nord-select>` covers bounded-set selection** (HIGH) — Where the valid options are known and finite (appointment type, patient gender, severity level), Nord's select covers the need. The combobox absence does not leave a gap for these common healthcare form fields.
3. **No ARIA combobox pattern in the base system** (MEDIUM) — Implementing the ARIA combobox pattern correctly (roles: `combobox`, `listbox`, `option`; keyboard: arrow navigation, Escape, Enter) is non-trivial. By not providing this, Nord avoids shipping an incomplete implementation that clinical product teams would misuse, while expecting teams with the need to implement it properly with their specific data sources.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. Teams implementing application-level combobox patterns for clinical autocomplete must implement the full ARIA combobox keyboard pattern: arrow keys to navigate suggestions, Enter to select, Escape to close, with typed characters filtering the list.
- **Screen reader**: Not applicable — no component exists. Clinical implementations must use `role="combobox"` on the input, `role="listbox"` on the suggestion container, `role="option"` on each suggestion item, and `aria-activedescendant` to communicate focus position to screen readers.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Avoiding a false sense of completeness — by not providing a generic combobox, Nord prevents teams from using an inadequate component for safety-critical medical terminology selection
- **Missing**: No reference implementation or composable primitives (e.g., a listbox primitive, a positioned-dropdown utility) that would accelerate building clinical autocomplete on top of Nord; teams must build the combobox pattern entirely from scratch, which risks inconsistent ARIA implementations across different clinical product teams
