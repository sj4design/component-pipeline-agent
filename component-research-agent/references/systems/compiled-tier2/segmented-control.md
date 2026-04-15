---
component: SegmentedControl
tier: 2
last_verified: 2026-03-28
---

# SegmentedControl — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | SegmentedControl (not present) | Not present; use Tabs or ButtonGroup for selection | high |
| Salesforce Lightning | Button Group (radio) | radio-group button variant; mutually exclusive button selection | high |
| GitHub Primer | SegmentedControl | Dedicated component; single selection; icon + label support; full-width option | high |
| shadcn/ui | ToggleGroup | Radix UI ToggleGroup; type="single"\|"multiple"; icon-only variant | high |
| Playbook | SegmentedControl (not present) | Not present; use Tabs or Buttons | medium |
| REI Cedar | CdrSegmentedControl (not present) | Not present; use RadioGroup with button styling | medium |
| Wise Design | SegmentedControl | View switching (send/receive, account views) | low |
| Dell Design System | SegmentedControl | Enterprise view mode selection | low |

## Key Decision Patterns

**ARIA pattern disagreement:** Should segmented controls use role="tablist" (for content switching) or role="radiogroup" (for value selection)? Primer uses neither — it uses a group of buttons with aria-pressed or tracks selection internally. Lightning uses radiogroup for its button group. The correct choice depends on whether it switches content panels (tablist) or selects a value (radiogroup/toolbar).

**Primer's dedicated component:** Primer SegmentedControl is one of the few T2 systems with a truly dedicated, named SegmentedControl component with documented patterns. Most others approximate it via ButtonGroup or ToggleGroup.

**shadcn/ui ToggleGroup:** Radix ToggleGroup supports both single and multiple selection modes and is the closest to a SegmentedControl in shadcn/ui. The multiple selection mode makes it more versatile but also less "segmented control" and more "toggle button set."

**When to use:** Use segmented controls for mutually exclusive view switching (List/Grid, Day/Week/Month). Use Tabs when switching content panels. Use RadioGroup for form-based option selection.

## A11y Consensus
- For view switching (content changes below): use role="tablist" pattern
- For value/filter selection (no content panels): use role="radiogroup" or toolbar with aria-pressed buttons
- Selected option: aria-checked="true" (radiogroup) or aria-selected="true" (tablist) or aria-pressed="true" (toolbar)
- Keyboard: arrow keys navigate between options (roving tabindex); Enter/Space activates

## Recommended Use
Use Primer SegmentedControl for GitHub-style view mode switching. Use shadcn/ui ToggleGroup for React apps. Use Lightning Button Group (radio) for Salesforce. Choose the ARIA pattern based on whether content panels are switched (tablist) or a value is set (radiogroup).
