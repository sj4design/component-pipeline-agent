# Visual Reference Guide

This file accompanies `visual-reference.jsx` — the React artifact that defines the visual quality standard for all research outputs.

When generating `[component]-visual.html` or a JSX artifact, replicate these exact patterns.

## Required Sections (in order)

### 1. Header
- Red monospace label "RESEARCH AGENT"
- Mode badge (QUICK = cyan, GUIDED = red, BRIEF = purple)
- Component name as h1
- Dropdown mode switcher (top right) with Lucide icons per mode
- Click outside closes dropdown

### 2. Phase Navigation (Guided/Brief only)
- Horizontal pill bar with phase steps
- Active phase highlighted with mode color
- Clickable to navigate between phases

### 3. Pattern Tags Bar
- Shows selected patterns as colored pills
- Counter: "X de Y sistemas relevantes"
- Only visible when patterns are selected

### 4. System Research Cards
Each card MUST include:

**Collapsed state:**
- System name in monospace + system color
- Tier badge (Tier 1 = always, Tier 2 = expand)
- Variant tags showing which patterns this system covers
- 1-line summary headline (bold, white)
- Chevron to expand

**Expanded state:**
- 3-5 sentence narrative paragraph (NOT bullets)
- WIREFRAME VISUAL inside a dark container — see Wireframe Rules below
- Contextual takeaway box with left border accent

### 5. Consensus Section
- Green themed container
- Each item: icon (32px square with green bg) + title + description
- Separated by subtle borders
- Minimum 5 items

### 6. Interactive Divergences
- Each divergence framed as a QUESTION
- 2 options in a 2-column grid
- Each option has:
  - Radio button (top right corner)
  - Option label (bold, colored when selected)
  - System badges showing adopters
  - Pro line (green check icon)
  - Con line (red minus icon)
- "DECIDIDO" badge appears when user selects
- Counter: "X de Y decisiones tomadas"

### 7. Next Steps
- Numbered cards (1-5) with colored left border
- Each step: number badge, title, description, slash command in code tag, agent name
- Colors cycle: red, cyan, green, purple, amber

### 8. Export Footer
- Command preview in monospace
- Stats (decisions taken, systems analyzed)
- "Exportar Markdown" button that generates and downloads .md file

### 9. Sticky Bottom Bar
- Fixed at bottom of viewport
- Semi-transparent with backdrop blur
- Left: mode icon + command + pattern count + decision count
- Right: contextual action button (changes per phase)
- Gradient fade at top so content isn't cut off

---

## Wireframe Rules (CRITICAL)

Every system card's visual MUST be an actual UI wireframe, NOT text with icons.

### What a wireframe IS:
- Calendar grids with day numbers in a CSS grid
- Input fields with placeholder text and border
- Buttons with labels
- Phone frames for mobile variants
- Arrow flows between components
- Mini layouts showing spatial relationships

### What a wireframe is NOT:
- A bullet list of features
- An icon + text description
- A colored box with a title only

### Wireframe patterns per component type:

**DatePicker:**
- Popover: input field → dropdown with month nav + 7-column day grid
- Modal: phone frame with calendar + Cancel/OK buttons
- Inline: standalone calendar with month navigation
- Input only: text field with date format, dashed box "sin calendario"
- Range: two inputs (Start → End) + grid with range highlighted
- Presets: sidebar with quick-select options vs full calendar

**Accordion:**
- Collapsed: header bar with chevron
- Expanded: header + content area revealed
- Nested: indented sub-accordions

**Modal:**
- Overlay + centered card with header/body/footer
- Different sizes side by side
- Mobile: full-screen variant

**Tabs:**
- Tab bar with active indicator
- Content panel below
- Variants: underline vs contained vs pills

**Table:**
- Column headers + rows with data
- Sort indicators, checkbox column
- Pagination bar below

**Select:**
- Input with chevron → dropdown list with options
- Multi-select with tags/chips
- Search/filter variant

### Wireframe styling:
- Background: rgba(0,0,0,0.25) container
- Elements: rgba(255,255,255,0.03-0.06) fills
- Borders: rgba(255,255,255,0.06-0.08)
- Text: rgba(255,255,255,0.3-0.5) in monospace
- Accent: system color at 0.2-0.4 opacity for highlights
- Grid gaps: 2px between calendar cells
- Border radius: 2-4px for small elements, 10px for containers

---

## Color System

Each design system has a consistent color:
- Material Design: #e94560 (red)
- Spectrum (Adobe): #4cc9f0 (cyan)
- Carbon (IBM): #f59e0b (amber)
- Polaris (Shopify): #22c55e (green — also used for consensus)
- Atlassian: #3b82f6 (blue)
- Ant Design: #22c55e (green)
- Paste (Twilio): #06b6d4 (teal)

Mode colors:
- Quick: #4cc9f0 (cyan)
- Guided: #e94560 (red)
- Brief: #8b5cf6 (purple)

Semantic colors:
- Consensus/success: #22c55e
- Warning/gap: #f59e0b
- Error/high impact: #ef4444
- Info/decided: #8b5cf6

---

## Dark Theme Values

- Background: #06060c
- Text primary: #e8e8ef
- Text secondary: rgba(255,255,255,0.55)
- Text muted: rgba(255,255,255,0.35)
- Text hint: rgba(255,255,255,0.2)
- Surface: rgba(255,255,255,0.02-0.03)
- Border: rgba(255,255,255,0.05-0.08)
- Font: 'DM Sans', -apple-system, sans-serif
- Monospace: system monospace

---

## State Management

The visual must track these states:
- `mode`: quick | full | brief
- `phase`: scope | confirm | research | brief-input | brief-analysis
- `answers`: scope answers from guided/brief
- `selectedVariants`: Set of pattern keys
- `researchExpanded`: which cards are open
- `userDecisions`: divergence selections
- `gapResolutions`: brief gap selections (brief mode)

---

## Self-Check Before Presenting

Before finalizing any visual output, verify:
1. ☐ Every system card has a real wireframe (grids, inputs, buttons), not text descriptions
2. ☐ Takeaways reference the user's scope if one exists
3. ☐ Divergences are framed as questions with selectable options
4. ☐ Consensus items have icons and explanations
5. ☐ Next steps connect to other agents with slash commands
6. ☐ Export markdown button works
7. ☐ Sticky bar is present with contextual actions
8. ☐ All system colors are consistent throughout
