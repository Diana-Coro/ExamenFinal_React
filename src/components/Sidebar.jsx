import './Sidebar.css'

const LINKS = [
  { id: 'datos-generales', label: 'Datos Generales' },
  { id: 'situacion-geografica', label: 'Situación Geográfica' },
  { id: 'plantel-ejecutivo', label: 'Plantel Ejecutivo' },
  { id: 'estructura-organica', label: 'Estructura Orgánica' },
  { id: 'directorio', label: 'Directorio' },
]

export default function Sidebar({ active }) {
  return (
    <aside className="sidebar" aria-label="Secciones institucionales">
      <h2 className="sidebar__title">Institucional</h2>
      <ul className="sidebar__list">
        {LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={`sidebar__link ${active === link.id ? 'sidebar__link--active' : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
