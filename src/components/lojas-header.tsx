"use client"

import { CreateLojaDialog } from "./create-loja-dialog"
import { Store, TrendingUp } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface LojasHeaderProps {
  lojas: Tenant[]
  onLojaCreated: (loja: Tenant) => void
}

export function LojasHeader({ lojas, onLojaCreated }: LojasHeaderProps) {
  const totalLojas = lojas.length
  const lojasAtivas = lojas.length // Assumindo que todas estão ativas por enquanto

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Título e estatísticas */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Minhas Lojas</h1>
                <p className="text-gray-600">Gerencie todas as suas lojas em um só lugar</p>
              </div>
            </div>

            {/* Estatísticas */}
            {totalLojas > 0 && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{lojasAtivas}</span> ativas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{totalLojas}</span> total
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Ação principal */}
          <CreateLojaDialog onLojaCreated={onLojaCreated} />
        </div>
      </div>
    </div>
  )
}
