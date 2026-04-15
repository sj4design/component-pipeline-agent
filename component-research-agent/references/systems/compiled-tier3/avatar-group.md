---
component: Avatar Group
tier: 3
last_verified: 2026-03-31
---

# Avatar Group — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No AvatarGroup | Radix provides a headless Avatar primitive with three-state loading but no grouping component. Consumers must compose stacking, overlap, and overflow manually. | high |
| Chakra UI | AvatarGroup | Full-featured group with `max` prop for overflow, "+N" excess indicator, configurable `spacing` (negative value for overlap amount), and size enforcement across children. | high |
| GOV.UK | Not available | Government services do not use avatar-based user identity patterns; no avatar or avatar-group component exists. | high |
| Base Web | No AvatarGroup | Base Web provides Avatar with override-based customization but no grouping component. Multi-user displays must be composed manually. | medium |
| Fluent 2 | AvatarGroup | Two layout modes: `spread` (evenly spaced) and `stack` (overlapping); `overflowIndicator` renders as either a "+N" count or a pie-chart visual; supports `AvatarGroupPopover` for hidden members. | high |
| Gestalt | AvatarGroup | Collaborative-focused with built-in `addCollaboratorsButton` ("+") for Pinterest board invite flows; `size` enforced; `collaborators` array prop for data-driven rendering. | high |
| Mantine | Avatar.Group | Simple CSS-based overlap with configurable `spacing` (negative margin); "+N" overflow via standard Avatar as last child; no built-in maxCount logic — consumer manages truncation. | high |
| Orbit | No AvatarGroup | Orbit provides a lean Avatar for passenger/agent identity in travel booking but no grouping component. Multiple travelers are displayed in list format. | high |
| Evergreen | No AvatarGroup | Evergreen provides Avatar with deterministic color-from-name-hash but no grouping wrapper. B2B dashboard teams compose groups manually. | medium |
| Nord | No AvatarGroup | Nord's healthcare-focused Avatar handles individual provider identity; multi-provider displays use structured lists rather than overlapping stacks. | high |

## Key Decision Patterns

Fluent 2's dual-layout model (`stack` vs. `spread`) is the most architecturally significant T3 contribution to avatar grouping. Stack mode uses traditional overlapping negative margins, while spread mode places avatars with equal positive spacing — useful in Microsoft Teams channel headers where overlap would make small avatars unreadable. No other system offers layout mode switching within the same component.

Gestalt's `addCollaboratorsButton` is a unique pattern where the AvatarGroup includes a built-in "+" button as the last item in the stack, serving as an invite affordance for Pinterest board collaboration. This elevates AvatarGroup from a passive display component to an interactive collaboration entry point. No T1 or T2 system integrates an action button directly into the avatar stack.

Chakra UI's `spacing` prop accepts any CSS spacing value (including negative values), giving consumers precise control over overlap amount. This is more flexible than systems that hardcode overlap to a fixed percentage of avatar size. Mantine takes a similar approach with its `spacing` prop on Avatar.Group.

The T3 landscape reveals a clear split: collaboration-oriented systems (Chakra, Fluent 2, Gestalt, Mantine) provide dedicated AvatarGroup components, while utility-focused or domain-specific systems (Radix, Base Web, Evergreen, Orbit, Nord, GOV.UK) do not. The presence or absence of AvatarGroup correlates strongly with whether the system's primary use cases involve multi-user collaborative interfaces.

Fluent 2's `overflowIndicator` offering a pie-chart visualization (showing proportional representation of hidden members by status/role) is a novel approach not seen elsewhere. Most systems default to a simple "+N" count badge.

## A11y Consensus

- AvatarGroup container requires `role="group"` with `aria-label` describing the collection purpose (e.g., "Board collaborators", "Channel members").
- Overflow "+N" indicators must announce the hidden count to screen readers; Fluent 2 and Chakra explicitly document this requirement.
- Gestalt's `addCollaboratorsButton` renders as a true button with accessible label "Add collaborators" — interactive affordances within the group must be keyboard-reachable.
- Fluent 2's `AvatarGroupPopover` for expanded member list must be keyboard-dismissible (Escape) and focus-trapped while open.
- Systems without AvatarGroup (Radix, Base Web, Evergreen) place full accessibility burden on consumers — group labeling, overflow announcement, and keyboard navigation must all be manually implemented.
- Non-interactive avatar groups should not place individual avatars in the tab order; only interactive elements (overflow button, add button) should receive focus.

## Recommended Use

Reference Fluent 2 for the stack/spread layout choice and the pie-chart overflow indicator concept. Reference Gestalt for the integrated add/invite button pattern in collaborative contexts. Reference Chakra UI for the most flexible spacing/overlap API. When building with headless primitives (Radix, Base Web), plan to implement grouping, overflow management, border rings, and group-level accessibility entirely from scratch.
