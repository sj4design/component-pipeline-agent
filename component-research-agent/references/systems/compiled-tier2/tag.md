---
component: Tag
tier: 2
last_verified: 2026-03-28
---

# Tag — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Tag | Dismissible tags with remove button; avatar option; tag group | high |
| Salesforce Lightning | Badge / Pill | Badge for status labels; Pill for removable selected items with icon | high |
| GitHub Primer | Label | Color-coded labels with 9 size/variant options; not removable by default | high |
| shadcn/ui | Badge | CVA variants; status badge; not removable by default; link-style badge | high |
| Playbook | Tag | Categorical labels; dual React/Rails | medium |
| REI Cedar | CdrChip | Vue chip; selectable and filter variants; WCAG 2.1 AA | medium |
| Wise Design | Tag/Badge | Currency indicators, status labels | low |
| Dell Design System | Tag/Badge | Enterprise status and category labels | low |

## Key Decision Patterns

**Static vs. interactive:** Primer Label and shadcn/ui Badge are static display components — metadata labels not meant for user interaction. Paste Tag and Lightning Pill are interactive — supporting removal (dismissible) functionality with dedicated close buttons.

**Filter chip vs. tag:** Cedar's CdrChip is specifically designed as a selectable/filterable UI control — a toggle button with chip styling. This is distinct from a label/badge (metadata display) and from a dismissible tag (removes from list).

**Color for category:** Primer Labels are heavily color-coded (issue labels in GitHub have user-assigned colors). Lightning Badges use a semantic color system (success green, error red). Paste Tags use neutral colors with avatar integration.

**Remove button accessibility:** Dismissible tags (Paste, Lightning Pill) require a close/remove button that announces what is being removed: aria-label="Remove [tag name]" rather than just "Remove."

## A11y Consensus
- Static tags/badges: decorative (no interaction needed); ensure adequate color contrast
- Removable tags: include a button with aria-label="Remove [item name]"; parent list uses role="list"
- Selectable chips: role="checkbox" or role="radio" for toggle behavior; aria-pressed for stateful buttons
- Never convey status by color alone — include text or icon

## Recommended Use
Use Primer Label for GitHub-style color-coded category metadata. Use shadcn/ui Badge for status labels in React apps. Use Paste Tag for dismissible multi-value input tags. Use Cedar CdrChip for selectable filter chip patterns.
