---
system: GOV.UK Design System
component: Not available natively
url: https://design-system.service.gov.uk/components/tabs/
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
GOV.UK Design System has no segmented control component. The segmented control pattern — a row of mutually exclusive toggle buttons used to switch between views or filter content — does not exist in the GOV.UK component library because it conflicts with several core design principles. First, the "one thing per page" principle discourages multi-view interfaces where a single screen surfaces different content depending on a selection; GOV.UK services are designed as linear flows, not dashboards with switchable panels. Second, segmented controls carry significant native platform associations (iOS/macOS) that do not translate well to the diverse audience of government services, many of whom use Windows, Android, or assistive technology environments where the pattern has no native equivalent. Where view-switching is genuinely necessary, GOV.UK's Tabs component provides an accessible, research-tested alternative with proper ARIA tab semantics. For filtering data, GOV.UK uses radio buttons or checkboxes with a submit action, which work without JavaScript and communicate the filter action more explicitly to users unfamiliar with implicit toggle patterns.

## Key Decisions
1. **Tabs component as the accessible alternative** (HIGH) — The GOV.UK Tabs component (`govukTabs`) handles the primary use case for segmented controls (switching between content panels) with full ARIA `tablist`/`tab`/`tabpanel` semantics, keyboard navigation, and progressive enhancement to heading/anchor navigation without JavaScript.
2. **Radios for mutually exclusive selection** (HIGH) — When users need to choose one option from a small set to affect page state (e.g., filtering results by status), GOV.UK recommends radio buttons with an explicit "Apply filters" submit button. This pattern is explicit, works without JavaScript, and is familiar to all users.
3. **No dashboard-style toggle patterns** (MEDIUM) — GOV.UK services are transactional and linear. Multi-view dashboards with in-page view switching are architecturally discouraged; separate pages for different views align better with the service design model.

## Notable Props
- No component exists
- Closest alternative: `govukTabs({ items: [{ label, id, panel: { html } }] })`
- For filtering: `govukRadios()` + `govukButton({ text: "Apply filters" })`

## A11y Highlights
- **Keyboard**: Not applicable — no component exists; the Tabs alternative uses Arrow keys to navigate tabs, Tab to move into the panel
- **Screen reader**: Not applicable; Tabs component announces `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`
- **ARIA**: Not applicable

## Strengths & Gaps
- **Best at**: Directing teams toward semantically correct, user-tested alternatives (Tabs, Radios) rather than providing a widget borrowed from app-style design systems that may confuse government service users
- **Missing**: No compact toggle-style view switcher for contexts where tabs are too heavy-weight; no native segmented control for admin/internal tool interfaces built on GOV.UK Frontend; teams must build custom or adopt a different pattern entirely
