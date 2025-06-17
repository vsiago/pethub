// services/tenantService.ts
import api from "@/lib/api"
import type { Tenant } from "@/types/tenant"

/**
 * Busca uma tenant pelo slug
 */
export async function getTenantBySlug(slug: string): Promise<Tenant> {
  const response = await api.get(`/tenant/${slug}`)
  return response.data
}

/**
 * Busca todas as tenants
 */
export async function getAllTenants(): Promise<Tenant[]> {
  const response = await api.get("/tenant")
  return response.data
}
