import './App.css'
import { useTheme } from './hooks/useTheme'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  useTheme() // Inicializar el tema al cargar la app

  return (
    <div className="app">
      <Navigation />
      <Hero />
      <main>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

export default App
