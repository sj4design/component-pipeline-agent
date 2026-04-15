---
system: Salesforce Lightning Design System
component: Link (Anchor)
url: https://lightningdesignsystem.com/utilities/link/
last_verified: 2026-03-28
confidence: high
---

# Link

## Approach
Lightning's Link component provides styled hyperlink text consistent with Lightning's design language. Links in Salesforce CRM frequently link to related records, external documentation, and navigational targets within the app. Lightning emphasizes the semantic distinction between links (navigation) and buttons (actions) in its usage guidelines.

## Key Decisions
1. **Semantic link vs button** (HIGH) — Lightning's guidelines strongly distinguish navigation links from action buttons, critical in CRM where both appear frequently in record layouts.
2. **Record link pattern** (HIGH) — CRM links frequently link to related records (Contact Name → Contact record); Lightning's link styling is optimized for this inline record reference pattern.
3. **Inverse variant** (MEDIUM) — Link variant for dark backgrounds in Lightning's header and banner contexts.

## Notable Props
- `href`: Link destination
- `target`: Link target (_blank, etc.)
- `variant`: Default or inverse

## A11y Highlights
- **Keyboard**: Native anchor activation
- **Screen reader**: Link text announced; external link communication
- **ARIA**: Native anchor semantics; meaningful link text required

## Strengths & Gaps
- **Best at**: CRM record reference links; semantic guidance; Lightning visual consistency
- **Missing**: No automatic external link indicator; developer must handle _blank communication
