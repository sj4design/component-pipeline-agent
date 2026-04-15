# Token Naming Conventions

> Patterns derived from 6 Tier 1 systems.

## Section Index

| § | Section | Lines |
|---|---------|-------|
| 1 | Tier 1 patterns | 19–28 |
| 2 | Recommended pattern (consensus) | 30–39 |
| 3 | Property abbreviations | 41–60 |
| 4 | Prefix generation rules | 62–88 |
| 5 | State suffixes | 90–101 |
| 6 | Compound state naming | 103–113 |
| 7 | Size variant naming | 115–125 |

---

## Tier 1 patterns

```
Spectrum:  --spectrum-datepicker-border-color-focus
Carbon:    --cds-datepicker-border-focus
M3:        --md-comp-date-picker-outline-focus-color
Atlassian: --ds-border-focused
Ant:       --ant-picker-active-border-color
Fluent:    --colorNeutralStroke1Hover
```

## Recommended pattern (consensus)

```
--[prefix]-[slot]-[property]-[state?]

prefix   = component abbreviation (2-4 chars, kebab-case)
slot     = slot name from anatomy (kebab-case)
property = CSS property controlled (bg, fg, border, ring, shadow, radius, padding, font-size)
state    = only if state-specific (omit for default)
```

## Property abbreviations

| Full name | Abbreviation | CSS property |
|-----------|:------------:|--------------|
| background | bg | background-color |
| foreground/text | fg | color |
| border | border | border-color |
| ring/outline | ring | outline-color / box-shadow |
| shadow | shadow | box-shadow |
| radius | radius | border-radius |
| opacity | opacity | opacity |
| padding | padding | padding |
| gap | gap | gap |
| font-size | font-size | font-size |
| font-weight | font-weight | font-weight |
| line-height | line-height | line-height |
| width | width | width / inline-size |
| height | height | height / block-size |
| duration | duration | transition-duration |
| easing | easing | transition-timing-function |

## Prefix generation rules

```
Rule: first consonants + first vowel, max 3-4 chars

Component        → Prefix
Calendar         → cal-
DatePicker       → dp-
RangeCalendar    → rc-
DateRangePicker  → drp-
Button           → btn-
Input            → inp-
Card             → crd-
Toast            → tst-
Popover          → pop-
Select           → sel-
Accordion        → acc-
Modal            → mdl-
Tabs             → tab-
Table            → tbl-
Tooltip          → tip-
Checkbox         → chk-
Radio            → rdo-
Switch           → swt-
Slider           → sld-
Badge            → bdg-
```

## State suffixes

| State/Status | Suffix | Example |
|-------------|--------|---------|
| hover | -hover | --dp-input-bg-hover |
| focus | -focus | --dp-input-border-focus |
| pressed | -pressed | --dp-input-bg-pressed |
| selected | -selected | --cal-day-bg-selected |
| disabled | -disabled | --dp-input-fg-disabled |
| error | -error | --dp-input-border-error |
| today | -today | --cal-day-bg-today |
| selecting | -selecting | --rc-range-bg-selecting |

## Compound state naming

```
When two states coexist (state + status):
  --[prefix]-[slot]-[property]-[status]-[state]

  e.g., --cal-day-bg-selected-focus
        --dp-input-border-error-focus

Rule: status first, state second (alphabetical: disabled > error > selected before focus > hover > pressed)
```

## Size variant naming

```
Size tokens use the size as suffix:
  --dp-input-padding-sm
  --dp-input-padding-md
  --dp-input-padding-lg
  --dp-input-font-size-sm
  --dp-input-font-size-md
  --dp-input-font-size-lg
```

---
_Source: Spectrum, Carbon, M3, Atlassian, Ant Design, Fluent UI_
