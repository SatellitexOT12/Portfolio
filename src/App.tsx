import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
