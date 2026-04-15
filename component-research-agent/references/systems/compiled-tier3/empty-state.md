---
component: Empty State
tier: 3
last_verified: 2026-03-29
---

# Empty State — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — compose from primitives | No empty state template; product-specific by nature; consumers compose Heading + Text + Button + illustration. | high |
| Chakra UI | EmptyState | Composable sub-components (Indicator/Title/Description); Indicator slot accepts any icon or illustration; actions composed externally. | high |
| GOV.UK | Not available — use standard content patterns | No dedicated component; illustrations generally avoided; Inset Text or Panel for empty-state messaging. | high |
| Base Web | Not available — compose from Typography/Block | No empty state; product-level pattern composed from primitive components. | medium |
| Fluent 2 | Not available — compose from Text/Image/Button | No component; design documentation provides guidance but no code component. | medium |
| Gestalt | IllustratedMessage | Named for its broader use (errors, zero results, onboarding, permissions); custom SVG illustration slot; CTA integrated; centered layout with max-width. | high |
| Mantine | Not available — compose from Stack/Text/Button | Intentional absence; community patterns exist but no official template in docs. | high |
| Orbit | EmptyState | Travel-themed illustrations for no-results moments; action slot for recovery CTA ("Clear filters", "Search again"); flexible body content slot. | high |
| Evergreen | EmptyState | Onboarding activation focus; primary CTA + secondary `anchorCta` learn-more link; `background` prop for dark/light panel contexts. | high |
| Nord | nord-empty-state (Empty State) | Healthcare-specific: structured slots to provide clinical context ("No appointments for this patient"); visually calm to prevent confusion with error states. | high |

## Key Decision Patterns

Empty state is the component with the clearest product-context influence in the T3 set. The three systems that provide a dedicated component (Gestalt, Orbit, Evergreen, Nord) all have strong product arguments for why:
- Gestalt (IllustratedMessage): Empty boards and zero-result searches are key engagement moments on a visual discovery platform; illustrations drive re-engagement.
- Orbit: Flight search zero results is a high-frustration moment where recovery CTAs prevent abandonment.
- Evergreen: New workspace empty states are the first screen new users see; they're activation-critical conversion moments.
- Nord: Clinical empty states must be clearly distinguished from error states to prevent false-alarm IT escalations.

Systems that omit the component (Radix, Base Web, Fluent 2, Mantine, GOV.UK) share a common rationale: empty states are too product-specific (illustration, copy, CTA) to generalize at the component level. This is a legitimate position — a generic empty state template would likely produce worse outcomes than a purpose-built one.

Gestalt's naming ("IllustratedMessage" not "EmptyState") is the most architecturally sound: the same component covers empty lists, error states, onboarding placeholders, and permission gates. "EmptyState" as a name undersells this range and invites creating separate components for these related scenarios.

Nord's visual calm principle — empty states should not use red colors or warning icons, to clearly distinguish from error states — is a genuinely insightful healthcare-specific guideline that generalizes to any context where users must quickly distinguish "no data" from "system failure."

## A11y Consensus

- Illustration SVGs in empty states are decorative and must carry `aria-hidden="true"` — screen reader users should hear the title and description, not a description of the illustration.
- The title of an empty state should be a real heading element (not just styled text) so screen reader users navigating by heading can find and understand the empty state's context within a complex page.
- Action buttons within empty states follow standard button accessibility patterns; they should have descriptive labels that explain what will happen ("Schedule appointment" not just "Add").
- Empty states have no complex ARIA requirements; their accessibility depends entirely on correct heading hierarchy and semantic text structure.
- Orbit and Nord distinguish "no data exists" from "filters produced no results" as requiring different copy — this copy distinction is also an accessibility concern, as screen reader users navigating a page need to understand why a list section is empty.

## Recommended Use

Reference T3 empty state approaches when justifying dedicated empty state components (the four product-domain rationales are the strongest arguments), designing illustration slot APIs (Gestalt and Orbit for SVG slot design), and writing clinical empty state guidance (Nord's error-vs-empty visual distinction). Evergreen is the reference for onboarding activation empty states with dual CTA support.
