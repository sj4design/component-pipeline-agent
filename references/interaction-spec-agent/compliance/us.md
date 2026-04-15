# US Compliance — ADA + Section 508

> Loaded with `--compliance=us`. Supplements WCAG 2.2 AA baseline.

## ADA Title III

- Applies to "places of public accommodation" — includes websites of businesses open to the public.
- Current DOJ standard maps to **WCAG 2.1 AA** (April 2024 final rule).
- Enforcement: private lawsuits (10,000+ per year) + DOJ enforcement actions.
- No specific technical standard in statute — courts reference WCAG.

### Impact on interaction specs

| Area | Requirement |
|---|---|
| Keyboard | All interactive elements MUST be keyboard operable. Courts have ruled mouse-only = ADA violation. |
| Screen readers | Content MUST be accessible to screen readers. Missing ARIA roles/labels = barrier. |
| Focus management | Keyboard traps have been cited as ADA violations in settlement agreements. |
| Error handling | Form errors MUST be identifiable and describable — inaccessible forms are a top complaint. |

## Section 508 (Revised)

- Applies to: federal agencies + contractors receiving federal funds.
- Technical standard: **WCAG 2.0 AA** (incorporated by reference in 36 CFR Part 1194).
- Updated refresh expected to align with WCAG 2.1/2.2.

### Additional requirements beyond WCAG

| Requirement | Detail |
|---|---|
| VPAT/ACR | Vendors MUST provide a Voluntary Product Accessibility Template documenting conformance. |
| Functional performance criteria | Must be operable without vision, with limited vision, without color, without hearing, with limited manipulation, with limited reach/strength, with limited language/cognitive ability. |
| Authoring tools | If the product is an authoring tool, it must produce accessible output AND be accessible itself. |

## Documentation requirements

- **VPAT**: Use the ITI VPAT 2.4 template (covers WCAG 2.x, EN 301 549, Section 508).
- **Conformance claim**: Document for each WCAG criterion: Supports / Partially Supports / Does Not Support / Not Applicable.
- **Testing methodology**: Document which AT combinations were tested.

---
_Sources: ADA.gov, Section508.gov, DOJ Final Rule April 2024_
