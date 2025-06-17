"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { AdminHeader } from "@/components/admin-header"
import { AdminStats } from "@/components/admin-stats"
import { LojasList } from "@/components/lojas-list"
import { CreateLojaDialog } from "@/components/create-loja-dialog"
import { Loader2 } from "lucide-react"
import type { Tenant } from "@/types/tenant"

export default function LojasAdminPage() {
  const [lojas, setLojas] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchLojas()
  }, [])

  const fetchLojas = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/tenant")
      setLojas(Array.isArray(response.data) ? response.data : [])
      setError("")
    } catch (err: any) {
      if (err.response?.status === 404) {
        setLojas([])
      } else {
        setError("Erro ao carregar lojas. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLojaCreated = (novaLoja: Tenant) => {
    setLojas((prev) => [...prev, novaLoja])
  }

  const handleLojaDeleted = (lojaId: string) => {
    setLojas((prev) => prev.filter((loja) => loja._id !== lojaId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-gray-600">Carregando painel administrativo...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <AdminStats lojas={lojas} />

        {/* Lojas Management */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Lojas</h2>
                <p className="text-gray-600 mt-1">
                  {lojas.length} {lojas.length === 1 ? "loja cadastrada" : "lojas cadastradas"} no sistema
                </p>
              </div>
              <CreateLojaDialog onLojaCreated={handleLojaCreated} />
            </div>
          </div>

          {error ? (
            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-red-500 text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Erro ao carregar</h3>
                <p className="text-gray-600">{error}</p>
                <button
                  onClick={fetchLojas}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : (
            <LojasList lojas={lojas} onLojaDeleted={handleLojaDeleted} onRefresh={fetchLojas} />
          )}
        </div>
      </main>
    </div>
  )
}
