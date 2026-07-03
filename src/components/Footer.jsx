import './Footer.css'

const SERVICIOS = [
  'Consulta Externa',
  'Laboratorio Clínico',
  'Imagenología',
  'Enfermería',
  'Farmacia',
  'Fisioterapia',
  'Ecografía',
  'Internación Clínica y Quirúrgica',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <h3>Contacto</h3>
          <p>Calle Calama N° 107</p>
          <p>Emergencias: +591-2-6224161</p>
          <p>segurosocialuniversitario@ssupotosi.com.bo</p>
        </div>

        <div className="footer__col">
          <h3>Servicios</h3>
          <ul>
            {SERVICIOS.map((s) => (
              <li key={s}>
                <a href="#servicios">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>Síguenos</h3>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="YouTube">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Seguro Social Universitario Potosí. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
