// lib/api.ts
import axios from "axios"

const api = axios.create({
  baseURL: "https://e2ee-189-112-41-209.ngrok-free.app/api",
})

export default api
