import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'

export default function About() {
  const [active, setActive] = useState('datos-generales')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) setActive(hash)
  }, [])

  return (
    <main className="container institucional">
      <h1 className="institucional__titulo">Institucional</h1>

      <div className="institucional__layout">
        <Sidebar active={active} />

        <div className="institucional__contenido">
          <section id="datos-generales">
            <h2>Datos Generales</h2>
            <p>
              El Seguro Social Universitario Potosí es la entidad encargada de brindar
              prestaciones de salud a la comunidad universitaria y sus beneficiarios en el
              departamento de Potosí, garantizando atención médica de calidad y calidez.
            </p>
          </section>

          <section id="situacion-geografica">
            <h2>Situación Geográfica</h2>
            <p>
              Nuestras instalaciones se encuentran en Calle Calama N° 107, en pleno centro de la
              ciudad de Potosí, con fácil acceso para asegurados de toda la región.
            </p>
          </section>

          <section id="plantel-ejecutivo">
            <h2>Plantel Ejecutivo</h2>
            <p>
              La institución cuenta con un equipo de dirección responsable de la gestión
              administrativa, financiera y de salud, velando por el correcto funcionamiento de
              todos los servicios.
            </p>
          </section>

          <section id="estructura-organica">
            <h2>Estructura Orgánica</h2>
            <p>
              La estructura orgánica define las áreas administrativas, médicas y de apoyo que
              componen la institución, ordenadas jerárquicamente para una gestión eficiente.
            </p>
          </section>

          <section id="directorio">
            <h2>Directorio</h2>
            <p>
              El Directorio es la máxima instancia de decisión institucional, conformado por
              representantes de los distintos estamentos universitarios y de salud.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
