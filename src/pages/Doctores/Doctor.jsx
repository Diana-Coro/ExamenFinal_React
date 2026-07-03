import { useEffect, useState } from "react";
import {
  listarDoctores,
  buscarDoctorPorId,
  guardarDoctor,
  actualizarDoctor,
  eliminarDoctor,
} from "../services/doctorService";
import "./Doctor.css";

function Doctor() {
  const [doctores, setDoctores] = useState([]);
  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    fechaIngreso: "",
    area: "",
    celular: "",
    especialidad: "",
  });

  useEffect(() => {
    cargarDoctores();
  }, []);

  async function cargarDoctores() {
    const datos = await listarDoctores();
    setDoctores(datos);
  }

  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  }

  async function guardar(e) {
    e.preventDefault();

    if (idEditar) {
      await actualizarDoctor(idEditar, formulario);
      alert("Doctor actualizado correctamente");
    } else {
      await guardarDoctor(formulario);
      alert("Doctor guardado correctamente");
    }

    limpiarFormulario();
    cargarDoctores();
  }

  function editar(doctor) {
    setIdEditar(doctor.id);
    setFormulario({
      nombre: doctor.nombre,
      fechaIngreso: doctor.fechaIngreso,
      area: doctor.area,
      celular: doctor.celular,
      especialidad: doctor.especialidad,
    });
  }

  async function eliminar(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar este doctor?");

    if (confirmar) {
      await eliminarDoctor(id);
      cargarDoctores();
    }
  }

  async function buscarPorId() {
    if (!idBuscar) {
      cargarDoctores();
      return;
    }

    const doctor = await buscarDoctorPorId(idBuscar);
    setDoctores([doctor]);
  }

  function limpiarFormulario() {
    setIdEditar(null);
    setFormulario({
      nombre: "",
      fechaIngreso: "",
      area: "",
      celular: "",
      especialidad: "",
    });
  }

  return (
    <div className="pagina-doctor">


      <main className="contenedor">
        <aside className="menu-lateral">
          <h3>Servicios</h3>

          <button type="button" className="seleccionado">
            Doctores
          </button>
        </aside>

        <section className="contenido">
          <h2>Gestión de Doctores</h2>
          <p className="descripcion">
            Registro y administración del personal médico del Seguro Social Universitario.
          </p>

          <form className="formulario" onSubmit={guardar}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del doctor"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />

            <input
              type="date"
              name="fechaIngreso"
              value={formulario.fechaIngreso}
              onChange={manejarCambio}
              required
            />

            <input
              type="text"
              name="area"
              placeholder="Área"
              value={formulario.area}
              onChange={manejarCambio}
              required
            />

            <input
              type="text"
              name="celular"
              placeholder="Celular"
              value={formulario.celular}
              onChange={manejarCambio}
              required
            />

            <input
              type="text"
              name="especialidad"
              placeholder="Especialidad"
              value={formulario.especialidad}
              onChange={manejarCambio}
              required
            />

            <div className="botones-formulario">
              <button type="submit">
                {idEditar ? "Actualizar" : "Guardar"}
              </button>

              <button type="button" className="btn-secundario" onClick={limpiarFormulario}>
                Nuevo
              </button>
            </div>
          </form>

          <div className="buscador">
            <input
              type="number"
              placeholder="Buscar por ID"
              value={idBuscar}
              onChange={(e) => setIdBuscar(e.target.value)}
            />
            <button type="button" onClick={buscarPorId}>Buscar</button>
            <button type="button" className="btn-secundario" onClick={cargarDoctores}>
              Mostrar todos
            </button>
          </div>

          <table className="tabla-doctores">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha ingreso</th>
                <th>Área</th>
                <th>Celular</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {doctores.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.nombre}</td>
                  <td>{doctor.fechaIngreso}</td>
                  <td>{doctor.area}</td>
                  <td>{doctor.celular}</td>
                  <td>{doctor.especialidad}</td>
                  <td>
                    <button type="button" onClick={() => editar(doctor)}>Editar</button>
                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() => eliminar(doctor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {doctores.length === 0 && (
                <tr>
                  <td colSpan="7" className="sin-datos">
                    No hay doctores registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>


    </div>
  );
}

export default Doctor;