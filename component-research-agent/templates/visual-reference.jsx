import { useState, useMemo, useEffect, useRef } from "react";
import { Calendar, Clock, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, X, Plus, Minus, Globe, Keyboard, Eye, EyeOff, Filter, Columns2, Smartphone, Type, CalendarRange, CalendarDays, Hash, Ban, ListChecks, Languages } from "lucide-react";

// ═══════════════════════════════════════════════
// MINI WIREFRAMES FOR QUESTIONS
// ═══════════════════════════════════════════════

function MiniSingleDate() {
  return (
    <svg viewBox="0 0 80 50" style={{ width:"100%" }}>
      <rect x="4" y="8" width="72" height="16" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(76,201,240,0.3)" strokeWidth="0.8"/>
      <text x="10" y="19" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">Mar 22, 2026</text>
      <rect x="64" y="10" width="10" height="12" rx="2" fill="rgba(76,201,240,0.1)"/>
      <rect x="65" y="14" width="8" height="8" rx="1.5" fill="none" stroke="rgba(76,201,240,0.5)" strokeWidth="0.8"/>
      <line x1="67" y1="13" x2="67" y2="15" stroke="rgba(76,201,240,0.5)" strokeWidth="0.6"/>
      <line x1="71" y1="13" x2="71" y2="15" stroke="rgba(76,201,240,0.5)" strokeWidth="0.6"/>
      <line x1="65" y1="17" x2="73" y2="17" stroke="rgba(76,201,240,0.3)" strokeWidth="0.4"/>
      <circle cx="40" cy="40" r="5" fill="rgba(76,201,240,0.15)" stroke="#4cc9f0" strokeWidth="0.8"/>
      <text x="40" y="42" fill="#4cc9f0" fontSize="4" textAnchor="middle" fontFamily="monospace" fontWeight="bold">22</text>
    </svg>
  );
}

function MiniRangeDate() {
  return (
    <svg viewBox="0 0 80 50" style={{ width:"100%" }}>
      <rect x="2" y="8" width="34" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8"/>
      <text x="6" y="17" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">Mar 15</text>
      <text x="38" y="17" fill="rgba(255,255,255,0.15)" fontSize="5">→</text>
      <rect x="44" y="8" width="34" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8"/>
      <text x="48" y="17" fill="rgba(255,255,255,0.25)" fontSize="4" fontFamily="monospace">Mar 22</text>
      <rect x="15" y="32" width="50" height="8" rx="3" fill="rgba(139,92,246,0.1)"/>
      <circle cx="15" cy="36" r="4" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="0.8"/>
      <circle cx="65" cy="36" r="4" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="0.8"/>
      <text x="15" y="38" fill="#8b5cf6" fontSize="3.5" textAnchor="middle" fontFamily="monospace">15</text>
      <text x="65" y="38" fill="#8b5cf6" fontSize="3.5" textAnchor="middle" fontFamily="monospace">22</text>
    </svg>
  );
}

function MiniBothDates() {
  return (
    <svg viewBox="0 0 80 50" style={{ width:"100%" }}>
      <rect x="2" y="4" width="36" height="18" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(76,201,240,0.2)" strokeWidth="0.6"/>
      <text x="8" y="15" fill="rgba(76,201,240,0.4)" fontSize="4" fontFamily="monospace">Single</text>
      <circle cx="32" cy="13" r="3" fill="rgba(76,201,240,0.15)" stroke="#4cc9f0" strokeWidth="0.5"/>
      <rect x="42" y="4" width="36" height="18" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.6"/>
      <text x="48" y="15" fill="rgba(139,92,246,0.4)" fontSize="4" fontFamily="monospace">Range</text>
      <rect x="62" y="10" width="10" height="5" rx="2" fill="rgba(139,92,246,0.1)"/>
      <text x="20" y="36" fill="rgba(255,255,255,0.15)" fontSize="4" fontFamily="monospace" textAnchor="middle">Dos componentes</text>
      <text x="20" y="42" fill="rgba(255,255,255,0.1)" fontSize="4" fontFamily="monospace" textAnchor="middle">independientes</text>
    </svg>
  );
}

function MiniPopover() {
  return (
    <svg viewBox="0 0 80 60" style={{ width:"100%" }}>
      <rect x="8" y="4" width="64" height="14" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(76,201,240,0.3)" strokeWidth="0.8"/>
      <text x="14" y="13" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="monospace">Click aquí</text>
      <polygon points="40,20 44,24 36,24" fill="rgba(255,255,255,0.08)"/>
      <rect x="8" y="24" width="64" height="32" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
      {[0,1,2,3,4].map(r => [0,1,2,3,4,5,6].map(c => (
        <rect key={`${r}-${c}`} x={12+c*8} y={28+r*5} width="6" height="4" rx="1"
          fill={r===2&&c===3 ? "rgba(76,201,240,0.2)" : "rgba(255,255,255,0.03)"}
          stroke={r===2&&c===3 ? "#4cc9f0" : "rgba(255,255,255,0.04)"} strokeWidth="0.3"/>
      )))}
    </svg>
  );
}

function MiniInline() {
  return (
    <svg viewBox="0 0 80 60" style={{ width:"100%" }}>
      <rect x="8" y="2" width="64" height="56" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.8"/>
      <text x="26" y="12" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="monospace" fontWeight="bold">March</text>
      {[0,1,2,3,4,5].map(r => [0,1,2,3,4,5,6].map(c => (
        <rect key={`${r}-${c}`} x={12+c*8} y={16+r*6} width="6" height="4.5" rx="1"
          fill={r===3&&c===1 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.025)"}
          stroke={r===3&&c===1 ? "#22c55e" : "rgba(255,255,255,0.03)"} strokeWidth="0.3"/>
      )))}
    </svg>
  );
}

function MiniBothDisplay() {
  return (
    <svg viewBox="0 0 80 60" style={{ width:"100%" }}>
      {/* Popover mini */}
      <rect x="2" y="4" width="36" height="10" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(76,201,240,0.2)" strokeWidth="0.5"/>
      <rect x="2" y="16" width="36" height="22" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3"/>
      <text x="20" y="46" fill="rgba(76,201,240,0.35)" fontSize="4" fontFamily="monospace" textAnchor="middle">Popover</text>
      {/* Inline mini */}
      <rect x="42" y="4" width="36" height="34" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5"/>
      <text x="60" y="46" fill="rgba(34,197,94,0.35)" fontSize="4" fontFamily="monospace" textAnchor="middle">Inline</text>
      <text x="40" y="56" fill="rgba(255,255,255,0.12)" fontSize="3.5" fontFamily="monospace" textAnchor="middle">Ambos disponibles</text>
    </svg>
  );
}

function MiniDateOnly() {
  return (
    <svg viewBox="0 0 80 40" style={{ width:"100%" }}>
      <rect x="8" y="8" width="64" height="18" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <text x="14" y="19" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">22 / 03 / 2026</text>
      <text x="40" y="35" fill="rgba(255,255,255,0.15)" fontSize="4" fontFamily="monospace" textAnchor="middle">Solo día, mes y año</text>
    </svg>
  );
}

function MiniDateTime() {
  return (
    <svg viewBox="0 0 80 40" style={{ width:"100%" }}>
      <rect x="4" y="8" width="44" height="16" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(236,72,153,0.25)" strokeWidth="0.6"/>
      <text x="8" y="18" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="monospace">22/03/2026</text>
      <rect x="50" y="8" width="26" height="16" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(236,72,153,0.25)" strokeWidth="0.6"/>
      <text x="53" y="18" fill="rgba(236,72,153,0.5)" fontSize="5" fontFamily="monospace">14:30</text>
      <text x="40" y="35" fill="rgba(255,255,255,0.15)" fontSize="4" fontFamily="monospace" textAnchor="middle">Fecha + Hora combinados</text>
    </svg>
  );
}

function MiniMinMax() {
  return (
    <svg viewBox="0 0 80 36" style={{ width:"100%" }}>
      {[0,1,2,3,4,5,6].map(i => (
        <g key={i}>
          <rect x={6+i*10} y="8" width="8" height="8" rx="2"
            fill={i<2 ? "rgba(255,255,255,0.02)" : i>5 ? "rgba(255,255,255,0.02)" : "rgba(76,201,240,0.08)"}
            stroke={i<2||i>5 ? "rgba(255,255,255,0.05)" : "rgba(76,201,240,0.2)"} strokeWidth="0.5"/>
          {(i<2||i>5) && <line x1={7+i*10} y1="9" x2={13+i*10} y2="15" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5"/>}
        </g>
      ))}
      <text x="40" y="28" fill="rgba(255,255,255,0.15)" fontSize="3.5" fontFamily="monospace" textAnchor="middle">Fechas fuera de rango bloqueadas</text>
    </svg>
  );
}

function MiniDisabledDates() {
  return (
    <svg viewBox="0 0 80 36" style={{ width:"100%" }}>
      {[0,1,2,3,4,5,6].map(i => {
        const disabled = i===2||i===4;
        return (
          <g key={i}>
            <rect x={6+i*10} y="8" width="8" height="8" rx="2"
              fill={disabled?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.04)"}
              stroke={disabled?"rgba(239,68,68,0.2)":"rgba(255,255,255,0.06)"} strokeWidth="0.5"/>
            {disabled && <>
              <line x1={7+i*10} y1="9" x2={13+i*10} y2="15" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5"/>
              <line x1={13+i*10} y1="9" x2={7+i*10} y2="15" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5"/>
            </>}
          </g>
        );
      })}
      <text x="40" y="28" fill="rgba(255,255,255,0.15)" fontSize="3.5" fontFamily="monospace" textAnchor="middle">Días específicos bloqueados</text>
    </svg>
  );
}

function MiniPresets() {
  return (
    <svg viewBox="0 0 80 40" style={{ width:"100%" }}>
      {["Last 7d","This month","Custom"].map((p,i) => (
        <g key={i}>
          <rect x="8" y={4+i*12} width="64" height="10" rx="3"
            fill={i===0?"rgba(236,72,153,0.08)":"rgba(255,255,255,0.02)"}
            stroke={i===0?"rgba(236,72,153,0.2)":"rgba(255,255,255,0.05)"} strokeWidth="0.5"/>
          <text x="14" y={11+i*12} fill={i===0?"rgba(236,72,153,0.6)":"rgba(255,255,255,0.25)"} fontSize="5" fontFamily="monospace">{p}</text>
        </g>
      ))}
    </svg>
  );
}

function MiniI18n() {
  return (
    <svg viewBox="0 0 80 36" style={{ width:"100%" }}>
      <text x="10" y="12" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">Mar 22 → Mié</text>
      <text x="10" y="22" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="monospace">22 مارس → أربعاء</text>
      <text x="10" y="32" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="monospace">3月22日 → 星期三</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════
// SCOPING QUESTIONS (redesigned)
// ═══════════════════════════════════════════════
const questions = [
  {
    id: "type",
    question: "¿Qué necesita seleccionar el usuario?",
    context: "Define si el componente maneja una sola fecha o un período entre dos fechas. Esto cambia la API, el layout del calendario, y cómo se muestra la selección.",
    options: [
      { value:"single", label:"Una fecha", desc:"El usuario elige un solo día. Ej: fecha de nacimiento, deadline, fecha de evento.", Visual: MiniSingleDate, color:"#4cc9f0" },
      { value:"range", label:"Un rango de fechas", desc:"El usuario elige inicio y fin. Ej: reserva de hotel, filtro de reportes, período de vacaciones.", Visual: MiniRangeDate, color:"#8b5cf6" },
      { value:"both", label:"Ambos (componentes separados)", desc:"Tu sistema necesita ambos casos. Se construyen como dos componentes que comparten el mismo Calendar interno.", Visual: MiniBothDates, color:"#f59e0b" },
    ],
  },
  {
    id: "display",
    question: "¿Cómo se abre el calendario?",
    context: "Determina cómo aparece el calendario en la interfaz. Popover funciona en formularios, inline cuando el contexto temporal es el foco principal (filtros, dashboards).",
    options: [
      { value:"popover", label:"En un popover al hacer click", desc:"El input abre un dropdown con el calendario. Se cierra al seleccionar. El approach más común en formularios.", Visual: MiniPopover, color:"#4cc9f0" },
      { value:"inline", label:"Siempre visible en la página", desc:"El calendario está embebido directamente. Sin input. Ideal para filtros y dashboards donde la fecha es protagonista.", Visual: MiniInline, color:"#22c55e" },
      { value:"flexible", label:"Ambos modos disponibles", desc:"El mismo componente puede usarse como popover o inline según el contexto. Más trabajo de implementación pero máxima flexibilidad.", Visual: MiniBothDisplay, color:"#f59e0b" },
    ],
  },
  {
    id: "time",
    question: "¿El usuario necesita elegir también la hora?",
    context: "Agregar hora cambia significativamente la complejidad: necesitas un TimePicker adicional, manejo de AM/PM vs 24h, y potencialmente timezone. La mayoría de DS lo manejan como componentes separados que se componen.",
    options: [
      { value:"date-only", label:"Solo fecha (día, mes, año)", desc:"El caso más simple. Cubre el 80% de los usos: formularios, filtros, scheduling básico.", Visual: MiniDateOnly, color:"#4cc9f0" },
      { value:"datetime", label:"Fecha y hora combinados", desc:"Para scheduling preciso: reuniones, reservas con hora, timestamps. Requiere decidir cómo combinar date + time en la UI.", Visual: MiniDateTime, color:"#ec4899" },
    ],
  },
  {
    id: "constraints",
    question: "¿Qué restricciones necesitan las fechas?",
    context: "Las restricciones definen qué fechas se pueden seleccionar. Esto impacta la API (props de configuración), la UI (cómo se ven las fechas bloqueadas) y la validación.",
    multi: true,
    options: [
      { value:"min-max", label:"Limitar rango seleccionable", desc:"Bloquear todo antes o después de cierta fecha. Ej: no permitir fechas pasadas para una reserva.", Visual: MiniMinMax, color:"#4cc9f0" },
      { value:"disabled-dates", label:"Bloquear días específicos", desc:"Deshabilitar fechas puntuales. Ej: feriados, días sin disponibilidad, fines de semana.", Visual: MiniDisabledDates, color:"#ef4444" },
      { value:"presets", label:"Rangos predefinidos rápidos", desc:"Botones de 'Últimos 7 días', 'Este mes', etc. Ideal para dashboards donde el 80% elige períodos estándar.", Visual: MiniPresets, color:"#ec4899" },
      { value:"i18n", label:"Múltiples idiomas y formatos", desc:"Soporte de locales (español, inglés, árabe RTL, chino). Cambia formato de fecha, nombre de meses y dirección del layout.", Visual: MiniI18n, color:"#8b5cf6" },
    ],
  },
];

// ═══════════════════════════════════════════════
// VARIANT PATTERNS (for confirmation)
// ═══════════════════════════════════════════════
const allVariants = {
  "input-popover": {
    label:"Input + Popover", color:"#4cc9f0",
    desc:"Click en input abre calendario. El más común en formularios.",
    adopters:["Material","Spectrum","Carbon","Ant Design","Paste"],
    conditions: (a) => a.display==="popover"||a.display==="flexible",
  },
  "inline": {
    label:"Inline / Embedded", color:"#22c55e",
    desc:"Calendario siempre visible. Para filtros y dashboards.",
    adopters:["Polaris","Spectrum (Calendar)"],
    conditions: (a) => a.display==="inline"||a.display==="flexible",
  },
  "input-only": {
    label:"Input Only", color:"#f59e0b",
    desc:"Solo input sin calendario. Para fechas conocidas (nacimiento).",
    adopters:["Carbon (Simple Date)"],
    conditions: (a) => a.display==="popover"||a.display==="flexible",
  },
  "modal-mobile": {
    label:"Modal Mobile", color:"#e94560",
    desc:"Full-screen en mobile. Resuelve el problema del teclado virtual.",
    adopters:["Material (mobile)"],
    conditions: (a) => a.display==="popover"||a.display==="flexible",
  },
  "range-dual": {
    label:"Range — Dual Calendar", color:"#8b5cf6",
    desc:"Dos meses lado a lado para seleccionar rangos cross-month.",
    adopters:["Polaris","Ant Design","Spectrum"],
    conditions: (a) => a.type==="range"||a.type==="both",
  },
  "range-presets": {
    label:"Range + Presets", color:"#ec4899",
    desc:"Sidebar con rangos rápidos (Last 7d, This month).",
    adopters:["Ant Design"],
    conditions: (a) => (a.type==="range"||a.type==="both")&&(a.constraints||[]).includes("presets"),
  },
  "datetime-combined": {
    label:"DateTime Combined", color:"#06b6d4",
    desc:"Date picker + Time picker en el mismo popover/inline.",
    adopters:["Ant Design (showTime)","Paste (composable)"],
    conditions: (a) => a.time==="datetime",
  },
};

// ═══════════════════════════════════════════════
// LARGE WIREFRAMES (for confirmation step)
// ═══════════════════════════════════════════════

function WireframeLarge({ variantKey }) {
  const map = {
    "input-popover": () => (
      <svg viewBox="0 0 180 140" style={{width:"100%"}}>
        <rect x="10" y="8" width="160" height="24" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(76,201,240,0.35)" strokeWidth="1"/>
        <text x="18" y="23" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">MM / DD / YYYY</text>
        <rect x="145" y="12" width="18" height="16" rx="3" fill="rgba(76,201,240,0.1)"/>
        <rect x="146" y="16" width="10" height="10" rx="2" fill="none" stroke="rgba(76,201,240,0.5)" strokeWidth="0.8"/>
        <line x1="148" y1="15" x2="148" y2="17.5" stroke="rgba(76,201,240,0.5)" strokeWidth="0.6"/>
        <line x1="153" y1="15" x2="153" y2="17.5" stroke="rgba(76,201,240,0.5)" strokeWidth="0.6"/>
        <line x1="146" y1="20" x2="156" y2="20" stroke="rgba(76,201,240,0.3)" strokeWidth="0.4"/>
        <polygon points="90,34 95,39 85,39" fill="rgba(255,255,255,0.06)"/>
        <rect x="10" y="40" width="160" height="92" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        <text x="55" y="55" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" fontWeight="bold">March 2026</text>
        {[0,1,2,3,4].map(r=>[0,1,2,3,4,5,6].map(c=>{const d=r*7+c+1;return d>31?null:(
          <g key={`${r}-${c}`}><rect x={16+c*21} y={62+r*14} width="17" height="11" rx="3" fill={d===22?"rgba(76,201,240,0.15)":"rgba(255,255,255,0.02)"} stroke={d===22?"#4cc9f0":"rgba(255,255,255,0.03)"} strokeWidth={d===22?"1":"0.3"}/>
          <text x={24+c*21} y={70+r*14} fill={d===22?"#4cc9f0":"rgba(255,255,255,0.3)"} fontSize="6" fontFamily="monospace" textAnchor="middle">{d}</text></g>
        );}))}
      </svg>
    ),
    "inline": () => (
      <svg viewBox="0 0 180 120" style={{width:"100%"}}>
        <rect x="10" y="4" width="160" height="112" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
        <text x="18" y="18" fill="rgba(255,255,255,0.2)" fontSize="7">◀</text>
        <text x="60" y="18" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" fontWeight="bold">March 2026</text>
        <text x="158" y="18" fill="rgba(255,255,255,0.2)" fontSize="7">▶</text>
        {[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5,6].map(c=>{const d=r*7+c+1;return d>31?null:(
          <g key={`${r}-${c}`}><rect x={16+c*21} y={24+r*14} width="17" height="11" rx="3" fill={d===22?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.02)"} stroke={d===22?"#22c55e":"rgba(255,255,255,0.03)"} strokeWidth={d===22?"1":"0.3"}/>
          <text x={24+c*21} y={32+r*14} fill={d===22?"#22c55e":"rgba(255,255,255,0.3)"} fontSize="6" fontFamily="monospace" textAnchor="middle">{d}</text></g>
        );}))}
      </svg>
    ),
    "input-only": () => (
      <svg viewBox="0 0 180 60" style={{width:"100%"}}>
        <text x="14" y="14" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">Date of birth</text>
        <rect x="10" y="20" width="160" height="24" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(245,158,11,0.35)" strokeWidth="1"/>
        <text x="18" y="35" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">03 / 22 / 1990</text>
        <text x="14" y="54" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace">Format: MM / DD / YYYY</text>
      </svg>
    ),
    "modal-mobile": () => (
      <svg viewBox="0 0 120 170" style={{width:"100%"}}>
        <rect x="10" y="2" width="100" height="166" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(233,69,96,0.3)" strokeWidth="1"/>
        <rect x="10" y="2" width="100" height="20" rx="12" fill="rgba(255,255,255,0.03)"/>
        <text x="60" y="15" fill="rgba(255,255,255,0.15)" fontSize="6" fontFamily="monospace" textAnchor="middle">9:41</text>
        <text x="22" y="34" fill="rgba(233,69,96,0.5)" fontSize="7" fontFamily="monospace">Select date</text>
        <text x="98" y="34" fill="rgba(255,255,255,0.2)" fontSize="7">✕</text>
        {[0,1,2,3,4,5].map(r=>[0,1,2,3,4,5,6].map(c=>{const d=r*7+c+1;return d>31?null:(
          <g key={`${r}-${c}`}><text x={20+c*12} y={56+r*14} fill={d===22?"#e94560":"rgba(255,255,255,0.2)"} fontSize="6" fontFamily="monospace" textAnchor="middle">{d}</text>
          {d===22&&<circle cx={20+c*12} cy={53+r*14} r="6" fill="rgba(233,69,96,0.15)" stroke="#e94560" strokeWidth="0.8"/>}</g>
        );}))}
        <rect x="20" y="146" width="35" height="14" rx="4" fill="rgba(255,255,255,0.04)"/>
        <text x="37" y="155" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="monospace" textAnchor="middle">Cancel</text>
        <rect x="60" y="146" width="40" height="14" rx="4" fill="rgba(233,69,96,0.15)"/>
        <text x="80" y="155" fill="rgba(233,69,96,0.6)" fontSize="5" fontFamily="monospace" textAnchor="middle">Confirm</text>
      </svg>
    ),
    "range-dual": () => (
      <svg viewBox="0 0 180 100" style={{width:"100%"}}>
        <rect x="4" y="4" width="84" height="90" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <text x="24" y="16" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace" fontWeight="bold">March</text>
        <rect x="92" y="4" width="84" height="90" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <text x="116" y="16" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace" fontWeight="bold">April</text>
        {[0,1,2,3,4].map(r=>[0,1,2,3,4,5,6].map(c=>{const d=r*7+c+1;if(d>31)return null;const inR=d>=15&&d<=22;
        return(<g key={`m-${r}-${c}`}>{inR&&<rect x={8+c*11-1} y={22+r*13-2} width="11" height="11" rx="2" fill="rgba(139,92,246,0.08)"/>}
        <text x={12+c*11} y={30+r*13} fill={inR?"rgba(139,92,246,0.7)":"rgba(255,255,255,0.2)"} fontSize="5" fontFamily="monospace" textAnchor="middle">{d}</text></g>);
        }))}
      </svg>
    ),
    "range-presets": () => (
      <svg viewBox="0 0 180 100" style={{width:"100%"}}>
        <rect x="4" y="4" width="50" height="90" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        {["Today","Last 7d","Last 30d","This month","Custom"].map((p,i)=>(
          <g key={i}><rect x="8" y={10+i*16} width="42" height="12" rx="3" fill={i===1?"rgba(236,72,153,0.08)":"rgba(255,255,255,0.01)"} stroke={i===1?"rgba(236,72,153,0.2)":"transparent"} strokeWidth="0.5"/>
          <text x="12" y={18+i*16} fill={i===1?"rgba(236,72,153,0.6)":"rgba(255,255,255,0.2)"} fontSize="5" fontFamily="monospace">{p}</text></g>
        ))}
        <rect x="58" y="4" width="118" height="90" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <text x="90" y="16" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">March 2026</text>
      </svg>
    ),
    "datetime-combined": () => (
      <svg viewBox="0 0 180 80" style={{width:"100%"}}>
        <rect x="4" y="4" width="108" height="70" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <text x="30" y="16" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">March 2026</text>
        {[0,1,2,3].map(r=>[0,1,2,3,4,5,6].map(c=>(
          <rect key={`${r}-${c}`} x={8+c*14} y={22+r*11} width="11" height="8" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3"/>
        )))}
        {/* Time picker */}
        <rect x="118" y="4" width="58" height="70" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"/>
        <text x="132" y="16" fill="rgba(6,182,212,0.4)" fontSize="6" fontFamily="monospace">Time</text>
        {["09:00","10:00","11:00","12:00","13:00","14:00"].map((t,i)=>(
          <g key={i}><rect x="122" y={22+i*8} width="50" height="6" rx="2" fill={i===5?"rgba(6,182,212,0.1)":"rgba(255,255,255,0.01)"} stroke={i===5?"rgba(6,182,212,0.2)":"transparent"} strokeWidth="0.3"/>
          <text x="126" y={27+i*8} fill={i===5?"rgba(6,182,212,0.6)":"rgba(255,255,255,0.15)"} fontSize="4" fontFamily="monospace">{t}</text></g>
        ))}
      </svg>
    ),
  };
  const Renderer = map[variantKey];
  return Renderer ? <Renderer /> : null;
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function ResearchAgentV4() {
  const [mode, setMode] = useState(null);
  const [phase, setPhase] = useState("scope");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedVariants, setSelectedVariants] = useState(null);
  const [researchExpanded, setResearchExpanded] = useState({});
  const [userDecisions, setUserDecisions] = useState({});
  const [briefText, setBriefText] = useState("");
  const [briefAnalysis, setBriefAnalysis] = useState(null);
  const [gapResolutions, setGapResolutions] = useState({});
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setModeDropdownOpen(false);
    };
    if (modeDropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [modeDropdownOpen]);

  // Brief parser — CONSERVATIVE: only extracts explicitly stated decisions
  // Rule: if the brief doesn't clearly state a decision, it's a gap
  const analyzeBrief = (text) => {
    const lower = text.toLowerCase();
    const extracted = {};
    const gaps = [];
    const covered = [];

    // Type detection — only if they explicitly say range/single/both
    if (lower.includes("rango de fechas") || lower.includes("date range") || lower.includes("fecha inicio y fecha fin") || lower.includes("seleccionar un rango") || lower.includes("período de fechas")) {
      extracted.type = "range"; covered.push({ dim:"Tipo de selección", value:"Range", source: "Mencionado explícitamente" });
    } else if (lower.includes("fecha única") || lower.includes("single date") || lower.includes("seleccionar una fecha") || lower.includes("elegir una fecha") || lower.includes("una sola fecha")) {
      extracted.type = "single"; covered.push({ dim:"Tipo de selección", value:"Single", source: "Mencionado explícitamente" });
    } else if (lower.includes("ambos") || lower.includes("single y range") || lower.includes("fecha única y rango")) {
      extracted.type = "both"; covered.push({ dim:"Tipo de selección", value:"Ambos", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Tipo de selección", question:"¿Fecha única, rango, o ambos?", impact:"high", why:"Define la API completa y el layout del calendario." });
    }

    // Display — only if they explicitly say popover/inline/dropdown
    if (lower.includes("popover") || lower.includes("dropdown") || lower.includes("se abre al hacer click") || lower.includes("abre un calendario")) {
      extracted.display = "popover"; covered.push({ dim:"Presentación", value:"Popover", source: "Mencionado explícitamente" });
    } else if (lower.includes("inline") || lower.includes("siempre visible") || lower.includes("embebido en la página") || lower.includes("calendario visible")) {
      extracted.display = "inline"; covered.push({ dim:"Presentación", value:"Inline", source: "Mencionado explícitamente" });
    } else if (lower.includes("ambos modos")) {
      extracted.display = "flexible"; covered.push({ dim:"Presentación", value:"Ambos", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Presentación", question:"¿Popover, inline, o ambos?", impact:"high", why:"Determina si Calendar necesita ser standalone." });
    }

    // Time — only if they explicitly mention hora/time
    if (lower.includes("fecha y hora") || lower.includes("date and time") || lower.includes("incluir hora") || lower.includes("seleccionar hora") || lower.includes("con hora")) {
      extracted.time = "datetime"; covered.push({ dim:"Hora", value:"Fecha + Hora", source: "Mencionado explícitamente" });
    } else if (lower.includes("solo fecha") || lower.includes("sin hora") || lower.includes("no necesita hora") || lower.includes("date only")) {
      extracted.time = "date-only"; covered.push({ dim:"Hora", value:"Solo fecha", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Hora", question:"¿Solo fecha o fecha + hora?", impact:"medium", why:"Agregar hora cambia significativamente la complejidad." });
    }

    // Constraints — only explicit mentions
    const constraints = [];
    if (lower.includes("fecha mínima") || lower.includes("fecha máxima") || lower.includes("no permitir fechas antes") || lower.includes("no permitir fechas después") || lower.includes("limitar rango") || lower.includes("min date") || lower.includes("max date")) {
      constraints.push("min-max"); covered.push({ dim:"Min/Max dates", value:"Sí", source: "Mencionado explícitamente" });
    }
    if (lower.includes("deshabilitar fechas") || lower.includes("bloquear fechas") || lower.includes("fechas no disponibles") || lower.includes("disabled dates") || lower.includes("feriados bloqueados")) {
      constraints.push("disabled-dates"); covered.push({ dim:"Fechas deshabilitadas", value:"Sí", source: "Mencionado explícitamente" });
    }
    if (lower.includes("presets") || lower.includes("rangos predefinidos") || lower.includes("últimos 7 días") || lower.includes("last 7 days") || lower.includes("este mes") || lower.includes("rangos rápidos")) {
      constraints.push("presets"); covered.push({ dim:"Presets", value:"Sí", source: "Mencionado explícitamente" });
    }
    if (lower.includes("múltiples idiomas") || lower.includes("i18n") || lower.includes("internacionalización") || lower.includes("soportar español e inglés") || lower.includes("multilingüe") || lower.includes("varios idiomas") || lower.includes("múltiples idiomas")) {
      constraints.push("i18n"); covered.push({ dim:"i18n", value:"Sí", source: "Mencionado explícitamente" });
    }
    if (constraints.length > 0) extracted.constraints = constraints;

    // Everything below is ALWAYS a gap unless explicitly mentioned
    // We don't infer these from context words

    if (lower.includes("accesibilidad") || lower.includes("a11y") || lower.includes("wcag") || lower.includes("screen reader") || lower.includes("keyboard navigation")) {
      covered.push({ dim:"Accesibilidad", value:"Mencionada", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Accesibilidad", question:"¿Qué nivel de a11y? ¿WCAG AA o AAA?", impact:"high", why:"Todos los DS principales implementan keyboard nav y screen reader support. No es opcional." });
    }

    if (lower.includes("mobile") || lower.includes("responsive") || lower.includes("pantallas pequeñas") || lower.includes("versión móvil") || lower.includes("comportamiento en móvil")) {
      covered.push({ dim:"Mobile / Responsive", value:"Mencionado", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Mobile / Responsive", question:"¿Cómo se comporta en pantallas pequeñas?", impact:"medium", why:"Material usa modal en mobile porque el teclado virtual tapa el popover." });
    }

    if (lower.includes("validación") || lower.includes("error de fecha") || lower.includes("fecha inválida") || lower.includes("mensajes de error")) {
      covered.push({ dim:"Validación y errores", value:"Mencionada", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Validación y errores", question:"¿Qué pasa cuando el usuario ingresa una fecha inválida?", impact:"medium", why:"Paste tiene los mejores error patterns: cada tipo de error tiene su propio mensaje." });
    }

    if (lower.includes("timezone") || lower.includes("zona horaria") || lower.includes("utc") || lower.includes("zonas horarias")) {
      covered.push({ dim:"Timezone", value:"Mencionado", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Timezone", question:"¿Las fechas son timezone-aware?", impact:"low", why:"Solo relevante si usuarios en diferentes zonas horarias ven los mismos datos." });
    }

    if (lower.includes("animación") || lower.includes("transición") || lower.includes("motion") || lower.includes("animar")) {
      covered.push({ dim:"Motion / Animación", value:"Mencionado", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Motion / Animación", question:"¿El calendario tiene transiciones al abrir/navegar?", impact:"low", why:"No es blocker, pero mejora la percepción de calidad." });
    }

    if (lower.includes("dark mode") || lower.includes("theming") || lower.includes("tokens de diseño") || lower.includes("multi-brand") || lower.includes("tema oscuro")) {
      covered.push({ dim:"Theming / Tokens", value:"Mencionado", source: "Mencionado explícitamente" });
    } else {
      gaps.push({ dim:"Theming / Tokens", question:"¿Soporta dark mode? ¿Multi-brand?", impact:"low", why:"Debe usar tokens semánticos del DS, no colores hardcodeados." });
    }

    return { extracted, gaps, covered, totalDimensions: covered.length + gaps.length, coveredCount: covered.length, gapCount: gaps.length };
  };

  const handleAnswer = (qId, value, multi) => {
    if (multi) {
      const prev = answers[qId] || [];
      const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      setAnswers({ ...answers, [qId]: next });
    } else {
      setAnswers({ ...answers, [qId]: value });
    }
  };

  const canAdvance = () => {
    const q = questions[currentQ];
    return q.multi ? (answers[q.id] || []).length > 0 : !!answers[q.id];
  };

  // Compute suggested variants from answers
  const suggestedVariants = useMemo(() => {
    if (Object.keys(answers).length === 0) return Object.keys(allVariants);
    return Object.entries(allVariants)
      .filter(([_, v]) => v.conditions(answers))
      .map(([k]) => k);
  }, [answers]);

  // Initialize selectedVariants when moving to confirmation
  const initConfirmation = () => {
    setSelectedVariants(new Set(suggestedVariants));
    setPhase("confirm");
  };

  const toggleVariant = (key) => {
    const next = new Set(selectedVariants);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSelectedVariants(next);
  };

  // Mode selection
  if (!mode) {
    return (
      <div style={{ background:"#06060c", minHeight:"100vh", color:"#e8e8ef", fontFamily:"'DM Sans',-apple-system,sans-serif", padding:"28px 16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ maxWidth:"560px", width:"100%", textAlign:"center" }}>
          <div style={{ marginBottom:"32px" }}>
            <span style={{ fontSize:"10px", letterSpacing:"4px", textTransform:"uppercase", color:"#e94560", fontWeight:800 }}>Component Research Agent</span>
            <h1 style={{ fontSize:"32px", fontWeight:800, margin:"8px 0", letterSpacing:"-1px" }}>DatePicker</h1>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"13px" }}>¿Cómo quieres investigar este componente?</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
            <button onClick={() => { setMode("quick"); setPhase("research"); }}
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(76,201,240,0.2)", borderRadius:"16px", padding:"24px 16px", cursor:"pointer", textAlign:"left", borderTop:"3px solid #4cc9f0" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(76,201,240,0.04)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
              <div style={{ marginBottom:"12px" }}><Filter size={22} color="#4cc9f0" /></div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#4cc9f0", marginBottom:"6px" }}>Quick Research</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>Exploración directa. Ver todos los patterns sin definir scope.</div>
              <div style={{ marginTop:"12px", fontSize:"9px", color:"rgba(255,255,255,0.2)", fontFamily:"monospace" }}>/research datepicker</div>
            </button>
            <button onClick={() => { setMode("full"); setPhase("scope"); }}
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(233,69,96,0.2)", borderRadius:"16px", padding:"24px 16px", cursor:"pointer", textAlign:"left", borderTop:"3px solid #e94560" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(233,69,96,0.04)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
              <div style={{ marginBottom:"12px" }}><ListChecks size={22} color="#e94560" /></div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#e94560", marginBottom:"6px" }}>Guided Research</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>Preguntas visuales que definen qué patterns investigar.</div>
              <div style={{ marginTop:"12px", fontSize:"9px", color:"rgba(255,255,255,0.2)", fontFamily:"monospace" }}>/research datepicker --guided</div>
            </button>
            <button onClick={() => { setMode("brief"); setPhase("brief-input"); }}
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(139,92,246,0.2)", borderRadius:"16px", padding:"24px 16px", cursor:"pointer", textAlign:"left", borderTop:"3px solid #8b5cf6" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(139,92,246,0.04)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
              <div style={{ marginBottom:"12px" }}><Hash size={22} color="#8b5cf6" /></div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#8b5cf6", marginBottom:"6px" }}>Tengo Requerimientos</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>Pega tu brief o ticket y analizamos qué cubre y qué falta.</div>
              <div style={{ marginTop:"12px", fontSize:"9px", color:"rgba(255,255,255,0.2)", fontFamily:"monospace" }}>/research datepicker --brief</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:"#06060c", minHeight:"100vh", color:"#e8e8ef", fontFamily:"'DM Sans',-apple-system,sans-serif", padding:"24px 14px", paddingBottom:"80px" }}>
      <div style={{ maxWidth:"820px", margin:"0 auto" }}>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"2px" }}>
              <span style={{ fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:"#e94560", fontWeight:800 }}>Research Agent</span>
              <span style={{ fontSize:"9px", padding:"2px 8px", borderRadius:"4px", fontWeight:700, background:mode==="quick"?"rgba(76,201,240,0.15)":mode==="brief"?"rgba(139,92,246,0.15)":"rgba(233,69,96,0.15)", color:mode==="quick"?"#4cc9f0":mode==="brief"?"#8b5cf6":"#e94560" }}>
                {mode==="quick"?"QUICK":mode==="brief"?"BRIEF":"GUIDED"}
              </span>
            </div>
            <h1 style={{ fontSize:"24px", fontWeight:800, margin:0, letterSpacing:"-0.5px" }}>DatePicker</h1>
          </div>
          {/* Mode dropdown */}
          <div style={{ position:"relative" }} ref={dropdownRef}>
            <button onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
              style={{
                display:"flex", alignItems:"center", gap:"6px",
                background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.5)", padding:"7px 12px", borderRadius:"8px",
                fontSize:"11px", cursor:"pointer", fontWeight:600,
              }}>
              {mode==="quick" ? <Filter size={12} color="#4cc9f0"/> : mode==="brief" ? <Hash size={12} color="#8b5cf6"/> : <ListChecks size={12} color="#e94560"/>}
              {mode==="quick"?"Quick":mode==="brief"?"Brief":"Guided"}
              <ChevronDown size={12} color="rgba(255,255,255,0.3)" style={{ transform:modeDropdownOpen?"rotate(180deg)":"", transition:"transform 0.2s" }} />
            </button>
            {modeDropdownOpen && (
              <div style={{
                position:"absolute", top:"100%", right:0, marginTop:"4px", zIndex:50,
                background:"#14141f", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px",
                padding:"4px", minWidth:"200px", boxShadow:"0 8px 30px rgba(0,0,0,0.5)",
              }}>
                {[
                  { m:"quick", label:"Quick Research", desc:"Exploración directa", icon:Filter, color:"#4cc9f0", ph:"research" },
                  { m:"full", label:"Guided Research", desc:"Preguntas visuales", icon:ListChecks, color:"#e94560", ph:"scope" },
                  { m:"brief", label:"Tengo Requerimientos", desc:"Pegar brief o ticket", icon:Hash, color:"#8b5cf6", ph:"brief-input" },
                ].map(opt => (
                  <button key={opt.m} onClick={() => {
                    setMode(opt.m); setPhase(opt.ph); setCurrentQ(0); setAnswers({}); setSelectedVariants(null);
                    setUserDecisions({}); setGapResolutions({}); setBriefText(""); setBriefAnalysis(null);
                    setModeDropdownOpen(false);
                  }} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"10px",
                    padding:"8px 10px", borderRadius:"7px", border:"none", cursor:"pointer",
                    background: mode===opt.m ? `${opt.color}12` : "transparent",
                    textAlign:"left",
                  }}
                  onMouseEnter={e => { if(mode!==opt.m) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if(mode!==opt.m) e.currentTarget.style.background="transparent"; }}
                  >
                    <div style={{ width:"28px", height:"28px", borderRadius:"6px", background:`${opt.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <opt.icon size={13} color={opt.color} />
                    </div>
                    <div>
                      <div style={{ fontSize:"11px", fontWeight:600, color: mode===opt.m ? opt.color : "rgba(255,255,255,0.7)" }}>{opt.label}</div>
                      <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)" }}>{opt.desc}</div>
                    </div>
                    {mode===opt.m && <Check size={12} color={opt.color} style={{ marginLeft:"auto" }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phase indicator for guided */}
        {mode === "full" && (
          <div style={{ display:"flex", gap:"3px", marginBottom:"22px", background:"rgba(255,255,255,0.02)", padding:"4px", borderRadius:"10px" }}>
            {[
              {id:"scope",label:"Definir variantes"},
              {id:"confirm",label:"Confirmar patterns"},
              {id:"research",label:"Research"},
            ].map(p => (
              <button key={p.id} onClick={() => {
                if (p.id==="scope") setPhase("scope");
                if (p.id==="confirm" && Object.keys(answers).length>0) initConfirmation();
                if (p.id==="research" && selectedVariants) setPhase("research");
              }} style={{
                flex:1, padding:"9px", borderRadius:"7px", border:"none", cursor:"pointer",
                fontSize:"11px", fontWeight:700, fontFamily:"monospace",
                background: phase===p.id ? "rgba(233,69,96,0.15)" : "transparent",
                color: phase===p.id ? "#f0f0f0" : "rgba(255,255,255,0.2)",
              }}>{p.label}</button>
            ))}
          </div>
        )}

        {/* Phase indicator for brief */}
        {mode === "brief" && (
          <div style={{ display:"flex", gap:"3px", marginBottom:"22px", background:"rgba(255,255,255,0.02)", padding:"4px", borderRadius:"10px" }}>
            {[
              {id:"brief-input",label:"01 · Pegar brief"},
              {id:"brief-analysis",label:"02 · Análisis"},
              {id:"research",label:"03 · Research"},
            ].map(p => (
              <button key={p.id} onClick={() => {
                if (p.id==="brief-input") setPhase("brief-input");
                if (p.id==="brief-analysis" && briefAnalysis) setPhase("brief-analysis");
                if (p.id==="research" && briefAnalysis) { setAnswers(briefAnalysis.extracted); initConfirmation(); setPhase("research"); }
              }} style={{
                flex:1, padding:"9px", borderRadius:"7px", border:"none", cursor:"pointer",
                fontSize:"11px", fontWeight:700, fontFamily:"monospace",
                background: phase===p.id ? "rgba(139,92,246,0.15)" : "transparent",
                color: phase===p.id ? "#f0f0f0" : "rgba(255,255,255,0.2)",
              }}>{p.label}</button>
            ))}
          </div>
        )}

        {/* ═══════ BRIEF INPUT ═══════ */}
        {phase === "brief-input" && mode === "brief" && (
          <div>
            <h2 style={{ fontSize:"20px", fontWeight:700, margin:"0 0 6px" }}>Pega tu brief, ticket, o requerimientos</h2>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:"0 0 20px" }}>
              Puede ser un ticket de Jira, un brief del PM, un doc de requerimientos, o simplemente una descripción de lo que necesitas. El agente va a extraer las decisiones implícitas y detectar qué falta.
            </p>
            <textarea
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              placeholder={"Ejemplo:\n\nNecesitamos un date picker para el dashboard de reportes. El usuario debe poder seleccionar un rango de fechas para filtrar los datos. Debe funcionar como popover al hacer click en el campo. Necesitamos rangos predefinidos como 'últimos 7 días' y 'este mes'. Debe soportar múltiples idiomas."}
              style={{
                width:"100%", minHeight:"180px", padding:"16px", borderRadius:"12px",
                background:"rgba(255,255,255,0.03)", border:"1.5px solid rgba(139,92,246,0.2)",
                color:"#e8e8ef", fontSize:"13px", fontFamily:"inherit", lineHeight:1.6,
                resize:"vertical", outline:"none",
              }}
              onFocus={(e) => e.target.style.borderColor="rgba(139,92,246,0.5)"}
              onBlur={(e) => e.target.style.borderColor="rgba(139,92,246,0.2)"}
            />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"16px" }}>
              <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.25)" }}>
                {briefText.length > 0 ? `${briefText.split(/\s+/).filter(Boolean).length} palabras` : "Pega o escribe tu brief"}
              </span>
              <button onClick={() => {
                if (briefText.trim().length < 10) return;
                const analysis = analyzeBrief(briefText);
                setBriefAnalysis(analysis);
                setAnswers(analysis.extracted);
                setPhase("brief-analysis");
              }} style={{
                background: briefText.trim().length >= 10 ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "rgba(255,255,255,0.04)",
                border:"none", color: briefText.trim().length >= 10 ? "#fff" : "rgba(255,255,255,0.15)",
                padding:"12px 24px", borderRadius:"10px", fontSize:"13px", fontWeight:700,
                cursor: briefText.trim().length >= 10 ? "pointer" : "default",
              }}>
                Analizar brief →
              </button>
            </div>
          </div>
        )}

        {/* ═══════ BRIEF ANALYSIS ═══════ */}
        {phase === "brief-analysis" && mode === "brief" && briefAnalysis && (
          <div>
            {/* Coverage score */}
            <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"20px", padding:"16px", background:"rgba(255,255,255,0.03)", borderRadius:"14px", border:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{
                width:"64px", height:"64px", borderRadius:"50%", flexShrink:0,
                background: `conic-gradient(${briefAnalysis.coveredCount >= 8 ? "#22c55e" : briefAnalysis.coveredCount >= 5 ? "#f59e0b" : "#ef4444"} ${(briefAnalysis.coveredCount / briefAnalysis.totalDimensions) * 360}deg, rgba(255,255,255,0.06) 0deg)`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", background:"#0a0a14", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                  <span style={{ fontSize:"18px", fontWeight:800, color:"#f0f0f0", fontFamily:"monospace", lineHeight:1 }}>{briefAnalysis.coveredCount}</span>
                  <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)" }}>de {briefAnalysis.totalDimensions}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize:"16px", fontWeight:700, color:"#f0f0f0", marginBottom:"4px" }}>
                  Tu brief cubre {briefAnalysis.coveredCount} de {briefAnalysis.totalDimensions} dimensiones
                </div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>
                  {briefAnalysis.gapCount > 0
                    ? `Hay ${briefAnalysis.gapCount} dimensiones que tu brief no menciona. Esto no significa que estén mal — pero deberían ser decisiones conscientes, no omisiones.`
                    : "Tu brief es bastante completo. Vamos a compararlo con cómo lo resuelven los principales design systems."}
                </div>
              </div>
            </div>

            {/* What we found */}
            <div style={{ marginBottom:"20px" }}>
              <h3 style={{ fontSize:"14px", fontWeight:700, color:"#22c55e", margin:"0 0 10px", display:"flex", alignItems:"center", gap:"6px" }}>
                <Check size={14} color="#22c55e" /> Lo que tu brief define ({briefAnalysis.covered.length})
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                {briefAnalysis.covered.map((c,i) => (
                  <div key={i} style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    padding:"8px 12px", borderRadius:"8px",
                    background:"rgba(34,197,94,0.04)", border:"1px solid rgba(34,197,94,0.1)",
                  }}>
                    <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.7)" }}>{c.dim}</span>
                    <span style={{ fontSize:"11px", color:"#22c55e", fontWeight:600, fontFamily:"monospace" }}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Gaps — resolve inline with wireframes */}
            {briefAnalysis.gaps.length > 0 && (() => {
              const resolvedCount = briefAnalysis.gaps.filter(g => {
                if (g.dim==="Tipo de selección") return !!answers.type;
                if (g.dim==="Presentación") return !!answers.display;
                if (g.dim==="Hora") return !!answers.time;
                return !!gapResolutions[g.dim];
              }).length;

              // Gap definitions with visual options
              const gapConfigs = {
                "Tipo de selección": {
                  options: [
                    { value:"single", label:"Una fecha", desc:"El usuario elige un solo día. Ej: nacimiento, deadline, evento.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"6px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Mar 22, 2026</span>
                            <Calendar size={9} color="rgba(76,201,240,0.4)" />
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
                            {Array.from({length:21}).map((_,i) => (
                              <div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:i===14?"rgba(76,201,240,0.25)":"rgba(255,255,255,0.03)", border:i===14?"1px solid rgba(76,201,240,0.5)":"1px solid rgba(255,255,255,0.03)" }} />
                            ))}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", marginTop:"5px" }}>
                            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"rgba(76,201,240,0.3)", border:"1px solid rgba(76,201,240,0.5)" }} />
                            <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.3)" }}>Un día seleccionado</span>
                          </div>
                        </div>
                      )},
                    { value:"range", label:"Un rango", desc:"Inicio y fin. Ej: reserva, filtro de reportes, vacaciones.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ display:"flex", gap:"4px", marginBottom:"6px" }}>
                            <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 7px" }}>
                              <span style={{ fontSize:"8px", color:"rgba(139,92,246,0.5)", fontFamily:"monospace" }}>Mar 15</span>
                            </div>
                            <ArrowRight size={10} color="rgba(255,255,255,0.15)" style={{ alignSelf:"center", flexShrink:0 }} />
                            <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 7px" }}>
                              <span style={{ fontSize:"8px", color:"rgba(139,92,246,0.5)", fontFamily:"monospace" }}>Mar 22</span>
                            </div>
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
                            {Array.from({length:21}).map((_,i) => {
                              const inRange = i >= 8 && i <= 14;
                              const isEdge = i === 8 || i === 14;
                              return (
                                <div key={i} style={{ aspectRatio:"1", borderRadius:"2px",
                                  background: isEdge ? "rgba(139,92,246,0.3)" : inRange ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
                                  border: isEdge ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.03)" }} />
                              );
                            })}
                          </div>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"3px", marginTop:"5px" }}>
                            <div style={{ width:"20px", height:"6px", borderRadius:"3px", background:"rgba(139,92,246,0.2)", border:"1px solid rgba(139,92,246,0.3)" }} />
                            <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.3)" }}>Rango seleccionado</span>
                          </div>
                        </div>
                      )},
                    { value:"both", label:"Ambos", desc:"Tu DS necesita ambos. Dos componentes que comparten Calendar.",
                      wireframe: () => (
                        <div style={{ display:"flex", gap:"4px", padding:"8px" }}>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.03)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(76,201,240,0.12)" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"3px", marginBottom:"4px" }}>
                              <Calendar size={7} color="rgba(76,201,240,0.5)" />
                              <span style={{ fontSize:"6px", color:"rgba(76,201,240,0.5)", fontFamily:"monospace", fontWeight:700 }}>DatePicker</span>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px" }}>
                              {Array.from({length:10}).map((_,i) => (
                                <div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:i===7?"rgba(76,201,240,0.2)":"rgba(255,255,255,0.03)" }} />
                              ))}
                            </div>
                          </div>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.03)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(139,92,246,0.12)" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"3px", marginBottom:"4px" }}>
                              <CalendarRange size={7} color="rgba(139,92,246,0.5)" />
                              <span style={{ fontSize:"6px", color:"rgba(139,92,246,0.5)", fontFamily:"monospace", fontWeight:700 }}>RangePicker</span>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px" }}>
                              {Array.from({length:10}).map((_,i) => {
                                const inR = i>=3&&i<=7;
                                return <div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:inR?"rgba(139,92,246,0.12)":"rgba(255,255,255,0.03)" }} />;
                              })}
                            </div>
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setAnswers({...answers, type:v}),
                  current: answers.type,
                },
                "Presentación": {
                  options: [
                    { value:"popover", label:"Popover", desc:"Se abre al hacer click en el input",
                      wireframe: () => (
                        <div style={{ padding:"6px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 7px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"3px" }}>
                            <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Mar 22, 2026</span>
                            <Calendar size={8} color="rgba(139,92,246,0.5)" />
                          </div>
                          <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:21}).map((_,i)=>(
                                <div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:i===14?"rgba(139,92,246,0.2)":"rgba(255,255,255,0.02)" }}/>
                              ))}
                            </div>
                          </div>
                        </div>
                      )},
                    { value:"inline", label:"Inline", desc:"Siempre visible en la página",
                      wireframe: () => (
                        <div style={{ padding:"6px" }}>
                          <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(34,197,94,0.15)" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px", padding:"0 2px" }}>
                              <ChevronLeft size={7} color="rgba(255,255,255,0.2)"/>
                              <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace", fontWeight:700 }}>March</span>
                              <ChevronRight size={7} color="rgba(255,255,255,0.2)"/>
                            </div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:28}).map((_,i)=>(
                                <div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:i===21?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.02)" }}/>
                              ))}
                            </div>
                          </div>
                        </div>
                      )},
                    { value:"flexible", label:"Ambos", desc:"Popover + inline según contexto",
                      wireframe: () => (
                        <div style={{ display:"flex", gap:"3px", padding:"6px" }}>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.03)", borderRadius:"3px", padding:"3px", border:"1px solid rgba(76,201,240,0.1)" }}>
                            <div style={{ fontSize:"5px", color:"rgba(76,201,240,0.4)", textAlign:"center", marginBottom:"2px" }}>Popover</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px" }}>
                              {Array.from({length:8}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                          </div>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.03)", borderRadius:"3px", padding:"3px", border:"1px solid rgba(34,197,94,0.1)" }}>
                            <div style={{ fontSize:"5px", color:"rgba(34,197,94,0.4)", textAlign:"center", marginBottom:"2px" }}>Inline</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px" }}>
                              {Array.from({length:8}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setAnswers({...answers, display:v}),
                  current: answers.display,
                },
                "Hora": {
                  options: [
                    { value:"date-only", label:"Solo fecha", desc:"Día, mes y año. Cubre el 80% de casos.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"7px 9px", border:"1px solid rgba(255,255,255,0.08)" }}>
                            <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>22 / 03 / 2026</span>
                          </div>
                        </div>
                      )},
                    { value:"datetime", label:"Fecha + Hora", desc:"Para scheduling, reuniones, timestamps.",
                      wireframe: () => (
                        <div style={{ display:"flex", gap:"4px", padding:"8px" }}>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"6px 8px" }}>
                            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>22/03/2026</span>
                          </div>
                          <div style={{ flex:"0 0 auto", background:"rgba(236,72,153,0.08)", borderRadius:"4px", padding:"6px 8px", border:"1px solid rgba(236,72,153,0.15)" }}>
                            <span style={{ fontSize:"9px", color:"rgba(236,72,153,0.6)", fontFamily:"monospace" }}>14:30</span>
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setAnswers({...answers, time:v}),
                  current: answers.time,
                },
                "Accesibilidad": {
                  options: [
                    { value:"aa", label:"WCAG AA", desc:"Keyboard nav, screen reader, contraste 4.5:1. El estándar de la industria.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
                            {[{icon:Keyboard, t:"Tab / Arrow nav"},{icon:Eye, t:"Screen reader"},{icon:Check, t:"Contraste 4.5:1"}].map((r,i)=>(
                              <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", padding:"3px 6px", background:"rgba(255,255,255,0.02)", borderRadius:"3px" }}>
                                <r.icon size={8} color="rgba(34,197,94,0.5)" />
                                <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>{r.t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )},
                    { value:"aaa", label:"WCAG AAA", desc:"Todo de AA + contraste 7:1, timing ajustable, sin movimiento obligatorio.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
                            {[{icon:Keyboard, t:"Tab / Arrow nav"},{icon:Eye, t:"Screen reader"},{icon:Check, t:"Contraste 7:1"},{icon:Clock, t:"Sin time limits"},{icon:Minus, t:"Reduced motion"}].map((r,i)=>(
                              <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", padding:"3px 6px", background:"rgba(255,255,255,0.02)", borderRadius:"3px" }}>
                                <r.icon size={8} color="rgba(139,92,246,0.5)" />
                                <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.4)" }}>{r.t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Accesibilidad":v}),
                  current: gapResolutions["Accesibilidad"],
                },
                "Mobile / Responsive": {
                  options: [
                    { value:"responsive", label:"Responsive (mismo componente)", desc:"El popover se adapta a pantallas pequeñas.",
                      wireframe: () => (
                        <div style={{ display:"flex", gap:"4px", padding:"8px", alignItems:"flex-end" }}>
                          <div style={{ width:"55%", background:"rgba(255,255,255,0.03)", borderRadius:"3px", padding:"4px", border:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:14}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                            <div style={{ fontSize:"5px", color:"rgba(255,255,255,0.2)", textAlign:"center", marginTop:"2px" }}>Desktop</div>
                          </div>
                          <div style={{ width:"30%", background:"rgba(255,255,255,0.03)", borderRadius:"3px", padding:"3px", border:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:14}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                            <div style={{ fontSize:"5px", color:"rgba(255,255,255,0.2)", textAlign:"center", marginTop:"2px" }}>Mobile</div>
                          </div>
                        </div>
                      )},
                    { value:"modal-mobile", label:"Modal en mobile", desc:"Full-screen en móvil, evita teclado virtual.",
                      wireframe: () => (
                        <div style={{ display:"flex", gap:"4px", padding:"8px", alignItems:"flex-end" }}>
                          <div style={{ width:"50%", background:"rgba(255,255,255,0.03)", borderRadius:"3px", padding:"4px", border:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize:"5px", color:"rgba(255,255,255,0.2)", textAlign:"center", marginBottom:"2px" }}>Popover</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:14}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                          </div>
                          <div style={{ width:"28%", background:"rgba(233,69,96,0.04)", borderRadius:"6px", padding:"3px", border:"1px solid rgba(233,69,96,0.15)" }}>
                            <div style={{ fontSize:"5px", color:"rgba(233,69,96,0.5)", textAlign:"center", marginBottom:"2px" }}>Modal</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
                              {Array.from({length:14}).map((_,i)=>(<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }}/>))}
                            </div>
                            <div style={{ display:"flex", gap:"2px", justifyContent:"flex-end", marginTop:"3px" }}>
                              <div style={{ fontSize:"4px", color:"rgba(255,255,255,0.2)", padding:"1px 3px", background:"rgba(255,255,255,0.04)", borderRadius:"2px" }}>Cancel</div>
                              <div style={{ fontSize:"4px", color:"#fff", padding:"1px 3px", background:"rgba(233,69,96,0.3)", borderRadius:"2px" }}>OK</div>
                            </div>
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Mobile / Responsive":v}),
                  current: gapResolutions["Mobile / Responsive"],
                },
                "Validación y errores": {
                  options: [
                    { value:"basic", label:"Errores básicos", desc:"Formato inválido, fecha fuera de rango.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 8px", border:"1px solid rgba(239,68,68,0.3)", marginBottom:"3px" }}>
                            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>13/25/2026</span>
                          </div>
                          <div style={{ fontSize:"8px", color:"rgba(239,68,68,0.6)", display:"flex", alignItems:"center", gap:"3px" }}>
                            <X size={7} color="rgba(239,68,68,0.5)"/>Fecha inválida
                          </div>
                        </div>
                      )},
                    { value:"exhaustive", label:"Errores por tipo (Paste)", desc:"Cada error tiene su mensaje: formato, rango, pasada, deshabilitada.",
                      wireframe: () => (
                        <div style={{ padding:"8px", display:"flex", flexDirection:"column", gap:"3px" }}>
                          {[{msg:"Formato incorrecto", ex:"Use DD/MM/YYYY"},{msg:"Fecha fuera de rango", ex:"Min: 01/01/2025"},{msg:"Fecha no disponible", ex:"Fines de semana bloqueados"}].map((e,i)=>(
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:"4px", padding:"3px 5px", background:"rgba(239,68,68,0.04)", borderRadius:"3px", border:"1px solid rgba(239,68,68,0.08)" }}>
                              <X size={6} color="rgba(239,68,68,0.4)"/>
                              <span style={{ fontSize:"7px", color:"rgba(239,68,68,0.5)" }}>{e.msg}</span>
                              <span style={{ fontSize:"6px", color:"rgba(255,255,255,0.2)", marginLeft:"auto" }}>{e.ex}</span>
                            </div>
                          ))}
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Validación y errores":v}),
                  current: gapResolutions["Validación y errores"],
                },
                "Timezone": {
                  options: [
                    { value:"naive", label:"Sin timezone", desc:"Las fechas se manejan como strings locales. Suficiente si todos los usuarios están en la misma zona.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"6px 8px", marginBottom:"4px" }}>
                            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>2026-03-22</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                            <Globe size={8} color="rgba(255,255,255,0.2)" />
                            <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.25)" }}>Misma zona para todos</span>
                          </div>
                        </div>
                      )},
                    { value:"aware", label:"Timezone-aware", desc:"Cada fecha incluye zona horaria. Obligatorio si usuarios en diferentes zonas ven los mismos datos.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"6px 8px", marginBottom:"4px" }}>
                            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>2026-03-22T14:30</span>
                            <span style={{ fontSize:"7px", color:"rgba(76,201,240,0.5)", fontFamily:"monospace", marginLeft:"4px" }}>UTC-5</span>
                          </div>
                          <div style={{ display:"flex", gap:"3px", marginTop:"3px" }}>
                            {["NYC 2:30pm","LON 7:30pm","TYO 3:30am"].map((z,i) => (
                              <div key={i} style={{ flex:1, padding:"3px 4px", background:"rgba(76,201,240,0.05)", borderRadius:"3px", border:"1px solid rgba(76,201,240,0.1)" }}>
                                <span style={{ fontSize:"6px", color:"rgba(76,201,240,0.5)", fontFamily:"monospace" }}>{z}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Timezone":v}),
                  current: gapResolutions["Timezone"],
                },
                "Motion / Animación": {
                  options: [
                    { value:"none", label:"Sin animación", desc:"El calendario aparece y desaparece instantáneamente. Más simple, mejor performance.",
                      wireframe: () => (
                        <div style={{ padding:"8px", display:"flex", gap:"6px", alignItems:"center" }}>
                          <div style={{ flex:1 }}>
                            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 8px", marginBottom:"3px" }}>
                              <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Click</span>
                            </div>
                            <ArrowRight size={8} color="rgba(255,255,255,0.15)" style={{ display:"block", margin:"2px auto" }} />
                            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(255,255,255,0.06)" }}>
                              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px" }}>
                                {Array.from({length:10}).map((_,i) => (<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(255,255,255,0.03)" }} />))}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.2)", textAlign:"center" }}>Instant<br/>0ms</div>
                        </div>
                      )},
                    { value:"subtle", label:"Animación sutil", desc:"Fade + slide al abrir (150-200ms). Navegación de meses con transición. Respeta prefers-reduced-motion.",
                      wireframe: () => (
                        <div style={{ padding:"8px", display:"flex", gap:"6px", alignItems:"center" }}>
                          <div style={{ flex:1 }}>
                            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px 8px", marginBottom:"3px" }}>
                              <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Click</span>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:"2px", justifyContent:"center", margin:"2px 0" }}>
                              {[0.15, 0.35, 0.6, 0.85, 1].map((op, i) => (
                                <div key={i} style={{ width:"4px", height:"4px", borderRadius:"50%", background:`rgba(139,92,246,${op})` }} />
                              ))}
                            </div>
                            <div style={{ background:"rgba(139,92,246,0.04)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(139,92,246,0.12)" }}>
                              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px" }}>
                                {Array.from({length:10}).map((_,i) => (<div key={i} style={{ aspectRatio:"1", borderRadius:"1px", background:"rgba(139,92,246,0.06)" }} />))}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize:"7px", color:"rgba(139,92,246,0.5)", textAlign:"center" }}>Fade+Slide<br/>200ms</div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Motion / Animación":v}),
                  current: gapResolutions["Motion / Animación"],
                },
                "Theming / Tokens": {
                  options: [
                    { value:"basic", label:"Tokens básicos", desc:"Usa tokens semánticos del DS para colores y spacing. Sin dark mode dedicado.",
                      wireframe: () => (
                        <div style={{ padding:"8px" }}>
                          {["bg-surface","text-primary","border-default","accent-primary"].map((t,i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"2px 0" }}>
                              <div style={{ width:"10px", height:"10px", borderRadius:"2px", background:i===0?"rgba(255,255,255,0.06)":i===1?"rgba(255,255,255,0.7)":i===2?"rgba(255,255,255,0.1)":"rgba(139,92,246,0.4)" }} />
                              <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.35)", fontFamily:"monospace" }}>{t}</span>
                            </div>
                          ))}
                        </div>
                      )},
                    { value:"full", label:"Theming completo", desc:"Dark mode, multi-brand override, todos los estados con tokens dedicados.",
                      wireframe: () => (
                        <div style={{ padding:"8px", display:"flex", gap:"4px" }}>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:"4px", padding:"5px" }}>
                            <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.3)", textAlign:"center", marginBottom:"3px" }}>Light</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
                              {Array.from({length:6}).map((_,i) => (<div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:"rgba(0,0,0,0.1)" }} />))}
                            </div>
                          </div>
                          <div style={{ flex:1, background:"rgba(20,20,30,0.8)", borderRadius:"4px", padding:"5px", border:"1px solid rgba(255,255,255,0.06)" }}>
                            <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.3)", textAlign:"center", marginBottom:"3px" }}>Dark</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
                              {Array.from({length:6}).map((_,i) => (<div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:"rgba(255,255,255,0.06)" }} />))}
                            </div>
                          </div>
                        </div>
                      )},
                  ],
                  onSelect: (v) => setGapResolutions({...gapResolutions, "Theming / Tokens":v}),
                  current: gapResolutions["Theming / Tokens"],
                },
              };

              // ── SELF-CHECK: verify all gaps have visual configs ──
              const missingConfigs = briefAnalysis.gaps.filter(g => !gapConfigs[g.dim]);
              // If this fires, a gap needs wireframe options added to gapConfigs above
              if (missingConfigs.length > 0) {
                console.warn("⚠️ GAPS SIN WIREFRAME:", missingConfigs.map(g => g.dim));
              }

              return (
              <div style={{ marginBottom:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <h3 style={{ fontSize:"14px", fontWeight:700, color:"#f59e0b", margin:0, display:"flex", alignItems:"center", gap:"6px" }}>
                    <Eye size={14} color="#f59e0b" /> Completa lo que falta ({briefAnalysis.gaps.length})
                  </h3>
                  <span style={{ fontSize:"10px", color: resolvedCount === briefAnalysis.gaps.length ? "#22c55e" : "rgba(255,255,255,0.3)" }}>
                    {resolvedCount === briefAnalysis.gaps.length ? (
                      <span style={{ display:"flex", alignItems:"center", gap:"4px" }}><Check size={10} color="#22c55e" />Todo resuelto</span>
                    ) : `${resolvedCount} de ${briefAnalysis.gaps.length} resueltos`}
                  </span>
                </div>
                <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", margin:"0 0 14px", lineHeight:1.5 }}>
                  Tu brief no menciona estas dimensiones. Selecciona una opción para cada una — el wireframe te muestra cómo se ve.
                </p>

                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {briefAnalysis.gaps.map((g,gi) => {
                    const config = gapConfigs[g.dim];
                    const isResolved = config ? !!config.current : !!gapResolutions[g.dim];
                    const impColor = g.impact==="high"?"#ef4444":g.impact==="medium"?"#f59e0b":"#64748b";

                    return (
                      <div key={gi} style={{
                        borderRadius:"12px", overflow:"hidden",
                        background: isResolved ? "rgba(34,197,94,0.03)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${isResolved ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)"}`,
                        borderLeft: `3px solid ${isResolved ? "#22c55e" : impColor}`,
                        transition:"all 0.2s",
                      }}>
                        {/* Header */}
                        <div style={{ padding:"12px 14px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                              {isResolved ? <Check size={12} color="#22c55e"/> : <div style={{ width:"12px", height:"12px", borderRadius:"50%", border:`2px solid ${impColor}`, opacity:0.5 }}/>}
                              <span style={{ fontSize:"13px", fontWeight:700, color: isResolved ? "#22c55e" : "#f0f0f0" }}>{g.dim}</span>
                            </div>
                            <span style={{ fontSize:"8px", padding:"2px 6px", borderRadius:"100px", fontWeight:700,
                              background: isResolved ? "rgba(34,197,94,0.12)" : `${impColor}15`,
                              color: isResolved ? "#22c55e" : impColor,
                              textTransform:"uppercase" }}>{isResolved ? "Resuelto" : g.impact}</span>
                          </div>
                          <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.45)", lineHeight:1.4 }}>{g.why}</div>
                        </div>

                        {/* Visual options */}
                        {config && (
                          <div style={{ padding:"0 14px 14px", display:"grid", gridTemplateColumns:`repeat(${config.options.length}, 1fr)`, gap:"6px" }}>
                            {config.options.map((opt) => {
                              const sel = config.current === opt.value;
                              return (
                                <div key={opt.value} onClick={() => config.onSelect(opt.value)}
                                  style={{
                                    borderRadius:"10px", cursor:"pointer", overflow:"hidden",
                                    border: `1.5px solid ${sel ? "#8b5cf6" : "rgba(255,255,255,0.06)"}`,
                                    background: sel ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.02)",
                                    transition:"all 0.15s",
                                  }}>
                                  {/* Wireframe */}
                                  <div style={{ background:"rgba(0,0,0,0.25)", minHeight:"60px" }}>
                                    <opt.wireframe />
                                  </div>
                                  {/* Label */}
                                  <div style={{ padding:"8px 10px" }}>
                                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2px" }}>
                                      <span style={{ fontSize:"11px", fontWeight:700, color: sel ? "#8b5cf6" : "rgba(255,255,255,0.6)" }}>{opt.label}</span>
                                      <div style={{
                                        width:"14px", height:"14px", borderRadius:"50%",
                                        border: `2px solid ${sel ? "#8b5cf6" : "rgba(255,255,255,0.12)"}`,
                                        background: sel ? "#8b5cf6" : "transparent",
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                      }}>
                                        {sel && <Check size={8} color="#fff" />}
                                      </div>
                                    </div>
                                    <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.35)", lineHeight:1.4 }}>{opt.desc}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* For gaps without visual config — should not happen, self-check above catches this */}
                        {!config && !isResolved && (
                          <div style={{ padding:"0 14px 12px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 10px", background:"rgba(239,68,68,0.05)", borderRadius:"6px", border:"1px solid rgba(239,68,68,0.1)" }}>
                              <X size={10} color="rgba(239,68,68,0.4)" />
                              <span style={{ fontSize:"10px", color:"rgba(239,68,68,0.5)" }}>Wireframe no disponible para esta dimensión</span>
                              <button onClick={() => setGapResolutions({...gapResolutions, [g.dim]:"deferred"})}
                                style={{ marginLeft:"auto", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.4)", padding:"4px 10px", borderRadius:"5px", fontSize:"9px", cursor:"pointer" }}>
                                Diferir a v2
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              );
            })()}

            <button onClick={() => { initConfirmation(); setPhase("confirm"); }}
              style={{
                width:"100%", padding:"14px",
                background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",
                border:"none", borderRadius:"10px", color:"#fff",
                fontSize:"13px", fontWeight:700, cursor:"pointer",
              }}>
              Ver patterns recomendados →
            </button>
          </div>
        )}

        {/* ═══════ SCOPE (VISUAL QUESTIONS) ═══════ */}
        {phase === "scope" && mode === "full" && (() => {
          const q = questions[currentQ];
          return (
            <div>
              {/* Progress */}
              <div style={{ display:"flex", gap:"4px", marginBottom:"24px" }}>
                {questions.map((_,i) => (
                  <div key={i} style={{ flex:1, height:"3px", borderRadius:"2px", background: i<currentQ?"#22c55e":i===currentQ?"#e94560":"rgba(255,255,255,0.06)", transition:"all 0.3s" }}/>
                ))}
              </div>

              {/* Question */}
              <div style={{ marginBottom:"6px" }}>
                <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.2)", fontFamily:"monospace" }}>{currentQ+1} de {questions.length}</span>
              </div>
              <h2 style={{ fontSize:"20px", fontWeight:700, margin:"0 0 6px", lineHeight:1.3 }}>{q.question}</h2>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.6, margin:"0 0 20px" }}>{q.context}</p>

              {/* Options with visuals */}
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {q.options.map(opt => {
                  const sel = q.multi ? (answers[q.id]||[]).includes(opt.value) : answers[q.id]===opt.value;
                  const Visual = opt.Visual;
                  return (
                    <button key={opt.value} onClick={() => handleAnswer(q.id, opt.value, q.multi)}
                      style={{
                        background: sel ? `${opt.color}08` : "rgba(255,255,255,0.02)",
                        border: `1.5px solid ${sel ? `${opt.color}60` : "rgba(255,255,255,0.06)"}`,
                        borderRadius:"14px", padding:"14px 16px", cursor:"pointer", textAlign:"left",
                        display:"flex", gap:"16px", alignItems:"center", transition:"all 0.15s",
                      }}>
                      {/* Visual preview */}
                      <div style={{
                        width:"100px", minWidth:"100px", height:"65px",
                        background:"rgba(0,0,0,0.3)", borderRadius:"8px", padding:"4px",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        border: `1px solid ${sel ? `${opt.color}25` : "rgba(255,255,255,0.04)"}`,
                        overflow:"hidden",
                      }}>
                        <Visual />
                      </div>
                      {/* Text */}
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:"14px", fontWeight:600, color: sel ? "#f0f0f0" : "rgba(255,255,255,0.65)", marginBottom:"3px" }}>{opt.label}</div>
                        <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", lineHeight:1.5 }}>{opt.desc}</div>
                      </div>
                      {/* Checkbox */}
                      <div style={{
                        width:"20px", height:"20px", borderRadius: q.multi?"5px":"50%",
                        border:`2px solid ${sel ? opt.color : "rgba(255,255,255,0.12)"}`,
                        background: sel ? opt.color : "transparent",
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                      }}>
                        {sel && <span style={{ color:"#fff", fontSize:"11px", fontWeight:800 }}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"22px" }}>
                <button onClick={() => currentQ>0&&setCurrentQ(currentQ-1)}
                  style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color: currentQ>0?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.12)", padding:"10px 18px", borderRadius:"10px", fontSize:"12px", fontWeight:600, cursor: currentQ>0?"pointer":"default" }}>
                  ← Anterior
                </button>
                <button onClick={() => {
                  if (!canAdvance()) return;
                  if (currentQ<questions.length-1) setCurrentQ(currentQ+1);
                  else initConfirmation();
                }} style={{
                  background: canAdvance()?"linear-gradient(135deg,#e94560,#c23152)":"rgba(255,255,255,0.04)",
                  border:"none", color: canAdvance()?"#fff":"rgba(255,255,255,0.15)",
                  padding:"10px 22px", borderRadius:"10px", fontSize:"12px", fontWeight:700,
                  cursor: canAdvance()?"pointer":"default",
                }}>
                  {currentQ===questions.length-1 ? "Ver patterns recomendados →" : "Siguiente →"}
                </button>
              </div>
            </div>
          );
        })()}

        {/* ═══════ CONFIRMATION ═══════ */}
        {phase === "confirm" && selectedVariants && (
          <div>
            <h2 style={{ fontSize:"18px", fontWeight:700, margin:"0 0 6px" }}>Estos son los patterns que vamos a investigar</h2>
            <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, margin:"0 0 20px" }}>
              Basado en tus respuestas, seleccionamos los patterns más relevantes.
              Puedes deseleccionar los que no necesites o activar otros que te interesen.
            </p>

            {/* Summary of answers */}
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"18px" }}>
              {Object.entries(answers).map(([k,v]) => (
                <span key={k} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"8px", padding:"5px 10px" }}>
                  <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{k} </span>
                  <span style={{ fontSize:"11px", color:"#4cc9f0", fontWeight:600, fontFamily:"monospace" }}>{Array.isArray(v)?v.join(", "):v}</span>
                </span>
              ))}
            </div>

            {/* Pattern cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
              {Object.entries(allVariants).map(([key, v]) => {
                const active = selectedVariants.has(key);
                const suggested = suggestedVariants.includes(key);
                return (
                  <div key={key} onClick={() => toggleVariant(key)}
                    style={{
                      background: active ? `${v.color}06` : "rgba(255,255,255,0.015)",
                      border: `1.5px solid ${active ? `${v.color}50` : "rgba(255,255,255,0.05)"}`,
                      borderRadius:"14px", padding:"14px", cursor:"pointer",
                      transition:"all 0.2s", opacity: active?1:0.5,
                      borderTop: `3px solid ${active ? v.color : "rgba(255,255,255,0.05)"}`,
                      position:"relative",
                    }}>
                    {/* Selection indicator */}
                    <div style={{ position:"absolute", top:"10px", right:"10px",
                      width:"20px", height:"20px", borderRadius:"5px",
                      border:`2px solid ${active?v.color:"rgba(255,255,255,0.1)"}`,
                      background: active?v.color:"transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      {active && <span style={{ color:"#fff", fontSize:"11px", fontWeight:800 }}>✓</span>}
                    </div>

                    {/* Badge */}
                    {suggested && (
                      <span style={{ fontSize:"8px", padding:"2px 6px", borderRadius:"100px", fontWeight:700, background:"rgba(34,197,94,0.1)", color:"#22c55e", position:"absolute", top:"10px", left:"12px" }}>
                        RECOMENDADO
                      </span>
                    )}

                    {/* Wireframe */}
                    <div style={{ marginTop: suggested?"20px":"0", marginBottom:"10px", background:"rgba(0,0,0,0.3)", borderRadius:"8px", padding:"6px", overflow:"hidden" }}>
                      <WireframeLarge variantKey={key} />
                    </div>
                    <div style={{ fontSize:"12px", fontWeight:700, color: active?v.color:"rgba(255,255,255,0.3)", fontFamily:"monospace", marginBottom:"3px" }}>{v.label}</div>
                    <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)", lineHeight:1.4 }}>{v.desc}</div>
                    <div style={{ display:"flex", gap:"3px", flexWrap:"wrap", marginTop:"8px" }}>
                      {v.adopters.map(a => (
                        <span key={a} style={{ background:`${v.color}0a`, color: active?`${v.color}`:"rgba(255,255,255,0.2)", padding:"2px 6px", borderRadius:"100px", fontSize:"8px", fontWeight:600 }}>{a}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected count */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>
                <strong style={{ color:"#f0f0f0" }}>{selectedVariants.size}</strong> patterns seleccionados
              </span>
              <button onClick={() => setPhase("research")}
                style={{
                  background: selectedVariants.size>0?"linear-gradient(135deg,#e94560,#c23152)":"rgba(255,255,255,0.04)",
                  border:"none", color: selectedVariants.size>0?"#fff":"rgba(255,255,255,0.15)",
                  padding:"12px 24px", borderRadius:"10px", fontSize:"13px", fontWeight:700,
                  cursor: selectedVariants.size>0?"pointer":"default",
                }}>
                Investigar estos patterns →
              </button>
            </div>
          </div>
        )}

        {/* ═══════ RESEARCH ═══════ */}
        {phase === "research" && (() => {
          // ── Research cards with variant tags for filtering ──
          const researchCards = [
            {
              system: "Material Design", tier: 1, color: "#e94560",
              relatedVariants: ["input-popover", "modal-mobile", "input-only"],
              summary: "Tres formas de mostrar el calendario según el contexto",
              detail: "Google diseñó tres variantes porque descubrieron que un solo DatePicker no funciona en todos los contextos. En desktop, un popover es suficiente. Pero en mobile, el teclado virtual tapa el popover — por eso crearon una versión en modal full-screen. Y para casos simples (como fecha de nacimiento), solo muestran el input sin calendario.",
              visual: () => (
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  {/* Popover */}
                  <div style={{ flex:"1 1 140px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(233,69,96,0.15)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <Columns2 size={11} color="rgba(233,69,96,0.6)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(233,69,96,0.8)", fontFamily:"monospace" }}>Popover</span>
                      <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.35)", marginLeft:"auto" }}>Desktop</span>
                    </div>
                    {/* Input wireframe */}
                    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"5px", padding:"6px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px" }}>
                      <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Mar 22, 2026</span>
                      <Calendar size={10} color="rgba(233,69,96,0.4)" />
                    </div>
                    {/* Popover dropdown wireframe */}
                    <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:"6px", padding:"6px", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px", padding:"0 2px" }}>
                        <ChevronLeft size={8} color="rgba(255,255,255,0.2)" />
                        <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace", fontWeight:700 }}>March 2026</span>
                        <ChevronRight size={8} color="rgba(255,255,255,0.2)" />
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
                        {["S","M","T","W","T","F","S"].map((d,i)=>(
                          <div key={`h-${i}`} style={{ textAlign:"center", fontSize:"5px", color:"rgba(255,255,255,0.2)", padding:"1px 0" }}>{d}</div>
                        ))}
                        {Array.from({length:28}).map((_,i) => (
                          <div key={i} style={{ aspectRatio:"1", borderRadius:"3px", background:i===21?"rgba(233,69,96,0.25)":"rgba(255,255,255,0.02)", border:i===21?"1px solid rgba(233,69,96,0.5)":"1px solid rgba(255,255,255,0.03)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontSize:"5px", color:i===21?"#e94560":"rgba(255,255,255,0.2)", fontFamily:"monospace" }}>{i+1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Modal */}
                  <div style={{ flex:"1 1 100px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(233,69,96,0.15)", display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px", alignSelf:"flex-start", width:"100%" }}>
                      <Smartphone size={11} color="rgba(233,69,96,0.6)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(233,69,96,0.8)", fontFamily:"monospace" }}>Modal</span>
                      <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.35)", marginLeft:"auto" }}>Mobile</span>
                    </div>
                    {/* Phone frame */}
                    <div style={{ width:"70%", background:"rgba(255,255,255,0.02)", borderRadius:"12px", padding:"6px", border:"1px solid rgba(255,255,255,0.08)", flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px" }}>
                        <span style={{ fontSize:"7px", color:"rgba(233,69,96,0.6)", fontWeight:600 }}>Seleccionar fecha</span>
                        <X size={8} color="rgba(255,255,255,0.25)" />
                      </div>
                      {/* Mini calendar grid */}
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px", marginBottom:"6px" }}>
                        {Array.from({length:21}).map((_,i) => (
                          <div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:i===14?"rgba(233,69,96,0.25)":"rgba(255,255,255,0.03)", border:i===14?"1px solid rgba(233,69,96,0.4)":"none" }} />
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:"4px", justifyContent:"flex-end" }}>
                        <div style={{ fontSize:"6px", color:"rgba(255,255,255,0.3)", padding:"3px 6px", borderRadius:"3px", background:"rgba(255,255,255,0.04)" }}>Cancel</div>
                        <div style={{ fontSize:"6px", color:"#fff", padding:"3px 6px", borderRadius:"3px", background:"rgba(233,69,96,0.4)" }}>OK</div>
                      </div>
                    </div>
                  </div>
                  {/* Input only */}
                  <div style={{ flex:"1 1 140px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(233,69,96,0.15)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <Type size={11} color="rgba(233,69,96,0.6)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(233,69,96,0.8)", fontFamily:"monospace" }}>Input only</span>
                      <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.35)", marginLeft:"auto" }}>Fechas conocidas</span>
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", marginBottom:"6px" }}>Date of birth</div>
                    {/* Input field wireframe */}
                    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"5px", padding:"8px 10px", border:"1px solid rgba(255,255,255,0.08)", marginBottom:"6px" }}>
                      <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", fontFamily:"monospace" }}>03 / 22 / 1990</span>
                    </div>
                    <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", marginBottom:"8px" }}>Formato: MM / DD / YYYY</div>
                    {/* No calendar indicator */}
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", padding:"5px 8px", background:"rgba(255,255,255,0.02)", borderRadius:"5px", border:"1px dashed rgba(255,255,255,0.08)" }}>
                      <Ban size={9} color="rgba(255,255,255,0.2)" />
                      <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)" }}>Sin calendario</span>
                    </div>
                  </div>
                </div>
              ),
              takeaways: {
                default: "Si tu producto se usa en mobile, considera ofrecer una variante de modal. Si hay fechas que el usuario ya conoce (cumpleaños), un input sin calendario es más rápido.",
                single: "Para fecha única, el popover es tu variante principal. Agrega input-only si hay casos de fechas conocidas en tu producto.",
                range: "Para rangos, el popover necesita más espacio. Material usa modal en mobile por esto — en pantallas pequeñas, el rango de fechas necesita más room.",
                popover: "Tu scope usa popover — es la variante principal de Material. Pero tenlos en cuenta: el input-only para fechas conocidas y el modal para mobile son extensiones naturales.",
                inline: "Material no prioriza inline. Polaris o Spectrum son mejor referencia para tu caso.",
              },
            },
            {
              system: "Spectrum (Adobe)", tier: 1, color: "#4cc9f0",
              relatedVariants: ["input-popover", "inline"],
              summary: "El calendario es un componente independiente que vive por separado",
              detail: "Adobe separó el Calendar del DatePicker. ¿Por qué? Porque hay contextos donde necesitas mostrar un calendario sin el input de texto (como en un dashboard de filtros). Si el calendario vive dentro del DatePicker, no puedes sacarlo. Además, separaron DatePicker de DateRangePicker porque mezclarlos complica la API.",
              visual: () => (
                <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
                  <div style={{ flex:"1 1 100px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(76,201,240,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <CalendarDays size={11} color="#4cc9f0" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(76,201,240,0.8)", fontFamily:"monospace" }}>Calendar</span>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
                      {Array.from({length:14}).map((_,i) => (
                        <div key={i} style={{ aspectRatio:"1", borderRadius:"2px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.04)" }} />
                      ))}
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(76,201,240,0.6)", textAlign:"center", marginTop:"6px", fontWeight:600 }}>Standalone</div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink:0 }} />
                  <div style={{ flex:"1 1 100px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(76,201,240,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <Calendar size={11} color="#4cc9f0" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(76,201,240,0.8)", fontFamily:"monospace" }}>DatePicker</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"4px", padding:"5px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Mar 22</span>
                      <Calendar size={9} color="rgba(255,255,255,0.2)" />
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(76,201,240,0.6)", textAlign:"center", marginTop:"6px", fontWeight:600 }}>Input + Popover</div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink:0 }} />
                  <div style={{ flex:"1 1 100px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(139,92,246,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <CalendarRange size={11} color="#8b5cf6" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(139,92,246,0.8)", fontFamily:"monospace" }}>RangePicker</span>
                    </div>
                    <div style={{ display:"flex", gap:"3px", alignItems:"center" }}>
                      <div style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:"4px", padding:"4px" }}>
                        <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>Start</span>
                      </div>
                      <ArrowRight size={8} color="rgba(255,255,255,0.15)" />
                      <div style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:"4px", padding:"4px" }}>
                        <span style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>End</span>
                      </div>
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(139,92,246,0.6)", textAlign:"center", marginTop:"6px", fontWeight:600 }}>Separado</div>
                  </div>
                </div>
              ),
              takeaways: {
                default: "Si necesitas usar el calendario inline y en popover, constrúyelo como componente standalone desde el inicio.",
                inline: "Tu scope incluye inline — el approach de Spectrum es exactamente lo que necesitas. Calendar standalone es obligatorio para tu caso.",
                popover: "Si solo necesitas popover, Calendar puede ser interno por ahora. Pero si hay chance de inline en el futuro, mejor hacerlo standalone desde ya.",
                both: "Necesitas Single y Range. Spectrum demuestra que separarlos simplifica la API de ambos.",
                single: "Solo necesitas single date. Spectrum igual recomienda Calendar standalone por flexibilidad futura.",
              },
            },
            {
              system: "Ant Design", tier: 1, color: "#22c55e",
              relatedVariants: ["input-popover", "range-dual", "range-presets"],
              summary: "Presets de rangos rápidos eliminan el 80% de los clicks",
              detail: "En dashboards y reportes, los usuarios casi siempre eligen los mismos períodos: últimos 7 días, este mes, último trimestre. Ant Design agregó un sidebar con rangos predefinidos. Un click y listo.",
              visual: () => (
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"8px", alignItems:"center" }}>
                  <div style={{ background:"rgba(239,68,68,0.04)", borderRadius:"10px", padding:"12px", border:"1px solid rgba(239,68,68,0.12)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <X size={10} color="rgba(239,68,68,0.5)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(239,68,68,0.7)" }}>Sin presets: 5 pasos</span>
                    </div>
                    {["Abrir calendario","Navegar mes","Click inicio","Navegar otro mes","Click fin"].map((s,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", padding:"2px 0" }}>
                        <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <span style={{ fontSize:"7px", color:"rgba(255,255,255,0.35)", fontWeight:700 }}>{i+1}</span>
                        </div>
                        <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <ArrowRight size={16} color="rgba(255,255,255,0.15)" style={{ flexShrink:0 }} />
                  <div style={{ background:"rgba(34,197,94,0.04)", borderRadius:"10px", padding:"12px", border:"1px solid rgba(34,197,94,0.15)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <Check size={10} color="rgba(34,197,94,0.6)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(34,197,94,0.8)" }}>Con presets: 1 click</span>
                    </div>
                    {["Last 7 days","Last 30 days","This month","This quarter"].map((p,i) => (
                      <div key={i} style={{ padding:"4px 8px", borderRadius:"5px", marginBottom:"2px",
                        background:i===0?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.02)",
                        border:i===0?"1px solid rgba(34,197,94,0.2)":"1px solid rgba(255,255,255,0.04)",
                        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:"9px", color:i===0?"rgba(34,197,94,0.8)":"rgba(255,255,255,0.3)", fontFamily:"monospace", fontWeight:i===0?700:400 }}>{p}</span>
                        {i===0 && <Check size={9} color="rgba(34,197,94,0.6)" />}
                      </div>
                    ))}
                  </div>
                </div>
              ),
              takeaways: {
                default: "Si tu componente se usa en dashboards o reportes, los presets son casi obligatorios.",
                range: "Tu scope incluye rangos — los presets son la mejora con mayor impacto en UX que puedes agregar. Considera incluirlos desde v1.",
                single: "Tu scope es solo fecha única — presets no aplican directamente. Pero si agregas Range en el futuro, tenlos en cuenta.",
              },
            },
            {
              system: "Carbon (IBM)", tier: 1, color: "#f59e0b",
              relatedVariants: ["input-popover", "input-only"],
              summary: "Para fechas que ya sabes, el calendario estorba",
              detail: "IBM creó una variante 'Simple Date' que es solo un input sin calendario. ¿Cuándo? Cuando el usuario ya sabe la fecha: nacimiento, expiración de tarjeta, fecha histórica.",
              visual: () => (
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"8px", alignItems:"center" }}>
                  <div style={{ background:"rgba(239,68,68,0.04)", borderRadius:"10px", padding:"12px", border:"1px solid rgba(239,68,68,0.12)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <X size={10} color="rgba(239,68,68,0.5)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(239,68,68,0.7)" }}>Calendario para cumpleaños</span>
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, marginBottom:"6px" }}>
                      Navegar: 2026, 2025, 2024... hasta 1990
                    </div>
                    <div style={{ fontSize:"10px", color:"rgba(239,68,68,0.6)", fontWeight:700, display:"flex", alignItems:"center", gap:"4px" }}>
                      <Hash size={10} color="rgba(239,68,68,0.5)" />
                      36 clicks para llegar al año
                    </div>
                  </div>
                  <ArrowRight size={16} color="rgba(255,255,255,0.15)" style={{ flexShrink:0 }} />
                  <div style={{ background:"rgba(34,197,94,0.04)", borderRadius:"10px", padding:"12px", border:"1px solid rgba(34,197,94,0.15)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"8px" }}>
                      <Check size={10} color="rgba(34,197,94,0.6)" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(34,197,94,0.8)" }}>Solo input</span>
                    </div>
                    <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.5)", marginBottom:"4px" }}>Date of birth</div>
                    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"6px", padding:"6px 8px", border:"1px solid rgba(34,197,94,0.2)", marginBottom:"6px" }}>
                      <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.6)", fontFamily:"monospace" }}>03 / 22 / 1990</span>
                    </div>
                    <div style={{ fontSize:"10px", color:"rgba(34,197,94,0.7)", fontWeight:700, display:"flex", alignItems:"center", gap:"4px" }}>
                      <Check size={10} color="rgba(34,197,94,0.5)" />
                      3 segundos
                    </div>
                  </div>
                </div>
              ),
              takeaways: {
                default: "¿El usuario ya sabe la fecha? Dale un input de texto. El calendario es un ayudante visual, no debería ser obligatorio.",
                popover: "Agrega input-only como variante de tu DatePicker — es una prop showCalendar={false}. Implementación mínima, gran impacto.",
                inline: "En inline el calendario siempre está visible, pero para fechas conocidas como nacimiento, un input independiente sigue siendo mejor.",
              },
            },
            {
              system: "Paste (Twilio)", tier: 2, color: "#06b6d4",
              relatedVariants: ["input-popover", "datetime-combined"],
              summary: "Fecha y hora son dos problemas distintos — no los mezcles",
              detail: "Twilio hizo DatePicker y TimePicker por separado. Cada uno funciona solo, pero puedes componerlos. Si solo necesitas fecha, no cargas la complejidad de la hora.",
              visual: () => (
                <div style={{ display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap" }}>
                  <div style={{ flex:"1 1 90px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(6,182,212,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <Calendar size={11} color="#06b6d4" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(6,182,212,0.8)", fontFamily:"monospace" }}>DatePicker</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"5px", padding:"5px 8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>Mar 22, 2026</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                      <Check size={9} color="rgba(6,182,212,0.5)" />
                      <span style={{ fontSize:"9px", color:"rgba(6,182,212,0.6)" }}>Funciona solo</span>
                    </div>
                  </div>
                  <Plus size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink:0 }} />
                  <div style={{ flex:"0 1 80px", background:"rgba(255,255,255,0.03)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(6,182,212,0.2)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <Clock size={11} color="#06b6d4" />
                      <span style={{ fontSize:"10px", fontWeight:700, color:"rgba(6,182,212,0.8)", fontFamily:"monospace" }}>TimePicker</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"5px", padding:"5px 8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace" }}>14:30</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                      <Check size={9} color="rgba(6,182,212,0.5)" />
                      <span style={{ fontSize:"9px", color:"rgba(6,182,212,0.6)" }}>Funciona solo</span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink:0 }} />
                  <div style={{ flex:"1 1 90px", background:"rgba(6,182,212,0.04)", borderRadius:"10px", padding:"10px", border:"1px solid rgba(6,182,212,0.3)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"6px" }}>
                      <Calendar size={11} color="#06b6d4" /><Clock size={11} color="#06b6d4" />
                      <span style={{ fontSize:"9px", fontWeight:700, color:"rgba(6,182,212,0.9)", fontFamily:"monospace" }}>DateTime</span>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"5px", padding:"5px 8px", marginBottom:"4px" }}>
                      <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.5)", fontFamily:"monospace" }}>Mar 22 · 14:30</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                      <ListChecks size={9} color="rgba(6,182,212,0.5)" />
                      <span style={{ fontSize:"9px", color:"rgba(6,182,212,0.7)", fontWeight:600 }}>Composable</span>
                    </div>
                  </div>
                </div>
              ),
              takeaways: {
                default: "Si necesitas fecha + hora, construye dos componentes separados que se compongan.",
                datetime: "Tu scope incluye hora — el approach de Paste es exactamente tu caso. DatePicker + TimePicker separados, composables en DateTimePicker.",
                "date-only": "Solo necesitas fecha. No construyas TimePicker ahora, pero diseña la API de DatePicker para que componer un TimePicker después no requiera refactor.",
              },
            },
          ];

          // ── Filter cards by selected variants ──
          const filteredCards = selectedVariants && selectedVariants.size > 0
            ? researchCards.filter(card => card.relatedVariants.some(v => selectedVariants.has(v)))
            : researchCards;

          // ── Get dynamic takeaway ──
          const getTakeaway = (card) => {
            const t = card.takeaways;
            if (answers.display && t[answers.display]) return t[answers.display];
            if (answers.type && t[answers.type]) return t[answers.type];
            if (answers.time && t[answers.time]) return t[answers.time];
            return t.default;
          };

          // ── Divergences with conditions ──
          const allDivergences = [
            {
              id: "close-on-select",
              question: "¿El popover se cierra al seleccionar fecha?",
              relevant: ["input-popover"],
              options: [
                { id:"auto-close", label:"Sí, se cierra automáticamente", systems:["Material","Carbon","Ant Design"], color:"#22c55e",
                  pro:"Menos pasos. La selección es final.", con:"Si seleccionó mal, tiene que re-abrir." },
                { id:"manual-close", label:"Queda abierto hasta confirmar", systems:["Spectrum","Paste"], color:"#f59e0b",
                  pro:"El usuario verifica antes de confirmar.", con:"Un paso extra siempre." },
              ],
            },
            {
              id: "indicator-icon",
              question: "¿Qué ícono indica que el campo abre un calendario?",
              relevant: ["input-popover", "input-only"],
              options: [
                { id:"chevron-rotate", label:"Chevron que rota al abrir", systems:["Material","Spectrum","Paste"], color:"#4cc9f0",
                  pro:"Feedback visual claro de abierto/cerrado.", con:"Requiere animación." },
                { id:"calendar-static", label:"Ícono de calendario estático", systems:["Carbon","Ant Design"], color:"#8b5cf6",
                  pro:"Comunica claramente 'esto es una fecha'.", con:"No indica si está abierto o cerrado." },
              ],
            },
            {
              id: "disabled-dates",
              question: "¿Cómo bloqueas fechas no seleccionables?",
              relevant: ["input-popover", "inline", "range-dual"],
              options: [
                { id:"fixed-list", label:"Lista fija de fechas bloqueadas", systems:["Carbon","Polaris"], color:"#f59e0b",
                  pro:"Simple de implementar y entender.", con:"No escala con muchas fechas (ej: todos los fines de semana)." },
                { id:"callback-fn", label:"Función que decide por cada fecha", systems:["Spectrum","Ant Design"], color:"#22c55e",
                  pro:"Infinitamente flexible, cualquier lógica.", con:"Más complejo para el consumidor." },
              ],
            },
            {
              id: "month-count",
              question: "¿Cuántos meses muestra el calendario a la vez?",
              relevant: ["range-dual", "range-presets", "inline"],
              options: [
                { id:"single-month", label:"Un mes, con navegación", systems:["Material","Carbon","Paste"], color:"#4cc9f0",
                  pro:"Menos espacio. Funciona en mobile.", con:"Para rangos cross-month hay que navegar." },
                { id:"dual-month", label:"Dos meses lado a lado", systems:["Polaris","Ant Design","Spectrum"], color:"#8b5cf6",
                  pro:"Rangos cross-month sin navegar.", con:"Requiere más espacio horizontal." },
              ],
            },
            {
              id: "today-button",
              question: "¿Incluye un botón de 'Hoy' para volver al día actual?",
              relevant: ["input-popover", "inline", "range-dual"],
              options: [
                { id:"today-yes", label:"Sí, botón visible en el footer", systems:["Ant Design","Carbon"], color:"#22c55e",
                  pro:"Atajo rápido al día actual. Útil como ancla.", con:"Ocupa espacio en el footer." },
                { id:"today-no", label:"No, el día actual solo está highlighted", systems:["Material","Spectrum","Polaris"], color:"#f59e0b",
                  pro:"Más limpio visualmente.", con:"Si navegaste lejos, no hay forma rápida de volver." },
              ],
            },
          ];

          // ── Filter divergences by selected variants ──
          const filteredDivergences = selectedVariants && selectedVariants.size > 0
            ? allDivergences.filter(d => d.relevant.some(v => selectedVariants.has(v)))
            : allDivergences;

          // ── Consensus items ──
          const consensusItems = [
            { point:"El teclado siempre funciona", detail:"Flechas para moverse entre días, Enter para seleccionar, Escape para cerrar. Ningún sistema obliga a usar mouse.", Icon:Keyboard },
            { point:"El input de texto siempre es editable", detail:"Aunque haya calendario, el usuario puede escribir la fecha. Crítico para accesibilidad y usuarios que saben la fecha.", Icon:Type },
            { point:"El formato se adapta al idioma", detail:"En español DD/MM/YYYY, en inglés MM/DD/YYYY. Todos lo manejan con locale automáticamente.", Icon:Globe },
            { point:"Los cambios de mes se anuncian a screen readers", detail:"Al navegar, un screen reader dice 'Abril 2026'. Sin esto, un usuario con discapacidad visual no sabe dónde está.", Icon:Eye },
            { point:"Single y Range se manejan por separado", detail:"Seleccionar una fecha y un rango son interacciones diferentes. Todos los separan en componentes distintos o variantes claras.", Icon:Columns2 },
          ];

          // ── Generate markdown export ──
          const generateMarkdown = () => {
            let md = `# Research: DatePicker\n\n`;
            md += `## Scope\n`;
            Object.entries(answers).forEach(([k,v]) => { md += `- **${k}**: ${Array.isArray(v)?v.join(", "):v}\n`; });
            if (selectedVariants) {
              md += `\n## Patterns seleccionados\n`;
              [...selectedVariants].forEach(k => { const v = allVariants[k]; if(v) md += `- ${v.label}: ${v.desc}\n`; });
            }
            md += `\n## Hallazgos por sistema\n`;
            filteredCards.forEach(c => { md += `\n### ${c.system} (Tier ${c.tier})\n${c.detail}\n\n**Takeaway:** ${getTakeaway(c)}\n`; });
            md += `\n## Consensus\n`;
            consensusItems.forEach(c => { md += `- **${c.point}**: ${c.detail}\n`; });
            md += `\n## Decisiones\n`;
            filteredDivergences.forEach(d => {
              md += `\n### ${d.question}\n`;
              d.options.forEach(o => { md += `- **${o.label}** (${o.systems.join(", ")}): +${o.pro} / -${o.con}\n`; });
              const choice = userDecisions[d.id];
              if (choice) md += `- **Mi decisión:** ${d.options.find(o=>o.id===choice)?.label || choice}\n`;
            });
            md += `\n## Próximos pasos\n- Definir anatomía del componente\n- Construir variant matrix\n- Asignar tokens semánticos\n- Spec de interacción completa\n- Prototipar en Figma\n`;
            md += `\n---\n*Generado: ${new Date().toISOString().split('T')[0]}*\n`;
            return md;
          };

          const handleExport = () => {
            const md = generateMarkdown();
            const blob = new Blob([md], { type:"text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "datepicker-research.md";
            a.click();
            URL.revokeObjectURL(url);
          };

          return (
          <div>
            {/* Selected patterns bar */}
            {selectedVariants && selectedVariants.size > 0 && (
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"16px", padding:"10px 12px", background:"rgba(255,255,255,0.02)", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.05)", alignItems:"center" }}>
                <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.25)", marginRight:"2px" }}>INVESTIGANDO:</span>
                {[...selectedVariants].map(key => {
                  const v = allVariants[key];
                  return v ? <span key={key} style={{ background:`${v.color}12`, color:v.color, padding:"3px 10px", borderRadius:"100px", fontSize:"10px", fontWeight:600, fontFamily:"monospace" }}>{v.label}</span> : null;
                })}
                <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.15)", marginLeft:"auto" }}>{filteredCards.length} de {researchCards.length} sistemas relevantes</span>
              </div>
            )}

            {/* ─── SECTION 1: How others solve it ─── */}
            <div style={{ marginBottom:"28px" }}>
              <h2 style={{ fontSize:"18px", fontWeight:700, margin:"0 0 4px" }}>¿Cómo lo resuelven los grandes?</h2>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, margin:"0 0 16px" }}>
                {filteredCards.length < researchCards.length
                  ? `Mostrando ${filteredCards.length} sistemas relevantes para tus patterns seleccionados.`
                  : "Cada design system tomó decisiones distintas. Aquí están las más relevantes."}
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {filteredCards.map((card, ci) => {
                  const exp = researchExpanded[ci];
                  return (
                    <div key={ci} style={{
                      background:"rgba(255,255,255,0.02)", border:`1px solid ${exp?`${card.color}25`:"rgba(255,255,255,0.05)"}`,
                      borderRadius:"14px", overflow:"hidden", borderLeft:`3px solid ${card.color}`,
                    }}>
                      <div onClick={() => setResearchExpanded({...researchExpanded, [ci]:!exp})}
                        style={{ padding:"14px 16px", cursor:"pointer" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px", flexWrap:"wrap" }}>
                              <span style={{ fontSize:"13px", fontWeight:700, color:card.color, fontFamily:"monospace" }}>{card.system}</span>
                              <span style={{ fontSize:"8px", padding:"2px 6px", borderRadius:"4px", background:`${card.color}15`, color:card.color, fontWeight:700 }}>Tier {card.tier}</span>
                              {/* Variant badges */}
                              {card.relatedVariants.filter(v => !selectedVariants || selectedVariants.has(v)).slice(0,2).map(vk => {
                                const vd = allVariants[vk];
                                return vd ? <span key={vk} style={{ fontSize:"7px", padding:"2px 5px", borderRadius:"100px", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.35)" }}>{vd.label}</span> : null;
                              })}
                            </div>
                            <div style={{ fontSize:"13px", fontWeight:600, color:"#f0f0f0", lineHeight:1.4 }}>{card.summary}</div>
                          </div>
                          <div style={{ transform:exp?"rotate(180deg)":"", transition:"transform 0.2s", marginTop:"4px", flexShrink:0 }}><ChevronDown size={14} color="rgba(255,255,255,0.3)" /></div>
                        </div>
                      </div>
                      {exp && (
                        <div style={{ padding:"0 16px 16px" }}>
                          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.7, margin:"0 0 14px" }}>{card.detail}</p>
                          <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:"10px", padding:"12px", marginBottom:"14px" }}>
                            <card.visual />
                          </div>
                          <div style={{ background:`${card.color}08`, borderRadius:"10px", padding:"12px 14px", borderLeft:`3px solid ${card.color}` }}>
                            <div style={{ fontSize:"9px", fontWeight:700, color:card.color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"4px" }}>
                              {Object.keys(answers).length > 0 ? "Para tu caso específico" : "Lo que esto significa para ti"}
                            </div>
                            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>{getTakeaway(card)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SECTION 2: Consensus ─── */}
            <div style={{ marginBottom:"28px" }}>
              <h2 style={{ fontSize:"18px", fontWeight:700, margin:"0 0 4px" }}>En lo que todos están de acuerdo</h2>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, margin:"0 0 16px" }}>Si tu componente no hace esto, algo falta.</p>
              <div style={{ background:"rgba(34,197,94,0.04)", border:"1px solid rgba(34,197,94,0.12)", borderRadius:"14px", padding:"16px" }}>
                {consensusItems.map((item, i) => (
                  <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"10px 0",
                    borderBottom:i<consensusItems.length-1?"1px solid rgba(34,197,94,0.06)":"none" }}>
                    <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"rgba(34,197,94,0.1)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <item.Icon size={15} color="rgba(34,197,94,0.7)" />
                    </div>
                    <div>
                      <div style={{ fontSize:"13px", fontWeight:600, color:"#f0f0f0", marginBottom:"2px" }}>{item.point}</div>
                      <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── SECTION 3: Interactive Divergences ─── */}
            <div style={{ marginBottom:"28px" }}>
              <h2 style={{ fontSize:"18px", fontWeight:700, margin:"0 0 4px" }}>Decisiones para tu componente</h2>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, margin:"0 0 4px" }}>
                {filteredDivergences.length < allDivergences.length
                  ? `${filteredDivergences.length} decisiones relevantes para tus patterns. `
                  : `${filteredDivergences.length} decisiones donde no hay respuesta universal. `}
                Selecciona la opción que prefieres para tu caso.
              </p>
              {Object.keys(userDecisions).length > 0 && (
                <p style={{ fontSize:"11px", color:"#22c55e", margin:"0 0 16px", display:"flex", alignItems:"center", gap:"4px" }}>
                  <Check size={12} color="#22c55e" />
                  {Object.keys(userDecisions).length} de {filteredDivergences.length} decisiones tomadas
                </p>
              )}

              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {filteredDivergences.map((div) => {
                  const chosen = userDecisions[div.id];
                  return (
                    <div key={div.id} style={{
                      background:"rgba(255,255,255,0.02)", border:`1px solid ${chosen?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.06)"}`,
                      borderRadius:"14px", padding:"16px",
                    }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                        <div style={{ fontSize:"13px", fontWeight:700, color:"#f0f0f0", lineHeight:1.3, flex:1 }}>{div.question}</div>
                        {chosen && (
                          <div style={{ display:"flex", alignItems:"center", gap:"4px", flexShrink:0, marginLeft:"8px" }}>
                            <Check size={12} color="#22c55e" />
                            <span style={{ fontSize:"9px", color:"#22c55e", fontWeight:700 }}>DECIDIDO</span>
                          </div>
                        )}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                        {div.options.map((opt) => {
                          const isChosen = chosen === opt.id;
                          return (
                            <div key={opt.id}
                              onClick={() => setUserDecisions({...userDecisions, [div.id]: isChosen ? null : opt.id})}
                              style={{
                                background: isChosen ? `${opt.color}0a` : "rgba(255,255,255,0.02)",
                                borderRadius:"10px", padding:"12px", cursor:"pointer",
                                border: `1.5px solid ${isChosen ? opt.color : "rgba(255,255,255,0.06)"}`,
                                borderTop: `3px solid ${isChosen ? opt.color : "rgba(255,255,255,0.06)"}`,
                                transition:"all 0.15s", position:"relative",
                              }}>
                              {/* Selection indicator */}
                              <div style={{ position:"absolute", top:"8px", right:"8px",
                                width:"18px", height:"18px", borderRadius:"50%",
                                border:`2px solid ${isChosen?opt.color:"rgba(255,255,255,0.1)"}`,
                                background:isChosen?opt.color:"transparent",
                                display:"flex", alignItems:"center", justifyContent:"center" }}>
                                {isChosen && <Check size={10} color="#fff" />}
                              </div>

                              <div style={{ fontSize:"12px", fontWeight:700, color:isChosen?opt.color:"rgba(255,255,255,0.7)", marginBottom:"6px", paddingRight:"24px" }}>{opt.label}</div>
                              <div style={{ display:"flex", gap:"3px", flexWrap:"wrap", marginBottom:"8px" }}>
                                {opt.systems.map(s => (
                                  <span key={s} style={{ background:`${opt.color}0c`, color:isChosen?opt.color:"rgba(255,255,255,0.3)", padding:"2px 6px", borderRadius:"100px", fontSize:"8px", fontWeight:600 }}>{s}</span>
                                ))}
                              </div>
                              <div style={{ fontSize:"10px", marginBottom:"3px", display:"flex", alignItems:"flex-start", gap:"4px" }}>
                                <Check size={9} color="#22c55e" style={{ flexShrink:0, marginTop:"2px" }} />
                                <span style={{ color:"rgba(255,255,255,0.5)" }}>{opt.pro}</span>
                              </div>
                              <div style={{ fontSize:"10px", display:"flex", alignItems:"flex-start", gap:"4px" }}>
                                <Minus size={9} color="#ef4444" style={{ flexShrink:0, marginTop:"2px" }} />
                                <span style={{ color:"rgba(255,255,255,0.4)" }}>{opt.con}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SECTION 4: Next Steps ─── */}
            <div style={{ marginBottom:"20px" }}>
              <h2 style={{ fontSize:"18px", fontWeight:700, margin:"0 0 4px" }}>Próximos pasos</h2>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.5, margin:"0 0 16px" }}>Este research alimenta los siguientes agentes de tu pipeline.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {[
                  { step:"Definir la anatomía del componente", agent:"Anatomy Agent", desc:"Mapea las partes: container, trigger, label, calendar grid, navigation. Basado en el consensus de este research.", color:"#e94560", cmd:"/anatomy datepicker" },
                  { step:"Construir la variant matrix", agent:"Variant Matrix Builder", desc:"Cruza variantes × estados × tamaños. Elimina combinaciones inválidas. Basado en los patterns que confirmaste.", color:"#4cc9f0", cmd:"/matrix datepicker" },
                  { step:"Asignar tokens semánticos", agent:"Token Assignment Agent", desc:"Mapea cada parte anatómica a tokens de tu DS: colores, spacing, tipografía, border-radius.", color:"#22c55e", cmd:"/tokens datepicker" },
                  { step:"Escribir la spec de interacción", agent:"Interaction Spec Agent", desc:"Keyboard, focus management, screen reader behavior. Basado en el consensus de a11y de este research.", color:"#8b5cf6", cmd:"/interaction datepicker" },
                  { step:"Prototipar en Figma", agent:"Figma Structure Planner", desc:"Blueprint de la estructura en Figma: auto-layout, component properties, variantes.", color:"#f59e0b", cmd:"/figma-plan datepicker" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display:"flex", gap:"12px", alignItems:"flex-start",
                    padding:"12px 14px", borderRadius:"10px",
                    background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)",
                    borderLeft:`3px solid ${item.color}`,
                  }}>
                    <div style={{
                      width:"28px", height:"28px", borderRadius:"8px", background:`${item.color}12`,
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                      fontSize:"12px", fontWeight:800, color:item.color, fontFamily:"monospace",
                    }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"12px", fontWeight:700, color:"#f0f0f0", marginBottom:"2px" }}>{item.step}</div>
                      <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", lineHeight:1.4, marginBottom:"4px" }}>{item.desc}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                        <code style={{ fontSize:"9px", color:item.color, background:`${item.color}10`, padding:"2px 6px", borderRadius:"4px" }}>{item.cmd}</code>
                        <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.25)" }}>{item.agent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Export + Footer ─── */}
            <div style={{
              padding:"14px 16px", background:"rgba(255,255,255,0.03)", borderRadius:"12px",
              border:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between",
              alignItems:"center", flexWrap:"wrap", gap:"10px",
            }}>
              <div>
                <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.25)", fontFamily:"monospace" }}>
                  /research datepicker {mode==="full"?"--guided ":""}--save
                </div>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>
                  {Object.keys(userDecisions).length > 0
                    ? `${Object.keys(userDecisions).length} decisiones tomadas · ${filteredCards.length} sistemas analizados`
                    : `${filteredCards.length} sistemas analizados`}
                </div>
              </div>
              <button onClick={handleExport}
                style={{
                  background:"linear-gradient(135deg,rgba(233,69,96,0.15),rgba(76,201,240,0.1))",
                  border:"1px solid rgba(233,69,96,0.3)", color:"#f0f0f0",
                  padding:"8px 16px", borderRadius:"8px", fontSize:"11px", fontWeight:700,
                  cursor:"pointer", display:"flex", alignItems:"center", gap:"6px",
                }}>
                <ArrowRight size={12} style={{ transform:"rotate(-45deg)" }} />
                Exportar Markdown
              </button>
            </div>
          </div>
          );
        })()}
      </div>

      {/* ═══════ STICKY BOTTOM ACTION BAR ═══════ */}
      {phase !== "brief-input" && mode !== null && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:40,
          background:"linear-gradient(180deg, transparent 0%, #06060c 20%)",
          paddingTop:"20px",
        }}>
          <div style={{
            maxWidth:"820px", margin:"0 auto", padding:"0 14px 14px",
          }}>
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"10px 16px", borderRadius:"12px",
              background:"rgba(14,14,22,0.95)", backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.08)",
              boxShadow:"0 -4px 20px rgba(0,0,0,0.4)",
            }}>
              {/* Left: context info */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                  {mode==="quick" ? <Filter size={11} color="#4cc9f0"/> : mode==="brief" ? <Hash size={11} color="#8b5cf6"/> : <ListChecks size={11} color="#e94560"/>}
                  <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>
                    {mode==="quick" ? "/research datepicker" : mode==="brief" ? "/research --brief" : "/research --guided"}
                  </span>
                </div>
                {selectedVariants && selectedVariants.size > 0 && (
                  <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.2)", borderLeft:"1px solid rgba(255,255,255,0.08)", paddingLeft:"10px" }}>
                    {selectedVariants.size} patterns
                  </span>
                )}
                {Object.keys(userDecisions).length > 0 && (
                  <span style={{ fontSize:"9px", color:"rgba(34,197,94,0.5)", display:"flex", alignItems:"center", gap:"3px" }}>
                    <Check size={9} color="rgba(34,197,94,0.5)" />{Object.keys(userDecisions).length} decisiones
                  </span>
                )}
              </div>

              {/* Right: primary actions */}
              <div style={{ display:"flex", gap:"6px" }}>
                {phase === "research" && (
                  <button onClick={() => {
                    // Trigger export from the research section
                    const evt = new CustomEvent("exportMarkdown");
                    window.dispatchEvent(evt);
                  }} style={{
                    display:"flex", alignItems:"center", gap:"5px",
                    background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                    color:"rgba(255,255,255,0.6)", padding:"7px 14px", borderRadius:"8px",
                    fontSize:"11px", fontWeight:600, cursor:"pointer",
                  }}>
                    <ArrowRight size={11} style={{ transform:"rotate(-45deg)" }} />
                    Exportar .md
                  </button>
                )}
                {phase === "scope" && (
                  <button onClick={() => { if (Object.keys(answers).length > 0) initConfirmation(); }}
                    style={{
                      display:"flex", alignItems:"center", gap:"5px",
                      background: Object.keys(answers).length>0 ? "linear-gradient(135deg,#e94560,#c23152)" : "rgba(255,255,255,0.04)",
                      border:"none", color: Object.keys(answers).length>0 ? "#fff" : "rgba(255,255,255,0.15)",
                      padding:"7px 14px", borderRadius:"8px", fontSize:"11px", fontWeight:700, cursor:"pointer",
                    }}>
                    Ver patterns
                    <ArrowRight size={11} />
                  </button>
                )}
                {phase === "confirm" && (
                  <button onClick={() => setPhase("research")}
                    style={{
                      display:"flex", alignItems:"center", gap:"5px",
                      background: selectedVariants&&selectedVariants.size>0 ? "linear-gradient(135deg,#e94560,#c23152)" : "rgba(255,255,255,0.04)",
                      border:"none", color: selectedVariants&&selectedVariants.size>0 ? "#fff" : "rgba(255,255,255,0.15)",
                      padding:"7px 14px", borderRadius:"8px", fontSize:"11px", fontWeight:700, cursor:"pointer",
                    }}>
                    Investigar
                    <ArrowRight size={11} />
                  </button>
                )}
                {phase === "brief-analysis" && (
                  <button onClick={() => { initConfirmation(); setPhase("confirm"); }}
                    style={{
                      display:"flex", alignItems:"center", gap:"5px",
                      background:"linear-gradient(135deg,#8b5cf6,#6d28d9)",
                      border:"none", color:"#fff",
                      padding:"7px 14px", borderRadius:"8px", fontSize:"11px", fontWeight:700, cursor:"pointer",
                    }}>
                    Ver patterns
                    <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
