import { useEffect, useState } from "react";
import {
  listarInstituciones,
  guardarInstitucion,
  actualizarInstitucion,
  eliminarInstitucion,
} from "../../services/Institucionservices";

import "./Institucion.css";

function Institucion() {
  const [instituciones, setInstituciones] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
  });

  const [idEditar, setIdEditar] = useState(null);

  const cargarInstituciones = async () => {
    const respuesta = await listarInstituciones();
    setInstituciones(respuesta.data);
  };

  useEffect(() => {
    cargarInstituciones();
  }, []);

  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (idEditar) {
      await actualizarInstitucion(idEditar, form);
    } else {
      await guardarInstitucion(form);
    }

    setForm({
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
    });

    setIdEditar(null);
    cargarInstituciones();
  };

  const editar = (institucion) => {
    setIdEditar(institucion.id);

    setForm({
      nombre: institucion.nombre,
      direccion: institucion.direccion,
      telefono: institucion.telefono,
      correo: institucion.correo,
    });
  };

  const eliminar = async (id) => {
    await eliminarInstitucion(id);
    cargarInstituciones();
  };

  return (
    <div className="institucion-container">
      <h1>Gestión de Instituciones</h1>

      <form className="institucion-form" onSubmit={guardar}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={manejarCambio}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={manejarCambio}
          required
        />

        <button type="submit">
          {idEditar ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <table className="institucion-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {instituciones.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.direccion}</td>
              <td>{item.telefono}</td>
              <td>{item.correo}</td>
              <td>
                <button onClick={() => editar(item)}>
                  Editar
                </button>

                <button onClick={() => eliminar(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Institucion;