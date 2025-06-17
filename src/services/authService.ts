// services/authService.ts
import api from "../lib/api"

export const login = async ({
  email,
  senha,
}: {
  email: string
  senha: string
}) => {
  const response = await api.post("/auth/login", { email, senha })
  return response.data
}
