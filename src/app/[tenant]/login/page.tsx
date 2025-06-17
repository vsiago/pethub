"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Tenant } from "@/types/tenant"
import { TenantThemeProvider } from "@/components/theme-provider-tenant"
import { TenantLoginForm } from "@/components/tenant-login-form"
import { getTenantBySlug } from "@/services/tenantService"

export default function TenantLoginPage() {
  const params = useParams()
  const tenantSlug = params?.tenant as string
  const [data, setData] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tenantSlug) return

    const fetchTenant = async () => {
      try {
        const tenantData = await getTenantBySlug(tenantSlug)
        setData(tenantData)
      } catch {
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTenant()
  }, [tenantSlug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Loja não encontrada</h1>
          <p className="text-gray-600">
            A loja "{tenantSlug}" não existe ou não está disponível.
          </p>
        </div>
      </div>
    )
  }

  return (
    <TenantThemeProvider tenant={data}>
      <TenantLoginForm tenant={data} />
    </TenantThemeProvider>
  )
}
