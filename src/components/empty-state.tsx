"use client"

import { Button } from "@/components/ui/button"
import { Store, Plus } from "lucide-react"

interface EmptyStateProps {
  onCreateClick: () => void
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Store className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma loja encontrada</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Você ainda não criou nenhuma loja. Comece criando sua primeira loja para começar a vender online.
      </p>
      <Button onClick={onCreateClick} size="lg" className="bg-orange-500 hover:bg-orange-600">
        <Plus className="w-4 h-4 mr-2" />
        Criar primeira loja
      </Button>
    </div>
  )
}
