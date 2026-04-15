# Alert Family — Pre-loaded Interaction Data

> Derived from 14 default systems + accessibility libraries

## Family hierarchy

```
Alert (standalone)
  ├── InlineAlert (embedded in page flow)
  └── Toast / Banner (overlay, auto-dismiss)
```

## Color palette (for artifact)

```
alert: { color:"#DC2626", bg:"#FEF2F2", border:"#FCA5A5" }
```

---

## 1. ARIA Mapping

### Alert (static, informational)

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root (info/warning) | div | status | role="status" | 4.1.3 | Polite announcement |
| root (error/critical) | div | alert | role="alert" | 4.1.3 | Assertive announcement |
| icon | svg | — | aria-hidden="true" | — | Decorative — status conveyed by text |
| title | span | — | — | — | Part of accessible name |
| description | span | — | — | — | Additional context |
| dismiss | button | button | aria-label="Dismiss alert" | 4.1.2 | — |
| action | button/a | button/link | — | 4.1.2 | CTA within alert |

### Alert in form context

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root (error summary) | div | alert | role="alert" | 3.3.1 | Lists all form errors |
| error-link | a | link | href="#field-id" | 3.3.1 | Links to each invalid field |

---

## 2. Keyboard Navigation

### Alert

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Focus dismiss button (if present) → action button | 2.1.1 |
| Enter/Space | Activate dismiss or action | 2.1.1 |
| Escape | Dismiss alert (if dismissible) | 2.1.1 |

### Toast (auto-dismiss variant)

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Focus toast to pause auto-dismiss timer | 2.1.1 |
| Escape | Dismiss immediately | 2.1.1 |
| Tab (from within) | Move through action/dismiss buttons | 2.1.1 |

---

## 3. Focus Management

```
F1. Alert appearing: NO automatic focus movement.
    Screen reader announces via role="alert" or role="status".
    Focus stays where user was working.
    [WCAG 4.1.3 · APG Alert]

F2. Error summary in form: MAY move focus to summary on submit.
    Each error links to the invalid field.
    [WCAG 3.3.1]

F3. Dismiss button: after dismiss, focus moves to logical next element.
    Never leave focus on removed element.
    [WCAG 2.4.3]

F4. Toast stack: latest toast at top.
    Focus management: only if user Tabs into toast region.
    Auto-dismiss pauses while focused.
    [WCAG 2.2.1 Timing Adjustable]

F5. Focus ring on dismiss/action buttons: standard visible ring.
    [WCAG 2.4.7]
```

---

## 4. Screen Reader Announcements

| Event | Announcement | Method | WCAG |
|-------|-------------|--------|------|
| Error alert appears | "[title]: [description]" immediately | role="alert" (assertive) | 4.1.3 |
| Info/warning appears | "[title]: [description]" politely | role="status" (polite) | 4.1.3 |
| Alert dismissed | No announcement | — | — |
| Toast appears | "[title]" | aria-live="polite" | 4.1.3 |
| Toast auto-dismisses | No announcement | — | — |

---

## 5. Touch Adaptation

```
T1. Dismiss button: minimum 44×44px touch target.
    Even if visually smaller (X icon), ensure padding.
    [WCAG 2.5.5]

T2. Toast swipe-to-dismiss: optional enhancement.
    Always provide visible dismiss button.
    [WCAG 2.1.1]

T3. Action buttons in alert: adequate spacing (min 8px gap).
    [WCAG 2.5.8]
```

---

## 6. Edge Cases

```
EC1 · HIGH · Multiple alerts stacking
  Problem: Multiple role="alert" fire simultaneously → SR reads all at once.
  Behavior: Queue announcements. Latest alert announced first.
  Implementation: Single aria-live region, update content sequentially.
  Compliance: WCAG 4.1.3

EC2 · HIGH · Color-only status indication
  Problem: Red = error, yellow = warning relies on color alone.
  Behavior: Always include icon + text status, not just color.
  Implementation: Icon (aria-hidden) + visible status text + role.
  Compliance: WCAG 1.4.1 (Level A)

EC3 · MEDIUM · Auto-dismiss before user reads
  Problem: Toast disappears before slow readers finish.
  Behavior: Minimum 5 seconds + 1 second per 120 words.
  Implementation: Configurable duration, pause on hover/focus.
  Compliance: WCAG 2.2.1

EC4 · MEDIUM · Alert in dialog
  Problem: role="alert" inside role="dialog" may not announce.
  Behavior: Use aria-live region inside dialog instead.
  Implementation: aria-live="assertive" on container, update text content.
  Compliance: WCAG 4.1.3

EC5 · LOW · Alert links in error summary
  Problem: "Click here" links are not descriptive.
  Behavior: Link text = field label (e.g., "Email address is required").
  Implementation: aria-label or descriptive link text.
  Compliance: WCAG 2.4.4
```

---
_Pre-loaded data for Interaction Spec Agent · Alert Family_
_Source: 14 default DS + APG Alert pattern_
