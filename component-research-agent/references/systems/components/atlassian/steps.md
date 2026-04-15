---
system: Atlassian Design System
component: Progress Tracker
url: https://atlassian.design/components/progress-tracker
last_verified: 2026-03-28
---

# Steps / Stepper (Atlassian / Progress Tracker)

## Approach
Atlassian names its stepper component "Progress Tracker," a deliberate choice that frames the component as a navigation and status communication tool rather than a layout scaffold. The component is used extensively across Jira (project setup wizard, sprint creation flow), Confluence (space setup), and Bitbucket (pipeline configuration) — making it one of the most real-world-tested stepper implementations in the Tier 1 landscape. Atlassian's Progress Tracker is built specifically for linear wizard flows: steps progress left to right, each step has one of three states (unvisited, visited, current), and completed steps are clickable — allowing non-linear revisiting of earlier steps. The "visited" state (distinct from "completed") reflects a key UX philosophy: a step that the user has seen is navigable regardless of whether they completed it successfully. This contrasts with systems that only allow clicking steps that are fully validated, which can trap users when they want to review a previous step's content.

## Key Decisions
1. **"Visited" state distinct from "completed"** (HIGH) — Atlassian's Progress Tracker tracks which steps the user has visited (navigated to), making them all clickable regardless of completion status. This is a deliberately permissive navigation model: Atlassian's UX research in Jira's setup flows found that users frequently want to go back and change earlier decisions without having "completed" the current step first. A strict "only completed steps are clickable" model frustrated users who wanted to reconsider choices, leading Atlassian to adopt the visited-equals-navigable model.
2. **Horizontal-only, linear-only layout** (MEDIUM) — Progress Tracker is a fixed horizontal layout. There is no vertical orientation (unlike Carbon), no inline compact mode (unlike Ant Design), and no non-linear branching support. Atlassian's design team scoped it narrowly to the most common use case — a horizontal wizard header — rather than building a multi-layout general-purpose component. This keeps the component focused but means teams with vertical or compact step needs must use a custom implementation.
3. **No error state on individual steps** (MEDIUM) — Unlike Carbon's Progress Indicator (which has an "invalid" state), Atlassian's Progress Tracker does not include a per-step error state. A step is either unvisited, visited, or current. When a step has errors, the recommended Atlassian pattern is to use an inline error message within the step content rather than indicating the error in the tracker itself. This reflects Atlassian's preference for in-context feedback over global status indicators.

## Notable Props
- `items`: Array of `{ id, label, percentageComplete }` objects defining the steps. The `percentageComplete` (0 or 100) determines whether a step renders as visited/complete.
- `render`: Custom render function for step items — allows teams to customize step appearance while keeping Progress Tracker's keyboard navigation and ARIA structure.
- No `onChange` or navigation callback at the Progress Tracker level — step clicking navigates via the `href` on each step item, following Atlassian's routing architecture.

## A11y Highlights
- **Keyboard**: Tab moves between step items; Enter activates a visited step. The component uses a `<nav>` element wrapper, correctly classifying it as a navigation region for screen readers.
- **Screen reader**: Announced as "Progress navigation" (from the `<nav aria-label>`). Individual steps announce as "link [label]" for visited steps and "[label] (current)" for the active step. Unvisited steps are non-interactive and not announced as links.
- **ARIA**: `role="navigation"` via `<nav>` element. Current step uses `aria-current="step"`. Visited steps are `<a>` elements (navigable links); unvisited steps are `<span>` elements (non-interactive). This semantic differentiation is the correct accessibility pattern for progress trackers where only some steps are navigable.

## Strengths & Gaps
- **Best at**: Navigation semantics — using `<nav>`, `<a>` for visited steps, and `<span>` for unvisited steps is the most semantically correct ARIA implementation of a stepper among Tier 1 systems.
- **Missing**: No vertical orientation, no error state on individual steps, no step description/subtitle text, and no inline/compact mode. For teams needing more than a horizontal linear wizard header, Atlassian's Progress Tracker requires augmentation or replacement.
