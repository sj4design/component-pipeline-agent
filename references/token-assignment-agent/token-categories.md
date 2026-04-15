# Token Categories

> Complete list of token categories with properties and generation rules.

## Color tokens

```
background (bg)      → background-color of slot
foreground (fg)      → text color / icon color
border               → border-color
ring                 → outline-color or box-shadow for focus indicator
shadow               → box-shadow (elevation)
overlay              → background with opacity (backdrops, scrims)
icon                 → icon fill color (if different from fg)
```

### Generation rules for color

```
Every interactive slot gets minimum:
  bg + fg + border (3 tokens per default state)

Every interaction state gets:
  Only the properties that CHANGE vs default

Focus state ALWAYS gets:
  ring token (WCAG 2.4.7 mandatory)
  bg token (only if background changes)

Disabled state gets:
  fg-disabled OR opacity-disabled (not both)

Error status gets:
  border-error (always)
  fg-error (only if text color changes)
```

## Spacing tokens

```
padding-inline       → horizontal padding (left/right)
padding-block        → vertical padding (top/bottom)
padding              → shorthand if uniform
gap                  → gap between children
margin               → external spacing (rare in component tokens)
```

### Generation rules for spacing

```
Generated PER SIZE, not per state:
  --dp-input-padding-sm: 8px;
  --dp-input-padding-md: 12px;
  --dp-input-padding-lg: 16px;

Only for slots that have explicit sizing:
  input, button, cell (day-cell)
  NOT for labels, error messages, icons
```

## Typography tokens

```
font-family          → typeface
font-size            → text size
font-weight          → bold/regular/light
line-height          → line spacing
letter-spacing       → character spacing
```

### Generation rules for typography

```
Generated PER SIZE:
  --dp-input-font-size-sm: 14px;
  --dp-input-font-size-md: 16px;
  --dp-input-font-size-lg: 18px;

Only for slots with text content:
  input, label, error-message, day-cell, weekday-labels
  NOT for containers, separators, icons
```

## Size tokens

```
width                → fixed width
height               → fixed height (e.g., input height by size)
min-width / max-width
icon-size            → icon dimensions
border-width         → border thickness
border-radius        → corner rounding
```

### Generation rules for size

```
border-radius: one per component (shared across states)
  --dp-input-radius: 8px;

height: per size variant
  --dp-input-height-sm: 32px;
  --dp-input-height-md: 40px;
  --dp-input-height-lg: 48px;

Icon size: typically one per component
  --dp-trigger-icon-size: 20px;
```

## Motion tokens

```
duration             → transition-duration
easing               → transition-timing-function
delay                → transition-delay (rare)
```

### Generation rules for motion

```
Only for components with documented transitions in interaction-spec:
  Popover, Toast, Modal, Accordion, Tooltip, Drawer

Components WITHOUT motion tokens (instant state change):
  Button, Input, Checkbox, Badge, Radio

Typical motion tokens:
  --dp-popover-duration-open: 200ms;
  --dp-popover-duration-close: 150ms;
  --dp-popover-easing-open: ease-out;
  --dp-popover-easing-close: ease-in;
```

## Elevation tokens

```
box-shadow           → shadow layers for depth
z-index              → stacking order
```

### Generation rules for elevation

```
Only for components that float above content:
  Popover, Toast, Modal, Tooltip, Dropdown

Typically reference a shared elevation scale:
  --dp-popover-shadow: var(--elevation-3);
  --mdl-shadow: var(--elevation-4);

z-index: managed at system level, not component level.
```

---
_Reference for Token Assignment Agent_
