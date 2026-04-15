# DatePicker Family — Pre-loaded Interaction Data

> Derived from 6 Tier 1 systems (Spectrum, Carbon, MUI, Polaris, Atlassian, Ant Design)
> + accessibility libraries (Radix, Headless UI, React Aria)

## Family hierarchy

```
Calendar ──┬── DatePicker
           └── RangeCalendar ── DateRangePicker
```

## Color palette (for artifact)

```
calendar:        { color:"#534AB7", bg:"#EEEDFE", border:"#AFA9EC" }
datepicker:      { color:"#0F6E56", bg:"#E1F5EE", border:"#5DCAA5" }
rangecalendar:   { color:"#185FA5", bg:"#E6F1FB", border:"#85B7EB" }
daterangepicker: { color:"#993C1D", bg:"#FAECE7", border:"#F0997B" }
```

---

## 1. ARIA Mapping

### Calendar

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| grid | table | grid | aria-label="[Month Year]" | 4.1.2 | Updated on month change |
| weekday-labels | th | columnheader | aria-label="[Full day name]" | 1.3.1 | Never use abbr (inconsistent SR reading in grids — APG issue #1570) |
| day-cell | td > button | gridcell | aria-selected, aria-disabled, aria-current | 4.1.2 | Roving tabindex |
| day-cell (today) | — | — | aria-current="date" | 4.1.2 | On the gridcell |
| day-cell (selected) | — | — | aria-selected="true" | 4.1.2 | — |
| day-cell (disabled) | — | — | aria-disabled="true" | 4.1.2 | NEVER disabled nativo in grid (removes from navigation) |
| header > title | h2 | — | aria-live="polite" | 4.1.3 | Announces month/year changes |
| header > nav | button × 2 | button | aria-label="Previous month" / "Next month" | 4.1.2 | — |

### DatePicker

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| input | input | combobox | aria-haspopup="dialog", aria-expanded | 4.1.2 | — |
| trigger | button | button | aria-label="Choose date" | 4.1.2 | Or localized equivalent |
| popover-container | div | dialog | aria-modal="true", aria-label="Choose date" | 4.1.2 | Focus trap inside |
| label | label | — | for="input-id" or aria-labelledby | 3.3.2 | — |
| error-message | span | — | linked via aria-describedby on input | 3.3.1 | Input gets aria-invalid="true" |

### RangeCalendar

Inherits Calendar ARIA, plus:

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| range-fill | div | — | aria-hidden="true" | — | Visual only. State via day-cell attrs |
| day-cell (range) | — | — | aria-selected="true" on start, end, and in-between | 4.1.2 | Spectrum pattern |

### DateRangePicker

| Slot | Element | Role | ARIA Attributes | WCAG | Notes |
|------|---------|------|-----------------|------|-------|
| start-input | input | combobox | aria-label="Start date" | 4.1.2 | — |
| end-input | input | combobox | aria-label="End date" | 4.1.2 | — |
| input-separator | span | — | aria-hidden="true" | — | Visual only |
| preset-panel | div | listbox or list | aria-label="Presets" | 4.1.2 | — |
| preset-item | button/option | option or listitem | — | 4.1.2 | — |
| dual-calendar | 2 × grid | grid | Distinct aria-labels ("March 2026", "April 2026") | 4.1.2 | — |

---

## 2. Keyboard Navigation

### Calendar grid context

| Key | Action | WCAG |
|-----|--------|------|
| → | Next day | 2.1.1 |
| ← | Previous day | 2.1.1 |
| ↓ | Same day next week | 2.1.1 |
| ↑ | Same day previous week | 2.1.1 |
| Home | First day of month | 2.1.1 |
| End | Last day of month | 2.1.1 |
| PageDown | Same day next month | 2.1.1 |
| PageUp | Same day previous month | 2.1.1 |
| Shift+PageDown | Same day next year | 2.1.1 |
| Shift+PageUp | Same day previous year | 2.1.1 |
| Enter / Space | Select focused date | 2.1.1 |

### DatePicker input context

| Key | Action | WCAG |
|-----|--------|------|
| Alt+↓ / ↓ | Open calendar popover | 2.1.1 |
| Enter | Open calendar popover | 2.1.1 |
| Escape | Close popover, return focus to trigger | 2.1.2 |
| Tab | Move between date segments (day/month/year) | 2.1.1 |
| ↑ / ↓ | Increment/decrement segment value | 2.1.1 |

### Range selection context

| Key | Action | WCAG |
|-----|--------|------|
| Enter (1st) | Set range start, enter "selecting" mode | 2.1.1 |
| Enter (2nd) | Set range end, exit "selecting" mode | 2.1.1 |
| Escape | Cancel selection, clear partial range | 2.1.1 |
| Arrow keys | Move focus + update range preview | 2.1.1 |

### DateRangePicker with presets

| Key | Action | WCAG |
|-----|--------|------|
| Tab | Through: start-input → end-input → trigger → [presets] → grid → [footer] | 2.4.3 |
| Enter | Activate preset / Apply button | 2.1.1 |

---

## 3. Focus Management

```
F1. Open popover → focus to selected date.
    No selection → focus to today.
    Today not visible → focus to first day of visible month.
    [WCAG 2.4.3 · APG Dialog]

F2. Close popover (Escape or selection) → focus returns to trigger.
    NEVER trapped in popover after close.
    [WCAG 2.4.3 · APG Dialog]

F3. Disabled days: focusable with arrows but NOT activable with Enter/Space.
    aria-disabled="true", NOT disabled nativo.
    Reason: maintain consistent grid navigation.
    [APG Grid · Spectrum isDateUnavailable]

F4. Range selecting: after 1st Enter (start), focus stays in grid.
    Arrows move focus + update range preview.
    [Spectrum RangeCalendar]

F5. DateRangePicker: after selecting end date →
    focus moves to end-input (not trigger).
    [Spectrum DateRangePicker]

F6. Today has no special focus priority in navigation —
    only initial focus target if no selection exists.
    [APG Grid]

F7. Tab trapping: inside popover, Tab cycles between internal controls
    (nav buttons, grid, presets, footer). Does not escape popover.
    Escape is the only exit.
    [APG Dialog Modal]

F8. Error state: focus on input triggers error reading via aria-describedby.
    No automatic focus movement to error message.
    [WCAG 4.1.3 · APG Forms]
```

---

## 4. Screen Reader Announcements

| Event | Announcement | Method | WCAG |
|-------|-------------|--------|------|
| Month changes (nav) | "[Month] [Year]" | aria-live="polite" on heading | 4.1.3 |
| Date selected | "[Full date] selected" | aria-live="polite" | 4.1.3 |
| Range start selected | "Start date: [date]" | aria-live="polite" | 4.1.3 |
| Range complete | "Range: [start] to [end]" | aria-live="polite" | 4.1.3 |
| Error appears | "[Error message text]" | aria-describedby + aria-invalid | 4.1.3 |
| Popover opens | "Choose date, dialog" | role="dialog" + aria-label | 4.1.2 |
| Popover closes | Focus returns, no announcement needed | — | — |
| Disabled date focused | "[date], unavailable" | aria-disabled="true" | 4.1.2 |

---

## 5. Touch Adaptation

```
T1. Hover-only controls (clear button, nav arrows) → always visible on touch.
    @media (hover: none) { .hover-control { opacity: 1; visibility: visible; } }
    [WCAG 2.1.1]

T2. Day cells minimum touch target: 44×44px (WCAG 2.5.5 Enhanced).
    If grid too small: minimum 24×24px (WCAG 2.5.8 Level AA).

T3. No hover states on touch — avoid sticky :hover.
    Use data-hovered or JS modality detection.
    [Spectrum pattern]

T4. Long press → no special behavior (reserve for OS context menu).

T5. Swipe gestures: NOT required for month navigation.
    Prev/next buttons are the accessible path.
    Swipe is enhancement only.
```

---

## 6. Edge Cases

```
EC1 · HIGH · Disabled dates in range selection
  Problem: User selects start, then end date creates range crossing disabled dates.
  Behavior: Range cannot span disabled dates. Show error, cancel partial range.
  Implementation: Validate on each keystroke/click. If invalid, clear partial range.
  Source: Flagged in research · Spectrum reference
  Compliance: WCAG 4.1.3

EC2 · HIGH · Focus trap escape hatch
  Problem: If popover focus trap breaks, user is stuck.
  Behavior: Escape ALWAYS closes popover from any focus position.
  Implementation: Global keydown on popover for Escape. Call onClose + return focus.
  Source: APG Dialog · WCAG 2.1.2 No Keyboard Trap
  Compliance: WCAG 2.1.2 (Level A)

EC3 · HIGH · Touch: hover-only controls invisible
  Problem: Nav arrows or clear button only on :hover → invisible on touch.
  Behavior: On touch (hover: none), always show controls.
  Implementation: @media (hover: none) { .hover-trigger { opacity: 1; } }
  Source: Research · Spectrum
  Compliance: WCAG 2.1.1

EC4 · MEDIUM · Dual-month keyboard navigation
  Problem: PageDown from first month should go to second, not skip to third.
  Behavior: Navigation continues linearly across both visible months.
  Implementation: Single grid context for both months.
  Source: Spectrum DateRangePicker
  Compliance: WCAG 2.4.3

EC5 · MEDIUM · RTL arrow key mirroring
  Problem: In RTL layouts, → should go to previous day, ← to next.
  Behavior: Arrow direction mirrors in RTL.
  Implementation: Check document direction. Swap left/right arrow behavior.
  Source: Spectrum i18n · WCAG 1.3.4
  Compliance: WCAG 1.3.4

EC6 · LOW · Outside-month days
  Problem: Calendar shows greyed days from prev/next month. Are they navigable?
  Behavior: DS-specific decision → ASK USER.
  Implementation: If shown: focusable + selectable. If hidden: skip in navigation.
  Source: Carbon vs Spectrum divergence
  Compliance: —

EC7 · LOW · Popover positioning near viewport edge
  Problem: Popover opens downward but near bottom of viewport.
  Behavior: Auto-flip upward. Maintain focus behavior regardless of position.
  Implementation: CSS anchor positioning or JS positioning library.
  Source: General pattern
  Compliance: —
```

---
_Pre-loaded data for Interaction Spec Agent · DatePicker Family_
_Source: 6 Tier 1 DS + Radix + Headless UI + React Aria_
