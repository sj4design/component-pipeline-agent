---
component: Modal
tier: 2
last_verified: 2026-03-28
---

# Modal — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Modal | Reakit Dialog; three sizes; non-dismissible option for destructive confirm | high |
| Salesforce Lightning | Modal | Large/medium/small; tagline support; footer action buttons; Lightning page integration | high |
| GitHub Primer | Dialog | v2 headless Dialog; controlled/uncontrolled; renderHeader/renderBody/renderFooter | high |
| shadcn/ui | Dialog | Radix UI Dialog; AlertDialog variant for confirmations; compound component API | high |
| Playbook | Modal | Dual React/Rails; sales confirmation flows | medium |
| REI Cedar | CdrModal | Vue modal; overlay and full-screen variants; WCAG 2.1 AA | medium |
| Wise Design | Modal | Financial confirmation dialogs; security-sensitive actions | low |
| Dell Design System | Modal | Enterprise IT confirmation dialogs | low |

## Key Decision Patterns

**Dialog vs. AlertDialog:** shadcn/ui explicitly separates Dialog (dismissible, non-critical) from AlertDialog (role="alertdialog", for destructive/irreversible actions requiring confirmation). Paste's non-dismissible prop covers the AlertDialog use case. Primer uses the same Dialog for both.

**Focus management:** All implementations trap focus within modal. Focus returns to trigger on close. This is the primary modal accessibility requirement.

**Dismissal:** All support Escape key to close. All support backdrop click to close (configurable). Paste allows disabling close-on-backdrop for destructive confirm patterns.

**Sizing:** Lightning and Paste offer small/medium/large sizes. shadcn/ui relies on CSS class overrides. Cedar offers overlay and full-screen variants.

**Primitives:** shadcn/ui and Primer use Radix Dialog. Paste uses Reakit Dialog. Lightning and Cedar build their own.

## A11y Consensus
- role="dialog" (or role="alertdialog" for confirmations)
- aria-modal="true"
- aria-labelledby pointing to modal heading
- Focus trap within modal; focus returns to trigger on close
- Escape key closes modal (except non-dismissible confirm dialogs)

## Recommended Use
Use AlertDialog (shadcn/ui) or non-dismissible Modal (Paste) for destructive confirmations. Standard Dialog for all other overlay content. Focus management is non-negotiable — all T2 systems handle this correctly.
