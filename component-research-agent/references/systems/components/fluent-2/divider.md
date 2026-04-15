---
system: Fluent 2 (Microsoft)
component: Divider
url: https://react.fluentui.dev/?path=/docs/components-divider--docs
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Fluent 2's Divider is a layout utility component that renders a horizontal or vertical rule to separate content regions, with the distinctive ability to embed a text or element label centered on the line — a pattern prevalent across Microsoft 365 interfaces (for example, "Or sign in with" separators in authentication flows and "Today" date separators in Teams chat). The label-in-line pattern is a first-class feature, not an afterthought, reflecting how Office apps use dividers semantically rather than purely decoratively. Dividers inherit Fluent design tokens for color, ensuring they adapt correctly to light, dark, and high-contrast themes. The component renders as a semantic `<div>` with appropriate ARIA attributes when carrying meaningful label content, and as a presentational element when purely decorative.

## Key Decisions
1. **Label-in-line as first-class feature** (HIGH) — Encoding the centered-label divider pattern natively (rather than requiring custom CSS) standardizes the "Or" / date-separator pattern used throughout Teams, Outlook, and Microsoft account sign-in flows, ensuring consistency at scale.
2. **Horizontal and vertical orientation** (HIGH) — Vertical dividers support column layout separation (e.g., sidebar vs. content area borders), while horizontal dividers serve the more common section-separation use case — both covered by a single component.
3. **Alignment control for label** (MEDIUM) — Label text can be positioned at `start`, `center`, or `end` of the divider line, accommodating right-to-left layouts and design variations without custom CSS overrides.
4. **Decorative vs. semantic rendering** (MEDIUM) — When no label is present, the divider is treated as decorative (`role="separator"` or `aria-hidden`) to avoid polluting the accessibility tree with meaningless separators — important in dense Office layouts.
5. **Token-based color and weight** (MEDIUM) — Line color and stroke weight map to Fluent's neutral palette tokens, ensuring the divider remains visible but subdued across all themes including Windows High Contrast mode.

## Notable Props
- `vertical`: boolean — renders a vertical divider instead of horizontal
- `alignContent`: `"start"` | `"center"` | `"end"` — positions the label along the divider
- `appearance`: `"default"` | `"subtle"` | `"strong"` | `"brand"` — controls visual weight/color
- `inset`: boolean — adds horizontal padding so the line does not extend to container edges
- `children`: optional label content rendered centered on the line

## A11y Highlights
- **Keyboard**: Divider is not interactive and receives no keyboard focus; when used as a section separator in navigation or lists, surrounding semantic structure (headings, landmarks) provides the organizational context.
- **Screen reader**: Rendered with `role="separator"` when used as a structural divider; purely decorative instances without labels use `aria-hidden="true"` to avoid cluttering screen reader output; label text, when present, is read inline as part of the separator announcement.
- **ARIA**: `role="separator"` for meaningful dividers; `aria-hidden="true"` for decorative instances; high-contrast mode support via Fluent token system maps line color to `WindowText` or `ButtonText` system colors as appropriate.

## Strengths & Gaps
- **Best at**: The labeled divider pattern ("Or", "Today", date/time stamps in chat) that is idiomatic to Microsoft 365; clean token-driven theming across all Fluent themes including high contrast; simple, predictable API.
- **Missing**: No support for dashed or dotted line styles natively (requires CSS override); no built-in icon slot on the divider line (icons in labels require custom children); vertical divider height must be controlled by the parent container, which can require explicit height settings in flex layouts.
