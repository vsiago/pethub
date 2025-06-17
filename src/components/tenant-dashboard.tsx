"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, Calendar, TrendingUp, Package, Plus, DollarSign, Eye, Settings } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface TenantDashboardProps {
  tenant: Tenant
}

const stats = [
  {
    title: "Vendas Hoje",
    value: "R$ 1.234",
    change: "+12%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Pedidos",
    value: "23",
    change: "+5%",
    icon: ShoppingBag,
    trend: "up",
  },
  {
    title: "Clientes",
    value: "156",
    change: "+8%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Produtos",
    value: "89",
    change: "0%",
    icon: Package,
    trend: "neutral",
  },
]

const recentOrders = [
  {
    id: "#001",
    customer: "Maria Silva",
    product: "Ração Premium Golden",
    value: "R$ 89,90",
    status: "Entregue",
    time: "2h atrás",
  },
  {
    id: "#002",
    customer: "João Santos",
    product: "Brinquedo Kong",
    value: "R$ 45,00",
    status: "Preparando",
    time: "4h atrás",
  },
  {
    id: "#003",
    customer: "Ana Costa",
    product: "Banho e Tosa",
    value: "R$ 60,00",
    status: "Agendado",
    time: "6h atrás",
  },
]

const quickActions = [
  {
    title: "Adicionar Produto",
    description: "Cadastrar novo produto",
    icon: Plus,
    href: "/shop/products/new",
  },
  {
    title: "Ver Loja",
    description: "Visualizar loja online",
    icon: Eye,
    href: "/",
    external: true,
  },
  {
    title: "Agendamentos",
    description: "Gerenciar serviços",
    icon: Calendar,
    href: "/services/appointments",
  },
  {
    title: "Configurações",
    description: "Configurar loja",
    icon: Settings,
    href: "/settings",
  },
]

export function TenantDashboard({ tenant }: TenantDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta! 👋</h2>
        <p className="text-gray-600">Aqui está um resumo da sua loja hoje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className="w-8 h-8 bg-[var(--tenant-primary-100)]/40 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[var(--tenant-primary-900)]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp
                  className={`w-3 h-3 ${
                    stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-gray-400"
                  }`}
                />
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                  }
                >
                  {stat.change} desde ontem
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recentes</CardTitle>
              <CardDescription>Últimas atividades da sua loja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <Badge
                          variant="secondary"
                          className={
                            order.status === "Entregue"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Preparando"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.value}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 hover:bg-[var(--tenant-primary-50)]/40"
                    asChild
                  >
                    <Link href={action.external ? `/${tenant.slug}${action.href}` : `/${tenant.slug}${action.href}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--tenant-primary-100)]/40 rounded-lg flex items-center justify-center">
                          <action.icon className="w-4 h-4 text-[var(--tenant-primary-900)]" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{action.title}</p>
                          <p className="text-sm text-gray-500">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
