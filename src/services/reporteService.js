import API_REPORTE from "../api/apiReporte";

export const listarReportes = async () => {
  const response = await fetch(API_REPORTE);
  return await response.json();
};

export const buscarReportePorId = async (id) => {
  const response = await fetch(`${API_REPORTE}/${id}`);
  return await response.json();
};

export const guardarReporte = async (reporte) => {
  const response = await fetch(API_REPORTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });

  return await response.json();
};

export const actualizarReporte = async (id, reporte) => {
  const response = await fetch(`${API_REPORTE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });

  return await response.json();
};

export const eliminarReporte = async (id) => {
  await fetch(`${API_REPORTE}/${id}`, {
    method: "DELETE",
  });
};