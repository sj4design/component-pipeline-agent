---
system: GOV.UK Design System
component: Not available natively
url: https://design-system.service.gov.uk/patterns/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
GOV.UK Design System has no inline edit component, and its absence is one of the clearest expressions of the system's core "one thing per page" design principle. GOV.UK services are built around a linear, question-by-question flow where each screen presents a single decision or data entry task. Inline editing — activating an edit mode directly within a content display, replacing static text with an input in situ — fundamentally contradicts this model. It conflates viewing and editing states, introduces mode ambiguity that is particularly harmful to users with cognitive disabilities or those unfamiliar with web conventions, and creates unpredictable keyboard and focus management challenges. Instead, GOV.UK's Check Your Answers pattern provides the canonical "review and change" interaction: a summary page lists all answers, each with a "Change" link that returns the user to the dedicated question page for that field. This approach is extensively user-tested, works without JavaScript, and scales across all device types and assistive technologies.

## Key Decisions
1. **One thing per page mandates separate edit pages** (HIGH) — The GOV.UK service design manual explicitly requires each form question or decision to occupy its own page. Inline editing would violate this principle by merging display and edit states on a single screen.
2. **Check Your Answers as the edit pattern** (HIGH) — The canonical pattern for reviewing and amending submitted answers is a dedicated summary page with per-field "Change" links, not inline activation. This is backed by extensive GDS user research showing it reduces errors and cognitive load.
3. **Mode ambiguity is a barrier** (HIGH) — Users with cognitive disabilities, low digital literacy, or screen reader dependence are disproportionately represented in GOV.UK's audience. Inline edit's dual-state UI (view vs. edit mode) introduces confusion that violates the principle of designing for the broadest possible audience.

## Notable Props
- No component exists
- Related pattern: Check Your Answers — `govukSummaryList()` with action links per row
- `govukSummaryList({ rows: [{ key, value, actions: { items: [{ href, text: "Change", visuallyHiddenText }] } }] })`

## A11y Highlights
- **Keyboard**: Not applicable — no interactive component exists; the Check Your Answers pattern uses standard links
- **Screen reader**: Not applicable; "Change [field name]" links use `visuallyHiddenText` to provide full context (e.g., "Change name")
- **ARIA**: Not applicable

## Strengths & Gaps
- **Best at**: Providing a rigorously user-tested, universally accessible alternative (Check Your Answers + Change links) that avoids all the accessibility and usability pitfalls of inline editing in government transaction contexts
- **Missing**: No inline edit capability for application-style interfaces (dashboards, admin tools, data management) — teams building non-transactional GOV.UK-styled tools must implement custom solutions entirely outside the design system
