import './App.css'
import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
import ShaderField from './components/ShaderField'
import PortalLoader from './components/PortalLoader'
import CursorRing from './components/CursorRing'
import Navigation from './components/Navigation'
import SectionRail from './components/SectionRail'
import SceneReadout from './components/SceneReadout'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  useTheme()
  const active = useActiveSection()

  return (
    <div className="app">
      <ShaderField scene={active} />
      <PortalLoader />
      <CursorRing />
      <Navigation active={active} />
      <SectionRail active={active} />
      <SceneReadout active={active} />
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
