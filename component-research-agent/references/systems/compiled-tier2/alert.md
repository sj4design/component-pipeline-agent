---
component: Alert
tier: 2
last_verified: 2026-03-28
---

# Alert — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Alert | role="alert"\|"status"; info/success/warning/error; dismissible option | high |
| Salesforce Lightning | Notice / Alert | Page-level Alert; scoped notices; info/success/warning/error/offline | high |
| GitHub Primer | Flash | role="alert"; inline dismissible; info/success/warning/danger variants | high |
| shadcn/ui | Alert | No live region by default; AlertTitle + AlertDescription; 4 variants | high |
| Playbook | Alert | User feedback messages; dual React/Rails | medium |
| REI Cedar | CdrBanner | Vue alert/banner; persistent page-level alerts; WCAG 2.1 AA | medium |
| Wise Design | Alert | Financial warning and error messages | low |
| Dell Design System | Alert | Enterprise system and validation alerts | low |

## Key Decision Patterns

**role="alert" vs. static content:** When to use role="alert" (assertive live region): only when content appears dynamically in response to user action or system event. For alerts present on initial page load, role="alert" is not needed — static semantic HTML suffices. shadcn/ui's Alert intentionally omits the live region, requiring developers to add it when needed.

**Alert vs. Toast:** Alert is inline/persistent in the page content flow. Toast is a transient overlay notification. Alert should be used for contextual validation messages, critical system status, and important information requiring user attention within the page. Toast for non-critical feedback.

**Dismissible:** Paste, Primer (Flash), and Lightning support dismissible alerts with close buttons. shadcn/ui's Alert is static — no built-in dismiss. Cedar's Banner can be persistent or dismissible.

**Lightning Offline variant:** Lightning has an "offline" variant for when Salesforce detects network loss — important for Salesforce's mobile app context.

## A11y Consensus
- Static alerts: no live region needed; semantic HTML
- Dynamically injected alerts: role="alert" (assertive) for errors; role="status" (polite) for success/info
- Include status icon with visually-hidden text ("Error:", "Warning:") before the message
- Dismissible alert: close button with aria-label="Dismiss alert" or "Close"
- Error alerts associated with form fields: aria-describedby on field, not role="alert"

## Recommended Use
Use static Alert (shadcn/ui) for persistent in-page status messages. Add role="alert" only for dynamically injected error messages. Use Paste Alert for Twilio Console with appropriate live region semantics. Use Toast for transient feedback.
