import { useEffect, useState } from "react";
import {
    listarReportes,
    guardarReporte,
    eliminarReporte
} from "../../services/reporteService";

import "./Reportes.css";

export default function Reportes() {

    const [reportes, setReportes] = useState([]);

    const [form, setForm] = useState({
        mes: "",
        ingresos: "",
        gastos: "",
        tipo: ""
    });

    const cargar = async () => {
        const data = await listarReportes();
        setReportes(data);
    };

    useEffect(() => {
        cargar();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const guardar = async () => {
        await guardarReporte(form);
        setForm({ mes: "", ingresos: "", gastos: "", tipo: "" });
        cargar();
    };

    const eliminar = async (id) => {
        await eliminarReporte(id);
        cargar();
    };

    return (
        <div className="container">

            <h1>CRUD REPORTES</h1>

            <div className="form">
                <input name="mes" placeholder="Mes" onChange={handleChange} />
                <input name="ingresos" placeholder="Ingresos" onChange={handleChange} />
                <input name="gastos" placeholder="Gastos" onChange={handleChange} />
                <input name="tipo" placeholder="Tipo" onChange={handleChange} />

                <button onClick={guardar}>Guardar</button>
            </div>

            <hr />

            {reportes.map((r) => (
                <div className="card" key={r.id}>
                    <p>{r.mes} | {r.ingresos} | {r.gastos} | {r.tipo}</p>

                    <button onClick={() => eliminar(r.id)}>
                        Eliminar
                    </button>
                </div>
            ))}

        </div>
    );
}