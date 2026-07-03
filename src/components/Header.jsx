import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import escudo from '../assets/escudo.png'
import './Header.css'

function IconTelefono() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/>
    </svg>
  )
}
function IconCorreo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 5h20v14H2V5zm2 2v.4l8 5 8-5V7H4zm16 2.2-7.4 4.6a1 1 0 0 1-1.1 0L4 9.2V17h16V9.2z"/>
    </svg>
  )
}
function IconUbicacion() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
    </svg>
  )
}
function IconMegafono() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 10v4h3l6 4V6l-6 4H3z" />
      <path d="M15 8a5 5 0 0 1 0 8" />
      <path d="M18 5a9 9 0 0 1 0 14" />
    </svg>
  )
}
function IconCampana() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a2 2 0 0 0-2 2v.6C7 5.4 5 8 5 11v4l-2 3v1h18v-1l-2-3v-4c0-3-2-5.6-5-6.4V4a2 2 0 0 0-2-2zm0 20a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22z"/>
    </svg>
  )
}

export default function Header() {
  return (
    <header className="header">
      <div className="header__topbar">
        <div className="container header__topbar-inner">
          <a href="tel:+59126224161" className="header__topbar-item">
            <IconTelefono />
            <span>Emergencias +591-2-6224161</span>
          </a>
          <a href="mailto:segurosocialuniversitario@ssupotosi.com.bo" className="header__topbar-item">
            <IconCorreo />
            <span>segurosocialuniversitario@ssupotosi.com.bo</span>
          </a>
          <span className="header__topbar-item">
            <IconUbicacion />
            <span>Calle Calama N° 107</span>
          </span>
        </div>
      </div>

      <div className="container header__main">
        <Link to="/" className="header__brand">
          <img src={logo} alt="Logo Seguro Social Universitario Potosí" className="header__logo" />
        </Link>

        <Link to="/" className="header__title">
          <h1>SEGURO SOCIAL<br />UNIVERSITARIO POTOSÍ</h1>
        </Link>

        <img src={escudo} alt="Escudo de Bolivia" className="header__escudo" />

        <div className="header__actions">
          <a href="#reservas" className="header__action header__action--reservas">
            <IconMegafono />
            <span>Reservas</span>
          </a>
          <a href="#convocatorias" className="header__action header__action--link">
            CONVOCATORIAS
          </a>
          <a href="#redes" className="header__action header__action--follow">
            <IconCampana />
            <span>Síguenos</span>
          </a>
        </div>
      </div>
    </header>
  )
}
