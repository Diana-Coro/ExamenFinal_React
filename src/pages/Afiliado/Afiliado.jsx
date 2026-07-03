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

  // Estado del formulario ajustado a los campos del backend de Afiliado
  const [form, setForm] = useState({
    tipoAfiliado: "",
    nombre: "",
    fechaHora: "",
  });

  const [idEditar, setIdEditar] = useState(null);

  const cargarAfiliados = async () => {
    try {
      const respuesta = await listarAfiliados();
      setAfiliados(respuesta.data);
    } catch (error) {
      console.error("Error al cargar afiliados:", error);
    }
  };

  useEffect(() => {
    cargarAfiliados();
  }, []);

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

      // Limpiar formulario tras guardar
      setForm({
        tipoAfiliado: "",
        nombre: "",
        fechaHora: "",
      });
      setIdEditar(null);
      cargarAfiliados();
    } catch (error) {
      console.error("Error al guardar afiliado:", error);
    }
  };

  const editar = (afiliado) => {
    setIdEditar(afiliado.id);
    setForm({
      tipoAfiliado: afiliado.tipoAfiliado,
      nombre: afiliado.nombre,
      fechaHora: afiliado.fechaHora, 
    });
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este afiliado?")) {
      try {
        await eliminarAfiliado(id);
        cargarAfiliados();
      } catch (error) {
        console.error("Error al eliminar afiliado:", error);
      }
    }
  };

  return (
    <div className="afiliado-container">
      <h1>Gestión de Afiliados</h1>

      <form className="afiliado-form" onSubmit={guardar}>
        
        {/* Usamos un select para el tipo de afiliado para mejor UX */}
        <select
          name="tipoAfiliado"
          value={form.tipoAfiliado}
          onChange={manejarCambio}
          required
        >
          <option value="" disabled>Seleccione Tipo</option>
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

        {/* Input datetime-local se mapea excelente con LocalDateTime de Java */}
        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={manejarCambio}
          required
        />

        <button type="submit">
          {idEditar ? "Actualizar" : "Guardar"}
        </button>
        
        {idEditar && (
          <button 
            type="button" 
            style={{backgroundColor: "#6c757d"}}
            onClick={() => {
              setIdEditar(null);
              setForm({ tipoAfiliado: "", nombre: "", fechaHora: "" });
            }}
          >
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
          {afiliados.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.tipoAfiliado}</td>
              <td>
                {/* Formateo rápido para mostrar la fecha más bonita */}
                {item.fechaHora ? new Date(item.fechaHora).toLocaleString() : 'N/A'}
              </td>
              <td>
                <button onClick={() => editar(item)}>Editar</button>
                <button 
                  onClick={() => eliminar(item.id)}
                  style={{backgroundColor: "#dc3545"}}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {afiliados.length === 0 && (
            <tr>
              <td colSpan="5">No hay afiliados registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Afiliado;