import { useState } from 'react'
import RegistroCRUD from '../components/gestion/RegistroCRUD.jsx'

// Solo los atributos definidos para cada tabla (sin importar quién la asignó).
const ENTIDADES = {
  doctores: {
    label: 'Doctores',
    fields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'idDoc', label: 'ID' },
      { key: 'fechaIngreso', label: 'Fecha de ingreso', type: 'date' },
      { key: 'area', label: 'Área' },
      { key: 'celular', label: 'Celular' },
      { key: 'especialidad', label: 'Especialidad' },
    ],
  },
  enfermeros: {
    label: 'Enfermeros',
    fields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'idEnf', label: 'ID' },
      { key: 'fechaIngreso', label: 'Fecha de ingreso', type: 'date' },
      { key: 'area', label: 'Área' },
      { key: 'celular', label: 'Celular' },
    ],
  },
  pacientes: {
    label: 'Pacientes',
    fields: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'ci', label: 'CI' },
      { key: 'fechaIngreso', label: 'Fecha de ingreso', type: 'date' },
      { key: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
      { key: 'diagnostico', label: 'Diagnóstico' },
      { key: 'genero', label: 'Género', type: 'select', options: ['Femenino', 'Masculino', 'Otro'] },
      { key: 'numeroReferencia', label: 'N° de referencia' },
    ],
  },
  reportes: {
    label: 'Reportes',
    fields: [
      { key: 'gastos', label: 'Gastos', type: 'number' },
      { key: 'mes', label: 'Mes' },
      { key: 'ingresos', label: 'Ingresos', type: 'number' },
      { key: 'tipoReporte', label: 'Tipo de reporte' },
    ],
  },
  afiliados: {
    label: 'Afiliados',
    fields: [
      { key: 'idAfil', label: 'ID' },
      { key: 'afiliado', label: 'Afiliado' },
      { key: 'tipoAfiliado', label: 'Tipo de afiliado', type: 'select', options: ['Titular', 'Beneficiario'] },
      { key: 'beneficiario', label: 'Beneficiario' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
      { key: 'hora', label: 'Hora', type: 'time' },
    ],
  },
  empresas: {
    label: 'Empresas / Instituciones',
    fields: [
      { key: 'idEmp', label: 'ID' },
      { key: 'institucion', label: 'Institución' },
      { key: 'referencias', label: 'Referencias' },
    ],
  },
}

export default function Gestion() {
  const [activa, setActiva] = useState('doctores')
  const entidad = ENTIDADES[activa]

  return (
    <main className="container institucional">
      <h1 className="institucional__titulo">Gestión</h1>
      <p>Registro de datos para conectar con el backend (por ahora almacenados en memoria).</p>

      <nav className="gestion__tabs" aria-label="Tablas de gestión">
        {Object.entries(ENTIDADES).map(([key, { label }]) => (
          <button
            key={key}
            className={`gestion__tab ${activa === key ? 'gestion__tab--active' : ''}`}
            onClick={() => setActiva(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <RegistroCRUD key={activa} title={entidad.label} fields={entidad.fields} />
    </main>
  )
}
