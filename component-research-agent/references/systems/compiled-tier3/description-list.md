---
component: Description List
tier: 3
last_verified: 2026-03-31
---

# Description List — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No dedicated component | Radix provides unstyled primitives; no Description List component. Teams compose from Text + Flex/Grid. No key-value layout pattern documented. | medium |
| Chakra UI | No dedicated component (List primitives) | Chakra provides List/ListItem/ListIcon but no dedicated DescriptionList. Teams compose key-value pairs using SimpleGrid (2 columns) with Text components. Chakra v3 does not add a description list primitive. | medium |
| GOV.UK | Summary List | The most complete and best-documented description list component across all tiers. `SummaryList` renders key-value rows with term, value, and an optional actions column (containing Change/Remove links). Used on every government service "Check your answers" page. Supports bordered rows, missing information indication, and card variant. | high |
| Base Web (Uber) | No dedicated component | No description list component. Uber's ride receipt detail and driver profile metadata use internal patterns. Closest primitives are LabeledControl or custom grid layouts. | low |
| Fluent 2 (Microsoft) | No dedicated component | No standalone description list. Microsoft's products display metadata using custom layouts. Fluent's Field component handles form label-value association but is form-oriented, not display-oriented. | medium |
| Gestalt (Pinterest) | No dedicated component | Pinterest's pin detail metadata (board, creator, description, source URL) uses internal layout patterns. Gestalt provides no public description list component. | low |
| Mantine | No dedicated component (community recipe) | No official DescriptionList. Community patterns use Grid (2-column) or SimpleGrid with Text for key-value pairs. Some community templates wrap dl/dt/dd with Mantine styling. | medium |
| Orbit (Kiwi.com) | No dedicated component | Booking detail screens (flight times, passengers, prices) use internal key-value layouts. No reusable Description List component published. | low |
| Evergreen (Segment) | No dedicated component | Segment's source/destination configuration panels display key-value metadata using internal patterns not published in Evergreen. | low |
| Nord (Nordhealth) | DescriptionList | Dedicated `DescriptionList` component with `DescriptionGroup`, `DescriptionTerm`, and `DescriptionDetails` sub-components. Renders semantic dl/dt/dd. Supports horizontal and vertical layout direction. One of the few T3 systems with a first-class implementation. | high |

## Key Decision Patterns

GOV.UK's Summary List is the gold standard for description list design across all tiers. Every UK government digital service uses it on "Check your answers" pages where users review their submitted information before final submission. The component renders rows with three columns: key (term), value (description), and actions (Change link). The actions column is the defining feature — it enables users to navigate back and edit specific answers, making the description list interactive and actionable. GOV.UK also documents the "missing information" pattern where a value is absent and replaced with a call-to-action link. The component supports a card variant (with visible borders) and a borderless default. GOV.UK's content guidelines mandate that keys use sentence case and values show exactly what the user entered, maintaining trust and clarity.

Nord (Nordhealth) provides a clean dedicated implementation with `DescriptionList` > `DescriptionGroup` > `DescriptionTerm` + `DescriptionDetails`. It supports `direction` (horizontal/vertical) at the list level and renders semantic dl/dt/dd HTML. The horizontal layout places term and description side by side; the vertical layout stacks them. Nord's implementation is minimal but correct — semantic HTML, layout toggle, and sub-component composition. It is a good reference for a lightweight description list that does not need the full feature set of Ant Design or GOV.UK.

The absence of description list components in 8 of 10 T3 systems confirms that most design systems treat key-value metadata display as a composition pattern rather than a primitive component. Systems serving form-heavy or metadata-heavy domains (government services with GOV.UK, healthcare with Nord) are the ones that invest in dedicated components — the use case frequency justifies the component.

Chakra UI's lack of a DescriptionList is notable given its otherwise comprehensive component set. The recommended community pattern uses `SimpleGrid columns={2}` with alternating Text elements (bold for term, normal for value), which works visually but loses semantic dl/dt/dd association entirely.

Mantine community recipes show two patterns: a grid-based approach (similar to Chakra) and a styled dl/dt/dd approach with `styles` prop overrides. Neither is an official component, reflecting Mantine's focus on interactive primitives over display-only patterns.

## A11y Consensus

- Semantic `dl`/`dt`/`dd` HTML is the correct and preferred structure — GOV.UK and Nord both enforce this. The native HTML provides term-description grouping without ARIA.
- GOV.UK's actions column (Change links) must include visually hidden context text — the link reads "Change name" to screen readers, not just "Change", ensuring each action is distinguishable when navigating by links.
- When actions are present, each action link should include the term text in its accessible label (e.g., `<a>Change <span class="visually-hidden">date of birth</span></a>`).
- Grid/flexbox-based description lists that do not use dl/dt/dd must use `aria-labelledby` to associate values with their terms — otherwise screen readers cannot determine which value belongs to which label.
- Long description lists should be divided into sections with heading landmarks to support screen reader navigation.
- GOV.UK's "missing information" pattern uses a distinct visual treatment AND text ("No phone number provided") rather than leaving the value blank — empty values are invisible to screen readers.

## Recommended Use

Reference GOV.UK's Summary List as the primary model for description list component architecture, especially the three-column pattern (key, value, actions) and missing information handling. Use Nord's DescriptionList for a minimal semantic implementation with horizontal/vertical layout toggle. For systems without a dedicated component, compose from Grid + Text but always wrap in semantic `dl`/`dt`/`dd` HTML for accessibility. GOV.UK's "Check your answers" pattern is the most well-tested description list design in production, serving millions of government service transactions.
