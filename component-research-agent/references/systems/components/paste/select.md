---
system: Twilio Paste
component: Select
url: https://paste.twilio.design/components/select
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
Twilio Paste's Select wraps the native HTML `<select>` element with design token styling, deliberately choosing platform-native behavior over a custom dropdown. This matches Paste's philosophy applied to DatePicker — native elements provide better accessibility, mobile keyboard support, and browser-native behavior (search-by-typing in options) without custom ARIA work. The component integrates with Paste's form field infrastructure (Label, HelpText, ErrorText).

## Key Decisions
1. **Native select foundation** (HIGH) — Uses native `<select>` element accepting cross-browser appearance variation in exchange for native accessibility, mobile behavior (native mobile select sheet), and zero custom ARIA complexity.
2. **Form primitive composition** (HIGH) — Always used with FormField wrapper ensuring consistent label/error/help-text patterns, with aria-describedby wiring for error states.
3. **Token-driven visual override** (MEDIUM) — Custom CSS applied over native select appearance using design tokens for border, background, focus ring while preserving native dropdown behavior.

## Notable Props
- `hasError`: Error state styling and aria-describedby wiring
- `disabled`: Native disabled attribute
- `id`: Required for label association
- `multiple`: Native multiple selection mode

## A11y Highlights
- **Keyboard**: Native browser select keyboard behavior (arrow keys, type-to-search)
- **Screen reader**: Native select announcement with option count; selected option announced
- **ARIA**: Native select semantics; aria-describedby for error/help text; aria-required when required

## Strengths & Gaps
- **Best at**: Accessibility by default; mobile-native select behavior; zero custom ARIA complexity
- **Missing**: No custom option rendering (icons, rich content); no search/filter on options; limited visual customization
