# Icon

## Descripción general

Icon es el primitivo visual que encapsula un SVG gráfico escalable dentro de un contenedor normalizado, gestionando tamaño, color y semántica de accesibilidad de forma consistente en todo el sistema de diseño. Como building block (BB), no contiene texto ni interacción propia — vive siempre dentro de un componente host (Button, Alert, NavItem). Su rol principal es garantizar que el mismo glyph sea pixel-perfect en cada tamaño, adopte el color del contexto circundante por defecto, y declare correctamente su naturaleza informativa o decorativa a los lectores de pantalla.

```
┌─────────────────────────────────────────────────────────────┐
│                          Icon                               │
│                                                             │
│   ┌────────────────────────────────────────────────────┐    │
│   │                                                    │    │
│   │                  [svg glyph]                       │    │
│   │                                                    │    │
│   └────────────────────────────────────────────────────┘    │
│                                                             │
│   xs:12px  sm:16px  md:20px  lg:24px  xl:32px              │
└─────────────────────────────────────────────────────────────┘
```

Icon es un building block puro — no genera variantes propias de layout. El componente host (Button, Alert, Badge) determina la posición, el gap y el contexto semántico. El gap icon↔texto siempre es 8px.

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size   → xs (12px) | sm (16px) | md (20px) | lg (24px) | xl (32px)
Style  → outlined | filled | two-tone
Tone   → inherit | primary | secondary | subdued | success | warning | critical | info
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
(ninguno — Icon no tiene partes opcionales)
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────┐
│  Icon                               │
│  ─────────────────────────────────  │
│  Size       [ md (20px)        ▼ ]  │
│  Style      [ outlined         ▼ ]  │
│  Tone       [ inherit          ▼ ]  │
│  ─────────────────────────────────  │
│  🔄 Glyph   [ icon/placeholder ▼ ]  │
└─────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar un símbolo gráfico?
           │
           ▼
    ¿El SVG está en el icon set?
     ┌──── Sí ────┐       ┌── No ──┐
     ▼             ▼       ▼        ▼
 [Decorativo]  [Infmtvo] Ilustración Imagen
  aria-hidden   aria-label > Illustration > Image
  en parent     en Icon
```

**Usar Icon cuando:**
- Se necesita un símbolo de acción, estado o navegación del icon set del sistema
- El ícono acompaña texto o está dentro de un botón/link con label propio
- Se necesita comunicar estado semántico con color (success/warning/critical/info)
- El glyph debe cambiar entre outlined → filled según estado activo (patrón iOS BottomNav)

**NO usar Icon cuando:**
- La imagen es ilustrativa o fotográfica → usar `Image` o `Illustration`
- El glyph necesita proporciones no cuadradas → usar `Image` con SVG
- Se necesita un loader/spinner → usar `Spinner` (Icon.spin no es suficiente)
- El contexto requiere un pictograma (≥64px) → usar `Pictogram` si existe

---

## Variaciones visuales

### Por Size

| Size | Píxeles | Uso típico |
|------|---------|-----------|
| xs   | 12px    | Badges compactos, chips, hints en formularios |
| sm   | 16px    | Texto body inline (14–16px), botones sm |
| md   | 20px    | Botones md (40px alto), menús, listados |
| lg   | 24px    | Navegación principal, headers, botones lg |
| xl   | 32px    | Avatares icon-only, estados vacíos, marketing |

### Por Style

| Style     | Uso recomendado |
|-----------|----------------|
| outlined  | Default — uso general, estados inactivos |
| filled    | Estados activos, seleccionados (patrón iOS/Fluent) |
| two-tone  | Status icons con relleno secundario (patrón Ant/Atlassian) |

### Por Tone

| Tone      | Color resultante | Caso de uso |
|-----------|-----------------|-------------|
| inherit   | currentColor    | Icon dentro de texto/botón — hereda el color del parent |
| primary   | text/primary (#121212) | Icon standalone sin contexto de color |
| secondary | text/secondary (#6B7280) | Info secundaria, metadata |
| subdued   | text/subtlest (#8C8C96) | Hints, placeholders |
| success   | status/success/fg (#159238) | Confirmación, OK |
| warning   | status/warning/fg (#B87A0D) | Advertencia |
| critical  | status/error/fg (#DC2626) | Error, destructivo |
| info      | status/info/fg (#2659EB) | Informativo neutral |

---

## Decisiones de diseño

**1. 5 tamaños alineados con `foundations.iconSizes`** — Carbon tiene 4 (16/20/24/32); Polaris tiene 2 (minor/major); Spectrum tiene 4 (S/M/L/XL). Se eligieron 5 tamaños para cubrir el rango completo de las foundations (xs=12 para badges compactos, xl=32 para estados vacíos). Cada tamaño usa SVG optimizado a esa grilla — no escalado — para preservar pixel-perfection (patrón Carbon/Primer).

**2. 3 Styles: outlined / filled / two-tone** — outlined es el default universal. filled sigue el patrón iOS/Fluent2 donde el ícono activo se "rellena" (BottomNav, tabs). two-tone cubre status icons con relleno secundario (Ant Design, Atlassian). En Figma, Style es una propiedad de variante — no un componente separado (a diferencia de Ant que nombra el componente: `HeartOutlined`/`HeartFilled`).

**3. Tone=inherit como default (patrón Spectrum/Polaris)** — `currentColor` es el default más robusto: el icon adopta el color del texto circundante sin configuración manual. Esto es crítico para buttons, links y alerts donde el color ya está definido por el componente host. Los 7 tones semánticos cubren casos standalone donde el icon debe comunicar significado por sí solo.

**4. Decorativo por default (patrón Carbon/Polaris)** — `aria-hidden="true"` por defecto. El contexto semántico lo provee el parent (Button tiene `aria-label`, Alert tiene su propio role). Solo cuando el icon es standalone e informativo se requiere `role="img"` + `aria-label`. Ant Design hace lo opuesto (todo es informativo por defecto) generando ruido en SR — se evita ese patrón.

### Combinaciones excluidas

```
Style=two-tone + Tone=secondary  → ✗ two-tone tiene 2 colores propios; Tone solo aplica al primary
Style=two-tone + Tone=subdued    → ✗
Style=two-tone + Tone=success    → ✗
Style=two-tone + Tone=warning    → ✗
Style=two-tone + Tone=critical   → ✗
Style=two-tone + Tone=info       → ✗
─────────────────────────────────────────────────────────
Permitido: Style=two-tone + Tone=inherit  ✓ (usa colores del glyph nativo)
           Style=two-tone + Tone=primary  ✓ (aplica primary al trazo principal)
```

---

## Comportamiento

### Esencial para diseño

- **Gap icon↔texto: siempre 8px** — constante del sistema, independiente del Size del icon o del tamaño del texto.
- **Tamaño siempre cuadrado** — width = height = el valor del Size. No existen íconos rectangulares en el sistema.
- **Swap en Figma vía instance-swap** — el layer `svg` es el único slot; el diseñador elige el glyph con "🔄 Glyph" en el panel. El contenedor mantiene tamaño fijo.
- **filled = estado activo** — los componentes host cambian Style de outlined → filled para indicar selección (NavItem, Tab, BottomBar). Esto se implementa en el componente host, no en Icon standalone.
- **two-tone solo con primaryColor/secondaryColor** — en Figma, two-tone expone dos fills en el layer SVG. Tone solo afecta el fill primario.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Icon decorativo (default) | ninguno | `aria-hidden="true"` | El parent (Button, Alert) ya provee contexto; duplicar el nombre genera ruido en SR |
| Icon informativo standalone | `img` | `role="img"` + `aria-label="[descripción]"` | Sin label, el SR lee el nombre del archivo/glyph, que es ininteligible |
| Icon dentro de button icon-only | ninguno | `aria-hidden="true"` | El button parent tiene `aria-label`; el icon no debe anunciar nada adicional |
| Icon interactivo wrapped | ninguno | El parent interactive maneja focus | Icon nunca es focusable por sí solo |

### Navegación por teclado

Primary interactions (afectan diseño):

```
Icon no es focusable standalone — no hay keyboard interactions propias.
El parent interactive (Button, Link) maneja foco y activación.
```

Secondary interactions (referencia dev):

```
Si Icon está dentro de un button: Tab → focus en button; Enter/Space → activa button
Si Icon está dentro de un link: Tab → focus en link; Enter → navega link
Standalone icon informativo (role="img"): no es focusable (imágenes no son interactivas)
```

---

## Guía de contenido

**Glyphs:**
- El nombre del glyph debe ser una descripción del concepto, no de la forma: `search`, `add`, `chevron-right` (no `magnifying-glass`, `plus-sign`, `arrow`)
- Para icons informativo-only: `aria-label` debe describir la acción o significado, no el glyph: `aria-label="Buscar"` (no `aria-label="Lupa"`)
- Para íconos de estado: el color (Tone) nunca es el único diferenciador — siempre acompañar con texto o `aria-label` descriptivo

**Tamaño vs. contexto:**
- No usar xl (32px) dentro de texto body — rompe el ritmo tipográfico
- No usar xs (12px) como icon standalone sin texto — demasiado pequeño para ser legible como control independiente
- md (20px) es el tamaño universal para la mayoría de UI components a altura 40px

---

## Pre-build checklist

```
□ ¿El glyph existe en el icon set del sistema?
□ ¿El Size es apropiado para el contexto del componente host?
□ ¿Style=filled está reservado solo para estados activos?
□ ¿Tone=inherit para icons dentro de buttons/links con color propio?
□ ¿Si Style=two-tone, Tone es primary o inherit (no semantic)?
□ ¿Icons decorativos tienen aria-hidden en el componente host?
□ ¿Icons standalone informativos tienen role="img" + aria-label?
□ ¿El gap icon↔texto es 8px constante?
□ ¿No se está usando Icon para ilustraciones o fotografías?
□ ¿El icon set tiene el glyph en todos los sizes que se necesitan?
```

---

## Componentes relacionados

```
Button          → usa Icon sm/md; gap 8px; icon siempre decorativo (button tiene aria-label)
Link            → usa Icon sm; gap 8px; icon decorativo
Badge           → usa Icon xs/sm; icon siempre decorativo
Alert           → usa Icon md/lg; Tone coincide con Alert variant (success/warning/critical/info)
Avatar          → usa Icon md/lg en fallback icon-only mode
NavItem         → usa Icon md/lg; Style=outlined→filled al seleccionar
Tab             → usa Icon sm/md; Style toggle outlined↔filled
Tooltip         → wrappea Icon standalone informativo para proveer label visible
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Tamaños | Estilos | Tono/Color | A11y default | Diferenciador |
|---------|---------|---------|-----------|--------------|--------------|
| **Material Design 3** | 20/24/40/48dp (optical size axis) | Outlined/Rounded/Sharp (fuentes separadas) | currentColor | aria-hidden manual | Variable font con 4 ejes (fill/weight/grade/size) — una fuente para todo |
| **Spectrum (Adobe)** | S/M/L/XL fijos | Workflow vs. product (librerías separadas) | currentColor default | aria-hidden si no hay alt | alt prop auto-aplica role="img" + aria-label |
| **Carbon (IBM)** | 16/20/24/32 (SVG size-specific) | Outlined + Pictograms (paquete separado) | CSS fill / currentColor | aria-hidden default | SVG optimizado por tamaño; tree-shakeable imports |
| **Polaris (Shopify)** | minor (20px) / major (24px) | Curated ~300 | tone prop → semantic tokens | aria-hidden si no hay accessibilityLabel | Dev warning si falta a11y label; tones semánticos |
| **Atlassian** | small (16px) / medium (24px) | Outlined + TwoTone (primaryColor/secondaryColor) | CSS fill | label="" → decorativo; label="texto" → informativo | Label required fuerza decisión a11y explícita |
| **Ant Design** | fontSize CSS (sin size prop) | Outlined/Filled/TwoTone (componentes separados) | style.color | role="img" por defecto (ruido en SR) | Theme-as-component-name (HeartOutlined / HeartFilled / HeartTwoTone) |
| **Twilio Paste** | sizeIcon10–sizeIcon110 (tokens) | Un estilo por icon | color prop / parent | decorative prop: true → aria-hidden | Prop `decorative` binario: false sin title → runtime error |
| **Lightning (Salesforce)** | xx-small → large | SLDS sprite sheets (utility/standard/action/doctype/custom) | variant prop | alternative-text requerido | Sprite sheets HTTP request único; web component |
| **Primer (GitHub)** | 16px / 24px (size-specific SVGs) | Octicons ~500 | CSS fill | aria-label opcional | Pixel-grid estricto; tamaños separados optimizados |
| **shadcn/ui** | size/strokeWidth props (Lucide) | BYO — usa Lucide React | color prop | Manual | No incluye icon set — delega a Lucide; composición libre |
| **Radix UI** | 15px grid (único) | ~300 icons SVG components | SVG props | Manual | 15px grid único; sin wrapper, cada icon es componente standalone |
| **Chakra UI** | boxSize | createIcon factory | color + colorMode | Manual | createIcon de SVG path; `as` prop acepta terceros |
| **Fluent 2 (Microsoft)** | 16/20/24/28/32/48px (size-specific) | Regular/Filled/Light + bundleIcon | CSS fill | aria-hidden default | bundleIcon combina Regular+Filled para toggle de estado sin lógica en consumer |
| **Gestalt (Pinterest)** | 12/14/16/24/32px | ~100+ curated | color → design tokens | accessibilityLabel required (prop types) | Prop types enforced: sin label → error |
| **Mantine** | size/stroke (Tabler Icons) | BYO — usa Tabler Icons | color prop | Manual | 5000+ Tabler Icons; sin wrapper propio; documentado como patrón |
| **Base Web (Uber)** | size prop | ~150 built-in | color prop | title prop → `<title>` en SVG | Overrides pattern para SVG internals; title SVG-nativo |
| **GOV.UK** | Curated mínimo ~30 | Un estilo | fill heredado | aria-hidden; texto siempre requerido | Política estricta: icon standalone sin texto = anti-patrón documentado |
| **Orbit (Kiwi)** | small/medium/large | Travel-domain icons | color → Orbit tokens | ariaHidden default | Icons de dominio viaje (aeropuertos, asientos, boarding) |
| **Evergreen (Segment)** | number (default 16) | ~300 SVG paths inline | color string | Manual | API mínima; SVG paths inline sin componente wrapper |
| **Nord (Nordhealth)** | s/m/l | Healthcare context icons | design tokens | label attr → role="img" | Web component; iconos de dominio clínico |

**Patrones clave de la industria:**
1. **Decorativo por default** (Carbon, Polaris, Fluent 2, Paste) — el estándar moderno. Ant Design va en contra (todo informativo por defecto) y genera ruido SR.
2. **filled = estado activo** — iOS, Fluent 2 (`bundleIcon`), y la mayoría de apps de navegación móvil usan este patrón. Fluent 2 lo formaliza con `bundleIcon`.
3. **currentColor como default** — Spectrum, Polaris y casi todos los sistemas modernos adoptan herencia de color. Reduce configuración manual en componentes host.
4. **SVG size-specific** — Carbon (4 sizes) y Primer (2 sizes) optimizan el path data por tamaño. Variable font de M3 logra lo mismo continuamente con optical size axis.

---

## Tokens

**14 tokens** · prefijo `icn-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `icn-size-xs` | `iconSize/xs` | Tamaño 12px — badges, chips compactos |
| `icn-size-sm` | `iconSize/sm` | Tamaño 16px — inline con texto body |
| `icn-size-md` | `iconSize/md` | Tamaño 20px — buttons md, menús |
| `icn-size-lg` | `iconSize/lg` | Tamaño 24px — navegación, headers |
| `icn-size-xl` | `iconSize/xl` | Tamaño 32px — estados vacíos, avatares |
| `icn-inherit-fg` | `text/currentColor` | Tone=inherit — hereda color del parent |
| `icn-primary-fg` | `text/primary` | Tone=primary — icon standalone principal |
| `icn-secondary-fg` | `text/secondary` | Tone=secondary — info secundaria |
| `icn-subdued-fg` | `text/subtlest` | Tone=subdued — hints, placeholders |
| `icn-success-fg` | `status/success/fg` | Tone=success — confirmación, OK |
| `icn-warning-fg` | `status/warning/fg` | Tone=warning — advertencia |
| `icn-critical-fg` | `status/error/fg` | Tone=critical — error, destructivo |
| `icn-info-fg` | `status/info/fg` | Tone=info — informativo neutral |

### Especificaciones de espaciado

```
┌─────────────────────────────────────────────────────────────┐
│  Size → contenedor siempre cuadrado                         │
│                                                             │
│  xs:  [ 12×12px ]                                           │
│  sm:  [ 16×16px ]                                           │
│  md:  [ 20×20px ] ← default                                 │
│  lg:  [ 24×24px ]                                           │
│  xl:  [ 32×32px ]                                           │
│                                                             │
│  Gap icon↔texto: 8px (constante — no varía con Size)        │
│                                                             │
│  Ejemplo Button md:                                         │
│  ┌──────────────────────────────────────────┐               │
│  │  [Icon md 20px]  8px  [Label texto]      │  h:40px       │
│  └──────────────────────────────────────────┘               │
│   px:12px                              px:12px              │
└─────────────────────────────────────────────────────────────┘

Frames totales: 5 (Size) × 3 (Style) × 8 (Tone) = 120 brutos
Exclusiones: −18 (Style=two-tone + 6 tones incompatibles)
Frames netos: 102
```
