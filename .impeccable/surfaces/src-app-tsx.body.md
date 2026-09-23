# Surface brief — src/App.tsx (one-page portfolio)

## Scope and visitor mode

Modo: **Persuade**. One-page SPA (Vite + React 19 + CSS Modules), scroll por anclas #hero/#about/#projects/#contact. Visitante: reclutador con <1 minuto; éxito = entender el nivel, ver evidencia real y contactar. Dark/light mode persistente se conserva. Contenido factual intocado (PRODUCT.md). **Redesign**: el mundo «Datamatics Field» fue reemplazado por decisión del usuario en el torneo seed `16e3a2f6`; fallos nombrados que no se repiten: **frío/clínico** y **monotonía**.

## Direction contract

<!-- impeccable:direction-contract 1 -->

THESIS: El portfolio es un portal vivo: un campo de partículas WebGL a sangre emite tu trabajo mientras respira y responde al cursor; rechaza el documento estático con grid de tarjetas que esta categoría siempre envía.

OWN-WORLD: Campo a sangre sobre void #06171C con deriva de tinte teal→ember y grano fino siempre; tinta warm-white #F2EDE4, acento incandescente #FF6A3D reservado a acciones y estados; variable grotesk display para una sola palabra gigante contra labels micro tracked +200 anclados a los márgenes; hairlines, rail numérico 01–04, loader con porcentaje, glow solo en focus/active; light mode = la misma escena en tinta #06171C sobre campo cálido.

STORY: El reclutador aterriza en la escena viva, lee en una línea quién es Oscar, siente el craft en el primer movimiento del cursor sobre el campo, salta de escena en escena por disolución hacia los proyectos reales, y CONTACT permanece a un clic en todo momento.

FIRST VIEWPORT: Loader 0→100% abajo-izquierda sobre el campo a sangre (#06171C, deriva ember, grano); OSCAR en variable grotesk ≈16vw centro-izquierda; líneas tracked SOFTWARE ENGINEER · FULL STACK DEVELOPER y el stack (REACT · TYPESCRIPT · PYTHON · DJANGO · POSTGRESQL) debajo — copy en inglés, la lengua del sitio; CONTACT en #FF6A3D con glow junto a VIEW PROJECTS en outline; rail 01–04 a la izquierda, readout de escena a la derecha, nav fina arriba con botón de grid que también abre el menú móvil. El ember es texto/estado vía token --ember-text (#B33A0B daylight, #FF6A3D en void) para sostener 4.5:1; --ember vive en fills y decoración.

FORM: Portal shader WebGL (retador, kind=challenger, source id `webgl-shader-portal`; no pertenece a la lista grounded, 3ª carta presentada); seed key 16e3a2f6.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

El cursor deformando el campo de partículas en tiempo real y la disolución de escena al navegar: el sitio demuestra craft antes de que el reclutador lea un adjetivo.

## Unresolved decisions

- Estructura de secciones final (4 actuales vs. añadir experiencia/CV/case studies) — decisión abierta en PRODUCT.md.
- Usuario exacto de GitHub del footer (hoy apunta a https://github.com sin usuario).
- Imagen remota de MiniNabi (Supabase) con fallback a módulo de iniciales — confirmación pendiente.
