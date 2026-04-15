---
component: Card
tier: 3
last_verified: 2026-03-29
---

# Card — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Card | Minimal surface container; no slots; `variant` for fill/outline/ghost; `asChild` for interactive card as link or button. | high |
| Chakra UI | Card | Structured Header/Body/Footer slots; three named variants (outline/filled/elevated); size control; token-integrated surface. | high |
| GOV.UK | Summary Card | Domain-specific pattern for government data review (application summaries with "Change" action links); not a generic visual card. | high |
| Base Web | Not available — build from primitives | No card component; teams compose card layouts from typography, spacing tokens, and surface primitives. | medium |
| Fluent 2 | Card | Three interaction modes (display, clickable, selectable); `orientation` prop (horizontal/vertical); CardPreview/CardHeader/CardFooter slots; Teams/SharePoint patterns. | high |
| Gestalt | Module / TileData | Domain-specific cards: Module for expandable settings sections, TileData for analytics metrics; no generic card. | medium |
| Mantine | Card | `Card.Section` for full-bleed content without padding; polymorphic `component` prop for interactive cards; `withBorder` for visual section separation. | high |
| Orbit | Card / Tile | Travel booking cards with expandable sections and `onClick` for flight/option selection as large click targets. | medium |
| Evergreen | Card (via Pane) | No dedicated card; Pane with `elevation` prop serves as card surface; flexible composition for analytics dashboards. | medium |
| Nord | nord-card (Card) | Healthcare clinical data cards (patient summaries, test results, appointments); web component for framework portability. | low |

## Key Decision Patterns

Card is the component with the strongest split between "minimal container" and "structured template" philosophies. Radix, Mantine, and Evergreen provide minimal surface primitives with no prescribed internal structure, maximizing flexibility. Chakra, Fluent 2, Nord, and Orbit provide explicit Header/Body/Footer slot structures that prescribe a consistent card anatomy. The tradeoff is classic: structure prevents inconsistency but reduces flexibility; minimal containers give freedom but require teams to invent their own conventions.

Mantine's `Card.Section` is the most practical solution to the full-bleed image problem — the extremely common need for images to reach card edges while body text has padding. Rather than a fixed image slot, Section removes padding selectively. This design is more general: any full-bleed content (header band, image, footer bar) can use it.

Fluent 2's three interaction modes (static display, clickable card as link, selectable card with checkbox semantics) is the most thorough treatment of card interactivity in the T3 set. Many systems support clickable cards informally through polymorphism; Fluent 2 formalizes all three modes with appropriate ARIA semantics for each (`role="link"`, `role="button"`, `aria-checked`).

Gestalt and GOV.UK's absence of a generic card is revealing. Both systems found that "card" is too abstract a concept — products need domain-specific card types (Pinterest pins, government summary cards) that have enough specificity to justify their own components rather than a generic container.

## A11y Consensus

- Static (non-interactive) cards are plain `<div>` containers with no required ARIA — content structure and heading hierarchy within the card provides accessibility.
- Clickable cards (entire card is a link) must use a real `<a>` element or `role="link"`, with a descriptive accessible name derived from the card heading — Fluent 2 and Radix's `asChild` both enable this pattern.
- Selectable cards (checkbox-like) use `role="checkbox"` with `aria-checked` — Fluent 2 is the only T3 system that explicitly implements and documents this pattern.
- When a card contains multiple interactive elements (button in header, link in body), the card itself should not be the interactive element — clicking the card body should not activate anything; only the explicit interactive children should respond to keyboard and pointer events.
- Nord's clinical card context requires that heading structure within cards correctly conveys information hierarchy for screen reader users navigating dense EHR dashboards.

## Recommended Use

Reference T3 card approaches when deciding on slot structure vs. minimal container design, interactive card patterns, and full-bleed image handling. Mantine's `Card.Section` is the reference for full-bleed layouts; Fluent 2 is the reference for all three interaction modes with correct ARIA; Chakra is the reference for opinionated Header/Body/Footer structure; GOV.UK's Summary Card is the reference for review-and-edit data display patterns.
