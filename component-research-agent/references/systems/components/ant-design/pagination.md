---
system: Ant Design
component: Pagination
url: https://ant.design/components/pagination/
last_verified: 2026-03-28
---

# Pagination

## Approach
Ant Design's Pagination component is the most feature-complete in Tier 1, consistent with Ant Design's philosophy of providing maximum configurability for enterprise developers. It is the only Tier 1 system that includes all four advanced pagination features in a single component: numbered page buttons, page size selector, jump-to-page input, and total count display. This breadth reflects the diversity of Ant Design's target audience — Chinese enterprise applications that may be used by casual users (who need simple prev/next) and power users (who need jump-to-page for a 500-page dataset) within the same product.

The component is also the most visually polished pagination in Tier 1, with a `simple` variant that reduces to prev/next + current page for mobile or compact contexts, and a `mini` size for use in tight layouts. Ant Design's Pagination integrates naturally with its Table component, which accepts `pagination` as a configuration prop, rendering an Ant Design Pagination automatically below the table with the correct `total` and `pageSize` values.

## Key Decisions
1. **Jump-to-page input as first-class feature** (HIGH) — Ant Design includes a "Go to" input field via the `showQuickJumper` prop. When enabled, a small input appears to the right of the page controls: users type a page number and press Enter to navigate directly. This is essential for large datasets (500+ pages) where clicking through the page range is impractical. No other Tier 1 system includes this as a native feature. The justification: Chinese enterprise apps frequently deal with large datasets and power users expect direct navigation.
2. **Page size selector via `showSizeChanger`** (HIGH) — The `pageSizeOptions` prop defines available page sizes; `showSizeChanger` enables the dropdown. Ant Design's default page sizes are [10, 20, 50, 100], which are the standard enterprise choices. The `onShowSizeChange` callback fires separately from `onChange`, allowing different handling logic for page vs. size changes.
3. **`total` display with `showTotal`** (HIGH) — The `showTotal` prop accepts a render function that receives `(total, [start, end])` and returns the display string. This is the most flexible total count implementation in Tier 1 — instead of a fixed format, teams can render any string (e.g., "Showing 1 to 20 of 1,247 entries" in English, or the Chinese equivalent, or a custom format). The function signature gives teams all the data they need to construct any display format.
4. **`simple` mode for mobile/compact** (MEDIUM) — The `simple` prop reduces Pagination to prev/next buttons + a "Current/Total" fraction display. This is the correct pattern for mobile contexts or compact sidebars where full page-number lists are too wide. The dual-mode design means teams can use one component with consistent semantics across desktop and mobile rather than different components.
5. **`disabled` prop for the entire component** (LOW) — Ant Design supports disabling the entire pagination control (e.g., while a data fetch is in progress). This is a pragmatic detail: without it, users might interact with pagination controls while new data is loading, creating inconsistent state.

## Notable Props
- `showQuickJumper`: Enables the jump-to-page input field (unique in Tier 1)
- `showSizeChanger`: Enables the page size selector dropdown
- `showTotal`: Render function `(total, range) => ReactNode` for custom count display
- `pageSizeOptions`: Array of page sizes for the size selector
- `simple`: Switches to compact prev/next + fraction display mode
- `responsive`: Automatically switches to `simple` mode on small screens
- `total`: Total item count — drives page calculation and count display

## A11y Highlights
- **Keyboard**: All page number buttons are focusable; prev/next are buttons; the page size select is a standard `<select>` element; the jump-to-page input is a text `<input>` that fires on Enter
- **Screen reader**: Page number buttons have `aria-label="Page N"`; current page has `aria-current="page"`; prev/next buttons have descriptive aria-labels; the size selector and jump input have associated labels
- **ARIA**: `<ul role="list">` for page buttons; `aria-current="page"` on active; `aria-disabled` on boundary prev/next; size selector and jump input follow standard form control ARIA patterns

## Strengths & Gaps
- **Best at**: The most complete pagination implementation in Tier 1 — jump-to-page, page size selector, flexible total count display, simple/responsive mode, and `showTotal` render function all in one component; the `responsive` prop for automatic mobile adaptation is a thoughtful detail
- **Missing**: No skeleton/loading state (teams must implement themselves during data fetches); the `showTotal` render function, while flexible, puts the i18n burden entirely on the consumer rather than providing built-in string templates
