import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token"),
  },
})

api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    // Esto elimina cualquier comilla extra que se haya guardado
    token = token.replace(/^"(.*)"$/, '$1'); 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api
