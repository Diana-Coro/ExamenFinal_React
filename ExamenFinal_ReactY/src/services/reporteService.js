import { listar, guardar, eliminar } from "../api/reporteApi";

export const listarReportes = async () => {
    const res = await listar();
    return res.data;
};

export const guardarReporte = async (data) => {
    const res = await guardar(data);
    return res.data;
};

export const eliminarReporte = async (id) => {
    const res = await eliminar(id);
    return res.data;
};