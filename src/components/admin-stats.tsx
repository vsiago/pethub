"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, DollarSign, Package } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface AdminStatsProps {
  lojas: Tenant[]
}

export function AdminStats({ lojas }: AdminStatsProps) {
  const totalLojas = lojas.length
  const lojasAtivas = lojas.length // Assumindo que todas estão ativas
  const totalProdutos = lojas.reduce((acc, loja) => acc + (Array.isArray(loja.produtos) ? loja.produtos.length : 0), 0)

  const stats = [
    {
      title: "Total de Lojas",
      value: totalLojas.toString(),
      description: `${lojasAtivas} ativas`,
      icon: Store,
      color: "blue",
    },
    {
      title: "Produtos Cadastrados",
      value: totalProdutos.toString(),
      description: "Em todas as lojas",
      icon: Package,
      color: "green",
    },
    {
      title: "Usuários Ativos",
      value: totalLojas.toString(), // 1 admin por loja
      description: "Administradores",
      icon: Users,
      color: "purple",
    },
    {
      title: "Receita Estimada",
      value: "R$ 12.5k",
      description: "+15% este mês",
      icon: DollarSign,
      color: "orange",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                stat.color === "blue"
                  ? "bg-blue-100"
                  : stat.color === "green"
                    ? "bg-green-100"
                    : stat.color === "purple"
                      ? "bg-purple-100"
                      : "bg-orange-100"
              }`}
            >
              <stat.icon
                className={`w-4 h-4 ${
                  stat.color === "blue"
                    ? "text-blue-600"
                    : stat.color === "green"
                      ? "text-green-600"
                      : stat.color === "purple"
                        ? "text-purple-600"
                        : "text-orange-600"
                }`}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
