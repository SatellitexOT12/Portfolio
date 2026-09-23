# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Reclutadores y equipos técnicos de empresas evaluando candidatos para puestos de desarrollo. Llegan con prisa, necesitan verificar nivel técnico en menos de un minuto y decidir si convocan una entrevista.

## Product Purpose

Portfolio personal de un Ing. de Software que demuestra su trabajo real (proyectos en producción, capstone AR, game jams internacionales, formación UCI) y convierte la visita en una entrevista de contratación. El éxito es que un reclutador entienda el nivel y quiera contactar sin fricción.

## Positioning

Full Stack Developer con formación sólida (UCI) y track record verificable en entregables reales: plataformas usadas en producción, proyectos AR y tres global game jams concluidas (2024 y 2025). La evidencia son los artefactos, no los adjetivos.

## Operating Context

Evaluación de candidaturas: el visitante llega desde un CV, LinkedIn o búsqueda y compara este portfolio con otros en una pestaña más. Evalúa en pantalla, con poco tiempo, y espera ver proyectos con capturas reales y formas de contacto directas.

## Capabilities and Constraints

- One-page SPA (scroll por anclas: #hero, #about, #projects, #contact), sin router.
- Stack: Vite 7 + React 19 + TypeScript estricto + CSS Modules con variables CSS; solo dependencias `react` y `react-dom`.
- Dark/light mode con persistencia (localStorage) y respeto a `prefers-color-scheme`.
- Deploy automático en GitHub Pages vía GitHub Actions (base path `/Portfolio/`).
- Alcance confirmado del cambio: rediseño visual completo, reescritura de copy, identidad propia con el nombre real, y reestructuración de contenido.

## Brand Commitments

**Oscar** — nombre real del autor, como identidad primaria del sitio (navbar, hero, footer, `<title>`, favicon). Es una obra personal, no una marca genérica. Decisiones abiertas: apellidos/versiones del nombre, y si existe un apodo o marca secundaria.

## Evidence on Hand

- 7 proyectos reales en `projectsData` (src/components/Projects.tsx) con 6 capturas en `public/*.webp`; MiniNabi usa imagen remota (Supabase).
- Bio real de 4 párrafos en `src/components/About.tsx`: Ing. de Software graduado de la UCI (Cuba), stack React/TS/Python/Django/PostgreSQL, experiencia Unity/Unreal y Global Game Jams.
- Skills verificadas en 3 categorías (src/components/About.tsx).
- GitHub (usuario real pendiente de confirmar: el footer actual apunta a `https://github.com` sin usuario) y LinkedIn reales en `src/components/Footer.tsx`.
- Ausencias que el trabajo futuro no debe fabricar: no hay foto personal, logo, métricas, testimonios ni clientes. El favicon es propio desde el rediseño (`public/favicon.svg`, anillo + punto ember autoral).

## Product Principles

1. El trabajo habla antes que el adjetivo: mostrar artefactos reales, no claims.
2. Un solo nombre — Oscar — reconocible en toda la superficie.
3. Identidad propia o nada: cero estética de plantilla.
4. Accesibilidad y dark mode coherentes no se negocian en el rediseño.

## Open Decisions

- Estructura final de secciones (las 4 actuales vs. añadir experiencia/CV descargable/case studies).
- Usuario exacto de GitHub para el enlace del footer.
