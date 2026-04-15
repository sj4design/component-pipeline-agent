---
component: card
questions: 5
---

# Guided Questions — Card

---

## Pregunta 1: Tipo de contenido
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué tipo de contenido va dentro de la card?

1. **Solo texto** — títulos, descripciones, metadata, etiquetas (ej: card de lista de productos, tarjeta de artículo)
2. **Imagen + texto** — imagen o media en la parte superior, contenido debajo (ej: blog post, producto de e-commerce, perfil de usuario)
3. **Data / Métricas** — números grandes, gráficas, KPIs, porcentajes (ej: dashboard card, widget de analytics)
4. **Interactivo** — formularios, inputs, dropdowns, botones de acción dentro de la card (ej: card de configuración, card de ajuste rápido)
5. **Media rico** — video, audio, carrusel de imágenes dentro de la card (ej: social feed, galería de contenido)
6. Todos los anteriores (el componente debe soportar cualquier combinación de contenido)
7. No estoy seguro — muéstrame cómo los sistemas organizan los tipos de contenido y decido después

---

## Pregunta 2: Tipo de interacción
**(elige UNA opción)**

¿La card es interactiva? Si sí, ¿qué hace al interactuar?

1. **No interactiva** — la card es solo display, no tiene hover ni click (ej: card de resumen informativo)
2. **Click navega a detalle** — hacer click en la card (entera o en el título) lleva a otra página o vista (ej: card de producto, card de artículo)
3. **Click abre panel o modal** — la card se expande o abre un overlay con más información (ej: card de evento en calendario, card de tarea)
4. **Drag & drop** — la card se puede arrastrar y soltar en otro lugar (ej: Kanban board, ordenamiento de contenido)
5. **Seleccionable** — la card puede seleccionarse como parte de un grupo (checkbox visual, estado selected) (ej: selección de plan, selección de template)
6. No estoy seguro — muéstrame las implicaciones semánticas y de accesibilidad de cada tipo de interacción

**Nota adaptativa:**
- Si eliges 1 (no interactiva): las preguntas sobre overflow menu de acciones no aplican — saltar directamente a Pregunta 4.
- Si eliges 4 (drag & drop): el research cubrirá drag handles, aria-grabbed, y el problema de drag en mobile.
- Si eliges 2 (navega): el research profundizará en el problema de "botón dentro de link" si hay acciones secundarias.

---

## Pregunta 3: Layout y grid
**(puedes elegir VARIAS, sepáralas con coma)**

¿Cómo se organiza la card en el layout de la página?

1. **Grid de cards iguales** — múltiples cards de mismo tamaño en cuadrícula (ej: catálogo de productos, galería de imágenes) — orientación vertical
2. **Lista de cards** — cards apiladas en columna, más anchas que altas (ej: listado de resultados de búsqueda) — orientación horizontal
3. **Cards de distintos tamaños (masonry)** — grid con cards de alturas variables según contenido (ej: Pinterest, feeds de contenido editorial)
4. **Card destacada + cards secundarias** — una card grande hero + varias pequeñas (ej: sección de noticias, featured product)
5. **Responsive: grid en desktop, lista en mobile** — las cards cambian de orientación vertical a horizontal según el breakpoint
6. No estoy seguro — muéstrame los patrones de layout de cards más comunes y cuándo usar cada uno

---

## Pregunta 4: Anatomía y elementos opcionales
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué elementos necesita la card más allá del contenido básico?

1. **Imagen / Cover** — área de imagen en la parte superior o lateral de la card
2. **Avatar** — imagen circular de persona o entidad (ej: autor, asignado, organización)
3. **Badge de estado / Tag** — etiqueta de estado o categoría visible (ej: "Nuevo", "En progreso", "Agotado")
4. **Footer con acciones** — botones de acción visibles en la parte inferior de la card (ej: "Ver más", "Agregar al carrito")
5. **Overflow menu (⋯)** — menú de acciones contextuales que se muestra al hover o en un botón de tres puntos
6. **Metadata / Timestamp** — información secundaria como fecha, autor, categoría (ej: "Publicado hace 2 días por Juan")
7. Solo los elementos básicos (título + descripción) — sin elementos adicionales
8. No estoy seguro — muéstrame los slots anatómicos estándar de las cards en los design systems

**Nota adaptativa:** Si en Pregunta 2 elegiste 2 (navega) y aquí eliges 5 (overflow menu), el research profundizará en el patrón de **sibling DOM** para resolver el problema de botón dentro de link — Carbon's ClickableTile es la referencia de arquitectura.

---

## Pregunta 5: Estructura del contenido interno
**(elige UNA opción)**

El contenido principal de la card ¿tiene estructura predecible?

1. **Estructura típica** — la card siempre tiene un patrón fijo (título + descripción + metadata + acciones) que se puede pre-armar como building block intercambiable en Figma
2. **Contenido libre** — la card es un contenedor genérico donde el diseñador arma cualquier layout interno
3. **Ambos** — quiero un building block por defecto pero que se pueda reemplazar con contenido libre (instance swap en Figma)
4. No estoy seguro — muéstrame ejemplos de building blocks vs contenido libre en otros design systems

**Nota adaptativa:** Si eliges 1 o 3, el research enfatizará patrones de slots nativos de Figma, building blocks como sub-componentes intercambiables, y cómo los design systems estructuran contenido predecible dentro de cards.
