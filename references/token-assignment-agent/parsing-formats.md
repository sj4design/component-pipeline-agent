# Token File Parsing Formats

> How to detect and parse each supported token format.

## Format detection

```
1. File extension:
   .json → JSON (Style Dictionary, Token Studio, or Figma export)
   .css  → CSS Custom Properties
   .scss → SCSS Variables
   .yaml / .yml → YAML
   .tokens.json → Token Studio specific

2. Content detection (if extension is ambiguous):
   Contains "value" + "type" keys → Style Dictionary JSON
   Contains "$value" + "$type"   → DTCG format (W3C draft)
   Contains "collections" + "modes" → Figma Variables export
   Contains "--" prefix lines     → CSS Custom Properties
   Contains "$" prefix lines      → SCSS Variables
   Contains indented key: value   → YAML
```

## JSON — Style Dictionary format

```json
{
  "color": {
    "blue": {
      "500": {
        "value": "#3B82F6",
        "type": "color"
      }
    }
  },
  "component": {
    "datepicker": {
      "input": {
        "border": {
          "value": "{color.border.interactive}",
          "type": "color"
        }
      }
    }
  }
}
```

### Parsing rules

```
1. Walk the nested structure recursively
2. Leaf nodes have "value" and optionally "type"
3. Build token name from path: color.blue.500
4. Detect references: values starting with "{" are aliases
5. If alias → token is semantic or component layer
6. If raw value (hex, px) → token is primitive layer
```

## JSON — DTCG (W3C Design Token Community Group)

```json
{
  "color": {
    "blue": {
      "500": {
        "$value": "#3B82F6",
        "$type": "color"
      }
    }
  }
}
```

### Parsing rules

```
Same as Style Dictionary but keys prefixed with "$"
$value → value, $type → type, $description → description
```

## JSON — Figma Variables export

```json
{
  "collections": [
    {
      "name": "Primitives",
      "modes": ["Light", "Dark"],
      "variables": [
        {
          "name": "color/blue/500",
          "type": "COLOR",
          "values": {
            "Light": "#3B82F6",
            "Dark": "#60A5FA"
          }
        }
      ]
    }
  ]
}
```

### Parsing rules

```
1. Iterate collections → each is likely a layer
2. Collection named "Primitives" / "Base" / "Global" → primitive layer
3. Collection named "Semantic" / "Alias" / "Theme" → semantic layer
4. Collection named component name → component layer
5. Variable "name" uses "/" separator (Figma convention)
6. Convert "/" to "-" for CSS naming
7. Multi-mode support: extract all modes for theme mapping
```

## CSS Custom Properties

```css
:root {
  /* Primitives */
  --color-blue-500: #3B82F6;
  --color-neutral-100: #F3F4F6;

  /* Semantic */
  --color-bg-primary: var(--color-neutral-100);
  --color-border-focus: var(--color-blue-500);

  /* Component */
  --dp-input-border: var(--color-border-default);
  --dp-input-border-focus: var(--color-border-focus);
}
```

### Parsing rules

```
1. Extract lines matching: --[name]: [value];
2. If value is var(--...) → alias (semantic or component)
3. If value is raw (hex, px, rem) → primitive
4. Detect naming convention from prefixes
5. Group by prefix to identify components
```

## SCSS Variables

```scss
// Primitives
$color-blue-500: #3B82F6;

// Semantic
$color-bg-primary: $color-neutral-100;

// Component
$dp-input-border: $color-border-default;
```

### Parsing rules

```
Same as CSS but:
  - Prefix is "$" instead of "--"
  - References use "$" not "var(--...)"
  - Convert "$" to "--" for output
```

## YAML

```yaml
color:
  blue:
    500:
      value: "#3B82F6"
      type: color
  bg:
    primary:
      value: "{color.neutral.100}"
      type: color
```

### Parsing rules

```
1. Walk nested structure (same logic as JSON)
2. Leaf nodes have "value" key
3. Build token name from path
4. Detect references by "{" prefix
```

## Layer detection algorithm

```
For ANY format, after parsing all tokens:

1. Tokens with raw values (hex, px, rem, ms) AND no component name
   → PRIMITIVE layer

2. Tokens with alias values AND generic intent names
   (bg-primary, border-focus, text-secondary)
   → SEMANTIC layer

3. Tokens with component name in the path
   (datepicker, button, input prefix)
   → COMPONENT layer

Report: "Found N tokens: X primitives, Y semantic, Z component.
         Naming convention: [pattern]. Missing layers: [list]."
```

---
_Reference for Token Assignment Agent · File parsing_
