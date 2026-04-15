---
system: GitHub Primer
component: Label / Token
url: https://primer.style/components/label
last_verified: 2026-03-28
confidence: high
---

# Label / Token (Tag)

## Approach
GitHub Primer has two tag-like components: Label (non-interactive colored label for GitHub issue/PR labels, repo topics) and Token (interactive chip with optional remove, used in tag-input-style multi-select). Label matches GitHub's iconic colored issue labels; Token represents selected items in inputs like assignee pickers. These reflect GitHub's specific use cases for tags.

## Key Decisions
1. **Label reflects GitHub's issue label system** (HIGH) — Label component maps directly to GitHub's issue label UX, with support for GitHub's label color system (any hex color as background), making it a faithful representation of the product feature.
2. **Token for input chips** (HIGH) — Token component is used inside TextInputWithTokens to represent selected items (assignees, labels, topics), with optional remove button for interactive multi-select patterns.
3. **Label size variants** (MEDIUM) — Multiple sizes (small, medium, large) for Labels matching GitHub's use in different interface contexts (compact lists vs standalone display).

## Notable Props
- Label: `variant` (default, primary, secondary, accent, danger, success, attention, done, sponsors), `size`
- Token: `text`, `onRemove`, `size`, `isSelected`
- Label `fillColor`: Custom hex for GitHub-style custom label colors

## A11y Highlights
- **Keyboard**: Label non-interactive; Token remove button is focusable and operable
- **Screen reader**: Label text announced; Token remove button labeled "Remove token" with context
- **ARIA**: Token remove button has aria-label; Label has no interactive role

## Strengths & Gaps
- **Best at**: Custom hex label colors for GitHub's label system; Token for multi-select input chips; faithful GitHub product representation
- **Missing**: Label fillColor is GitHub-specific; not generalized for all use cases
