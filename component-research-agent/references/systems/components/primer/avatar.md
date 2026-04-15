---
system: GitHub Primer
component: Avatar
url: https://primer.style/components/avatar
last_verified: 2026-03-28
confidence: high
---

# Avatar

## Approach
GitHub Primer's Avatar represents GitHub user profiles and organization logos throughout GitHub — in commit history, PR assignees, review requests, and contributor lists. Primer provides Avatar (single), AvatarStack (overlapping group), and AvatarPair (two overlapping avatars for fork/collaboration display). The AvatarPair is unique — showing two avatars partially overlapping to represent a fork relationship (repository owner + forked-from owner).

## Key Decisions
1. **AvatarPair for fork relationships** (HIGH) — A two-avatar overlap specifically representing parent-child relationships (original repo owner + fork owner) — unique to GitHub's UI patterns for representing forked repositories.
2. **Square shape for organizations** (HIGH) — GitHub's convention: circular avatars for users, square avatars for organizations, following GitHub's own design standards.
3. **Size token system** (MEDIUM) — Avatars use a numeric token size system (16, 20, 24, 28, 32, 40, 48, 64) matching GitHub's grid and density conventions across different display contexts.

## Notable Props
- `src`: Image URL (GitHub avatar URL)
- `size`: Numeric pixel size (16-64)
- `alt`: Required alt text (GitHub username)
- `square`: Boolean for organization square shape
- AvatarStack `alignRight`: Alignment for avatar stacks in comments/commits

## A11y Highlights
- **Keyboard**: Non-interactive unless wrapped in Link
- **Screen reader**: Required alt text conveys username; AvatarStack communicates count via aria-label
- **ARIA**: alt text required; AvatarStack has aria-label; AvatarPair alt texts identify both users

## Strengths & Gaps
- **Best at**: AvatarPair for fork relationships; GitHub username-based accessibility; square/circle shape convention
- **Missing**: No initials fallback (GitHub always has avatar images); no presence indicator
