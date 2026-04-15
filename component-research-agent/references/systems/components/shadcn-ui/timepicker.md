---
system: shadcn/ui
component: TimePicker (via Input / community pattern)
url: https://ui.shadcn.com/docs/components/input
last_verified: 2026-03-28
confidence: medium
---

# TimePicker

## Approach
shadcn/ui does not ship a dedicated TimePicker component. The recommended pattern is to use the base Input component with type="time" for simple time selection, or to build a custom TimePicker using shadcn/ui primitives (Input, Popover, Select) for more complex needs. Community recipes and the shadcn/ui extended component ecosystem offer TimePicker implementations. The datetime-local input[type=datetime-local] combines date and time in one native field.

## Key Decisions
1. **No dedicated component** (HIGH) — shadcn/ui defers to native input[type=time] for time input rather than providing a custom time selector, consistent with the library's philosophy of composability over bundled complexity.
2. **Community extension pattern** (MEDIUM) — Complex time pickers are built via community-contributed recipes using Popover + Select/Input combinations for hour/minute/second segment selection.
3. **Integration with react-hook-form** (MEDIUM) — Like all shadcn/ui form inputs, time inputs integrate via the FormField/FormControl pattern with react-hook-form.

## Notable Props
- `type="time"` on Input component
- `min` / `max`: HTML time range attributes
- `step`: Time step in seconds

## A11y Highlights
- **Keyboard**: Native time input keyboard segments (hour, minute, AM/PM); arrow keys adjust values
- **Screen reader**: Native input[type=time] semantics; label via FormLabel
- **ARIA**: Native time input role via HTML; label association via htmlFor

## Strengths & Gaps
- **Best at**: Simple time input via native browser; form integration via react-hook-form
- **Missing**: No custom time picker UI; native time input appearance is inconsistent across browsers; no dedicated component documentation
