---
name: Oscar — Software Engineer
description: The Living Portal — a breathing WebGL particle field behind warm ink-and-ember type, where a single ember light marks every action.
colors:
  ember: "#ff6a3d"
  ember-rust: "#b33a0b"
  ember-ink: "#1a0b05"
  ember-tint: "#ffc9b3"
  void-ink: "#06171c"
  deep-teal: "#0e3b44"
  warm-white: "#f2ede4"
  warm-field: "#f4eee3"
  warm-paper: "#faf7f0"
  muted: "color-mix(in srgb, var(--ink) 70%, var(--bg))"
  line: "color-mix(in srgb, var(--ink) 15%, transparent)"
  line-strong: "color-mix(in srgb, var(--ink) 32%, transparent)"
  panel: "color-mix(in srgb, var(--bg) 88%, transparent)"
  card-bg: "color-mix(in srgb, var(--bg) 90%, #ffffff 10%)"
typography:
  display:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(4rem, 16vw, 15rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.2em"
  micro:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.2em"
  chip:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  loader-pct:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem, 4.5vh, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  overlay-link:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 9vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "0.01em"
  footer-mail:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.35rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  initials:
    fontFamily: "Archivo, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "0.06em"
rounded:
  sm: "8px"
  md: "12px"
  dot: "2px"
  pill: "999px"
  full: "50%"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  section-y: "clamp(4rem, 9vh, 7rem)"
  hair: "1px"
  nav-h: "4rem"
  measure: "68ch"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.7rem"
    height: "3rem"
  button-ghost:
    textColor: "{colors.void-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.7rem"
    height: "3rem"
  button-ghost-hover:
    textColor: "{colors.ember-rust}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.7rem"
    height: "3rem"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.micro}"
    padding: "0.4rem 0"
  nav-link-active:
    textColor: "{colors.ember-rust}"
    typography: "{typography.micro}"
    padding: "0.4rem 0"
  theme-toggle:
    rounded: "{rounded.sm}"
    height: "34px"
    width: "34px"
  project-card:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.void-ink}"
    rounded: "{rounded.md}"
    padding: "1.1rem 1.15rem 1.15rem"
  project-card-hover:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.ember-rust}"
    rounded: "{rounded.md}"
    padding: "1.1rem 1.15rem 1.15rem"
  skill-chip:
    textColor: "{colors.muted}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.7rem"
  skill-chip-hover:
    textColor: "{colors.ember-rust}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.7rem"
---

# Design System: Oscar — Software Engineer

## Overview

**Creative North Star: "The Living Portal"**

The portfolio is a portal, not a document. A full-bleed WebGL particle field breathes behind every section, deforms under the cursor, and re-grades itself scene by scene as you scroll — liquid and ember-biased at Home, calm at Profile, a dense mesh at Work, ember at full strength at Contact — while everything readable floats above it in warm ink: one giant word (OSCAR) in variable-width Archivo, micro labels tracked into the margins, hairline rules, and softly cornered cards. The world has exactly two materials: the void (#06171c) as ground and the ember (#ff6a3d) as light; every other value is a warm paper tone or a translucent mix of the current ink.

Two scenes carry the whole site: a warm daylight field (warm-field ground, void ink) and the void night scene (void ground, warm-white ink). The toggle reassigns `--bg` and `--ink`, the body crossfades over `--snap` (0.16s), and the shader lerps its light to match — but ember never changes; only ember-as-text re-tunes through `--ember-text` (#b33a0b in daylight, #ff6a3d in the void) so it always clears 4.5:1. One family does all the talking: self-hosted Archivo variable (weights 100–900, wdth 62–125), with the display word pinned at wdth 112. The tournament that chose this world (seed 16e3a2f6) rejected two failures by name — cold/clinical and monotony — which is why the palette is paper-warm, the field never sits still, and every section gets its own grade of the same living material.

The signature moment is the cursor bending the particle field in real time under an ember ring — craft demonstrated before a single adjective is read. Around it sit the rest of the moments: the 0→100% portal loader counting at the bottom-left with no curtain, the dissolve pulse the field takes when you jump scenes, the CONTACT halo that acts as the portal's one light source, and the numbered rail and scene readout that frame the viewport like an instrument. Confirmed visual rejections: the static document with a grid-of-cards hero this portfolio category always ships, cold/clinical grayness, monotony, any second typeface, and any glow beyond the single sanctioned one.

**Key Characteristics:**
- Full-bleed WebGL portal field: four scene grades, cursor displacement, particle mesh, fine grain — always on, frozen to a static frame under reduced motion
- Two scenes swap `--bg`/`--ink` (warm daylight ↔ void night); ember is constant, ember-as-text re-tunes per scene for 4.5:1
- One family: Archivo variable; OSCAR at `--t-display` (~16vw) wdth 112; micro labels uppercase and tracked 0.18–0.3em into the margins
- Soft geometry: 12px cards and buttons, 8px chips and toggles; perfect circles reserved for ember marks (ring, knob, dots)
- Depth is earned: one ember halo (CONTACT), one neutral hover shadow (project cards); everything else rests flat on translucent `--panel`/`--card-bg`
- One motion voice: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1) for travel and entrances, `--snap` 0.16s for state; prefers-reduced-motion freezes the portal

## Colors

The palette is warm paper against a deep teal-black void, lit by exactly one saturated hue: ember. The frontmatter records the daylight scene; components always read `var(--ink)`/`var(--bg)`, so the void scene re-inks them automatically.

### Primary
- **Ember** (#ff6a3d): the portal's light. CONTACT fill, brand mark dot, CursorRing stroke, active rail/readout dots, `::selection` and caret, project-card hover border at 70% (`rgba(255, 106, 61, 0.7)`), card interior tint at 4%, the halo alphas 0.38/0.6, the ring's hot fill at 0.16 (`rgba(255, 106, 61, 0.16)`). Constant in both scenes.
- **Ember Rust** (#b33a0b): ember retuned to clear 4.5:1 as *text* on the daylight field — active nav underline, rail/readout active state, ghost-button hover, global focus outline, loader percentage glyph and lit dots. `--ember-text` reassigns to #ff6a3d in the void scene.
- **Ember Ink** (#1a0b05): the near-black carried inside ember — text on the CONTACT button and the `::selection` color. Never a page ground.

### Secondary
- **Deep Teal** (#0e3b44): the field's cool mid-tone. Card interior wash (5% over transparent), media placeholder (45% teal over the scene), initials-fallback tile (60% teal over void), and the void scene's card ground (78% void + 22% teal).
- **Ember Tint** (#ffc9b3): pale ember for dark tiles — the index number inside the initials fallback. Never on the daylight field.

### Neutral
- **Void Ink** (#06171c): the night ground, and the ink of the daylight scene; also the shader's dark background.
- **Warm White** (#f2ede4): ink of the void scene; initials-fallback lettering.
- **Warm Field** (#f4eee3): the daylight ground (`--bg` default) and the base of every translucent mix.
- **Warm Paper** (#faf7f0): declared at `:root` as the paper-highlight end of the warm family; no surface claims it yet — reserved, not invented.
- **Muted Ink** (`--muted`, 70% of the current ink over the current bg): secondary copy, labels, tech tags, counts — the only "gray", and it is always scene-relative.
- **Hairline** (`--line`, 15% of current ink) / **Strong Hairline** (`--line-strong`, 32%): section borders, card borders, nav underline track, ghost-button and toggle borders, readout track.
- **Panel Veil** (`--panel`, 88% of current bg): section and nav grounds — the field shows through them.
- **Card Ground** (`--card-bg`, 90% bg + 10% #ffffff): project-card rest ground, one step above the panel.

### Named Rules
**The One Light Rule.** Ember is the only saturated color and the only glow in the system. It marks actions, active state, and the cursor — never a background wash, never body text, never a decorative gradient.
**The Two-Scene Rule.** Themes swap two custom properties (`--bg`, `--ink`) and the shader lerps its light; ember never changes, but ember-as-text always resolves through `--ember-text` (#b33a0b daylight, #ff6a3d void) so it clears 4.5:1 in both scenes.

## Typography

**Display Font:** Archivo (self-hosted variable `Archivo-var.woff2`, weights 100–900, wdth 62–125; fallback `system-ui, 'Segoe UI', sans-serif`)
**Body Font:** Archivo (the same family — the system has exactly one)
**Label/Mono Font:** none — no mono, no second family enters the stack

**Character:** One grotesk voice at every scale: wide, confident, and quiet in the margins. Hierarchy comes from weight (400–800), size, and tracking — display type goes wide (wdth 112) and huge (16vw), while everything that frames it whispers in uppercase micro caps tracked 0.18–0.3em. `font-variant-numeric: tabular-nums` is on globally, so counts, indexes, and progress readouts align.

### Hierarchy
- **Display** (800, `--t-display` clamp(4rem, 16vw, 15rem), line-height 0.9, -0.03em, wdth 112): the hero word OSCAR, uppercase, left-anchored on the gutter.
- **Headline** (800, `--t-section` clamp(2.25rem, 5vw, 3.75rem), line-height 1.08, -0.015em): section titles — About, Projects, Contact.
- **Title** (700, clamp(1.05rem, 1.6vw, 1.25rem), line-height 1.25): project card names.
- **Body** (400, `--t-base` 1rem, line-height 1.6; bio paragraphs 1.7; measure `--measure` 68ch): bio, project descriptions, footer lede. Sentence case, never tracked-caps.
- **Label** (700, `--t-xs` 0.75rem, 0.2em, uppercase, line-height 1.6 as inherited): buttons, scene names. The brand word sits one step up: `--t-sm` 0.875rem, 800, 0.26em.
- **Micro** (600, `--t-micro` 0.6875rem, line-height 1.5, uppercase, 0.18–0.3em): nav links (0.2em), rail indexes (700, 0.18em) and labels (0.22em), readouts (vertical SCROLL at 0.3em), section meta counts (0.2em), legal smallprint (0.18em), the loader tag (0.2em).
- **Chip** (600, `--t-xs` 0.75rem, 0.12em, uppercase): skill chips.
- **Support sizes:** `--t-md` clamp(1rem, 1.4vw, 1.25rem) for the hero role line (600, 0.18em caps) and footer lede; `--t-sm` 0.875rem for skill-group titles (700, 0.03em), card descriptions (line-height 1.6), and footer values (500). The scale also declares `--t-lg` clamp(1.5rem, 3vw, 2rem) — reserved, currently unused.
- **Component-only sizes (frontmatter roles):** `loader-pct` clamp(1.75rem, 4.5vh, 2.75rem) (800, -0.02em, line-height 1) with its `%` glyph at 0.42em (600, 0.12em, Ember Rust); `overlay-link` clamp(2rem, 9vw, 3rem) (800, 0.01em) for open-menu links; `footer-mail` clamp(1.35rem, 4vw, 3rem) (800, -0.01em); `initials` clamp(2rem, 4vw, 3rem) (800, 0.06em) for the fallback tile; hero stack line `--t-micro` at 0.26em.
- **Tracking in use:** −0.03em / −0.02em / −0.015em / −0.01em on display and headings; 0.01em, 0.03em, 0.06em on small headings and monogram; 0.1em, 0.12em, 0.15em inside cards and chips; 0.18em, 0.2em, 0.22em, 0.26em, 0.28em, 0.3em on framing labels. Body copy is always `normal`.

### Named Rules
**The One-Family Rule.** Archivo for everything — display, body, labels, legal. No mono, no serif, no system display face enters the stack; weight, size, width axis, and tracking carry all hierarchy.
**The +200 Track Rule.** Every label that frames the display voice is uppercase and tracked ≥0.18em (up to 0.3em): role, stack, nav, buttons, rail, readout, legal. Card-internal micro-telemetry may relax to 0.1–0.15em. Body copy and headings are never tracked-caps — the `all-caps-body` detector rule is disabled with exactly this reason on the tracked meta lines (role, stack, legal), never on prose.

## Layout

The page is a vertical stack of full-bleed section bands over the fixed field: each band is padded `clamp(4rem, 9vh, 7rem)` vertically on the gutter, separated by a 1px Hairline top border, and grounds itself on the Panel Veil so the shader breathes through. A single content column of 1280px centers inside every band (hero, about, projects, footer); prose additionally caps at `--measure` (68ch). Horizontal rhythm is the one gutter token (`--gutter` clamp(1.25rem, 4vw, 3.5rem)); footer padding runs deeper (clamp(4.5rem, 10vh, 8rem) top).

- **Nav:** fixed top bar, `--nav-h` (4rem), Panel Veil ground, 1px Hairline bottom border, z-index 50; anchor scrolling keeps `scroll-padding-top: nav + 0.75rem`.
- **Hero:** `min-height: 100svh`, content left-anchored on the gutter (never centered), display word → role → stack → actions (row, gap 0.9rem), entering with staggered rises.
- **Scene frame (≥1100px):** the SectionRail is fixed left (clamp(0.75rem, 1.5vw, 1.5rem), vertically centered) and the SceneReadout is fixed right at the same inset; hero, about, projects, and footer then add 4.5rem to both gutters to clear the frame. The Projects section parks a vertical edge label (`MESH · DENSE`) at `right: calc(var(--gutter) + 3.25rem)`, top 20%, inside that padding band.
- **Grids:** projects use `auto-fill` with `minmax(min(100%, 310px), 1fr)` and gap clamp(1rem, 2vw, 1.5rem) — three cards across at desktop, one per row on phones. About splits bio | skills at 900px (`1.35fr / 1fr`, gap clamp(2.25rem, 4vw, 4rem)); skill chips flex-wrap with 0.5rem gaps under hairline-topped groups (1.75rem apart). Footer rows are a `7.5rem / 1fr` label/value grid, gap 1rem.
- **Breakpoints observed:** 480px (footer rows stack to one column), 767/768px (mobile overlay menu ↔ desktop link row plus grid overlay), 900px (about split), 1100px (scene frame + gutter indent + edge label).
- **Scenes:** each section owns a shader scene index (0–3). The field crossgrades between them with an exponential lerp on scroll; navigation fires a dissolve pulse into the field. Under 1100px the frame retracts entirely — the rail and readout are `display: none`, and the menu owns navigation.

### Named Rules
**The Scene-Frame Rule.** At ≥1100px the viewport is framed — numbered rail left, scene readout right — and every content band indents an extra 4.5rem past the gutter to live inside the frame. Below 1100px the frame retracts; it never becomes a hamburger sidebar.
**The Margin-Label Rule.** Vertical micro labels (edge labels like `MESH · DENSE`) park only in the right padding band at ≥1100px, are non-interactive (`pointer-events: none`), and are decorative (`aria-hidden`).

## Elevation & Depth

This system is flat at rest and translucent over the living field: sections and the nav sit on Panel Veil (88% of the scene bg), cards on Card Ground, and the only rule weight is the 1px Hairline. Depth is earned twice and only twice — an offset-free ember halo on the primary CTA, and a neutral offset shadow that appears under a project card when it lifts on hover. There is no blur, no backdrop-filter, and no decorative gradient anywhere; the card interior washes (teal 5% / ember 4% radials) are shader-derived tint, not elevation. Focus is drawn, not lifted: a 2px Ember Rust outline at 3px offset globally, and a 2px Ember outline at 3px offset for `:focus-within` cards.

### Shadow Vocabulary
- **Portal halo** (`box-shadow: 0 0 22px rgba(255, 106, 61, 0.38), 0 0 0 1px rgba(255, 106, 61, 0.6)` — `--glow-ember`): the CONTACT button only; the ring of light around the portal's single light source.
- **Card lift** (`box-shadow: 0 14px 34px -14px rgb(0 0 0 / 0.45)`): project-card hover only, paired with `translateY(-3px)` and the 70%-ember border.
- **Hot ring fill** (`background: rgba(255, 106, 61, 0.16)`): the CursorRing's state tint over links and buttons — a tint inside the ring, not a glow around it.
- **Focus outline** (`outline: 2px solid var(--ember-text); outline-offset: 3px`): the global `:focus-visible` answer for every interactive element.

### Named Rules
**The One-Glow Rule.** Exactly one element carries a glow: the CONTACT button — the portal's light source and the first-viewport promise of the direction contract. Everything else answers state with border color, ember text, brightness, or a plain outline; no card, nav item, chip, or the cursor ring ever grows a halo. The `dark-glow` detector rule is disabled with this reason on that one line only.
**The Flat-Rest Rule.** Surfaces rest flat. Shadow appears only as a state response — the project-card hover lift. If another surface must answer state, it changes border, text color, or gains the 3px focus outline; it never floats.

## Shapes

Corners are gently curved, never sharp and never pill-shaped: the portal radius is 12px (`--r`) on cards and hero buttons, the chip radius is 8px (`--r-sm`) on skill chips, the menu toggle, and the theme toggle. The only pills are native (`--pill` 999px, the scrollbar thumb), and perfect circles (`--r-full` 50%) are reserved for ember anatomy: the 30px CursorRing (1.5px Ember border), the 7px readout knob, the 6px ACTIVE dot, the brand mark dot, and the half-moon theme glyph. The loader's progress dots are 9px squares at `--r-dot` (2px) — the one near-square in the system, deliberately mechanical. Borders: 1px Hairline for sections, cards, nav, footer rows, and media separators; 1px Strong Hairline for the ghost button, readout track, and the two 36px/34px toggles; active underlines are 1px Ember Rust (2px in the mobile menu); the footer email carries a 3px Ember underline. Every section head sits on a 1px top hairline with a centered 9px crosshair (the head-rule device), and media is hard 16/9 clipped by the card's 12px corners.

### Named Rules
**The Soft-Portal Rule.** Corners are 12px on cards and buttons and 8px on chips and toggles — no 0px slabs, no pills. Perfect circles are reserved for ember marks (ring, knob, dots), so every round ember shape reads as part of the portal.

## Components

Component character: warm and tactile — soft-cornered controls that rest flat over the field and answer hover with ember light, never with decoration.

### Buttons
- **Shape:** 12px radius (`--r`), min-height 3rem, padding 0.85rem 1.7rem, inline-flex, label voice (`--t-xs`, 700, 0.2em, uppercase).
- **Primary (CONTACT):** Ember fill, Ember Ink text, wearing the permanent portal halo (`--glow-ember`). Hover intensifies with `filter: brightness(1.07)` over 0.25s; focus is the global 2px Ember Rust outline at 3px offset.
- **Ghost (VIEW PROJECTS):** transparent over the field, 1px Strong Hairline border, ink text; hover shifts border and text to Ember Rust over `--snap`.
- **Toggles:** the 36px menu toggle and 34px theme toggle are 8px-radius hairline squares; hover turns border and glyph Ember Rust.

### Chips
- **Skill chip:** chip voice (`--t-xs`, 600, 0.12em, uppercase), Muted Ink text, 1px Hairline border, 8px radius, padding 0.35rem 0.7rem; hover turns text and border Ember Rust over `--snap`. Informational (`cursor: default`), grouped under hairline-topped category rows with tabular counts.

### Cards / Containers
- **Project card:** Card Ground on a 1px Hairline, 12px radius, overflow hidden. Interior carries two shader-derived washes — teal 5% from the top-left, ember 4% from the bottom-right — layered strictly under content. Media is 16/9 over a teal-mixed placeholder; hover lifts the card (`translateY(-3px)` + card-lift shadow + 70%-ember border over 0.4s), zooms the thumb 1.04 over 0.6s, and turns the index and OPEN action Ember Rust. `:focus-within` draws a 2px Ember outline at 3px offset. Failed images fall back to an initials module (teal-over-void tile, Ember Tint index, Warm White initials) — never an external placeholder.
- **Sections:** Panel Veil band, 1px Hairline top border carrying the 9px crosshair (head-rule), 1280px inner column.
- **Shadow strategy:** see Elevation — flat at rest, card-lift on hover only.

### Inputs / Fields
- No text inputs ship in the build. Focus for everything interactive is the global 2px Ember Rust outline at 3px offset; `::placeholder` renders in Muted Ink at full opacity (`opacity: 1`), never faded further.

### Navigation
- **Bar:** fixed 4rem, Panel Veil ground, 1px Hairline bottom. Brand = dashed ring + Ember dot SVG (rotates 120° on hover over 0.5s ease-out) beside OSCAR (800, 0.26em).
- **Links:** micro voice (600, 0.2em, uppercase), Muted Ink → ink on hover; active gets Ember Rust text plus a 1px Ember Rust underline, with `aria-current`.
- **Overlay:** the right-side grid button (36px, 8px radius, six-dot SVG that swaps to an X when open) opens a full-screen overlay below the bar — 94%-bg veil, links at clamp(2rem, 9vw, 3rem) 800 stacked with 1.75rem gaps, entering with a 0.35s rise-and-fade. Escape closes it. On ≤767px the same overlay is the mobile menu (the inline link row is hidden), and the theme toggle (34px half-moon) sits beside the grid button at all sizes.

### Signature Components
- **PortalLoader:** a bottom-left HUD on the gutter, no curtain — content stays visible underneath. "LOADING PORTAL" micro tag, a zero-padded percentage at clamp(1.75rem, 4.5vh, 2.75rem) (800, -0.02em) with its `%` glyph at 0.42em in Ember Rust, and 16 progress dots (9px, 2px radius) that light Hairline-strong → Ember Rust. It counts 0→100 over 1100ms with a cubic ease-out, then closes with a 0.55s fade-and-drop. Skipped entirely under reduced motion.
- **SectionRail:** fixed left column, visible ≥1100px only — `01`–`04` (micro, 700, 0.18em, tabular) over tracked labels (0.22em); Muted Ink → ink on hover, active state in Ember Rust with a 1px underline.
- **SceneReadout:** fixed right column, ≥1100px, `aria-hidden` (decorative duplicate of nav state): vertical SCROLL (`writing-mode: vertical-rl`, 0.3em), a 1px Strong Hairline track with a 7px Ember Rust knob driven by `--progress`, then SCENE label + name (label voice) and a static 6px ACTIVE dot — honest state, no fake blinking.
- **ShaderField:** fixed full-bleed canvas behind everything (z-index -1) — four scene grades, cursor displacement with exponential falloff, a 2.5px particle mesh, ±0.032 grain, vignette; particle texture, never gradient chrome. Static single frame under reduced motion; no WebGL keeps the flat token ground.
- **CursorRing:** 30px Ember ring trailing the pointer with a 0.24 lerp, filling at 16% ember over links and buttons; coarse pointers and reduced motion keep the native cursor.
- **Footer:** Contact head with a display-scale email (clamp(1.35rem, 4vw, 3rem), 800, 3px Ember underline, hover → Ember Rust), EMAIL/LINKEDIN/GITHUB rows (7.5rem label/value grid, hairline separators, outbound-arrow glyphs), and a close bar with legal micro caps.

### Motion
- **`--snap` (0.16s):** every state change — borders, colors, theme crossfade (body background/color, linear), loader dot flips (0.12s linear).
- **`--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`):** entrances and travel — hero rises 0.9s staggered 0 / 0.1 / 0.18 / 0.26s, menu overlay 0.35s, loader close 0.55s, card lift 0.4s, thumb zoom 0.6s, brand spin 0.5s, ring fade 0.3s, button halo shift 0.25s.
- **Ambient:** the shader loop itself, the 1100ms loader count, and the dissolve pulse on scene jumps.
- **`prefers-reduced-motion: reduce`:** freezes the field to one frame, skips the loader, unmounts the ring, and disables smooth scroll. Honored, not optional.

## Do's and Don'ts

### Do:
- **Do** keep ember scarce and singular: it marks actions, active state, dots, and the cursor — CONTACT is the only glowing element (The One Light Rule / The One-Glow Rule).
- **Do** set every ember *text* through `--ember-text` (#b33a0b daylight, #ff6a3d void) so it clears 4.5:1 in both scenes; fills keep `--ember`.
- **Do** use one family — Archivo variable — and its axes: display at 800 / wdth 112 / ~16vw; body at 400/1rem.
- **Do** uppercase and track every framing label (0.18–0.3em; card micro-telemetry 0.1–0.15em): role, stack, nav, rail, readout, legal.
- **Do** respect the ≥1100px scene frame: rail left, readout right, content bands indented `gutter + 4.5rem`, edge labels parked in the right band and non-interactive.
- **Do** rest surfaces on `--panel`/`--card-bg` with 1px `--line`, and answer hover with the card lift (neutral shadow + 3px rise + ember border) or ember text.
- **Do** anchor bands to `--gutter` with a 1280px inner column, left-aligned; cap prose at `--measure` (68ch).
- **Do** keep the field alive: the shader runs behind every section, regrades per scene, and freezes to a static frame under reduced motion — with the loader, ring, and smooth scroll.
- **Do** fall back to the initials module for missing screenshots (teal-over-void tile, Ember Tint index), never an external placeholder.

### Don't:
- **Don't** add a second glow, any blur, or backdrop-filter — no halo on cards, nav, chips, or the cursor ring (the ring tints at 16%, it does not glow).
- **Don't** set body copy or headings in tracked caps: caps are the label and display voice; `all-caps-body` is disabled only for tracked meta labels, the stack line, and legal smallprint — never for prose.
- **Don't** introduce a second typeface or a mono "for code" — Archivo covers display, body, labels, and numerals alike.
- **Don't** use ember as a background wash, section fill, or paragraph color, and never below 4.5:1 without `--ember-text`.
- **Don't** hardcode `#000000`/`#ffffff` or bypass the scene tokens — components read `var(--ink)`/`var(--bg)`/`var(--line)`/`var(--muted)` so both scenes stay coherent.
- **Don't** add sharp 0px corners or pill-shaped buttons: radius is 12px/8px, and circles are reserved for ember marks.
- **Don't** make margin furniture interactive: rail, readout, and edge labels are decorative; the edge label is `pointer-events: none` and `aria-hidden`.
- **Don't** sit content centered in the hero or under the frame: display type stays left-anchored on the gutter, content bands clear the rail and readout at ≥1100px.
