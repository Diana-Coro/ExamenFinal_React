import { apiInstitucion } from "../../api/apiInstitucion";

export const listarInstituciones = () =>
  apiInstitucion.get("");

export const guardarInstitucion = (institucion) =>
  apiInstitucion.post("", institucion);

export const actualizarInstitucion = (id, institucion) =>
  apiInstitucion.put(`/${id}`, institucion);

export const eliminarInstitucion = (id) =>
  apiInstitucion.delete(`/${id}`);