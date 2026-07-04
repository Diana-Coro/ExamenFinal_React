import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarEnfermeros,
  buscarEnfermeroPorId,
  guardarEnfermero,
  actualizarEnfermero,
  eliminarEnfermero,
} from "../../services/enfermeroService";

import "./Enfermero.css";

function Enfermero() {
  const navigate = useNavigate();

  const [enfermeros, setEnfermeros] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    fechaIngreso: "",
    area: "",
    celular: "",
  });

  useEffect(() => {
    cargarEnfermeros();
  }, []);

  async function cargarEnfermeros() {
    const datos = await listarEnfermeros();
    setEnfermeros(Array.isArray(datos) ? datos : []);
    setSeleccionado(null);
  }

  function manejarCambio(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function guardar(e) {
    e.preventDefault();

    const enfermero = {
      nombre: form.nombre,
      fechaIngreso: form.fechaIngreso,
      area: form.area,
      celular: form.celular,
    };

    if (idEditar) {
      await actualizarEnfermero(idEditar, enfermero);
    } else {
      await guardarEnfermero(enfermero);
    }

    limpiar();
    cargarEnfermeros();
  }

  async function buscar() {
    if (!idBuscar) {
      cargarEnfermeros();
      return;
    }

    const dato = await buscarEnfermeroPorId(idBuscar);
    setEnfermeros(dato ? [dato] : []);
    setSeleccionado(null);
  }

  function nuevo() {
    limpiar();
  }

  function editarSeleccionado() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    setIdEditar(seleccionado.id);
    setForm({
      nombre: seleccionado.nombre || "",
      fechaIngreso: seleccionado.fechaIngreso || "",
      area: seleccionado.area || "",
      celular: seleccionado.celular || "",
    });
  }

  async function eliminarSeleccionado() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    await eliminarEnfermero(seleccionado.id);
    limpiar();
    cargarEnfermeros();
  }

  function seleccionar() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    alert("Enfermero seleccionado: " + seleccionado.nombre);
  }

  function limpiar() {
    setForm({
      nombre: "",
      fechaIngreso: "",
      area: "",
      celular: "",
    });

    setIdEditar(null);
    setSeleccionado(null);
  }

  return (
    <div className="enfermero-container">
      <h1>ADMINISTRACIÓN DE ENFERMEROS</h1>

      <div className="enfermero-buscar">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />

        <button onClick={buscar}>Buscar</button>
        <button onClick={cargarEnfermeros}>Mostrar todos</button>
      </div>

      <form className="enfermero-form" onSubmit={guardar}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del enfermero"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />

        <input
          type="date"
          name="fechaIngreso"
          value={form.fechaIngreso}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="area"
          placeholder="Área"
          value={form.area}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={manejarCambio}
          required
        />

        <button type="submit">{idEditar ? "Actualizar" : "Guardar"}</button>
      </form>

      <table className="enfermero-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha ingreso</th>
            <th>Área</th>
            <th>Celular</th>
          </tr>
        </thead>

        <tbody>
          {enfermeros.length === 0 ? (
            <tr>
              <td colSpan="5">No hay enfermeros registrados</td>
            </tr>
          ) : (
            enfermeros.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSeleccionado(item)}
                className={seleccionado?.id === item.id ? "fila-seleccionada" : ""}
              >
                <td>{item.id}</td>
                <td>{item.nombre || "Sin dato"}</td>
                <td>{item.fechaIngreso || "Sin dato"}</td>
                <td>{item.area || "Sin dato"}</td>
                <td>{item.celular || "Sin dato"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="enfermero-acciones">
        <button onClick={nuevo}>Nuevo</button>
        <button onClick={editarSeleccionado}>Editar</button>
        <button onClick={eliminarSeleccionado}>Eliminar</button>
        <button onClick={seleccionar}>Seleccionar</button>
        <button onClick={() => navigate("/")}>Salir</button>
      </div>
    </div>
  );
}

export default Enfermero;