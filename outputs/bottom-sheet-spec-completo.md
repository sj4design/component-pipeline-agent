# BottomSheet — Especificación Completa

## Descripción general

Overlay móvil que aparece desde el borde inferior de la pantalla con puntos de snap progresivos: peek (collapsed), half-expanded y expanded. Disponible en dos variantes: modal (con scrim y focus trap, bloquea interacción con el fondo) y standard (coexiste con el contenido, sin scrim). Componente mobile-first — reemplazado por Modal o Drawer en desktop.

### Wireframe estructural

**BottomSheet (Variant=modal, State=half-expanded, Size=md):**
```
┌────────────────────────────────────────────────────────┐
│                    ░░░ scrim ░░░                       │
│                                                        │
│                                                        │
╔════════════════════════════════════════════════════════╗
║                ────────                               ║  ← drag handle (pill)
╠════════════════════════════════════════════════════════╣
║  Título                                    [✕]       ║  ← header
╠════════════════════════════════════════════════════════╣
║                                                       ║
║  Contenido scrollable                                 ║  ← content (50% alto)
║  ...                                                  ║
║                                                       ║
╠════════════════════════════════════════════════════════╣
║  [Cancelar]               [Confirmar]                 ║  ← footer (sticky)
╚════════════════════════════════════════════════════════╝
```

**States visuales:**
```
Collapsed (peek):     ┌─────────────┐ ← solo peek 160px
                      │ Handle      │
                      │ Quick info  │
                      └─────────────┘ (sin footer)

Half-expanded:        ┌─────────────┐ ← 50% viewport
                      │ Contenido   │
                      │ ...         │
                      └─────────────┘

Expanded:             ┌─────────────┐ ← 85% viewport
                      │ Contenido   │   (scroll dentro)
                      │ full height │
                      └─────────────┘
```

**Anatomía de slots:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `dragHandle` | shape | No | Pill drag handle en top (M3 pattern) |
| `header` | container | No | Título + botón cerrar |
| `content` | container | Sí | Contenido scrollable |
| `footer` | container | No | Botones de acción sticky |
| `scrim` | shape | No | Backdrop overlay (solo modal) |

### Properties y valores

| Property | Valores |
|----------|---------|
| **Variant** | `modal` · `standard` |
| **State** | `collapsed` · `half-expanded` · `expanded` |
| **Size** | `sm` · `md` · `lg` |

**Frame count:** Variant(2) × State(3) × Size(3) = 18 − 6 exclusiones = **12 frames**

**Exclusiones:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Variant=standard + scrim visible` | Standard es non-modal, no bloquea background |
| `State=collapsed + footer visible` | En collapsed solo se muestra el peek — sin footer |

### Panel de Figma

| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Variant | Variant | modal / standard |
| State | Variant | collapsed / half-expanded / expanded |
| Size | Variant | sm / md / lg |
| 👁 Show Drag Handle | Boolean | true/false |
| 👁 Show Header | Boolean | true/false |
| 👁 Show Footer | Boolean | true/false |

---

## Cuándo usar

**Usar BottomSheet cuando:**
- El dispositivo es mobile (viewport < 768px)
- Se necesita mostrar contenido parcial con opción de expandir (progressive disclosure)
- El contexto permite que el contenido siga siendo visible detrás (standard) o que el usuario se enfoque completamente (modal)

**Variant=modal:** Confirmación de acciones, selección de opciones críticas, formularios que requieren atención completa
**Variant=standard:** Filtros de mapa (lista de resultados mientras el mapa sigue visible), detalles de selección inline

**State=collapsed (peek):** Mostrar preview de contenido para incitar la interacción ("Ver 12 resultados")
**State=half-expanded:** Browse rápido, selección de opciones en lista
**State=expanded:** Formularios completos, detalle extenso de un elemento

**No usar BottomSheet cuando:**
- El viewport es desktop → usar Modal o Drawer lateral
- El contenido es simple y no requiere scroll → usar ActionSheet (variante simplificada)
- Solo se quiere confirmar una acción de dos opciones → usar Dialog de confirmación

---

## Variaciones visuales

### Variant=modal vs. standard

| Aspecto | modal | standard |
|---------|-------|---------|
| Scrim | Sí — `rgba(0,0,0,0.5)` | No |
| Focus trap | Sí | No |
| Interacción con fondo | Bloqueada | Permitida |
| Cerrar con tap en scrim | Sí | N/A |
| Swipe-to-dismiss | Sí | No |

### Tamaños por State

| Size | Peek (collapsed) | Half-expanded | Expanded | Drag handle W |
|------|-----------------|--------------|---------|---------------|
| `sm` | 120px | 40% viewport | 70% viewport | 40px |
| `md` | 160px | 50% viewport | 85% viewport | 48px |
| `lg` | 200px | 60% viewport | 95% viewport | 56px |

### Drag handle

Pill redondeado (radius/pill), centrado en el top de la sheet:
- Ancho: 40-56px según Size
- Alto: 4px fijo
- Color: `text/disabled` (gris neutro)
- Margin top: 8px, margin bottom: 16px
- `role="slider"` con `aria-valuenow` según estado actual

### Sheet

- Background: `surface/default` (blanco)
- Border radius: solo esquinas superiores — sm: 16px, md: 20px, lg: 24px
- Border radius bottom: 0 (flush contra el borde del viewport)
- Sombra: `elevation/4` en el borde superior

---

## Decisiones de diseño

### 1. M3 como referencia canónica

Material Design 3 es el único tier-1 design system con especificación completa de Bottom Sheet incluyendo los dos variants (modal/standard) y los tres snap points. Carbon y Polaris argumentan que mobile debe usar full-screen. Replicamos M3 porque tiene el spec más maduro y el patrón es establecido en apps nativas Android e iOS.

### 2. Tres snap points: collapsed → half-expanded → expanded

El modelo de tres puntos sigue la progressive disclosure de M3:
- **Collapsed (peek):** Muestra solo suficiente para invitar la interacción
- **Half-expanded:** Browse rápido sin comprometerse con full screen
- **Expanded:** Interacción completa

La sheet expande antes de que el contenido interno haga scroll (nested scrolling). Al llegar al snap point expandido, el contenido interno puede hacer scroll.

### 3. Drag handle como role='slider' para accesibilidad keyboard

El drag handle visual requiere un equivalente keyboard. M3 especifica `role="slider"` con `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow=[porcentaje]`. Arrow Up/Down cambia el snap point. Esto garantiza que usuarios de teclado pueden controlar la sheet.

### 4. Swipe-to-dismiss siempre tiene botón equivalente

WCAG 2.1.1: cualquier gesto debe tener un equivalente de un solo puntero o teclado. El swipe-to-dismiss siempre acompaña un botón de cierre (X en header o botón "Cancelar" en footer). No hay sheet modal sin manera de cerrarla por teclado.

### 5. Scope explícito: mobile-only

Documentar scope evita uso incorrecto en desktop. En viewports ≥768px la sheet debería transformarse en Modal centrado o Drawer lateral. Esta lógica responsiva es responsabilidad de la implementación.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Sheet modal | `role="dialog"` + `aria-modal="true"` + `aria-labelledby="[header-id]"` |
| Sheet standard | `role="region"` + `aria-label="[propósito descriptivo]"` |
| Drag handle | `role="slider"` + `aria-valuemin="0"` + `aria-valuemax="100"` + `aria-valuenow="[%]"` |
| Close button | `aria-label="Cerrar"` |
| Scrim | `aria-hidden="true"` |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Tab` (modal) | Cicla entre elementos focuseables dentro de la sheet (focus trap) |
| `Tab` (standard) | Navegación libre, sin trap |
| `Escape` (modal) | Cierra la sheet |
| `Arrow Up` en drag handle | Expande al siguiente snap point |
| `Arrow Down` en drag handle | Colapsa al snap point anterior |
| `Enter` / `Space` en drag handle | Toggle entre collapsed/expanded |

### Focus management

- **Al abrir:** Focus va al primer elemento focuseable del `content` (o al header si existe)
- **Al cerrar:** Focus retorna exactamente al trigger que abrió la sheet
- **Focus trap (modal):** Tab y Shift+Tab ciclan solo dentro de la sheet — focus nunca sale al background

### Comportamiento de scroll

1. Al hacer drag o scroll hacia arriba: si el sheet está en `collapsed` → expande a `half-expanded`
2. Si está en `half-expanded` y el usuario scrollea el contenido interno → primero expande a `expanded`
3. Solo cuando está en `expanded` el contenido interno hace scroll propio (nested scrolling)

### Animaciones

- Apertura: slide-up desde bottom, ease-out, ~300ms
- Cierre: slide-down, ease-in, ~250ms
- Cambio de snap point: spring animation (M3 pattern)
- Scrim: fade-in/out sincronizado con la sheet

---

## Guía de contenido

**Header:**
- Título breve, máximo 1 línea: "Confirmar eliminación", "Seleccionar región", "Compartir"
- Botón X siempre en el header de sheets modales que tengan header
- Si el close está en el footer como "Cancelar", el header puede omitir el X

**Drag handle:**
- No requiere texto — es un affordance visual universal en mobile
- El `aria-label` del slider puede ser "Ajustar altura del panel" para accesibilidad

**Contenido scrollable:**
- El contenido interno debe tener padding suficiente para no chocar con el borde de la sheet
- Evitar scroll horizontal — el sheet ocupa full width de viewport

**Footer:**
- Máximo 2 botones: acción primaria + cancelar/descartar
- Alineación: botón primario a la derecha, cancel a la izquierda
- Footer es sticky — siempre visible aunque el contenido haga scroll
- No mostrar en State=collapsed (excluido)

---

## Pre-build checklist

- [ ] El drag handle está centrado horizontalmente, con margin top 8px y margin bottom 16px
- [ ] Border radius solo en esquinas superiores (bottom: 0)
- [ ] Scrim solo en frames de Variant=modal
- [ ] State=collapsed + footer: verificar que la exclusión esté aplicada (0 frames con footer visible en collapsed)
- [ ] Verificar alturas proporcionales: collapsed < half-expanded < expanded para cada Size
- [ ] Sombra en el borde superior del sheet (shadow: top, no bottom)
- [ ] Probar con contenido real de 3-4 elementos de lista para verificar el state half-expanded

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Modal / Dialog** | Alternativa en desktop; misma semántica `role="dialog"` |
| **Drawer** | Overlay lateral — alternativa al BottomSheet en desktop |
| **Slider** | El drag handle usa la misma semántica ARIA de Slider |
| **Button** | Footer usa Button/primary y Button/secondary |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Variants | Snap points | Spec completo |
|---------|---------|-------------|---------------|
| **Material Design 3** | Modal + Standard | 3 (peek/half/full) | Sí — referencia canónica |
| **Ant Design Mobile** | Bottom Drawer | 2 | Parcial |
| **Atlassian** | No incluido | — | No |
| **Carbon (IBM)** | No incluido | — | No (full-screen preferido) |
| **Polaris (Shopify)** | No incluido | — | No (full-screen preferido) |
| **Spectrum (Adobe)** | No incluido | — | No |

**Consenso:** Solo M3 tiene especificación completa. Carbon y Polaris prefieren full-screen en mobile. La decisión de incluir este componente lo posiciona específicamente para apps nativas/mobile-first.

---

## Tokens y espaciado

**Prefijo:** `bs-` · **Total tokens:** 16 · **Modo:** Components

### Tokens de tamaño (peek height)

| Token | Valor DS | Uso |
|-------|----------|-----|
| `bs/sm/peek` | `sizing/120` | Alto collapsed sm |
| `bs/md/peek` | `sizing/160` | Alto collapsed md |
| `bs/lg/peek` | `sizing/200` | Alto collapsed lg |

### Tokens de presentación

| Token | Valor DS | Uso |
|-------|----------|-----|
| `bs/radius/sm` | `radius/xl` (16px) | Border radius sm |
| `bs/radius/md` | `radius/xxl` (20px) | Border radius md |
| `bs/radius/lg` | `radius/xxl` (24px) | Border radius lg |
| `bs/bg` | `surface/default` | Fondo de la sheet |
| `bs/shadow` | `elevation/4` | Sombra superior |
| `bs/scrim` | `overlay/backdrop` | Fondo scrim modal |

### Tokens del drag handle

| Token | Valor DS | Uso |
|-------|----------|-----|
| `bs/handle/bg` | `text/disabled` | Color del pill handle |
| `bs/handle/radius` | `radius/pill` | Border radius pill |
| `bs/handle/marginTop` | `spacing/2` (8px) | Margen superior |
| `bs/handle/marginBottom` | `spacing/4` (16px) | Margen inferior |

### Espaciado y proporciones

| Propiedad | sm | md | lg |
|-----------|----|----|-----|
| Peek height | 120px | 160px | 200px |
| Half-expanded | 40% viewport | 50% viewport | 60% viewport |
| Expanded | 70% viewport | 85% viewport | 95% viewport |
| Top border radius | 16px | 20px | 24px |
| Drag handle width | 40px | 48px | 56px |
| Drag handle height | 4px | 4px | 4px |
