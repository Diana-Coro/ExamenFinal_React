import { useEffect, useState } from "react";
import {
    listarPacientes,
    buscarPacientePorId,
    guardarPaciente,
    actualizarPaciente,
    eliminarPaciente,
} from "../../services/Pacientes.js";

import "./Pacientes.css";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [ci, setCi] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [numeroReferencia, setNumeroReferencia] = useState("");

    const [idEditar, setIdEditar] = useState(null);
    const [idBuscar, setIdBuscar] = useState("");
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoFormulario, setModoFormulario] = useState("");
    const [mostrarEliminar, setMostrarEliminar] = useState(false);

    const cargarPacientes = async () => {
        try {
            const datos = await listarPacientes();
            setPacientes(datos || []);
        } catch (error) {
            console.error("Error al cargar pacientes", error);
            setPacientes([]);
        }
        setPacienteSeleccionado(null);
    };

    useEffect(() => {

        setTimeout(() => {
            cargarPacientes();
        }, 0);
    }, []);

    const buscarPorId = async () => {
        if (idBuscar === "") {
            alert("Ingrese un código CI para buscar");
            return;
        }

        try {
            const dato = await buscarPacientePorId(idBuscar);
            setPacientes([dato]);
            setPacienteSeleccionado(null);
        } catch (error) {
            console.error(error);
            alert("No se encontró un paciente con ese CI");
        }

    };

    const seleccionarFila = (paciente) => {
        setPacienteSeleccionado(paciente);
    };

    const nuevo = () => {
        setModoFormulario("nuevo");
        setIdEditar(null);
        setCi("");
        setNombre("");
        setFechaNacimiento("");
        setDiagnostico("");
        setNumeroReferencia("");
        setMostrarFormulario(true);
    };

    const editarSeleccionado = () => {
        if (pacienteSeleccionado === null) {
            alert("Seleccione un paciente de la tabla");
            return;
        }

        setModoFormulario("editar");
        setIdEditar(pacienteSeleccionado.ci);
        setCi(pacienteSeleccionado.ci);
        setNombre(pacienteSeleccionado.nombre);
        setFechaNacimiento(pacienteSeleccionado.fechaNacimiento);
        setDiagnostico(pacienteSeleccionado.diagnostico);
        setNumeroReferencia(pacienteSeleccionado.numeroReferencia);
        setMostrarFormulario(true);
    };

    const guardar = async (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || fechaNacimiento === "" || diagnostico.trim() === "" || numeroReferencia.trim() === "") {
            alert("Por favor complete todos los campos");
            return;
        }

        const paciente = {
            ci: parseInt(ci),
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            diagnostico: diagnostico,
            numeroReferencia: numeroReferencia
        };

        if (modoFormulario === "nuevo") {
            if (!ci) {
                alert("Ingrese el CI para el nuevo paciente");
                return;
            }
            await guardarPaciente(paciente);
        } else {
            await actualizarPaciente(idEditar, paciente);
        }

        setMostrarFormulario(false);
        limpiarFormulario();
        setPacienteSeleccionado(null);
        cargarPacientes();
    };

    const cancelarFormulario = () => {
        setMostrarFormulario(false);
        limpiarFormulario();
        setIdEditar(null);
    };

    const limpiarFormulario = () => {
        setCi("");
        setNombre("");
        setFechaNacimiento("");
        setDiagnostico("");
        setNumeroReferencia("");
    };

    const eliminarSeleccionado = () => {
        if (pacienteSeleccionado === null) {
            alert("Seleccione un paciente para eliminar");
            return;
        }

        setMostrarEliminar(true);
    };

    const confirmarEliminar = async () => {
        await eliminarPaciente(pacienteSeleccionado.ci);

        setMostrarEliminar(false);
        setPacienteSeleccionado(null);
        cargarPacientes();
    };

    const cancelarEliminar = () => {
        setMostrarEliminar(false);
    };

    const seleccionarPaciente = () => {
        if (pacienteSeleccionado === null) {
            alert("Seleccione un paciente de la tabla");
            return;
        }

        alert(
            "Paciente seleccionado: " +
            pacienteSeleccionado.ci +
            " - " +
            pacienteSeleccionado.nombre
        );
    };

    const salir = () => {
        alert("Saliendo de la administración de Pacientes");
    };

    return (
        <div className="estado-page">
            <div className="estado-panel">
                <div className="estado-header">ADMINISTRACIÓN DE PACIENTES</div>

                <div className="estado-busqueda">
                    <input
                        type="number"
                        placeholder="Buscar por CI"
                        value={idBuscar}
                        onChange={(e) => setIdBuscar(e.target.value)}
                    />

                    <button type="button" onClick={buscarPorId}>
                        Buscar
                    </button>

                    <button type="button" onClick={cargarPacientes}>
                        Mostrar todos
                    </button>
                </div>

                <div className="tabla-contenedor">
                    <table className="estado-tabla">
                        <thead>
                        <tr>
                            <th>Id (Código)</th>
                            <th>Nombre</th>
                            <th>Fecha Nacimiento</th>
                            <th>Diagnóstico</th>
                            <th>Nro. Referencia</th>
                        </tr>
                        </thead>

                        <tbody>
                        {pacientes.length > 0 ? (
                            pacientes.map((paciente) => (
                                <tr
                                    key={paciente.ci}
                                    onClick={() => seleccionarFila(paciente)}
                                    className={
                                        pacienteSeleccionado?.ci === paciente.ci
                                            ? "fila-seleccionada"
                                            : ""
                                    }
                                >
                                    <td>{paciente.ci}</td>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.fechaNacimiento}</td>
                                    <td>{paciente.diagnostico}</td>
                                    <td>{paciente.numeroReferencia}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay pacientes registrados</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="botones-panel">
                    <button type="button" onClick={nuevo}>
                        Nuevo
                    </button>

                    <button type="button" onClick={editarSeleccionado}>
                        Editar
                    </button>

                    <button type="button" onClick={eliminarSeleccionado}>
                        Eliminar
                    </button>

                    <button type="button" onClick={seleccionarPaciente}>
                        Seleccionar
                    </button>

                    <button type="button" onClick={salir}>
                        Salir
                    </button>
                </div>
            </div>

            {mostrarFormulario && (
                <div className="modal-fondo">
                    <div className="modal-caja">
                        <div className="modal-header">
                            {modoFormulario === "nuevo"
                                ? "NUEVO PACIENTE"
                                : "EDITAR PACIENTE"}
                        </div>

                        <form onSubmit={guardar} className="modal-formulario">
                            <label>CI (Código):</label>
                            <input
                                type="number"
                                placeholder="Ingrese CI del paciente"
                                value={ci}
                                onChange={(e) => setCi(e.target.value)}
                                disabled={modoFormulario === "editar"}
                                autoFocus={modoFormulario === "nuevo"}
                            />

                            <label>Nombre completo:</label>
                            <input
                                type="text"
                                placeholder="Ingrese nombre del paciente"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                autoFocus={modoFormulario === "editar"}
                            />

                            <label>Fecha de nacimiento:</label>
                            <input
                                type="date" // <- ESTO ES LO ÚNICO QUE DEBES CAMBIAR (ponle "date" en lugar de "text")
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />


                            <label>Diagnóstico:</label>
                            <input
                                type="text"
                                placeholder="Ingrese diagnóstico"
                                value={diagnostico}
                                onChange={(e) => setDiagnostico(e.target.value)}
                            />

                            <label>Número de referencia:</label>
                            <input
                                type="text"
                                placeholder="Ingrese número de referencia"
                                value={numeroReferencia}
                                onChange={(e) => setNumeroReferencia(e.target.value)}
                            />

                            <div className="modal-botones">
                                <button type="submit">
                                    {modoFormulario === "nuevo" ? "Guardar" : "Actualizar"}
                                </button>

                                <button type="button" onClick={cancelarFormulario}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {mostrarEliminar && (
                <div className="modal-fondo">
                    <div className="modal-caja">
                        <div className="modal-header">ELIMINAR PACIENTE</div>

                        <p className="modal-texto">
                            ¿Seguro que desea eliminar al paciente{" "}
                            <b>{pacienteSeleccionado?.nombre}</b>?
                        </p>

                        <div className="modal-botones">
                            <button type="button" onClick={confirmarEliminar}>
                                Sí, eliminar
                            </button>

                            <button type="button" onClick={cancelarEliminar}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pacientes;
