---
system: Evergreen (Segment)
component: Select / SelectMenu
url: https://evergreen.segment.com/components/select-menu
last_verified: 2026-03-28
confidence: medium
---

# Select / SelectMenu

## Approach
Evergreen provides both a native Select (wrapping native `<select>`) for simple cases and a SelectMenu for rich, multi-select scenarios. The SelectMenu is one of Evergreen's most developed components because Segment's analytics platform requires filtering by many attribute types. SelectMenu supports multi-select with checkboxes, search filtering, and custom option rendering. It is essentially a filterable multi-select dropdown designed for analytics dashboard filter panels.

## Key Decisions
1. **SelectMenu for analytics filtering** (HIGH) — The SelectMenu's design is driven by Segment's core use case: filtering events by properties, users by attributes, sources by type. Multi-select with search is the standard interaction in analytics tools.
2. **isMultiSelect** (HIGH) — Multi-select mode renders checkboxes and shows a "Deselect All" option. The count of selected items is shown in the trigger. This is standard for filter panels in analytics dashboards.
3. **filterPlaceholder** (MEDIUM) — The search input placeholder guides users on what they're filtering through (e.g., "Filter events..."). In analytics with hundreds of event types, filtering is essential.

## Notable Props
- SelectMenu: `title`, `options[]`, `selected`, `onSelect`, `onDeselect`, `isMultiSelect`
- `filterPlaceholder`: search input placeholder
- `onFilterChange`: callback for search input value
- `closeOnSelect`: boolean — close after selection
- Select: simple wrapper around native `<select>`

## A11y Highlights
- **Keyboard**: Arrow key navigation in SelectMenu; search input is keyboard accessible
- **Screen reader**: role="listbox" with option roles; selected state communicated
- **ARIA**: Custom listbox ARIA; filter input has accessible label

## Strengths & Gaps
- **Best at**: Analytics filter panel multi-select; search filtering; Segment dashboard patterns
- **Missing**: No async loading; limited option customization beyond checkboxes
