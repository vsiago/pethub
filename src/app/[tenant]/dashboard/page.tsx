"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Tenant } from "@/types/tenant"
import { ProtectedRoute } from "@/components/protected-route"
import { TenantLayout } from "@/components/tenant-layout"
import { TenantDashboard } from "@/components/tenant-dashboard"
import { TenantThemeProvider } from "@/components/theme-provider-tenant"
import { getTenantBySlug } from "@/services/tenantService"

export default function TenantDashboardPage() {
  const params = useParams()
  const tenant = params?.tenant as string
  const [data, setData] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tenant) return

    const fetchTenant = async () => {
      try {
        const tenantData = await getTenantBySlug(tenant)
        setData(tenantData)
      } catch (error) {
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTenant()
  }, [tenant])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Loja não encontrada</h1>
          <p className="text-gray-600">A loja "{tenant}" não existe ou não está disponível.</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute tenantSlug={tenant}>
      <TenantThemeProvider tenant={data}>
        <TenantLayout tenant={data} title="Dashboard">
          <TenantDashboard tenant={data} />
        </TenantLayout>
      </TenantThemeProvider>
    </ProtectedRoute>
  )
}
