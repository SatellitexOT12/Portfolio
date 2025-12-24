# Dark/Light Mode - Documentación de Implementación

## 📋 Descripción General

Se ha implementado un sistema completo de **Dark/Light Mode** en el portafolio utilizando:
- **CSS Custom Properties** (Variables de CSS) para fácil mantenimiento
- **React Hooks** personalizados para gestión de estado
- **LocalStorage** para persistencia de preferencias del usuario
- **Transiciones suaves** para una experiencia de usuario fluida

---

## 🎨 Sistema de Variables CSS

### Modo Claro (Light Mode - por defecto)

```css
:root {
  --bg-color: #ffffff;
  --text-color: #2d3748;
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --secondary-bg: #f8f9fa;
  --border-color: #e2e8f0;
  --hover-bg: #f0f2f5;
  --focus-color: #667eea;
  --shadow-color: rgba(0, 0, 0, 0.08);
  --code-bg: #f4f4f4;
  --text-secondary: #4a5568;
  --text-tertiary: #718096;
}
```

### Modo Oscuro (Dark Mode)

```css
[data-theme="dark"] {
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
  --primary-color: #a0aec0;
  --primary-dark: #cbd5e0;
  --secondary-bg: #2d3748;
  --border-color: #4a5568;
  --hover-bg: #374151;
  --focus-color: #9f7aea;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --code-bg: #2d3748;
  --text-secondary: #cbd5e0;
  --text-tertiary: #a0aec0;
}
```

---

## 🪝 Custom Hook: useTheme

### Ubicación
`src/hooks/useTheme.ts`

### Funcionalidades

```typescript
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Verifica localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) return savedTheme;
    
    // 2. Detecta preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 3. Por defecto: light
    return 'light';
  });

  useEffect(() => {
    // Aplica atributo data-theme al elemento HTML
    document.documentElement.setAttribute('data-theme', theme);
    
    // Guarda en localStorage
    localStorage.setItem('theme', theme);
    
    // Sincroniza color-scheme
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
```

### Ventajas

✅ Gestión centralizada del tema  
✅ Persistencia en localStorage  
✅ Respeta preferencias del sistema operativo  
✅ Sincronización automática entre pestañas  

---

## 🔘 Componente ThemeToggle

### Ubicación
`src/components/ThemeToggle.tsx`

### Características

```tsx
<button
  className={styles.themeToggle}
  onClick={toggleTheme}
  aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
  title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
>
  {theme === 'light' ? (
    <span className={styles.icon}>🌙</span>
  ) : (
    <span className={styles.icon}>☀️</span>
  )}
</button>
```

### Accesibilidad (A11y)

- ✅ `aria-label` dinámico para lectores de pantalla
- ✅ `title` descriptivo al pasar el mouse
- ✅ Touch target mínimo: 48x48px
- ✅ `focus-visible` para navegación por teclado
- ✅ Animación de rotación al cambiar

### Estilos

```css
.themeToggle {
  background: var(--secondary-bg);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.themeToggle:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.themeToggle:focus-visible {
  outline: 3px solid var(--focus-color);
  outline-offset: 2px;
}
```

---

## 🏗️ Integración en App.tsx

```tsx
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/ThemeToggle'

function App() {
  useTheme() // Inicializa el tema

  return (
    <div className="app">
      <ThemeToggle />
      {/* resto del contenido */}
    </div>
  )
}
```

---

## 🎯 Uso en Componentes

### Todos los componentes utilizan variables CSS

```css
/* Ejemplos en los estilos */
.navbar {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  box-shadow: 0 2px 8px var(--shadow-color);
}

.card {
  background: var(--secondary-bg);
  color: var(--text-color);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.link {
  color: var(--primary-color);
}

.link:hover {
  color: var(--primary-dark);
}
```

---

## ⚡ Transiciones Suaves

```css
/* Transición global en :root */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Body también tiene transición */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Duración:** 0.3 segundos  
**Función de tiempo:** ease (suave)

---

## 🔍 Flujo de Funcionamiento

```
1. Usuario abre la aplicación
   ↓
2. useTheme() verifica localStorage
   ├─ Si existe guardado → Usa ese valor
   └─ Si no → Detecta preferencia del sistema
   ↓
3. Se aplica atributo data-theme al <html>
   ↓
4. CSS :root y [data-theme="dark"] actualizan variables
   ↓
5. Todos los elementos transicionan suavemente
   ↓
6. Usuario hace click en ThemeToggle
   ↓
7. Se ejecuta toggleTheme()
   ↓
8. Se guarda en localStorage
   ↓
9. Los cambios persisten en próximas visitas
```

---

## 🌐 Soporte del Navegador

✅ Chrome/Edge 49+  
✅ Firefox 31+  
✅ Safari 9.1+  
✅ Opera 36+  
✅ IE: No soportado (usa fallback a light mode)

---

## 🎨 Palette de Colores

| Variable | Light Mode | Dark Mode |
|----------|-----------|-----------|
| bg-color | #ffffff | #1a202c |
| text-color | #2d3748 | #e2e8f0 |
| primary-color | #667eea | #a0aec0 |
| secondary-bg | #f8f9fa | #2d3748 |
| border-color | #e2e8f0 | #4a5568 |

---

## 📱 Responsive

- ✅ Botón ThemeToggle se ajusta en móvil
- ✅ Touch targets mínimos de 48x48px
- ✅ Transiciones funcionan en todos los dispositivos
- ✅ Persiste preferencia en móvil

---

## 🔐 Privacidad

- No se envían datos a servidores
- Solo se guarda en localStorage del usuario
- Completamente offline-first
- Sin tracking o analytics

---

## 📝 Notas

- El tema se aplica instantáneamente al cargar
- Las transiciones son suaves pero no ralentizan
- Compatible con lectores de pantalla
- Soporta cambios de preferencia del SO en tiempo real

