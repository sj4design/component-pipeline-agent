---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Pagination

## Approach
Nord does not provide a Pagination component, and this gap reflects the architecture of clinical healthcare data systems. In electronic health record and healthcare management platforms, patient lists, appointment queues, lab result histories, and medication logs are typically served via server-side APIs that implement pagination at the data layer. The pagination behavior (page size, cursor-based vs. offset-based, infinite scroll vs. page numbers) varies significantly between EHR system architectures — a single standardized UI pagination component would either be too opinionated for the diversity of clinical data API designs or too generic to provide meaningful value beyond what developers would implement anyway. Nord's clinical tables and lists (`<nord-table>`) are designed to render whatever data slice the application layer provides, with pagination controls expected to be application-specific implementations. Healthcare software built on Nord often uses "load more" patterns for continuous clinical histories (medication history, encounter history) rather than numbered page controls, as clinical workflows favor continuous scrolling through longitudinal records over jumping to arbitrary page numbers.

## Key Decisions
1. **Absent by design — server-side pagination is architecture-specific** (HIGH) — Healthcare data APIs use diverse pagination schemes (offset/limit, cursor-based, FHIR bundle pagination with next/prev links, HL7 query continuation). A single UI component cannot accommodate this diversity without either overfitting to one scheme or requiring so much configuration that it provides minimal value over a custom implementation.
2. **Clinical data tables accept externally managed data slices** (HIGH) — Nord's table component renders data provided by the application. Pagination state (current page, total count, page size) is a concern of the application's data layer, not the rendering component. Coupling a pagination component to the table would introduce inappropriate architecture assumptions.
3. **Load-more over page numbers for clinical histories** (MEDIUM) — Longitudinal clinical data (medication history spanning years, encounter history) is better served by "load more" / infinite scroll patterns that preserve the user's position in a continuous record, rather than forcing clinicians to navigate to "page 3" of a medication history when seeking a specific historical entry.
4. **Total record counts can be sensitive in clinical contexts** (LOW) — Some clinical list views intentionally avoid showing total record counts (e.g., "1 of 847 patients matching your criteria") for privacy reasons in shared-screen clinical workstation environments. A prescriptive pagination component that always shows total counts would be inappropriate for these contexts.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. Teams implementing custom pagination must ensure page navigation controls are standard interactive elements (`<button>` or `<a>`) with descriptive labels (`aria-label="Go to page 3"`, `aria-label="Next page"`).
- **Screen reader**: Not applicable — no component exists. Custom implementations should use `<nav aria-label="Pagination">` wrapping the page controls, with `aria-current="page"` on the active page indicator, so screen reader users understand their position in the paginated set.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Avoiding architecture constraints on clinical data API design by not prescribing a pagination model; giving teams flexibility to implement the pagination pattern that fits their specific HL7 FHIR, REST, or proprietary EHR data API
- **Missing**: No reusable pagination UI primitives (previous/next buttons, page number buttons, results summary text) that teams could compose into a consistent pagination experience; no documented Nord pattern for clinical list pagination that would create consistency across products built on Nord without a full pagination component
