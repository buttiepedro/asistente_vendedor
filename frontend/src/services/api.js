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

// https://evolution-api-production-58c5b.up.railway.app
const evoApi = axios.create({
  baseURL: "https://evolution-api-production-58c5b.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    "apikey": "76aabb909d979783471de3b9e3d52348"
  },
})



export default api
export { evoApi }