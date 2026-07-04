import API_URL from "../api/apiDoctor";

async function handleResponse(response, mensajeError) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || mensajeError);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function listarDoctores() {
  const response = await fetch(API_URL);
  return await handleResponse(response, "No se pudieron listar los doctores");
}

export async function buscarDoctorPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return await handleResponse(response, "No se encontro el doctor");
}

export async function guardarDoctor(doctor) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });

  return await handleResponse(response, "No se pudo guardar el doctor");
}

export async function actualizarDoctor(id, doctor) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });

  return await handleResponse(response, "No se pudo actualizar el doctor");
}

export async function eliminarDoctor(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return await handleResponse(response, "No se pudo eliminar el doctor");
}