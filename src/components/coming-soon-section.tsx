"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Scissors, Stethoscope, Car, Heart, Calendar, Truck, Star } from "lucide-react"

const produtos = [
  {
    icon: ShoppingBag,
    title: "Rações Premium",
    description: "Alimentação balanceada para todas as idades e portes",
    badge: "Em breve",
  },
  {
    icon: Heart,
    title: "Brinquedos & Acessórios",
    description: "Diversão garantida com produtos seguros e duráveis",
    badge: "Em breve",
  },
  {
    icon: Star,
    title: "Petiscos Naturais",
    description: "Recompensas saudáveis para treinos e mimos",
    badge: "Em breve",
  },
]

const servicos = [
  {
    icon: Scissors,
    title: "Banho & Tosa",
    description: "Cuidados estéticos profissionais para seu pet",
    badge: "Em breve",
  },
  {
    icon: Stethoscope,
    title: "Consultas Veterinárias",
    description: "Atendimento médico especializado",
    badge: "Em breve",
  },
  {
    icon: Car,
    title: "Pet Táxi",
    description: "Transporte seguro para seu animal de estimação",
    badge: "Em breve",
  },
  {
    icon: Calendar,
    title: "Agendamento Online",
    description: "Marque serviços de forma prática pelo app",
    badge: "Em breve",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Produtos entregues na sua casa com agilidade",
    badge: "Em breve",
  },
]

export function ComingSoonSection() {
  return (
    <div className="space-y-16">
      {/* Produtos */}
      <section id="produtos" className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Nossos Produtos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma seleção cuidadosa dos melhores produtos para o bem-estar do seu pet
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-[var(--tenant-primary-100)] rounded-lg flex items-center justify-center">
                    <produto.icon className="w-6 h-6 text-[var(--tenant-primary)]" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-[var(--tenant-primary-100)] text-[var(--tenant-primary-700)]"
                  >
                    {produto.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{produto.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{produto.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cuidados especializados com profissionais qualificados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[var(--tenant-primary-100)] rounded-lg flex items-center justify-center">
                      <servico.icon className="w-6 h-6 text-[var(--tenant-primary)]" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-[var(--tenant-primary-100)] text-[var(--tenant-primary-700)]"
                    >
                      {servico.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{servico.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{servico.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
