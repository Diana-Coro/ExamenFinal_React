import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const MENU = [
  { label: 'Inicio', to: '/' },
  {
    label: 'Institucional',
    to: '/institucional',
    children: [
      'Datos Generales',
      'Situación Geográfica',
      'Plantel Ejecutivo',
      'Estructura Orgánica',
      'Directorio',
    ],
  },
  {
    label: 'Servicios',
    children: [
      'Consulta Externa',
      'Laboratorio Clínico',
      'Imagenología',
      'Enfermería',
      'Farmacia',
      'Fisioterapia',
      'Ecografía',
      'Internación Clínica y Quirúrgica',
      'Afiliaciones',
      'Fichaje',
    ],
  },
  {
    label: 'Personal de Salud',
    children: ['Administrativo', 'Médico'],
  },
  {
    label: 'Contrataciones',
    children: [
      'Menor',
      'Anpe',
      'Licitación Pública',
      'Por Excepción',
      'Por Desastres y/o Emergencias',
      'Directa',
    ],
  },
  {
    label: 'Transparencia',
    children: ['Asesoría Legal', 'Historial de Avisos', 'Recursos Humanos', 'Auditoría'],
  },
  { label: 'Gestión', to: '/gestion' },
]

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NavBar() {
  const [openIndex, setOpenIndex] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="navbar" aria-label="Menú principal">
      <div className="container">
        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          Menú {mobileOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar__list ${mobileOpen ? 'navbar__list--open' : ''}`}>
          {MENU.map((item, i) => {
            const hasChildren = !!item.children
            const isActive = item.to && location.pathname === item.to
            return (
              <li
                key={item.label}
                className={`navbar__item ${openIndex === i ? 'navbar__item--open' : ''}`}
                onMouseEnter={() => hasChildren && setOpenIndex(i)}
                onMouseLeave={() => hasChildren && setOpenIndex(null)}
              >
                <Link
                  to={item.to || '#'}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  onClick={(e) => {
                    if (hasChildren && !item.to) {
                      e.preventDefault()
                      setOpenIndex(openIndex === i ? null : i)
                    }
                  }}
                  aria-haspopup={hasChildren ? 'true' : undefined}
                  aria-expanded={hasChildren ? openIndex === i : undefined}
                >
                  {item.label}
                </Link>

                {hasChildren && openIndex === i && (
                  <ul className="navbar__submenu">
                    {item.children.map((child) => (
                      <li key={child}>
                        <Link to={`/institucional#${slugify(child)}`} className="navbar__sublink">
                          {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
