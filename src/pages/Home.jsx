const NOVEDADES = [
  { titulo: 'Certificado de Afiliación / No Afiliado', tipo: 'doc', color: 'morado' },
  { titulo: 'Cuestionario COVID-19', tipo: 'covid', color: 'rojo' },
  { titulo: 'Solvencias para Afiliaciones', tipo: 'word', color: 'azul' },
  { titulo: 'Manual de Atención en Línea', tipo: 'pdf', color: 'gris' },
]

const SERVICIOS = [
  { nombre: 'Pediatría' },
  { nombre: 'Emergencias' },
  { nombre: 'Consulta General' },
  { nombre: 'Ecografía' },
  { nombre: 'Laboratorio' },
  { nombre: 'Radiografía' },
]

const MEDICOS = [
  { nombre: 'Dr. Juan Pérez', cargo: 'Medicina General' },
  { nombre: 'Dra. Ana Flores', cargo: 'Pediatría' },
  { nombre: 'Dr. Carlos Mamani', cargo: 'Traumatología' },
  { nombre: 'Dra. Rosa Quispe', cargo: 'Ginecología' },
]

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
      <path d="M6 2h9l5 5v15H6V2zm8 1.5V8h4.5L14 3.5z" />
    </svg>
  )
}

function NovedadCard({ n }) {
  return (
    <a href="#" className={`novedad-card novedad-card--${n.color}`}>
      <span className="novedad-card__icon"><IconDoc /></span>
      <span className="novedad-card__titulo">{n.titulo}</span>
    </a>
  )
}

function Avatar({ nombre }) {
  const iniciales = nombre
    .split(' ')
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(-2)
    .map((w) => w[0])
    .join('')
  return <div className="avatar">{iniciales}</div>
}

export default function Home() {
  return (
    <main>
      <section className="container novedades">
        <h2 className="novedades__titulo">Últimas novedades y consultas externas</h2>
        <p className="novedades__aviso">
          Estimado usuario, le comunicamos que los enlaces para los diferentes servicios se
          encuentran <strong>a continuación</strong>.
        </p>
        <div className="novedades__grid">
          {NOVEDADES.map((n) => (
            <NovedadCard key={n.titulo} n={n} />
          ))}
        </div>
      </section>

      <section className="container ambulancia">
        <div className="ambulancia__texto">
          <h2>Brindando los mejores servicios</h2>
          <p>Servicio de ambulancia las 24 Hrs. de la semana.</p>
          <p>
            Les brindamos los mejores servicios y médicos para su confort, con calidad y calidez,
            24/7 la fórmula perfecta al servicio de nuestros asegurados y la población en general,
            las 24 horas y los 7 días de la semana.
          </p>
          <a href="tel:+59126224161" className="btn btn--rojo">Llamar a emergencias</a>
        </div>
        <div className="ambulancia__galeria" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="container autoridades">
        <h2>Autoridades</h2>
        <p>Conoce el organigrama y las autoridades vigentes de la institución.</p>
        <a href="#" className="btn btn--azul">Ver organigrama</a>
      </section>

      <section className="container medicos">
        <h2>Nuestros médicos especialistas</h2>
        <div className="medicos__grid">
          {MEDICOS.map((m) => (
            <div className="medico-card" key={m.nombre}>
              <Avatar nombre={m.nombre} />
              <h3>{m.nombre}</h3>
              <p>{m.cargo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container servicios">
        <h2>Nuestros servicios</h2>
        <div className="servicios__grid">
          {SERVICIOS.map((s) => (
            <div className="servicio-card" key={s.nombre}>
              <h3>{s.nombre}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
