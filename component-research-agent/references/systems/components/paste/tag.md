---
system: Twilio Paste
component: Badge
url: https://paste.twilio.design/components/badge
last_verified: 2026-03-28
confidence: high
---

# Badge (Tag)

## Approach
Twilio Paste's Tag/Badge is called "Badge" and is used for labeling and status indication. Paste distinguishes between Badge (a non-interactive label/tag) and Pill (used for selection and filtering as a clickable chip). Badges appear in the console for API resource status indicators, version labels, and category tags. They're intentionally non-interactive — interactive chips use a different pattern.

## Key Decisions
1. **Badge vs clickable chip distinction** (HIGH) — Non-interactive labels use Badge; interactive filter chips use a different component, preventing the accessibility issue of making a visual element interactive without proper button semantics.
2. **Status variant system** (HIGH) — Multiple variants (neutral, success, error, warning, new, decorative) map to communication semantics for status indicators in the Twilio console (phone number status, service health, etc.).
3. **Size variants** (MEDIUM) — Small and default sizes for different contextual use — small for table cell status badges, default for standalone labels.

## Notable Props
- `variant`: "neutral" | "success" | "error" | "warning" | "new" | "decorative_10" through "decorative_40"
- `size`: "default" | "small"
- `href`: Makes badge a link (anchor element) when provided

## A11y Highlights
- **Keyboard**: Non-interactive badges not in tab order; badge-as-link is fully accessible anchor
- **Screen reader**: Announced as text with color/icon not relied upon for meaning; variant context conveyed via text
- **ARIA**: No role needed for non-interactive badge; link role when href provided

## Strengths & Gaps
- **Best at**: Rich status variant system for console status indicators; clear interactive vs non-interactive distinction
- **Missing**: No dismiss/remove button for filter chip use case (separate component needed)
