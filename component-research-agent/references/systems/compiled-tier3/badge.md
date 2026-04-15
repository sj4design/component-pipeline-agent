---
component: Badge
tier: 3
last_verified: 2026-03-29
---

# Badge — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Badge | Color + variant matrix (solid/soft/surface/outline) with `highContrast` flag for WCAG AA on colored backgrounds; non-interactive inline label. | high |
| Chakra UI | Badge | `colorScheme` prop consistent with Button, Tag, Alert; three variants (solid/subtle/outline); simple and predictable within the Chakra system. | high |
| GOV.UK | Tag | Badge pattern implemented as "Tag"; text always present and is the primary meaning carrier; standardized government status colors supplement text. | high |
| Base Web | Not available — use Tag without remove button | No dedicated Badge component; static badge needs are covered by Tag or custom styled elements. | medium |
| Fluent 2 | Badge / CounterBadge / PresenceBadge | Three distinct components for status labels, numeric notification counts (with 99+ overflow), and Teams presence states — the most complete badge system among T3 systems. | high |
| Gestalt | Badge | `type` prop with seven semantic options; `text` is required (enforced by prop type); `position` prop for overlaying on parent elements. | medium |
| Mantine | Badge | `leftSection`/`rightSection` icon slots; gradient variant; `dot` variant for notification indicators; full xs–xl size scale. | high |
| Orbit | Badge / BadgeList | Semantic types map to travel booking statuses (confirmed/cancelled/critical); icon slot for flight-type indicators. | medium |
| Evergreen | Badge / Pill | Two components with visual distinction: rectangular Badge for status, fully-rounded Pill for category chips; same color system for both. | medium |
| Nord | nord-badge (Badge) | Healthcare clinical status labels (Active/Critical/Discharged); text-first design to communicate meaning independent of color perception. | low |

## Key Decision Patterns

Fluent 2's three-component badge system (Badge, CounterBadge, PresenceBadge) is the clearest T3 structural differentiation. Most systems treat badge as a single concept; Fluent 2 recognizes that status labels, numeric count overlays, and presence state indicators have different semantic requirements, different visual treatments, and different ARIA needs. This design is driven by Microsoft's Teams context but is generalizable to any product with user presence and notification count patterns.

Evergreen's Badge vs. Pill split is the only T3 system to make a formal shape distinction. Some design systems treat rectangular vs. pill-shaped as purely aesthetic; Evergreen formalizes it as separate components to encode information hierarchy: rectangles for system statuses, pills for user-generated or category labels.

Base Web is the only T3 system with no dedicated badge component at all. Teams fall back to using Tag without a remove button or building from scratch. This is consistent with Base Web's minimalist component count philosophy but leaves a real gap for teams wanting a no-effort static label.

The "text must convey meaning" principle is the most consistent cross-system rule. GOV.UK, Gestalt, Nord, and Orbit all state explicitly that color supplements text — it is never the primary meaning carrier. Radix's `highContrast` prop exists specifically to ensure text contrast on colored badges is sufficient, approaching the same requirement from the visual side.

## A11y Consensus

- Badge components are non-interactive display elements; they do not need keyboard focus or ARIA roles for static use.
- Text content is the accessible name; color is always supplementary and never the sole conveyor of meaning.
- When a badge overlays an icon (notification dot on an avatar or button), the accessible label must be placed on the parent icon element, not on the badge itself.
- GOV.UK and Nord explicitly require text labels even when color alone would be visually clear — this is required for high-contrast mode and color-blind users.
- Fluent 2's CounterBadge documents the requirement that the icon it decorates must carry `aria-label` describing the count in context (e.g., "3 unread notifications").

## Recommended Use

Reference T3 badge approaches when deciding on single vs. multi-component badge architecture (Fluent 2's three-type system), shape differentiation strategy (Evergreen's Badge/Pill split), and text-first accessibility requirements for status labels in clinical or government contexts (Nord, GOV.UK). Mantine's icon slot design is the reference for badges that need embedded icons without a separate overlay component.
