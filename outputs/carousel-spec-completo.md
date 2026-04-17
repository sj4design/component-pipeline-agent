# Carousel — Especificación Completa

## Descripción general

Componente de rotación de slides con controles de navegación, indicadores de posición y soporte para múltiples tipos de presentación. Implementa el WAI-ARIA Carousel pattern. Compuesto por `CarouselSlide` (slide individual) y `Carousel` (contenedor con controles completos).

### Wireframe estructural

**CarouselSlide:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│          [Contenido: imagen / card / custom]         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Carousel (Type=single, Indicators=dots, Controls=both):**
```
         ┌──────────────────────────────────────────┐
    [‹]  │                                          │  [›]
         │         Slide activo                     │
         │                                          │
         └──────────────────────────────────────────┘
                     ● ○ ○ ○ ○
                   ↑ indicadores
```

**Carousel (Type=thumbnail):**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│               Imagen principal activa                │
│                                                      │
└──────────────────────────────────────────────────────┘
│ [thumb] │ [thumb] │ [thumb active] │ [thumb] │ [thumb] │
```

**Carousel (Type=multi):**
```
┌──────────┬──────────┬──────────┬──────────┐
│ Slide 1  │ Slide 2  │ Slide 3  │ Slide 4  │
│ (active) │          │          │          │
└──────────┴──────────┴──────────┴──────────┘
                  ● ○ ○ ○
```

**Anatomía de slots — CarouselSlide:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `content` | container | Sí | Imagen, card, o contenido custom |

**Anatomía de slots — Carousel:**
| Slot | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `slides` | container | Sí | N CarouselSlides |
| `prevButton` | icon-action | No | Botón slide anterior |
| `nextButton` | icon-action | No | Botón slide siguiente |
| `indicators` | container | No | Dots / lines / counter |
| `counter` | text | No | `"3 / 12"` (Atlassian pattern) |

### Properties y valores

**CarouselSlide:**
| Property | Valores |
|----------|---------|
| **State** | `default` · `active` · `transitioning` |

**Carousel:**
| Property | Valores |
|----------|---------|
| **Type** | `single` · `multi` · `hero` · `thumbnail` |
| **Indicators** | `dots` · `lines` · `counter` · `none` |
| **Controls** | `arrows` · `none` · `both` |
| **Size** | `sm` · `md` · `lg` |

**Frame counts:**
- CarouselSlide: State(3) = **3 frames**
- Carousel: Type(4) × Indicators(4) × Controls(3) × Size(3) = 144 → combinaciones útiles = 36 − exclusiones = **36 frames**
- **Total: 39 frames**

**Exclusión Carousel:**
| Combinación excluida | Razón |
|----------------------|-------|
| `Type=thumbnail + Indicators=dots` | Los thumbnails ya funcionan como indicadores de posición |

### Panel de Figma

**CarouselSlide:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| State | Variant | default / active / transitioning |

**Carousel:**
| Property Figma | Tipo | Valores |
|----------------|------|---------|
| Type | Variant | single / multi / hero / thumbnail |
| Indicators | Variant | dots / lines / counter / none |
| Controls | Variant | arrows / none / both |
| Size | Variant | sm / md / lg |
| 👁 Show Controls | Boolean | true/false |
| 👁 Show Indicators | Boolean | true/false |
| 👁 Show Counter | Boolean | true/false |

---

## Cuándo usar

**Usar Carousel cuando:**
- Se necesita mostrar múltiples elementos de contenido en un espacio limitado con navegación progresiva
- El contenido tiene una relación visual ordenada (fotos de producto, onboarding slides, testimonios)
- El número de slides es conocido y acotado (no listas infinitas)

**Type=single:** Galería de fotos de un producto, slideshow de testimonios, imágenes de blog
**Type=multi:** Filas de productos recomendados ("También te puede interesar"), cartas de features
**Type=hero:** Banner principal full-width de una landing page, imágenes editoriales de gran formato
**Type=thumbnail:** Galería de e-commerce con vista principal + miniaturas navegables

**No usar Carousel cuando:**
- El contenido puede mostrarse completo en la pantalla → usar Grid o List directamente
- Los slides son autónomos y no hay relación entre ellos → usar tabs o navigation
- La lista es infinita (scroll infinito) → usar FlatList/VirtualizedList

---

## Variaciones visuales

### Tipos de carousel

**single:** 1 slide visible a la vez. Los slides ocultos tienen `visibility: hidden` + `aria-hidden`. El viewport muestra únicamente el slide activo.

**multi:** Múltiples slides visibles simultáneamente con scroll. Útil para grillas de cards. Los slides parcialmente visibles insinúan que hay más contenido.

**hero:** Full-width sin restricción de ancho fijo. Altura definida por Size. Controles superpuestos sobre el contenido con bg semitransparente.

**thumbnail:** Slide principal grande + strip de thumbnails debajo. Los thumbnails actúan como indicadores. Excluir Indicators=dots en este type.

### Indicadores

| Tipo | Apariencia | Interactividad |
|------|-----------|----------------|
| `dots` | Círculos pequeños (8-12px), activo en brand color | Click navega al slide |
| `lines` | Barras horizontales (24×4px), activo en brand | Click navega al slide |
| `counter` | Texto "3 / 12" en gray secundario | Solo display |
| `none` | Sin indicadores | — |

**dots:** Patrón más universal — consumer apps, galería de fotos
**lines:** Minimalista — editorial, fashion, marketing
**counter:** Denso/informativo — e-commerce con muchas imágenes, galería grande

### Controles

| Tipo | Apariencia |
|------|-----------|
| `arrows` | Solo prev (‹) y next (›) |
| `none` | Sin botones de flecha |
| `both` | Arrows + indicators visibles |

Los botones de flecha tienen: bg `surface/default`, shadow `elevation/2`, radio circular.
Se posicionan sobre el contenido en los laterales (Type=hero) o fuera del viewport (Type=single/multi).

### Tamaños

| Size | Alto | Indicator size | Control size | Gap |
|------|------|---------------|-------------|-----|
| `sm` | 240px | 8px | 32px | 8px |
| `md` | 400px | 10px | 40px | 12px |
| `lg` | 560px | 12px | 48px | 16px |

---

## Decisiones de diseño

### 1. WAI-ARIA Carousel pattern formal

`role="region"` + `aria-roledescription="carousel"` en el container; `role="group"` + `aria-roledescription="slide"` + `aria-label="Slide 1 de 5"` en cada slide. Este patrón canónico garantiza que los screen readers anuncien el carousel y la posición actual.

### 2. aria-live según autoplay

Cuando autoplay está **activo**: `aria-live="off"` para evitar que el screen reader anuncie cada cambio automático (sería spam). Cuando autoplay está **inactivo** o pausado: `aria-live="polite"` anuncia los cambios manuales del usuario.

### 3. Hidden slides con `inert`

Los slides no activos reciben el atributo `inert` para excluirlos completamente del tab order. Esto garantiza que Tab navega dentro del slide activo sin llegar a los slides ocultos. Sin `inert`, el usuario de teclado podría navegar a links dentro de slides no visibles.

### 4. Autoplay requiere botón pause (WCAG 2.2.2)

Cualquier contenido que se mueve automáticamente y dura más de 5 segundos debe poder pausarse, detenerse o ocultarse (WCAG 2.2.2 — Pause, Stop, Hide). Un botón de pause visible es mandatorio si se implementa autoplay. En Figma modelar el botón pause como slot.

### 5. Type=thumbnail excluye Indicators=dots

Los thumbnails visibles ya indican la posición y permiten navegación directa. Añadir dots es redundante y visual noisy. Esta exclusión simplifica la implementación y el diseño.

---

## Comportamiento e interacción

### Roles ARIA

| Elemento | Rol / Atributo |
|----------|----------------|
| Carousel container | `role="region"` + `aria-roledescription="carousel"` + `aria-label="[descripción]"` |
| CarouselSlide | `role="group"` + `aria-roledescription="slide"` + `aria-label="Slide N de Total"` |
| Prev button | `aria-label="Slide anterior"` |
| Next button | `aria-label="Siguiente slide"` |
| Indicator dot | `role="tab"` + `aria-selected="true/false"` (dentro de `role="tablist"`) |
| Slides ocultos | `inert` attribute (excluye del tab order) |
| Autoplay off | `aria-live="polite"` en container |
| Autoplay on | `aria-live="off"` en container |

### Navegación de teclado

| Tecla | Comportamiento |
|-------|----------------|
| `Arrow Left` | Slide anterior |
| `Arrow Right` | Slide siguiente |
| `Home` | Primer slide |
| `End` | Último slide |
| `Tab` | Navega dentro del slide activo (ignora slides ocultos) |
| `Enter` / `Space` en indicator | Salta al slide correspondiente |

### Focus

- Prev/Next buttons son focuseables con ring 2px visible
- Los indicators (dots/lines) tienen `role="tablist"` → navegables con arrow keys horizontales
- Si el slide activo contiene links o botones, Tab entra a ese contenido

### Comportamiento de loop

El carousel por defecto hace loop (next desde el último → primer slide; prev desde el primero → último). Opción `loop=false` para detener en los extremos y deshabilitar el botón correspondiente.

---

## Guía de contenido

**aria-label del carousel:**
- Descriptivo del propósito: "Galería de fotos del producto", "Slides de onboarding", "Testimonios de clientes"
- No usar "Carousel" solo — combinar con el contexto

**aria-label de cada slide:**
- "Slide N de Total" mínimo
- Mejor: "Foto 1 de 8: Vista frontal del producto" si el contenido lo permite

**Controls:**
- Prev/Next siempre con aria-label descriptivo aunque tengan iconos visuales
- Si el carousel está en loop, los botones nunca se deshabilitan
- Si no hay loop: deshabilitar prev en slide 1 y next en último slide + comunicarlo con `aria-disabled`

**Counter (Indicators=counter):**
- Formato: "3 / 12" — nunca solo "3" sin total
- Posicionamiento: esquina inferior derecha del slide o centrado bajo el slide

---

## Pre-build checklist

- [ ] Type=thumbnail: verificar que la exclusión de Indicators=dots está aplicada
- [ ] Indicadores dots: activo en brand color vs. inactivo en `border/default` — contraste visible
- [ ] Indicadores dots: interactivos — tienen estado hover y son focuseables
- [ ] Controls arrows: botón circular con bg + shadow bien definido, posicionado en el lateral
- [ ] Size sm/md/lg: verificar alturas 240/400/560px
- [ ] CarouselSlide states: `active` diferente visualmente de `default` (puede ser sutil — scale leve)
- [ ] Type=hero: ancho full, controles superpuestos con contraste sobre la imagen

---

## Componentes relacionados

| Componente | Relación |
|------------|----------|
| **Image** | El slot `content` de CarouselSlide frecuentemente contiene Image |
| **Card** | En Type=multi, los slides pueden ser Card components |
| **Button** | Los controles prev/next usan Button/icon-only |
| **Pagination** | Indicador counter es análogo a Pagination para pocas páginas |

---

## Referencia: ¿cómo lo hacen otros sistemas?

| Sistema | Types | Autoplay pause | ARIA pattern | Thumbnails |
|---------|-------|---------------|-------------|-----------|
| **Atlassian** | Single + multi | No | Parcial | No |
| **Carbon (IBM)** | Single | Sí (pause button) | Sí, WAI-ARIA | No |
| **MUI** | Single | No nativo | Parcial | No |
| **Ant Design** | Single + multi | No | Parcial | No |
| **Bootstrap** | Single | Sí | Parcial | No |
| **Swiper (lib)** | Todos | Sí | Parcial | Sí |

**Consenso:** Single slide es core. Autoplay con pause es WCAG-requerido. Thumbnail type es raro en design systems pero común en implementaciones e-commerce. WAI-ARIA pattern formal es poco implementado — opportunity para destacar.

---

## Tokens y espaciado

**Prefijo:** `crl-` · **Total tokens:** 18 · **Modo:** Components

### Tokens de tamaño

| Token | Valor DS | Uso |
|-------|----------|-----|
| `crl/sm/h` | `sizing/240` | Alto carousel sm |
| `crl/md/h` | `sizing/400` | Alto carousel md |
| `crl/lg/h` | `sizing/560` | Alto carousel lg |

### Tokens de indicadores

| Token | Valor DS | Uso |
|-------|----------|-----|
| `crl/indicator/active` | `interactive/default` | Indicador activo (brand) |
| `crl/indicator/inactive` | `border/default` | Indicador inactivo |

### Tokens de controles

| Token | Valor DS | Uso |
|-------|----------|-----|
| `crl/control/bg` | `surface/default` | Fondo botón flecha |
| `crl/control/shadow` | `elevation/2` | Sombra botón flecha |

### Espaciado por tamaño

| Propiedad | sm | md | lg |
|-----------|----|----|-----|
| Alto carousel | 240px | 400px | 560px |
| Indicator size (dots) | 8px | 10px | 12px |
| Control size (button) | 32px | 40px | 48px |
| Gap entre indicators | 8px | 10px | 12px |
| Indicator lines: w×h | 24×4px | 28×4px | 32×4px |

### Comportamiento de indicators

| Indicador | Estado activo | Estado inactivo |
|-----------|--------------|-----------------|
| **dot** | `interactive/default`, tamaño máximo | `border/default`, tamaño reducido |
| **line** | `interactive/default`, ancho completo | `border/default`, ancho reducido |
| **counter** | Solo texto, sin estado activo/inactivo | `text/secondary` |
