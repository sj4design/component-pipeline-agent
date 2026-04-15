# Wireframe Style Guide — COMPACT MINIATURE STYLE

## The Rule
Wireframes are NOT functional calendars. They are MINIATURE SKETCHES that communicate a pattern at a glance. Think of them as thumbnail diagrams, not full-size implementations.

## Key Differences

### ❌ WRONG — Full-size implementation style
- Calendar with actual numbered days (1, 2, 3... 30)
- Full-width grid taking 300-400px
- Range fills with exact day highlighting
- Functional month navigation
- Feels like a finished UI component

### ✅ CORRECT — Compact miniature sketch style
- Small square cells (aspect-ratio: 1) with NO text inside
- Each variant card is ~140-160px wide
- 3 variants side by side in ONE row
- Selected day = one colored cell, range = colored band
- Feels like a quick whiteboard sketch

## Exact CSS/JSX Patterns to Follow

### Calendar Grid (miniature)
```jsx
// CORRECT: Tiny grid, no numbers, just colored squares
<div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
  {Array.from({length:21}).map((_,i) => (
    <div key={i} style={{
      aspectRatio:"1",
      borderRadius:"2px",
      background: i===14 ? "rgba(233,69,96,0.25)" : "rgba(255,255,255,0.03)",
      border: i===14 ? "1px solid rgba(233,69,96,0.5)" : "1px solid rgba(255,255,255,0.03)"
    }} />
  ))}
</div>
```

### Input Field (miniature)
```jsx
// CORRECT: Small input with placeholder, monospace text
<div style={{
  background:"rgba(255,255,255,0.06)",
  borderRadius:"5px",
  padding:"6px 8px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
}}>
  <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>
    Mar 22, 2026
  </span>
  <CalendarIcon size={10} color="rgba(233,69,96,0.4)" />
</div>
```

### Month Navigation (miniature)
```jsx
// CORRECT: Tiny nav, just chevrons + month name
<div style={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:"5px",
  padding:"0 2px"
}}>
  <ChevronLeft size={7} color="rgba(255,255,255,0.2)" />
  <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace", fontWeight:700 }}>
    March 2026
  </span>
  <ChevronRight size={7} color="rgba(255,255,255,0.2)" />
</div>
```

### 3 Variants Side by Side (the CRITICAL pattern)
```jsx
// CORRECT: 3 compact cards in a row using flex-wrap
<div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
  {/* Card 1: Popover */}
  <div style={{
    flex:"1 1 140px",
    background:"rgba(255,255,255,0.03)",
    borderRadius:"10px",
    padding:"10px",
    border:"1px solid rgba(233,69,96,0.15)"
  }}>
    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
      <Icon size={11} color="rgba(233,69,96,0.6)" />
      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(233,69,96,0.8)", fontFamily:"monospace" }}>
        Popover
      </span>
      <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.35)", marginLeft:"auto" }}>
        Desktop
      </span>
    </div>
    {/* Mini input */}
    {/* Mini calendar grid */}
  </div>

  {/* Card 2: Modal */}
  <div style={{ flex:"1 1 100px", /* ... same structure */ }}>
    {/* Phone frame with mini calendar */}
  </div>

  {/* Card 3: Input only */}
  <div style={{ flex:"1 1 140px", /* ... same structure */ }}>
    {/* Input field + "sin calendario" indicator */}
  </div>
</div>
```

### Modal/Phone Frame (miniature)
```jsx
// CORRECT: Small phone-like frame
<div style={{
  width:"70%",
  background:"rgba(255,255,255,0.02)",
  borderRadius:"12px",
  padding:"6px",
  border:"1px solid rgba(255,255,255,0.08)"
}}>
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px" }}>
    <span style={{ fontSize:"7px", color:"rgba(233,69,96,0.6)", fontWeight:600 }}>Seleccionar fecha</span>
    <XIcon size={8} color="rgba(255,255,255,0.25)" />
  </div>
  {/* Mini calendar grid */}
  <div style={{ display:"flex", gap:"4px", justifyContent:"flex-end", marginTop:"6px" }}>
    <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.3)", padding:"3px 6px", borderRadius:"3px", background:"rgba(255,255,255,0.04)" }}>Cancel</div>
    <div style={{ fontSize:"6px", color:"#fff", padding:"3px 6px", borderRadius:"3px", background:"rgba(233,69,96,0.4)" }}>OK</div>
  </div>
</div>
```

### Range with Presets (miniature 2-column)
```jsx
// CORRECT: Compact 2-zone layout, not full 3-zone
<div style={{ display:"flex", gap:"6px" }}>
  {/* Preset sidebar */}
  <div style={{ flex:"0 0 80px", padding:"4px 0" }}>
    {["Hoy","Ayer","Últ. 7d","Este mes"].map((p,i) => (
      <div key={p} style={{
        padding:"3px 6px",
        fontSize:"8px",
        color: i===2 ? "rgba(34,197,94,0.8)" : "rgba(255,255,255,0.3)",
        background: i===2 ? "rgba(34,197,94,0.1)" : "transparent",
        borderRadius:"3px",
        marginBottom:"1px"
      }}>{p}</div>
    ))}
  </div>
  {/* Mini calendar */}
  <div style={{ flex:1 }}>
    {/* Month nav + grid */}
  </div>
</div>
```

## Size Reference

| Element | Full-size (WRONG) | Miniature (CORRECT) |
|---------|-------------------|---------------------|
| Variant card width | 300-400px | 100-160px |
| Calendar cell | 26-32px | aspect-ratio square, no fixed px |
| Day text in cells | 9-12px with numbers | NO TEXT, just colored squares |
| Month nav text | 10-12px | 7px |
| Input text | 10-12px | 9px |
| Icons | 13-16px | 8-11px |
| Card padding | 14-20px | 8-10px |
| Overall wireframe height | 200-350px | 80-150px |
| Variants per row | 1 (stacked) | 3 side by side |

## The Self-Check

Before rendering any wireframe, verify:
1. Are all variant cards in a SINGLE ROW (flex-wrap)?
2. Is each card narrower than 160px?
3. Do calendar cells have NO numbers/text inside?
4. Does the whole wireframe fit in ~120px height?
5. Does it look like a SKETCH, not a finished UI?

If any answer is NO, the wireframe is too large. Shrink it.
