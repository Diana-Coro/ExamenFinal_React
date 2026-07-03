import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Gestion from './pages/Gestion.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/institucional" element={<About />} />
        <Route path="/gestion" element={<Gestion />} />
      </Routes>
      <Footer />
    </div>
  )
}
