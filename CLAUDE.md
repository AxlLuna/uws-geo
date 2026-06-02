# CLAUDE.md — GEO Cinematic Website
## Proyecto: "¿Tu negocio existe para la IA?" — urvenue.com

Este archivo contiene todas las instrucciones para construir el sitio web completo.
Lee TODO este archivo antes de escribir una sola línea de código.

---

## 🧰 Stack tecnológico

- **Framework:** Next.js 16 (App Router)
- **Runtime / Package manager:** Bun
- **Animaciones:** GSAP + ScrollTrigger
- **Estilos:** Tailwind CSS v4
- **Fuentes:** Google Fonts — Space Grotesk (headings) + Inter (body)
- **Deploy target:** Vercel (el usuario conectará el repo manualmente)

### Comandos de setup
```bash
bunx create-next-app@latest geo-site --typescript --tailwind --app --no-src-dir
cd geo-site
bun add gsap @gsap/react
```

---

## 📁 Estructura de archivos a crear

```
geo-site/
├── CLAUDE.md                          ← este archivo
├── public/
│   ├── videos/
│   │   ├── video1-zoom-in.mp4         ← VIDEO 1: zoom hacia el casco de Vibe
│   │   └── video2-pull-back.mp4       ← VIDEO 2: pull-back al avatar pequeño
│   ├── images/
│   │   ├── vibe-hero.png              ← Frame 1: Vibe full body hero
│   │   ├── vibe-zoom.png              ← Frame 2: Vibe medio cuerpo
│   │   ├── vibe-closeup.png           ← Frame 3: Close-up casco
│   │   ├── vibe-avatar.png            ← Frame 4: Vibe pequeño saludando
│   │   └── uv-logo.png                ← Logo de urvenue (UV morado)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
│       ├── ScrollScene.tsx            ← Componente principal de la animación
│       ├── HeroSection.tsx
│       ├── GeoSection.tsx
│       ├── StatsSection.tsx
│       ├── HowToSection.tsx
│       ├── CtaSection.tsx
│       └── VibeAvatar.tsx             ← Avatar fijo en esquina inferior derecha
```

> ⚠️ IMPORTANTE: El usuario colocará manualmente los archivos de video e imágenes
> en la carpeta `public/` antes de correr el proyecto. Los nombres deben coincidir
> exactamente con los listados arriba.

---

## 🎨 Sistema de diseño — NO improvisar, usar estos valores exactos

### Colores
```css
--color-bg:         #000000      /* fondo negro puro */
--color-primary:    #7B2FFF      /* púrpura UV */
--color-secondary:  #00E5FF      /* cyan neón */
--color-accent:     #B066FF      /* púrpura claro */
--color-text:       #FFFFFF      /* blanco */
--color-text-muted: #8892A4      /* gris azulado */
--color-glass-bg:   rgba(123, 47, 255, 0.08)   /* fondo glass cards */
--color-glass-border: rgba(0, 229, 255, 0.2)   /* borde glass */
```

### Tipografía
```css
/* Headings */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
```

### Glass Card — reutilizar en todas las secciones de contenido
```css
background: rgba(123, 47, 255, 0.08);
border: 1px solid rgba(0, 229, 255, 0.2);
border-radius: 16px;
backdrop-filter: blur(12px);
padding: 32px;
```

### Efectos de texto destacado
- Los números y palabras clave van en `color: #00E5FF` (cyan)
- Los títulos de sección van en gradiente: `from-[#7B2FFF] to-[#00E5FF]`

---

## 🎬 Arquitectura de la animación de scroll

### Concepto general
La página es UNA sola pantalla que avanza mediante scroll. El video de Vibe
ocupa el 100% del viewport como fondo y avanza frame a frame sincronizado
con el scroll del usuario. El contenido (texto, cards) aparece encima del video.

### Implementación técnica con GSAP ScrollTrigger

**El truco central:** Usar dos elementos `<video>` superpuestos con `currentTime`
controlado por scroll, NO autoplay. Esto permite frame-perfect sync.

```tsx
// En ScrollScene.tsx
useEffect(() => {
  const video1 = video1Ref.current
  const video2 = video2Ref.current

  // Precargar ambos videos
  video1.load()
  video2.load()

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,           // suavidad del scrub
    }
  })

  // Fase 1 (0% - 50% scroll): Video 1 avanza
  ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top top",
    end: "50% bottom",
    scrub: true,
    onUpdate: (self) => {
      if (video1.duration) {
        video1.currentTime = self.progress * video1.duration
      }
    }
  })

  // Fase 2 (50% - 100% scroll): Video 2 avanza, Video 1 se oculta
  ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "50% top",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => {
      gsap.set(video1, { opacity: 0 })
      gsap.set(video2, { opacity: 1 })
    },
    onLeaveBack: () => {
      gsap.set(video1, { opacity: 1 })
      gsap.set(video2, { opacity: 0 })
    },
    onUpdate: (self) => {
      if (video2.duration) {
        video2.currentTime = self.progress * video2.duration
      }
    }
  })
}, [])
```

### Altura total del scroll
```css
#scroll-container {
  height: 600vh;   /* 6 pantallas de alto = scroll largo y cinematográfico */
}
```

### Videos: posición fija durante el scroll
```css
.video-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
```

---

## 📄 Secciones del sitio — contenido y comportamiento

### SECCIÓN 1 — Hero (scroll 0% → 15%)
**Comportamiento:** Aparece inmediatamente. Vibe está grande y centrado en el video.

**Contenido:**
```
[Logo UV — esquina superior izquierda]

[Centro de pantalla]
Subtítulo pequeño uppercase: "GENERATIVE ENGINE OPTIMIZATION"

Título principal (gran tamaño, 3 líneas):
"¿Tu negocio
existe para
la IA?"

Subtítulo:
"ChatGPT. Perplexity. Claude.
Cuando alguien pregunta por tu industria —
¿apareces tú o aparece tu competencia?"

[Botón sutil] "Descubre tu score →"  (enlaza a https://isitagentready.com)

[Indicador de scroll] Flecha animada hacia abajo con texto "scroll para descubrir"
```

**Animación de entrada:** fade-in desde abajo con stagger, delay 0.5s después de cargar.

---

### SECCIÓN 2 — El problema (scroll 15% → 35%)
**Comportamiento:** El video empieza a hacer zoom. Las cards aparecen desde los lados.

**Contenido:**
```
Título: "El mundo cambió.
Las búsquedas, también."

3 stats en glass cards horizontales:

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  40%                │  │  1 de cada 3        │  │  0                  │
│  de búsquedas en    │  │  búsquedas en       │  │  clics recibe el    │
│  Google terminan    │  │  Google termina     │  │  resultado cuando   │
│  sin un clic        │  │  en ChatGPT o       │  │  la IA responde     │
│                     │  │  Perplexity primero │  │  directamente       │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘

Texto debajo:
"El SEO tradicional optimiza para Google.
GEO optimiza para la IA que responde por ti."
```

**Animación:** cards entran con `gsap.from` desde x: -100 y x: 100, stagger 0.2s,
triggered cuando la sección entra al viewport.

---

### SECCIÓN 3 — Qué es GEO (scroll 35% → 55%)
**Comportamiento:** Zoom llega al punto máximo (close-up del casco). Transición a Video 2.
El contenido aparece centrado con máxima dramatismo.

**Contenido:**
```
Badge uppercase: "GEO — GENERATIVE ENGINE OPTIMIZATION"

Título grande:
"Haz que la IA
hable de ti."

Descripción:
"GEO es la práctica de estructurar tu contenido,
datos y señales técnicas para que modelos como
ChatGPT, Claude y Perplexity te encuentren,
te entiendan y te recomienden."

4 pilares en grid 2x2 (glass cards):

┌──────────────────────┐  ┌──────────────────────┐
│ 🗂 Estructura        │  │ 🤖 Accesibilidad IA  │
│ llms.txt, sitemaps   │  │ robots.txt, headers  │
│ y markdown limpio    │  │ y bot permissions    │
└──────────────────────┘  └──────────────────────┘
┌──────────────────────┐  ┌──────────────────────┐
│ 🔗 Autoridad        │  │ ⚡ Velocidad          │
│ Links, menciones y  │  │ Core Web Vitals y    │
│ citas de terceros   │  │ respuesta < 200ms    │
└──────────────────────┘  └──────────────────────┘
```

---

### SECCIÓN 4 — Cómo se mide (scroll 55% → 75%)
**Comportamiento:** Video hace pull-back. Vibe empieza a moverse hacia esquina.

**Contenido:**
```
Título: "7 señales que
la IA evalúa hoy."

Lista estilo timeline vertical — cada item aparece con scroll:

01 → llms.txt          "¿Tienes un índice curado para modelos de lenguaje?"
02 → robots.txt        "¿Permites o bloqueas a los crawlers de IA?"
03 → Sitemaps          "¿Tu sitemap está actualizado y es legible por IA?"
04 → Markdown limpio   "¿Tu contenido está libre de ruido HTML?"
05 → Link headers      "¿Tus páginas tienen headers semánticos correctos?"
06 → API / MCP         "¿Tu plataforma es accesible programáticamente?"
07 → Bot access        "¿Controlas qué bots acceden y a qué?"

[Botón] "Evalúa tu sitio gratis →"  (enlaza a https://isitagentready.com)
```

**Animación:** cada ítem del timeline hace `fade + slideUp` con stagger 0.15s.

---

### SECCIÓN 5 — CTA Final (scroll 75% → 100%)
**Comportamiento:** Vibe ya está pequeño en esquina inferior derecha como avatar fijo.
El contenido del CTA ocupa el centro.

**Contenido:**
```
[Logo UV centrado, más grande]

Título:
"¿Está tu negocio
listo para la IA?"

Subtítulo:
"Evalúa tu sitio en 60 segundos con
Is It Agent Ready — la herramienta que
mide tu GEO score en tiempo real."

[Botón principal — grande, gradiente púrpura a cyan]:
"Hacer el diagnóstico gratis →"
URL: https://isitagentready.com

Texto pequeño debajo:
"Presentado por urvenue · Tecnología para experiencias que no se olvidan"

[Footer minimal]
© 2026 urvenue. All rights reserved.
```

---

## 🤖 Componente VibeAvatar (esquina fija)

Aparece después de que el scroll supera el 60%. Se ancla en `position: fixed`,
`bottom: 24px`, `right: 24px`. Tamaño: 80x80px con borde cyan animado.

```tsx
// Comportamiento
- Aparece con fade-in cuando scroll > 60%
- Imagen: /images/vibe-avatar.png
- Borde: border-radius 50%, border 2px solid #00E5FF
- Glow: box-shadow 0 0 20px rgba(0, 229, 255, 0.4)
- Al hacer hover: escala a 1.1x con transición 0.2s
- Al hacer click: abre un tooltip/bubble con texto:
  "Hey! ¿Quieres saber si tu sitio está AI-ready? →"
  con link a https://isitagentready.com
- Animación idle: float suave arriba/abajo infinito (keyframes CSS)
```

---

## ✅ Checklist de calidad — verificar antes de terminar

- [ ] Los videos se sincronizan con el scroll sin saltos
- [ ] En mobile (375px) el texto es legible y el layout no se rompe
- [ ] Las glass cards tienen el backdrop-filter correcto
- [ ] El logo UV aparece en el hero y en el CTA final
- [ ] VibeAvatar aparece después del 60% de scroll
- [ ] Todos los botones/links apuntan a https://isitagentready.com
- [ ] No hay scroll horizontal en ningún breakpoint
- [ ] Los videos tienen `preload="auto"` y `muted` y `playsInline`
- [ ] El sitio funciona con `bun run dev` sin errores en consola
- [ ] Fuentes Google cargadas en layout.tsx con `next/font/google`

---

## 🚀 Pasos para ejecutar

1. Crear el proyecto: `bunx create-next-app@latest geo-site --typescript --tailwind --app`
2. Entrar a la carpeta: `cd geo-site`
3. Instalar dependencias: `bun add gsap @gsap/react`
4. Copiar este CLAUDE.md a la raíz del proyecto
5. Crear la estructura de carpetas de `public/videos/` y `public/images/`
6. Copiar los assets (videos e imágenes) descargados de Higgsfield a sus carpetas
7. Construir todos los componentes según este documento
8. Correr: `bun run dev`
9. Verificar el checklist completo
10. Hacer commit y conectar el repo a Vercel

---

## ⚠️ Reglas para Claude Code

1. **No improvises colores** — usa el sistema de diseño definido arriba
2. **No uses librerías extra** — solo las especificadas (GSAP, Tailwind, Next.js)
3. **No cambies los nombres de archivos** de assets — el usuario los colocará con esos nombres exactos
4. **Pregunta antes de asumir** si algo no está claro en este documento
5. **Construye componente por componente** — no generes todo en un solo archivo
6. **Prioriza el mobile** — diseña mobile-first, luego escala a desktop
7. **Los videos deben estar en `public/videos/`** para que Next.js los sirva correctamente
