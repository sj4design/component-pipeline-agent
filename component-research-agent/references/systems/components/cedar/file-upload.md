---
system: REI Cedar
component: File Input
url: https://cedar.rei.com/components/file-input
last_verified: 2026-03-28
confidence: low
---

# File Input

## Approach
REI Cedar likely provides basic file input for profile photo uploads and review image attachments. The e-commerce context doesn't heavily rely on file uploads. Limited documentation makes confidence low.

## Key Decisions
1. **Profile and review images** (MEDIUM) — Primary use for profile photo and product review image uploads.
2. **Native file input** (LOW) — Likely wraps native input[type=file].

## Notable Props
- `accept`, `multiple`

## A11y Highlights
- **Keyboard**: Native button-like activation
- **Screen reader**: Label via form system
- **ARIA**: Native file input semantics

## Strengths & Gaps
- **Best at**: Basic file selection for e-commerce contexts
- **Missing**: Low confidence; drag-and-drop uncertain; limited documentation
