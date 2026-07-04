import { useEffect, useState } from "react";
import {
  listarAfiliados,
  guardarAfiliado,
  actualizarAfiliado,
  eliminarAfiliado,
} from "../../services/Afiliadoservices";

import "./Afiliado.css";

function Afiliado() {
  const [afiliados, setAfiliados] = useState([]);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    tipoAfiliado: "",
    nombre: "",
    fechaHora: "",
  });

  useEffect(() => {
    cargarAfiliados();
  }, []);

  const cargarAfiliados = async () => {
    try {
      const respuesta = await listarAfiliados();
      setAfiliados(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error("Error al cargar afiliados:", error);
      setAfiliados([]);
    }
  };

  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    try {
      if (idEditar) {
        await actualizarAfiliado(idEditar, form);
      } else {
        await guardarAfiliado(form);
      }

      limpiarFormulario();
      cargarAfiliados();
    } catch (error) {
      console.error("Error al guardar afiliado:", error);
    }
  };

  const editar = (afiliado) => {
    setIdEditar(afiliado.id);

    setForm({
      tipoAfiliado: afiliado.tipoAfiliado || "",
      nombre: afiliado.nombre || "",
      fechaHora: afiliado.fechaHora || "",
    });
  };

  const eliminar = async (id) => {
    try {
      await eliminarAfiliado(id);
      cargarAfiliados();
    } catch (error) {
      console.error("Error al eliminar afiliado:", error);
    }
  };

  const limpiarFormulario = () => {
    setForm({
      tipoAfiliado: "",
      nombre: "",
      fechaHora: "",
    });

    setIdEditar(null);
  };

  return (
    <div className="afiliado-container">
      <h1>GESTIÓN DE AFILIADOS</h1>

      <form className="afiliado-form" onSubmit={guardar}>
        <select
          name="tipoAfiliado"
          value={form.tipoAfiliado}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccione Tipo</option>
          <option value="Regular">Regular</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre Completo"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={manejarCambio}
          required
        />

        <button type="submit">{idEditar ? "Actualizar" : "Guardar"}</button>

        {idEditar && (
          <button type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </form>

      <table className="afiliado-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo de Afiliado</th>
            <th>Fecha y Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {(afiliados || []).length === 0 ? (
            <tr>
              <td colSpan="5">No hay afiliados registrados</td>
            </tr>
          ) : (
            (afiliados || []).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre || "Sin dato"}</td>
                <td>{item.tipoAfiliado || "Sin dato"}</td>
                <td>
                  {item.fechaHora
                    ? new Date(item.fechaHora).toLocaleString()
                    : "Sin dato"}
                </td>
                <td>
                  <button onClick={() => editar(item)}>Editar</button>
                  <button onClick={() => eliminar(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Afiliado;