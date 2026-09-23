# Oscar — Portfolio

Personal portfolio of **Oscar García**, Software Engineer (Universidad de Ciencias Informáticas). A one-page React SPA built with **React 19**, **TypeScript**, and **Vite 7**, styled with **CSS Modules** in the *Portal shader WebGL* visual world: a living full-bleed WebGL particle field over void `#06171C` (warm field `#F4EEE3` in light mode), incandescent ember `#FF6A3D` reserved for actions and states, self-hosted variable **Archivo**, hairline rules, a numbered 01–04 section rail, and a 0→100% portal loader.

The recorded design system lives in [`DESIGN.md`](DESIGN.md); product context in [`PRODUCT.md`](PRODUCT.md).

## Features

- **Sticky navigation** with scroll-synced active link (ember underline + ring-and-dot mark) and a mobile menu (Escape closes it)
- **Living hero scene**: full-bleed WebGL shader field that warps under the cursor, a `0→100%` portal loader at the bottom-left, `OSCAR` in display-scale Archivo, tracked role and stack lines, and `CONTACT` in ember glow next to `VIEW PROJECTS`
- **Scene chrome**: a numbered `01–04` section rail on the left and a readout on the right (scroll progress + active scene name), both on wide viewports
- **About**: bio and skills as one hairline sheet; skill chips highlight in ember on hover
- **Projects**: a responsive card grid — every project with a 16:9 thumbnail (initials module as fallback, never a placeholder service), description and stack; hovering lifts the card with an ember edge and glow
- **Contact footer**: display-scale email with an ember underline, plus data rows for email, LinkedIn, and GitHub
- **Persistent light/dark mode** (ring toggle in the nav): per-theme tokens in `App.css` swap `--bg` / `--ink` between the void and warm-field scenes, persisted in `localStorage` and initialized from `prefers-color-scheme`
- **Craft**: mobile-first responsive, `prefers-reduced-motion` respected, `focus-visible` throughout, ember cursor ring on fine pointers, palette of void / warm field / ember only

## Project structure

```
src/
├── components/
│   ├── Navigation.tsx / .module.css   # sticky nav, active link, mobile menu
│   ├── ThemeToggle.tsx / .module.css  # light/dark ring toggle
│   ├── ShaderField.tsx / .module.css  # full-bleed WebGL particle field, scene-graded
│   ├── PortalLoader.tsx / .module.css # 0→100% loader, bottom-left, no curtain
│   ├── CursorRing.tsx / .module.css   # ember cursor ring (fine pointers only)
│   ├── SectionRail.tsx / .module.css  # numbered 01–04 section rail (left)
│   ├── SceneReadout.tsx / .module.css # scroll progress + scene readout (right)
│   ├── Hero.tsx / .module.css         # display name, role, stack, actions
│   ├── About.tsx / .module.css        # bio + skills sheet
│   ├── Projects.tsx / .module.css     # project card grid
│   └── Footer.tsx / .module.css       # contact section
├── hooks/
│   ├── useTheme.ts                    # theme state + persistence
│   └── useActiveSection.ts            # active scene source + dissolve navigation
├── assets/fonts/
│   └── Archivo-var.woff2              # self-hosted variable font (weight 100–900, width 62–125%)
├── App.tsx                            # composition
├── App.css                            # token system (:root + [data-theme='dark'])
├── index.css                          # base layer, browser surfaces, @font-face
└── main.tsx                           # entry point
public/
├── favicon.svg                        # ring + ember dot mark
└── *.webp                             # project thumbnails
```

## Installation & setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/Portfolio/`
3. **Build for production**:
   ```bash
   npm run build
   ```
4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Customization

- **Bio / skills** — `src/components/About.tsx` (copy is data, kept verbatim by design)
- **Projects** — the `projectsData` array in `src/components/Projects.tsx` (title, description, stack, link, image); years live in the `YEARS` map, `20XX` is the marked placeholder where no year exists
- **Contact links** — constants at the top of `src/components/Footer.tsx`
- **Tokens** — `src/App.css`: void `#06171C` (dark scene) and warm field `#F4EEE3` (light scene) as `--bg`, `--ink` swapping between them, and ember `#FF6A3D` as the single accent — as text/state it goes through `--ember-text` to hold 4.5:1. Radius, type scale, and the one easing voice (`--ease-out`, `--snap`) live here too.
- **Typography** — `src/index.css` (`@font-face`); drop a new variable font in `src/assets/fonts/`

## Responsive design

- Mobile-first; nav collapses to a menu below 768px, About becomes two columns from 900px, the project grid reflows fluidly, the section rail and scene readout appear from 1100px.

## Deployment (GitHub Pages)

`vite.config.ts` sets `base: '/Portfolio/'` for GitHub Pages. Build and publish the `dist` folder:

```bash
npm run build
```

Any static host works the same way (Vercel, Netlify) — upload `dist`.

## Available scripts

- `npm run dev` — development server with HMR
- `npm run build` — type-check (`tsc -b`) and production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint

## Technologies

- **React 19** — UI library
- **TypeScript** — type safety
- **Vite 7** — build tool
- **CSS Modules** — component-scoped styling
- **Archivo** — self-hosted variable font (weight 100–900, width 62–125% in use)

## License

MIT.
