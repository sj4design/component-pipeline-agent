---
system: Polaris (Shopify)
component: DataTable / IndexTable
url: https://polaris.shopify.com/components/tables/data-table
last_verified: 2026-03-28
---

# DataTable & IndexTable

## Approach

Shopify's Polaris deliberately splits table functionality into two separate components with distinct purposes. DataTable is the simpler of the two -- a read-only tabular display optimized for showing numeric data with sortable columns and built-in totals rows. IndexTable is the heavier, action-oriented component designed for Shopify's core use case: merchants managing lists of resources (orders, products, customers) that need selection, bulk actions, and filtering. This split exists because Shopify discovered that forcing action-oriented features (checkboxes, bulk actions, promoted actions) onto simple data displays created unnecessary complexity, while stripping them from resource lists removed critical merchant workflows. Rather than a single component with configuration flags, Polaris gives merchants and developers a clear decision: "Am I displaying data or managing resources?" The answer determines which component to use.

## Key Decisions

1. **Two components instead of one configurable table** (HIGH) -- DataTable handles display (financial summaries, analytics breakdowns, comparison tables) while IndexTable handles resource management (product lists, order queues, customer segments). Shopify made this split because their admin interface has both patterns in roughly equal proportion, and a single component with boolean flags like `showCheckboxes`, `enableBulkActions`, `showTotals` produced confusing API surfaces where half the props were irrelevant depending on the use case. Two focused components are easier to document, easier to learn, and produce fewer bugs.

2. **Built-in totals row in DataTable** (MEDIUM) -- DataTable accepts a `totals` array that renders a highlighted summary row below column headers. This is a first-class feature (not a custom footer) because Shopify's merchant dashboard is fundamentally about financial data -- sales totals, inventory counts, revenue summaries. Every analytics table in the Shopify admin needs totals, so baking it in prevents merchants from seeing inconsistent total-row implementations across different pages.

3. **IndexTable with promoted bulk actions** (HIGH) -- When rows are selected, IndexTable displays bulk actions directly in a sticky header bar. Actions are split into "promoted" (always visible) and "more actions" (in an overflow menu). This hierarchy exists because Shopify's UX research showed merchants overwhelmingly use 2-3 bulk actions (delete, export, edit) and rarely use others. Promoting the frequent actions reduces clicks for the 90% case while still supporting the long tail.

4. **Sticky header with sort controls** (MEDIUM) -- IndexTable headers stick to the top of the viewport during scroll, with sort indicators integrated into the headers. Shopify chose sticky headers as a default (not opt-in) because merchant resource lists routinely contain hundreds of items, and losing context about what each column represents during scroll was a top usability complaint in early versions.

## Notable Props

- `totals`: Array of summary values rendered as a dedicated row -- unique to Polaris because e-commerce tables almost always need aggregate numbers
- `promotedBulkActions` vs `bulkActions`: Explicit separation of primary and secondary bulk actions, reflecting Shopify's conviction that action hierarchy should be declared, not inferred from order
- `condensed`: Boolean that switches IndexTable to a mobile-friendly card layout -- interesting because it transforms the table into a completely different visual pattern rather than just shrinking columns

## A11y Highlights

- **Keyboard**: Tab moves between interactive elements (checkboxes, links, action buttons); sort headers activated via Enter; bulk action bar is keyboard-accessible when selection is active
- **Screen reader**: Selected row count is announced via aria-live; column headers associated with cells via scope attributes; sort direction conveyed through aria-sort
- **ARIA**: Uses native `<table>` elements with semantic markup; IndexTable adds role="rowheader" on the first cell of each row to identify the resource being listed

## Strengths & Gaps

- **Best at**: E-commerce resource management -- the DataTable/IndexTable split, built-in totals, and promoted bulk actions are purpose-built for merchant workflows and unmatched by general-purpose systems
- **Missing**: No column resizing, no row expansion, no drag-and-drop reordering, no virtualization -- Polaris tables assume moderate dataset sizes typical of Shopify admin views (hundreds, not millions of rows)
