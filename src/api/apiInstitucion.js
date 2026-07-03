import axios from "axios";

export const apiInstitucion = axios.create({
  baseURL: "http://localhost:8080/api/instituciones",
  headers: {
    "Content-Type": "application/json",
  },
});