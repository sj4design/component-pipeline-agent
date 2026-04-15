---
system: Atlassian Design System
component: DynamicTable
url: https://atlassian.design/components/dynamic-table/
last_verified: 2026-03-28
---

# DynamicTable

## Approach

Atlassian's DynamicTable is built around the unique requirement that Jira, Confluence, and Trello users frequently need to manually reorder items in tables. While most design systems treat tables as static displays with optional sorting, Atlassian recognized that project management workflows demand drag-and-drop ranking -- moving a bug from priority 3 to priority 1, reordering a sprint backlog, reorganizing a list of tasks. This is why DynamicTable ships with built-in ranking (drag-and-drop row reordering) as a first-class feature rather than an add-on. The component bundles pagination, sorting, and loading states into a single opinionated package because Atlassian's products share remarkably similar table patterns: every table in Jira lists issues, every table in Confluence lists pages, and they all need the same core behaviors. Rather than composable primitives (like Carbon's approach), Atlassian chose a batteries-included component that works out of the box for the 80% case.

## Key Decisions

1. **Built-in drag-and-drop ranking** (HIGH) -- The `isRankable` prop enables row reordering via drag-and-drop, with `onRankStart`, `onRankEnd` callbacks. Atlassian built this directly into the table because their core product (Jira) fundamentally depends on manual prioritization. Backlog grooming, sprint planning, and issue triaging all require dragging rows into a new order. Delegating this to a third-party drag library produced inconsistent keyboard support and broken screen-reader announcements across teams, so Atlassian internalized it. The ranking feature handles both mouse and keyboard reordering, making it one of the few accessible drag-and-drop table implementations in any design system.

2. **Built-in pagination (not virtual scroll)** (MEDIUM) -- DynamicTable includes pagination controls as a default feature, paginating client-side data automatically based on `rowsPerPage`. Atlassian chose pagination over infinite scroll or virtualization because Jira's issue lists are typically 50-200 items, and pagination gives users a sense of position ("I'm on page 3 of 7") that infinite scroll removes. For Atlassian's project-management context, knowing where you are in a list matters more than seamless scrolling.

3. **Loading state with spinner overlay** (MEDIUM) -- When `isLoading` is true, DynamicTable dims existing content to 20% opacity and overlays a spinner. Content remains visible (not replaced by a skeleton) because Atlassian found that users want to see the previous data while new data loads -- it provides continuity and prevents disorientation. The 20% opacity was chosen through testing as the threshold where content is recognizable but clearly "stale."

4. **Sort via column header or programmatic control** (LOW) -- Sorting can be triggered by clicking headers or by setting `sortKey` and `sortOrder` props. Dual control exists because Jira often needs URL-driven sorting (the URL encodes the current sort state for shareable views) alongside user-initiated sorting. Programmatic sort ensures deep-linked Jira views render correctly on first load.

## Notable Props

- `isRankable`: Enables drag-and-drop row reordering -- unique among the 6 systems researched; no other table component ships with built-in ranking
- `isFixedSize`: Prevents the table from changing height during pagination transitions, avoiding layout shifts that disrupt user focus -- a detail that reflects Atlassian's obsession with stable layouts in dense project-management UIs
- `emptyView`: Custom ReactNode rendered when the table has no data -- exists as a dedicated prop because empty states in project management tools ("No issues match your filter") are critical UX moments that deserve intentional design

## A11y Highlights

- **Keyboard**: Tab navigates between interactive elements; sortable column headers activated via Enter or Space; ranking (drag-and-drop) is keyboard-accessible via Space to grab, arrow keys to move, Space to drop
- **Screen reader**: Rank changes are announced via aria-live so screen-reader users know when a row has been moved; sort state conveyed via aria-sort on column headers
- **ARIA**: Uses native `<table>` elements; drag-and-drop ranking adds aria-grabbed and aria-dropeffect (deprecated but still functional) for assistive technology

## Strengths & Gaps

- **Best at**: Drag-and-drop row reordering with full keyboard and screen-reader accessibility -- the only system researched that treats manual ranking as a built-in table capability
- **Missing**: No column resizing, no column pinning, no virtualization, no cell editing, no expandable rows -- DynamicTable is optimized for Atlassian's moderate-size list patterns and does not attempt to be a full-featured data grid
