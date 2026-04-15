---
system: Chakra UI
component: Alert
url: https://chakra-ui.com/docs/components/alert
last_verified: 2026-03-28
confidence: high
---

# Alert

## Approach
Chakra UI's Alert is a styled notification banner with built-in status variants. It composes as Alert, AlertIcon, AlertTitle, and AlertDescription. The `status` prop drives both the color scheme and the default icon (info, warning, error, success). The `variant` prop offers subtle, solid, left-accent, and top-accent visual styles.

## Key Decisions
1. **status prop drives icon and color** (HIGH) — Setting `status="error"` automatically changes both the background/text color and the AlertIcon to the appropriate icon. This prevents color/icon mismatches common in manual implementations.
2. **variant prop for visual style** (HIGH) — `"subtle"` (default), `"solid"`, `"left-accent"`, and `"top-accent"` provide common alert visual treatments without custom CSS. Left-accent is commonly used for inline feedback; solid for prominent banners.
3. **AlertIcon with custom icon support** (MEDIUM) — AlertIcon renders the default status icon but can be replaced with any custom icon via children, enabling custom alert iconography while keeping the semantic status.

## Notable Props
- `status`: `"info" | "warning" | "error" | "success" | "loading"`
- `variant`: `"subtle" | "solid" | "left-accent" | "top-accent"`
- `AlertIcon`: renders status-appropriate icon
- `AlertTitle`: bold heading text
- `AlertDescription`: body text

## A11y Highlights
- **Keyboard**: Static component; no keyboard interaction
- **Screen reader**: role="alert" for assertive announcements on dynamic injection; role="status" variant available
- **ARIA**: Appropriate live region roles for dynamic alerts

## Strengths & Gaps
- **Best at**: status-driven icon+color synchronization; variant system; composable title/description
- **Missing**: No dismissible alert built-in; no action button slot; no auto-dismiss timer
