"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, ExternalLink, Settings, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Tenant } from "@/types/tenant"

interface LojaCardProps {
  loja: Tenant
}

export function LojaCard({ loja }: LojaCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 shadow-sm bg-white">
      {/* Header com gradiente */}
      <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver loja
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-6 relative">
        {/* Logo/Avatar */}
        <div className="w-16 h-16 bg-white rounded-full shadow-lg border-4 border-white absolute -top-8 left-6 flex items-center justify-center">
          <Store className="w-6 h-6 text-orange-500" />
        </div>

        <div className="pt-10 space-y-4">
          {/* Nome e Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 truncate">{loja.nome}</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                Ativa
              </Badge>
            </div>
            <p className="text-sm text-gray-500">/{loja.slug}</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{loja.produtos?.length || 0}</p>
              <p className="text-xs text-gray-500">Produtos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">0</p>
              <p className="text-xs text-gray-500">Pedidos</p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1 bg-orange-500 hover:bg-orange-600">
              <Link href={`/${loja.slug}`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Loja
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
