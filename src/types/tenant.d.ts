export interface Tenant {
  _id?: string
  nome: string
  slug: string
  produtos: any[]
  services?: any[]
  logo?: string
  cores?: {
    primaria: string
    secundaria: string
  }
  descricao?: string
  endereco?: string
  telefone?: string
  email?: string
  adminUser?: string
}

export interface AdminUser {
  _id?: string
  nome: string
  email: string
  senha: string
  role: string
  tenant?: string
}

export interface CreateTenantRequest {
  tenant: Omit<Tenant, "_id" | "adminUser">
  adminUser: Omit<AdminUser, "_id" | "tenant">
}
