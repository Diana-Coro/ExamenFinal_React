import API_URL from "../api/apiEnfermero";

export const listarEnfermeros = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const buscarEnfermeroPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};

export const guardarEnfermero = async (enfermero) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enfermero),
  });

  return await response.json();
};

export const actualizarEnfermero = async (id, enfermero) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enfermero),
  });

  return await response.json();
};

export const eliminarEnfermero = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};