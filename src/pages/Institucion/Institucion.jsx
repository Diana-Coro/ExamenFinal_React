import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarInstituciones,
  guardarInstitucion,
  actualizarInstitucion,
  eliminarInstitucion,
} from "../../services/Institucionservices";

import "./Institucion.css";

function Institucion() {
  const navigate = useNavigate();

  const [instituciones, setInstituciones] = useState([]);
  const [institucionesBase, setInstitucionesBase] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");

  const [form, setForm] = useState({
    institucion: "",
    referencias: "",
  });

  useEffect(() => {
    cargarInstituciones();
  }, []);

  async function cargarInstituciones() {
    const datos = await listarInstituciones();
    const lista = Array.isArray(datos) ? datos : [];

    setInstituciones(lista);
    setInstitucionesBase(lista);
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

    const institucionEnviar = {
      institucion: form.institucion,
      referencias: form.referencias,
    };

    if (idEditar) {
      await actualizarInstitucion(idEditar, institucionEnviar);
    } else {
      await guardarInstitucion(institucionEnviar);
    }

    limpiar();
    cargarInstituciones();
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
      institucion: seleccionado.institucion || "",
      referencias: seleccionado.referencias || "",
    });
  }

  async function eliminarSeleccionado() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    await eliminarInstitucion(seleccionado.id);
    limpiar();
    cargarInstituciones();
  }

  function seleccionar() {
    if (!seleccionado) {
      alert("Seleccione una fila");
      return;
    }

    alert("Institución seleccionada: " + (seleccionado.institucion || "Sin dato"));
  }

  function buscar() {
    if (!idBuscar) {
      setInstituciones(institucionesBase);
      return;
    }

    const filtrado = institucionesBase.filter(
      (item) => String(item.id) === String(idBuscar)
    );

    setInstituciones(filtrado);
    setSeleccionado(null);
  }

  function limpiar() {
    setForm({
      institucion: "",
      referencias: "",
    });

    setIdEditar(null);
    setSeleccionado(null);
  }

  return (
    <div className="institucion-container">
      <h1>ADMINISTRACIÓN DE INSTITUCIONES</h1>

      <div className="institucion-buscar">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />

        <button onClick={buscar}>Buscar</button>
        <button onClick={cargarInstituciones}>Mostrar todos</button>
      </div>

      <form className="institucion-form" onSubmit={guardar}>
        <input
          type="text"
          name="institucion"
          placeholder="Institución"
          value={form.institucion}
          onChange={manejarCambio}
          required
        />

        <input
          type="text"
          name="referencias"
          placeholder="Referencias"
          value={form.referencias}
          onChange={manejarCambio}
          required
        />

        <button type="submit">{idEditar ? "Actualizar" : "Guardar"}</button>
      </form>

      <table className="institucion-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Institución</th>
            <th>Referencias</th>
          </tr>
        </thead>

        <tbody>
          {instituciones.length === 0 ? (
            <tr>
              <td colSpan="3">No hay instituciones registradas</td>
            </tr>
          ) : (
            instituciones.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSeleccionado(item)}
                className={seleccionado?.id === item.id ? "fila-seleccionada" : ""}
              >
                <td>{item.id}</td>
                <td>{item.institucion || "Sin dato"}</td>
                <td>{item.referencias || "Sin dato"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="institucion-acciones">
        <button onClick={nuevo}>Nuevo</button>
        <button onClick={editarSeleccionado}>Editar</button>
        <button onClick={eliminarSeleccionado}>Eliminar</button>
        <button onClick={seleccionar}>Seleccionar</button>
        <button onClick={() => navigate("/")}>Salir</button>
      </div>
    </div>
  );
}

export default Institucion;