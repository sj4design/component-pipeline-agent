---
system: Salesforce Lightning Design System
component: Avatar
url: https://lightningdesignsystem.com/components/avatar/
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
Lightning's Avatar is used throughout CRM for Contact/Lead/User profile photos, Account logos, and entity identifiers. Lightning provides extensive avatar size variants and importantly provides a "presence" indicator dot overlay for showing user online/busy/offline status — critical for Salesforce's collaboration features (Sales Chat, Chatter). The component supports circular (person) and square (entity/object) shapes.

## Key Decisions
1. **Presence indicator overlay** (HIGH) — Avatar can display an online/busy/offline presence dot, essential for Salesforce's internal collaboration tools where knowing if a colleague is available is part of the CRM workflow.
2. **Circle vs square shape** (HIGH) — Circular avatars for people (contacts, users), square avatars for entities (accounts, objects), following the universal convention that helps CRM users quickly distinguish person vs company records.
3. **Record type fallback icons** (MEDIUM) — When no image, Salesforce uses record type icons (contact icon, account building icon) rather than generic initials, providing immediate record type context.

## Notable Props
- `src`: Image URL
- `fallbackIconName`: Utility icon for when image is absent
- `initials`: Alternative to icon fallback
- `size`: "xx-small" | "x-small" | "small" | "medium" | "large"
- `presence`: "online" | "busy" | "offline" | "blocked" for presence indicator

## A11y Highlights
- **Keyboard**: Non-interactive; focus if wrapped in interactive element
- **Screen reader**: alt text from title prop; presence indicator text communicated
- **ARIA**: img alt; presence indicator has sr-only text; aria-hidden for decorative fallback icons

## Strengths & Gaps
- **Best at**: Presence indicator for collaboration; circle/square shape distinction; record type icon fallbacks
- **Missing**: No AvatarGroup with overflow count; individual avatar only
