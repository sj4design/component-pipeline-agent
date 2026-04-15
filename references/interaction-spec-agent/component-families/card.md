# Card Family — Pre-loaded Interaction Data

> Derived from 14 default systems + accessibility libraries

## Family hierarchy

```
Card (standalone)
  ├── CardHeader (region)
  ├── CardBody (region)
  ├── CardFooter (region)
  └── CardMedia (region)
```

## Color palette (for artifact)

```
card: { color:"#0891B2", bg:"#ECFEFF", border:"#67E8F9" }
```

---

## 1. ARIA Mapping

### Card

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| root (static) | div | — | — | — | No role needed for non-interactive card |
| root (clickable) | a or button | link or button | — | 4.1.2 | If entire card is clickable |
| root (selectable) | div | — | aria-selected (in group context) | 4.1.2 | — |
| header > title | h3 | heading | — | 1.3.1 | Level depends on page context |
| header > subtitle | p | — | — | — | — |
| media > image | img | img | alt="[description]" | 1.1.1 | alt="" if decorative |
| body | div | — | — | — | — |
| footer > actions | div | — | — | — | Contains buttons/links |
| badge/tag | span | status | aria-label if icon-only | 4.1.2 | — |

---

## 2. Keyboard Navigation

### Static card (no interaction)

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Skip card, focus internal interactive elements (links, buttons) | 2.1.1 |

### Clickable card

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Focus the card | 2.1.1 |
| Enter | Activate card link/action | 2.1.1 |
| Space | Activate (if button) | 2.1.1 |

### Card with multiple actions

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Focus first interactive element inside card | 2.1.1 |
| Tab (continued) | Move through internal actions | 2.1.1 |

### Card group (selectable)

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Enter group (first card) | 2.1.1 |
| → / ↓ | Next card | 2.1.1 |
| ← / ↑ | Previous card | 2.1.1 |
| Space | Toggle selection | 2.1.1 |

---

## 3. Focus Management

```
F1. Static card: NOT focusable. Only internal elements receive focus.
    [WCAG 2.4.3]

F2. Clickable card: wrap content in <a> or use <button>.
    Avoid making entire div focusable via tabindex.
    Preferred: invisible stretched link technique.
    [Polaris, Spectrum patterns]

F3. Card with multiple actions: each action independently focusable.
    Card itself NOT in tab order.
    [WCAG 2.1.1]

F4. Focus ring: visible on :focus-visible for clickable cards.
    Ring should follow card border-radius.
    [WCAG 2.4.7]

F5. Disabled card: aria-disabled="true", reduced opacity.
    Internal actions also disabled.
    [WCAG 4.1.2]
```

---

## 4. Screen Reader Announcements

| Event | Announcement | Method | WCAG |
|-------|-------------|--------|------|
| Clickable card focused | "[title], link" or "[title], button" | Native role | 4.1.2 |
| Card selected | "[title], selected" | aria-selected="true" | 4.1.2 |
| Card with badge | "[title], [badge text]" | aria-label or text content | 4.1.2 |
| Image card | "[alt text]" if informative, skipped if decorative | alt attribute | 1.1.1 |

---

## 5. Touch Adaptation

```
T1. Clickable card: entire surface is tap target.
    Minimum area exceeds 44×44px by nature.
    [WCAG 2.5.5]

T2. Card with multiple actions: touch targets must not overlap.
    Minimum 8px gap between footer buttons.
    [WCAG 2.5.8]

T3. Swipe-to-dismiss: optional enhancement only.
    Always provide visible dismiss button as primary path.
```

---

## 6. Edge Cases

```
EC1 · HIGH · Clickable card with internal links
  Problem: Click on internal link fires both card and link actions.
  Behavior: Internal links take priority. Card click excluded from child areas.
  Implementation: e.stopPropagation() on internal actions, or stretched link pattern.
  Compliance: WCAG 2.1.1

EC2 · MEDIUM · Card image as only content
  Problem: Image-only card with no text = no accessible name.
  Behavior: Image MUST have descriptive alt text.
  Implementation: alt="[product name/description]", never alt="".
  Compliance: WCAG 1.1.1

EC3 · MEDIUM · Long card titles truncated
  Problem: Truncated text hides information.
  Behavior: Full title available via tooltip or aria-label.
  Implementation: title attribute or aria-label with full text.
  Compliance: WCAG 1.3.1

EC4 · LOW · Card group keyboard navigation
  Problem: Large grids of cards — Tab through each is tedious.
  Behavior: Use arrow keys within group (grid/listbox pattern).
  Implementation: roving tabindex on card group container.
  Compliance: WCAG 2.1.1
```

---
_Pre-loaded data for Interaction Spec Agent · Card Family_
_Source: 14 default DS + Radix + Headless UI_
