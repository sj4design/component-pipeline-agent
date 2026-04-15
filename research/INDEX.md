# Research Index

Component research manifest. Auto-updated when `/research` completes.

## Researched Components

| Component | Mode | Systems | Date | Visual HTML |
|-----------|------|:-------:|------|:-----------:|
| Alert | guided | 6 (Tier 1) | 2026-03-28 | ✓ |
| Avatar | guided | 6 (Tier 1) | 2026-03-28 | ✓ |
| Button | quick | 7 | 2026-03-29 | — |
| Card | quick | 7 | 2026-03-29 | — |
| DatePicker | guided | 6 (Tier 1) | 2026-03-28 | ✓ |
| Modal | guided | 14 | 2026-03-30 | — |
| Radio | guided | 14 | 2026-03-30 | — |

**Total: 7 components researched** (of 41 in slug list)

## Components with config.json (spec+enrich) but no dedicated research

These were synthesized directly from compiled digests during pipeline runs:

Accordion, Badge, Breadcrumb, Calendar, Checkbox, ColorPicker, Combobox, Divider, Drawer, EmptyState, FileUpload, Form, InlineEdit, Link, Menu, NumberInput, Pagination, Popover, Progress, Search, SegmentedControl, Select, Skeleton, Slider, Spinner, Steps, Switch, Table, Tabs, Tag, TextField, TimePicker, Toast, Tooltip

**Total: 34 components** (digest-derived, no standalone research file)

## Coverage

| Status | Count | Percentage |
|--------|:-----:|:----------:|
| Full research (`.md` file) | 7 | 17% |
| Config only (digest-derived) | 34 | 83% |
| Not started | 0 | 0% |
| **Total slug list** | **41** | **100%** |

## Notes

- Components with full research have richer context (narratives, design decisions, divergences, wireframes)
- Digest-derived configs use consensus patterns but lack per-system narrative depth
- Run `/research [component] --fresh` to generate full research for any digest-derived component
- Visual HTML reports (`.html`) are available for Alert, Avatar, DatePicker
