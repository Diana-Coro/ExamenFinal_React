import API_URL from "../api/apiPacientes";


export const listarPacientes = async () => {

    const respuesta = await fetch(`${API_URL}`);
    return await respuesta.json();
};

export const buscarPacientePorId = async (id) => {
    const respuesta = await fetch(`${API_URL}/${id}`);

    if (!respuesta.ok) {
        throw new Error("No se encontró el paciente");
    }

    return await respuesta.json();
};

export const guardarPaciente = async (paciente) => {
    const respuesta = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
    });

    return await respuesta.json();
};

export const eliminarPaciente = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

export const actualizarPaciente = async (id, paciente) => {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
    });

    return await respuesta.json();
};
