import API_URL from "../api/apiInstitucion";

export const listarInstituciones = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const buscarInstitucionPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};

export const guardarInstitucion = async (institucion) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(institucion),
  });

  return await response.json();
};

export const actualizarInstitucion = async (id, institucion) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(institucion),
  });

  return await response.json();
};

export const eliminarInstitucion = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};