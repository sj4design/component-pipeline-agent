# Pagination

## Overview

El Pagination es una barra horizontal de controles para navegar entre páginas de contenido paginado. Contiene botones Previous/Next, botones de página numerados con ellipsis para rangos grandes, y slots opcionales para total display, selector de tamaño de página y quick jumper.

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │ 1-10 of 100 │ 10 per page ▼ │  ◀  │ 1 │ 2 │ 3 │ ··· │ 10 │  ▶  │ Go to ___
  └──────────────────────────────────────────────────────────────────────┘
    total display   size changer    prev  page buttons (ellipsis)  next  quick jumper
    (toggle)        (toggle)                                             (toggle)
```

Tiene dos piezas: el **Pagination** (barra contenedora con controles) y el **.PageButton** (botón de página individual con estados propios e IsCurrent para la página activa).

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  Size          sm · md · lg                              Tamaño de botones
```

Sub-componente .PageButton:

```
  State         default · hover · focus · pressed · disabled    Interacción
  IsCurrent     false · true                                     Página activa
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Show Total        "1-10 of 100" texto de rango                    8/20 consenso
  ☐ Size Changer      Select de rows-per-page                          6/20 consenso
  ☐ Quick Jumper       Input "Go to page"                              3/20 consenso
```

### Panel de propiedades en Figma

```
┌─ Pagination ─────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ Size                    ▼ md   │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Show Total     ☐ Size Changer     │
│  ☐ Quick Jumper                      │
│                                      │
│  Text Properties                     │
│  ✏️ Total Text  [ 1-10 of 100   ]   │
│                                      │
└──────────────────────────────────────┘

┌─ .PageButton ────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ State  ▼ def.. │ │ IsCurrent ▼  │ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Text Properties                     │
│  ✏️ Page Label  [ 1             ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
  ¿Cómo se navega por el dataset?
  │
  ├─ Dataset con total conocido, saltar a páginas → Pagination ✓
  │
  ├─ Scroll infinito / feed continuo → Load More button o infinite scroll
  │
  ├─ Cursor-based API sin total → Prev/Next simple (Polaris pattern)
  │
  ├─ Contenido secuencial (artículos) → Block pagination (GOV.UK)
  │
  └─ Dataset pequeño (< 25 items) → no paginar, mostrar todo
```

**Usa Pagination cuando:**
- El dataset tiene un total conocido y es > 25 items
- El usuario necesita saltar a páginas específicas
- Es una tabla de datos, resultados de búsqueda o listado paginado

**NO uses Pagination cuando:**
- El dataset es pequeño (< 25 items) → mostrar todo
- Es un feed infinito (social, noticias) → infinite scroll o Load More
- La API es cursor-based sin total → usa Prev/Next simple
- Es contenido secuencial (capítulos, pasos) → usa block pagination o Stepper

---

## Variaciones visuales

### Pattern estándar (numerado)

```
  ┌─────────────────────────────────────────────────┐
  │  ◀  │ 1 │ 2 │ [3] │ ··· │ 8 │ 9 │ 10 │  ▶    │
  └─────────────────────────────────────────────────┘
       prev  pages   active  ellipsis          next
```

### Pattern simple (solo prev/next)

```
  ┌───────────────────────────────┐
  │  ◀ Previous  │  Next ▶       │
  └───────────────────────────────┘
```

### Pattern enterprise completo

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │ 1-10 of 100 │ 10 per page ▼ │  ◀  │ 1 │ 2 │ ··· │ 10 │  ▶  │ Go to ___
  └──────────────────────────────────────────────────────────────────────┘
```

### Tamaños

```
  sm (32px)    ◀  1  2  [3]  ···  10  ▶      filtros, dashboards densos
               font 12px · button 32x32px

  md (40px)    ◀  1  2  [3]  ···  10  ▶      uso general (default)
               font 14px · button 40x40px

  lg (48px)    ◀  1  2  [3]  ···  10  ▶      mobile, touch-friendly
               font 16px · button 48x48px
```

### Estados del .PageButton

```
  default              hover                active (IsCurrent=true)
  ┌────┐               ┌────┐               ┌────┐
  │ 3  │               │ 3  │               │ 3  │  ← bg azul + fg blanco
  └────┘               └────┘               └────┘
  sin bg                bg gris sutil        bg brand

  focus                 disabled
  ╔════╗               ┌╌╌╌╌┐
  ║ 3  ║               ╎ ◀  ╎  ← prev en página 1
  ╚════╝               └╌╌╌╌┘
  ring 2px azul         opacity 50%
```

---

## Decisiones de diseño

### 1. IsCurrent como variante en .PageButton, no boolean

La página activa cambia bg (brand) + fg (blanco) — un cambio estructural que afecta 2+ propiedades visuales. Esto justifica variante sobre boolean según las reglas de clasificación de propiedades. IsCurrent=true + IsCurrent=false son dos estados visuales fundamentalmente diferentes.

### 2. Page size selector y quick jumper como booleans opcionales

Solo 6/20 sistemas integran el selector de tamaño de página (Carbon, Ant). Solo 3/20 tienen quick jumper (Ant, Mantine). Son features enterprise que no tienen sentido en todas las apps. Booleans off por default — apps enterprise los activan según necesidad.

### 3. Ellipsis para rangos grandes

14/20 sistemas implementan ellipsis cuando hay más de ~7 páginas. El patrón "1 2 3 ... 8 9 10" escala la UI sin importar el page count. Los ellipsis son `aria-hidden` — decoración visual, no interactivos.

### 4. Previous disabled en página 1, Next disabled en última

16/16 sistemas con botones de navegación los deshabilitan en los extremos. Es feedback inmediato de límites del dataset. No hay excepción ni debate — es universal.

### 5. Semántica de botón en Figma

Primer y Cedar usan links con URLs (?page=2) para SEO. Carbon y Ant usan buttons para client-side. En Figma el visual es idéntico — el desarrollador decide link vs button en código. Documentamos como botones.

### Combinaciones excluidas

```
  disabled + hover/focus/pressed       disabled bloquea interacción (16/16 universal)
  IsCurrent=true + disabled            la página actual nunca está disabled
```

---

## Comportamiento

### Lo esencial para diseñar

1. **Previous disabled en página 1, Next disabled en última.** 16/16 sistemas coinciden. Es la señal más básica de "estás en el límite".

2. **`aria-current="page"` en la página activa.** El único atributo ARIA que comunica "estás aquí" en paginación. 16/16 sistemas con botones numerados lo usan.

3. **Ellipsis no son interactivos.** Los "..." son decoración visual (`aria-hidden`), no botones. Algunos sistemas expanden in-place al hacer click, pero eso es comportamiento runtime.

4. **Touch target >= 44x44px.** Botones de página deben cumplir recomendación táctil. En size sm, asegurar que el padding invisible llegue a 44x44 touch target.

5. **Carbon recomienda máximo 100 páginas visibles.** Para datasets con cientos de páginas, el quick jumper es más eficiente que scrollear a través de botones numerados.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por qué importa |
|-------|-----|-----------|-----------------|
| Container | `navigation` | `aria-label="Pagination"` | SR identifica como navegación de paginación |
| Page button | `button` | `aria-label="Page N"`, `aria-current="page"` | SR anuncia número de página y si es actual |
| Previous | `button` | `aria-label="Previous page"` | SR anuncia dirección, no solo "Previous" |
| Next | `button` | `aria-label="Next page"` | SR anuncia dirección |
| Ellipsis | — | `aria-hidden="true"` | SR no anuncia decoración |
| Size changer | `select` | `aria-label="Items per page"` | SR anuncia propósito del select |

### Navegación por teclado

Interacciones principales (afectan el diseño):

```
  Tab                   navega entre prev, page buttons, next
  Enter / Space         activa el botón de página
```

Interacciones secundarias (referencia para dev):

```
  Tab continuo          sale de pagination al siguiente elemento de la página
  Quick jumper          Tab al input, escribir número, Enter para navegar
```

---

## Guía de contenido

**Total display:** Formato "1-10 of 100" o "Mostrando 1-10 de 100 resultados". Ser explícito con el rango y el total.

**Page buttons:** Solo números. "1", "2", "3" — no "Página 1".

**Previous/Next:** Texto o ícono. Si es solo ícono (◀ ▶), agregar `aria-label` descriptivo. Si es texto + ícono: "← Previous", "Next →".

**Size changer label:** "10 per page", "Mostrar 25" — indicar que es por página.

**Quick jumper:** "Go to page" o "Ir a página" con input numérico. Validar rango y mostrar error si es fuera de límites.

---

## Checklist antes de construir

```
  ☐ ¿El dataset tiene total conocido?
    └─ Si no → usar mode simple (solo prev/next)

  ☐ ¿Cuántas páginas posibles?
    └─ Más de 7 → ellipsis se activará automáticamente
    └─ Más de 100 → considerar quick jumper

  ☐ ¿El usuario cambia rows-per-page?
    └─ Si sí → activar Size Changer

  ☐ ¿Necesita mostrar total?
    └─ Si sí → activar Show Total con formato "1-10 of N"

  ☐ ¿Qué tamaño?
    └─ sm = dashboard denso · md = general · lg = mobile

  ☐ ¿Es mobile/touch?
    └─ Verificar touch targets >= 44x44px
    └─ Considerar mode simple (solo prev/next)
```

---

## Relación con otros componentes

```
  Table          Pagination vive debajo de la tabla como control de navegación
  Select         Reutilizado como Size Changer (rows per page)
  Input          Reutilizado como Quick Jumper (go to page)
  Button         Los page buttons comparten tokens con Button
  Load More      Alternativa para feeds infinitos sin paginación numerada
```

---

## Referencia: cómo lo hacen otros sistemas

**Enterprise completo (todos los features):**
- Carbon: page size selector integrado + `pagesUnknown` mode + skeleton loading.
- Ant Design: `showQuickJumper` + `showSizeChanger` + `showTotal` + `responsive` auto-switch.

**Minimalista (solo prev/next):**
- Polaris: cursor-based API, sin números. `hasPrevious`/`hasNext` booleans.
- Lightning: solo arrows + indicador de página.
- GOV.UK: block mode con títulos de sección ("Previous: How to apply").

**Link-based (SEO):**
- Primer: cada página es una URL navegable (?page=2). Compartible y back-button friendly.
- Cedar: Vue + URL-based.

**Consenso universal (20/20):**
- `<nav aria-label="Pagination">`
- `aria-current="page"` en página activa
- Previous/Next siempre presentes
- Disabled en extremos (primera/última página)

---

## Tokens

**20 tokens** · prefijo `pgn-` · 3 capas (primitivo → semántico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--pgn-btn-bg` | `bg/surface/default` | Fondo del page button (default) |
| `--pgn-btn-bg-hover` | `bg/surface/hover` | Page button en hover |
| `--pgn-btn-bg-pressed` | `bg/surface/pressed` | Page button presionado |
| `--pgn-btn-bg-current` | `interactive/default` | Fondo de página activa (brand) |
| `--pgn-btn-fg` | `text/label` | Texto del page button |
| `--pgn-btn-fg-current` | `text/inverse` | Texto de página activa (blanco) |
| `--pgn-btn-fg-disabled` | `text/disabled` | Botón deshabilitado |
| `--pgn-focus-ring` | `border/focus` | Focus ring (2px) |
| `--pgn-arrow-fg` | `text/label` | Color de prev/next arrows |
| `--pgn-arrow-fg-disabled` | `text/disabled` | Arrows deshabilitados |
| `--pgn-ellipsis-fg` | `text/subtlest` | Color de los "..." |

### Specs de spacing

```
  ┌─ pagination ───────────────────────────────────────────┐
  │                                                        │
  │  [◀] ←4→ [1] ←4→ [2] ←4→ [3] ←4→ [···] ←4→ [10] ←4→ [▶]
  │                                                        │
  └────────────────────────────────────────────────────────┘

  button size por tamaño:  sm = 32x32 · md = 40x40 · lg = 48x48
  gap entre botones:       sm = 4px · md = 4px · lg = 8px
  button padding:          sm = 6/8 · md = 8/12 · lg = 12/16
  button radius:           sm = 6 · md = 8 · lg = 8
  font-size:               sm = 12 · md = 14 · lg = 16
  focus ring:              2px offset 2px
```
