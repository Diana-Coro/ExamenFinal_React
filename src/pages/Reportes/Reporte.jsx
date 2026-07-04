import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarReportes,
  buscarReportePorId,
  guardarReporte,
  actualizarReporte,
  eliminarReporte,
} from "../../services/reporteService";

import "./Reporte.css";

function Reporte() {
  const navigate = useNavigate();

  const [reportes, setReportes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");

  const [form, setForm] = useState({
    mes: "",
    ingresos: "",
    gastos: "",
    tipo: "",
  });

  useEffect(() => {
    cargarReportes();
  }, []);

  async function cargarReportes() {
    const datos = await listarReportes();
    setReportes(Array.isArray(datos) ? datos : []);
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

    const reporte = {
      mes: form.mes,
      ingresos: Number(form.ingresos),
      gastos: Number(form.gastos),
      tipo: form.tipo,
    };

    if (idEditar) {
      await actualizarReporte(idEditar, reporte);
    } else {
      await guardarReporte(reporte);
    }

    limpiar();
    cargarReportes();
  }

  async function buscar() {
    if (!idBuscar) {
      cargarReportes();
      return;
    }

    const dato = await buscarReportePorId(idBuscar);
    setReportes(dato ? [dato] : []);
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
      mes: seleccionado.mes || "",
      ingresos: seleccionado.ingresos || "",
      gastos: seleccionado.gastos || "",
      tipo: seleccionado.tipo || "",
    });
  }

  async function eliminarSeleccionado() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    await eliminarReporte(seleccionado.id);
    limpiar();
    cargarReportes();
  }

  function seleccionar() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    alert("Reporte seleccionado");
  }

  function limpiar() {
    setForm({
      mes: "",
      ingresos: "",
      gastos: "",
      tipo: "",
    });

    setIdEditar(null);
    setSeleccionado(null);
  }

  return (
    <div className="reporte-container">
      <h1>ADMINISTRACIÓN DE REPORTES</h1>

      <div className="reporte-buscar">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />

        <button onClick={buscar}>Buscar</button>
        <button onClick={cargarReportes}>Mostrar todos</button>
      </div>

      <form className="reporte-form" onSubmit={guardar}>
        <input
          type="text"
          name="mes"
          placeholder="Mes"
          value={form.mes}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="ingresos"
          placeholder="Ingresos"
          value={form.ingresos}
          onChange={manejarCambio}
          required
        />

        <input
          type="number"
          name="gastos"
          placeholder="Gastos"
          value={form.gastos}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={manejarCambio}
          required
        />

        <button type="submit">{idEditar ? "Actualizar" : "Guardar"}</button>
      </form>

      <table className="reporte-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mes</th>
            <th>Ingresos</th>
            <th>Gastos</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {reportes.length === 0 ? (
            <tr>
              <td colSpan="5">No hay reportes registrados</td>
            </tr>
          ) : (
            reportes.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSeleccionado(item)}
                className={seleccionado?.id === item.id ? "fila-seleccionada" : ""}
              >
                <td>{item.id}</td>
                <td>{item.mes || "Sin dato"}</td>
                <td>{item.ingresos ?? "Sin dato"}</td>
                <td>{item.gastos ?? "Sin dato"}</td>
                <td>{item.tipo || "Sin dato"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="reporte-acciones">
        <button onClick={nuevo}>Nuevo</button>
        <button onClick={editarSeleccionado}>Editar</button>
        <button onClick={eliminarSeleccionado}>Eliminar</button>
        <button onClick={seleccionar}>Seleccionar</button>
        <button onClick={() => navigate("/")}>Salir</button>
      </div>
    </div>
  );
}

export default Reporte;