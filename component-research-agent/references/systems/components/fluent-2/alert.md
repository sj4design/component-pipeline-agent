---
system: Fluent 2 (Microsoft)
component: MessageBar (Alert equivalent)
url: https://fluent2.microsoft.design/components/web/react/messagebar/
last_verified: 2026-03-28
confidence: high
---

# MessageBar (Alert equivalent)

## Approach
Fluent 2 uses MessageBar as its alert/notification component for inline page-level messages. It supports intent variants (info, success, warning, error), dismiss behavior, and an actions slot for inline buttons. MessageBar, MessageBarTitle, MessageBarBody, MessageBarActions, and MessageBarGroup are the sub-components, with MessageBarGroup handling animated list transitions when multiple messages are shown.

## Key Decisions
1. **intent prop for semantic variants** (HIGH) — `intent="info | success | warning | error"` drives the icon, color, and ARIA role. Each intent has a default icon from Fluent's icon library, ensuring consistent semantic visual language.
2. **MessageBarGroup for animated collections** (HIGH) — When displaying multiple alerts (e.g., a list of form errors or system notifications), MessageBarGroup handles enter/exit animations and manages the list's ARIA live region, preventing multiple individual live regions.
3. **layout="multiline"** (MEDIUM) — For longer messages, `layout="multiline"` stacks the title and body vertically instead of inline, preventing text truncation in constrained widths.

## Notable Props
- `intent`: `"info" | "success" | "warning" | "error"`
- `onDismiss`: dismiss callback (shows dismiss button)
- `layout`: `"singleline" | "multiline"`
- `MessageBarTitle`: bold heading
- `MessageBarBody`: body text
- `MessageBarActions`: inline action buttons
- `MessageBarGroup`: animated container for multiple MessageBars

## A11y Highlights
- **Keyboard**: Dismiss button keyboard accessible; action buttons keyboard accessible
- **Screen reader**: role="status" for info/success; role="alert" for warning/error; MessageBarGroup manages live region
- **ARIA**: Intent-appropriate ARIA roles; dismiss button labeled

## Strengths & Gaps
- **Best at**: MessageBarGroup for animated multi-alert; intent-driven icons; multiline layout; actions slot
- **Missing**: No auto-dismiss timer; MessageBar is static (use Toast for transient notifications)
