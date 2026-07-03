import axios from "axios";

export const apiAfiliado = axios.create({
  baseURL: "http://localhost:8080/api/afiliado",
  headers: {
    "Content-Type": "application/json",
  },
});