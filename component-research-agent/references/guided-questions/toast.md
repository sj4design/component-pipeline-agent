---
component: toast
questions: 5
---

# Guided Questions — Toast

---

## Pregunta 1: Tipos de notificación
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué tipos de mensajes necesitas mostrar con el toast?

1. **Éxito** — confirma que una acción se completó correctamente (ej: "Cambios guardados", "Archivo subido")
2. **Error** — comunica que algo falló (ej: "No se pudo conectar al servidor", "Archivo demasiado grande")
3. **Advertencia** — alerta sobre algo que requiere atención pero no es un error (ej: "Tu sesión expira en 5 minutos", "Cambios sin guardar")
4. **Informativo** — comunica algo neutral o de contexto (ej: "Nuevo mensaje recibido", "Actualización disponible")
5. **Neutral / Sin tipo** — toast genérico sin color o ícono de tipo específico (ej: notificaciones del sistema, confirmaciones simples)
6. Todos los anteriores (sistema completo de tipos)
7. No estoy seguro — muéstrame cómo los sistemas definen y diferencian los tipos

---

## Pregunta 2: Posición en pantalla
**(elige UNA opción)**

¿Dónde aparecen los toasts en la pantalla?

1. **Esquina superior derecha** — el lugar más común en aplicaciones web desktop
2. **Esquina inferior derecha** — común en sistemas que quieren no tapar la navegación superior (ej: Material Design)
3. **Centro superior** — centrado en la parte superior, más prominente (ej: notificaciones de sistema importantes)
4. **Centro inferior** — debajo de la pantalla, típico en mobile (ej: Android Snackbar)
5. **Configurable por llamada** — distintos toasts pueden aparecer en distintas posiciones según la importancia
6. No estoy seguro — muéstrame cómo los sistemas posicionan los toasts y las convenciones de cada plataforma

---

## Pregunta 3: Mecanismo de cierre
**(puedes elegir VARIAS, sepáralas con coma)**

¿Cómo se cierran los toasts?

1. **Auto-dismiss con temporizador** — el toast desaparece solo después de X segundos (ej: 3–5 segundos para éxito, más para errores)
2. **Botón X manual** — el usuario puede cerrar el toast en cualquier momento con un botón de cerrar explícito
3. **Acción de deshacer / undo** — el toast incluye un botón que revierte la acción que lo disparó (ej: "Elemento eliminado — Deshacer")
4. **Permanente hasta acción** — el toast no se cierra solo, el usuario debe cerrar o actuar (ej: errores críticos que requieren atención)
5. No estoy seguro — muéstrame las implicaciones de accesibilidad de cada mecanismo de cierre

**Nota adaptativa:** Si eliges 4 (permanente), el research cubrirá WCAG 2.1 §2.2.4 — los contenidos que se mueven o desaparecen automáticamente tienen requerimientos específicos de accesibilidad.

---

## Pregunta 4: Comportamiento con múltiples toasts
**(elige UNA opción)**

¿Qué pasa si se disparan varios toasts en secuencia o simultáneamente?

1. **Se apilan (stack)** — los toasts se acumulan visualmente uno debajo del otro (ej: múltiples operaciones completadas)
2. **Cola FIFO** — se muestran de a uno, el siguiente espera que el anterior cierre
3. **Reemplazo** — el nuevo toast reemplaza al anterior (solo uno visible a la vez)
4. **Contador** — múltiples notificaciones se colapsan en un contador (ej: "3 archivos procesados")
5. **Cantidad máxima fija** — se muestran máximo N toasts simultáneos, los demás se descartan o encolan
6. No estoy seguro — cuéntame las implicaciones de UX de cada estrategia

---

## Pregunta 5: Acciones dentro del toast
**(elige UNA opción)**

¿El toast lleva acciones interactivas?

1. **No** — el toast es puramente informativo, sin acciones (el usuario solo lee)
2. **Una acción principal** — un solo botón de acción dentro del toast (ej: "Deshacer", "Ver", "Reintentrar")
3. **Acción + cerrar** — un botón de acción más el botón X de cerrar como segunda acción
4. **Múltiples acciones** — dos o más botones de acción dentro del toast (ej: "Ver detalles" + "Descartar")
5. No estoy seguro — muéstrame cómo los sistemas manejan acciones en toasts

**Nota adaptativa:** Si eliges 4 (múltiples acciones), el research señalará que esto generalmente indica que el toast se está usando fuera de su alcance — múltiples acciones sugieren un componente de notificación más rico (notification center, inline alert, o modal de confirmación).
