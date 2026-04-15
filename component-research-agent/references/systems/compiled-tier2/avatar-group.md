---
component: Avatar Group
tier: 2
last_verified: 2026-03-31
---

# Avatar Group — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | AvatarGroup | Dedicated group component with `variant` (entity/user), size enforcement, and "+N" overflow via `overflowText`. | high |
| Salesforce Lightning | LightningAvatarGroup (lightning-avatar-group) | Horizontal stack with `max-count`, overflow dropdown, and inline add-member button; supports both circular (user) and square (entity) shapes. | high |
| GitHub Primer | AvatarStack | Stacked overlapping avatars with right-to-left overlap; shows first N avatars with "+N" on hover/expand; designed for commit/PR contributor lists. | high |
| shadcn/ui | No dedicated AvatarGroup | Must compose manually using Avatar primitives with negative margin CSS; no built-in overflow or maxCount behavior. | high |
| Playbook | Multiple Users / Multiple Users Stacked | Avatar stacking kit with overlap; supports adding "+N" badge manually; dual React/Rails. | medium |
| REI Cedar | No Avatar or AvatarGroup | Neither Avatar nor AvatarGroup exists in Cedar; REI's retail context does not require user identity grouping. | high |
| Wise Design | AvatarGroup | Grouped user display for transfer recipients; supports "+N" overflow badge; limited size options. | low |
| Dell Design System | No dedicated AvatarGroup | Enterprise user lists use table rows or tag-based displays rather than overlapping avatar stacks. | low |

## Key Decision Patterns

**Overlap direction:** Primer's AvatarStack uses right-to-left stacking (rightmost avatar on top, leftmost partially hidden), which is the opposite of Atlassian's left-to-right approach. This reflects Primer's Git-oriented context where the most recent contributor appears first/on top. Paste and Lightning use standard left-to-right stacking. The overlap direction choice affects z-index ordering and must be consistent within an application.

**Entity vs. user shape:** Paste distinguishes between `variant="user"` (circular) and `variant="entity"` (rounded square) within the same AvatarGroup, allowing mixed entity types in a single group. Lightning similarly supports both circular and square shapes. This pattern is critical for enterprise contexts where a group may include both people and organizations/teams.

**Overflow behavior spectrum:** Lightning provides the richest overflow experience with a full dropdown menu listing hidden members plus an inline "Add" button. Primer's AvatarStack reveals hidden avatars on hover by expanding the stack. Paste uses a simple "+N" text indicator. shadcn/ui has no built-in overflow at all. The right choice depends on information density needs and interaction model (hover vs. click).

**Border ring for contrast:** Paste, Primer, and Lightning all add a border/outline ring (typically 2px white or background-color) between overlapping avatars. This is essential for visual separation and is one of the most commonly missed details when building AvatarGroup from scratch (as shadcn/ui consumers must do).

## A11y Consensus
- Group container should use `role="group"` with a descriptive `aria-label` (e.g., "Contributors" or "Team members")
- Each avatar within the group needs its own accessible name via `alt` or `aria-label`
- Overflow indicator ("+N") must announce the hidden count to screen readers (e.g., "+3 more users")
- Primer's hover-expand pattern must be keyboard-accessible — focus on the stack should reveal hidden avatars
- Lightning's overflow dropdown must be keyboard-navigable with arrow keys
- Decorative avatar groups (where a text list also exists) should use `aria-hidden="true"` on the visual group

## Recommended Use
Use Paste AvatarGroup for mixed entity-type groups (user + organization). Use Primer AvatarStack for contributor-list patterns with hover expansion. Use Lightning for the richest overflow experience with add-member affordance. When using shadcn/ui, expect to build grouping, overlap, overflow, and border-ring logic manually from Avatar primitives.
