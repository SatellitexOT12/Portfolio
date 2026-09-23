# Dark/Light Mode — Documentación de Implementación

## Descripción general

El modo oscuro/claro del portal cambia la **escena**, no una paleta gris aparte:

- **Light (default):** campo cálido `--warm-field` (`#F4EEE3`) con tinta void `#06171C`.
- **Dark:** void `#06171C` con tinta warm-white `#F2EDE4`.
- **Ember `#FF6A3D` es constante en ambas escenas** (CTA, estados, glow); como texto/estado sobre el campo cálido usa la variante `--ember-text` (`#B33A0B`) para sostener 4.5:1.

El sistema se apoya en:

- **CSS Custom Properties** en `src/App.css` (`:root` + `[data-theme='dark']`)
- **El hook personalizado** `useTheme` (`src/hooks/useTheme.ts`) — inicialización, persistencia y aplicación del atributo
- **`localStorage`** (clave `theme`) para recordar la preferencia
- **Toggle en la nav** (`src/components/ThemeToggle.tsx`, montado dentro de `Navigation`)
- **Transición corta** (`--snap`, `0.16s` linear): el cambio de escena se lee como un *flip*, no como un fundido

---

## Sistema de variables CSS

Fuente: `src/App.css`.

### Escena light (por defecto, `:root`)

```css
:root {
  --void: #06171c;
  --teal: #0e3b44;
  --ember: #ff6a3d;
  --ember-ink: #1a0b05;
  --ember-text: #b33a0b;   /* ember como texto/estado: 4.5:1 sobre el campo cálido */
  --ember-tint: #ffc9b3;
  --warm-white: #f2ede4;
  --warm-field: #f4eee3;
  --warm-paper: #faf7f0;

  /* Light scene = daylight field; dark scene = void field. */
  --bg: var(--warm-field);
  --ink: var(--void);
  --muted: color-mix(in srgb, var(--ink) 70%, var(--bg));
  --line: color-mix(in srgb, var(--ink) 15%, transparent);
  --line-strong: color-mix(in srgb, var(--ink) 32%, transparent);
  --panel: color-mix(in srgb, var(--bg) 88%, transparent);
  --card-bg: color-mix(in srgb, var(--bg) 90%, #ffffff 10%);
  /* …tipografía, geometría y motion… */
}
```

### Escena dark (`[data-theme='dark']`)

```css
[data-theme='dark'] {
  --bg: var(--void);
  --ink: var(--warm-white);
  --ember-text: var(--ember);
  --panel: color-mix(in srgb, var(--void) 84%, transparent);
  --card-bg: color-mix(in srgb, var(--void) 78%, var(--teal) 22%);
}
```

### Qué cambia y qué no

| Token | Light | Dark |
|---|---|---|
| `--bg` / `--ink` | `#F4EEE3` / `#06171C` | `#06171C` / `#F2EDE4` |
| `--ember-text` (estado, hover, rail activo, knob) | `#B33A0B` | `#FF6A3D` |
| `--panel` / `--card-bg` | mezclas sobre `--bg` | mezclas explícitas sobre void/teal |
| `--muted` / `--line` / `--line-strong` | derivados de `--ink`/`--bg` con `color-mix` → siguen el swap automáticamente | ídem |
| `--ember`, `--ember-ink`, `--ember-tint`, `--teal`, `--warm-white`, `--warm-field`, `--warm-paper` | constantes | constantes |

---

## Superficies del navegador (`src/index.css`)

Las partes que el CSS de componentes no dibuja se dibujan con ember sobre el tema actual:

```css
::selection { background: var(--ember); color: #1a0b05; }
* { caret-color: var(--ember); }
html { scrollbar-color: var(--line-strong) var(--bg); scrollbar-width: thin; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: var(--pill); border: 2px solid var(--bg); }
::-webkit-scrollbar-thumb:hover { background: var(--ember); }
:focus-visible { outline: 2px solid var(--ember-text); outline-offset: 3px; }
::placeholder { color: var(--muted); opacity: 1; }
```

---

## Otro consumidor del atributo: el campo WebGL

`src/components/ShaderField.tsx` no usa los tokens CSS, pero lee **el mismo atributo** `data-theme` para graduar la escena del shader:

```ts
const readDark = () => {
  const v = document.documentElement.getAttribute('data-theme');
  return v ? v === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
};
```

- Pasa el resultado al uniform `u_light` (`dark → 0`, `light → 1`) con interpolación suave en el loop.
- Observa cambios con un `MutationObserver` (`attributeFilter: ['data-theme']`): el toggle re-gradúa el campo en vivo.
- Fallback: si el atributo aún no existe, cae a `prefers-color-scheme`.

---

## Custom hook: `useTheme`

**Ubicación:** `src/hooks/useTheme.ts`

```typescript
type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Obtener tema del localStorage o del sistema
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }

    // Detectar preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    // Aplicar tema al documento
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);

    // Guardar en localStorage
    localStorage.setItem('theme', theme);

    // Actualizar color-scheme para campos de formulario
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
```

**Inicialización (orden exacto):**

1. `localStorage['theme']` existe → se usa ese valor.
2. No existe → `prefers-color-scheme: dark` coincide → `'dark'`.
3. Tampoco → `'light'`.

**Efecto (en cada cambio de `theme`):**

- Escribe `data-theme` en `<html>` (`document.documentElement`).
- Persiste en `localStorage` bajo la clave `theme`.
- Fija `document.documentElement.style.colorScheme = theme` (UI nativa: campos, scrollbar, etc.).

---

## Componente `ThemeToggle`

**Ubicación:** `src/components/ThemeToggle.tsx` — renderizado en `Navigation` (contenedor `navActions`, junto al botón de menú).

Botón **sin etiqueta de texto** (sin `INV`, sin emojis): solo un SVG de un **anillo con la mitad rellena** (misma gramática circular que la marca del portal):

```tsx
<button
  className={styles.themeToggle}
  onClick={toggleTheme}
  aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
  title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
>
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 1.4 A5.6 5.6 0 0 1 7 12.6 Z" fill="currentColor" />
  </svg>
</button>
```

### Estilo (`ThemeToggle.module.css`)

- 34×34 px, borde `1px solid var(--line-strong)`, radio `var(--r-sm)`, tinta `var(--ink)`.
- Hover: borde y color → `var(--ember-text)` (transiciones sobre `var(--snap)`).
- Focus: el `:focus-visible` global de `index.css` (outline 2px `var(--ember-text)`, offset 3px); no hay glow propio.

### Accesibilidad

- `aria-label` y `title` dinámicos en español: *"Cambiar a modo oscuro/claro"*.
- El SVG lleva `aria-hidden="true"`: el nombre accesible lo da el botón.

---

## Integración

```tsx
// App.tsx
function App() {
  useTheme() // inicializa data-theme + persistencia + color-scheme
  ...
  return (
    <div className="app">
      <ShaderField scene={active} />  {/* consume data-theme vía MutationObserver */}
      ...
      <Navigation active={active} />  {/* ThemeToggle vive dentro de la nav */}
      ...
```

---

## Inversión en la página

Dado que todo usa `--bg`/`--ink` (y derivados por `color-mix`), el cambio de escena es automático en cada componente:

| Superficie | Light | Dark |
|---|---|---|
| `body` / página | campo cálido `#F4EEE3`, tinta void | void `#06171C`, tinta warm-white |
| Nav / secciones (`--panel`) | mezcla clara translúcida sobre `--bg` | mezcla oscura sobre void + teal |
| Tarjetas de proyecto (`--card-bg`) | `--bg` + 10% blanco | void + 22% teal |
| Estados hover, rail 01–04 activo, knob del readout (`--ember-text`) | `#B33A0B` | `#FF6A3D` |
| CTA CONTACT, selección, caret, scrollbar hover (`--ember`) | `#FF6A3D` | `#FF6A3D` (constante) |
| Campo WebGL | `u_light → 1` (escena cálida) | `u_light → 0` (void) |

Los componentes están escritos con `var(--ink)` / `var(--bg)` / derivados — **nunca con hex sueltos** — por lo que el cambio de escena no requiere reglas adicionales por componente.

---

## Transiciones

```css
/* App.css */
body {
  transition:
    background-color var(--snap) linear,
    color var(--snap) linear;
}
/* --snap: 0.16s; un solo easing en todo el mundo: cubic-bezier(0.16, 1, 0.3, 1) */
```

Corta y lineal a propósito: la inversión se lee como el **momento de estado** de un portal, no como un fundido. Bajo `prefers-reduced-motion: reduce`, `index.css` fuerza `transition-duration: 0.01ms !important`, así que el cambio de tema es inmediato.

---

## Flujo de funcionamiento

```
1. El usuario abre la app
   ↓
2. useTheme() inicializa el estado
   ├─ localStorage['theme'] existe → úsalo
   └─ si no → prefers-color-scheme (dark → 'dark', si no → 'light')
   ↓
3. useEffect (al montar y en cada cambio):
   escribe data-theme en <html>, persiste en localStorage y fija color-scheme
   ↓
4. :root / [data-theme='dark'] intercambian --bg ↔ --ink (y --ember-text, --panel, --card-bg);
   --muted/--line/--line-strong los siguen por color-mix; --ember es constante
   ↓
5. body transiciona background-color/color en 0.16s; el campo WebGL re-gradúa
   u_light vía MutationObserver sobre data-theme
   ↓
6. El usuario pulsa el toggle de la nav → toggleTheme() → persiste para próximas visitas
```

---

## Privacidad

- Solo `localStorage` del usuario (clave `theme`); sin datos a servidores, sin tracking ni analytics.

---

## Notas

- `data-theme` se escribe en el montaje (useEffect de React); hasta ese momento `<html>` exhibe los valores de `:root` (escena light).
- Cambios de preferencia del SO entre visitas: si el usuario ya usó el toggle, su elección guardada gana sobre el SO.
- `ShaderField` tiene su propio fallback a `prefers-color-scheme` para el caso en que el atributo `data-theme` aún no exista.
