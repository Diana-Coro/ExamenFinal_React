import axios from "axios";

const URL = "http://localhost:8080/api/reportes";

export const listar = () => axios.get(URL);

export const guardar = (data) => axios.post(URL, data);

export const eliminar = (id) => axios.delete(`${URL}/${id}`);