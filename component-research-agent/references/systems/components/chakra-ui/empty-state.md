---
system: Chakra UI
component: Empty State
url: https://chakra-ui.com/docs/components/empty-state
last_verified: 2026-03-28
confidence: high
---

# Empty State

## Approach
Chakra UI v3 provides an EmptyState component with a composable structure: EmptyState.Root, EmptyState.Content, EmptyState.Indicator, EmptyState.Title, and EmptyState.Description. This replaces the pattern of manually composing a VStack with an icon, heading, and text. The component centers content vertically and horizontally and handles the visual hierarchy automatically.

## Key Decisions
1. **Indicator slot** (HIGH) — The EmptyState.Indicator accepts any icon or illustration, making it easy to provide contextually relevant visuals (a search icon for "no results", a folder icon for "no files"). This separates the visual from the text structure.
2. **Title + Description hierarchy** (HIGH) — Two distinct text slots enforce the pattern of a short headline + explanatory text, preventing the single-text anti-pattern that makes empty states less informative.
3. **Action composability** (MEDIUM) — Actions (buttons, links) are composed outside the EmptyState component, giving full flexibility for primary/secondary action placement without prescribing a specific layout.

## Notable Props
- `EmptyState.Root`: container with centering
- `EmptyState.Indicator`: icon/illustration slot
- `EmptyState.Title`: primary heading
- `EmptyState.Description`: secondary explanatory text

## A11y Highlights
- **Keyboard**: No interactive elements by default; actions added separately are keyboard accessible
- **Screen reader**: Semantic heading in Title; Description provides context
- **ARIA**: No special ARIA roles; relies on heading hierarchy

## Strengths & Gaps
- **Best at**: Composable indicator slot; enforced Title/Description hierarchy; v3 design token integration
- **Missing**: No built-in action slot; no illustration vs icon distinction; no size variants
