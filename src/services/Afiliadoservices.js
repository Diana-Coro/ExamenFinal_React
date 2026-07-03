import { apiAfiliado } from "../api/apiAfiliado";

export const listarAfiliados = () =>
  apiAfiliado.get("");

export const guardarAfiliado = (afiliado) =>
  apiAfiliado.post("", afiliado);

export const actualizarAfiliado = (id, afiliado) =>
  apiAfiliado.put(`/${id}`, afiliado);

export const eliminarAfiliado = (id) =>
  apiAfiliado.delete(`/${id}`);