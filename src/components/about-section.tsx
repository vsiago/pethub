"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Clock, Users } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface AboutSectionProps {
  tenant: Tenant | null
}

const features = [
  {
    icon: Shield,
    title: "Produtos Seguros",
    description: "Todos os produtos são testados e aprovados por veterinários",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Trabalhamos apenas com as melhores marcas do mercado",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Entrega expressa e agendamentos flexíveis",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Profissionais qualificados e apaixonados por animais",
  },
]

export function AboutSection({ tenant }: AboutSectionProps) {
  return (
    <section id="sobre" className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Sobre {tenant?.nome || "Nossa Loja"}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {tenant?.descricao ||
                "Somos uma empresa dedicada ao bem-estar dos animais de estimação. Nossa missão é oferecer produtos de qualidade e serviços especializados para garantir a saúde e felicidade do seu melhor amigo."}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Com anos de experiência no mercado pet, construímos uma reputação sólida baseada na confiança, qualidade e
              amor pelos animais.
            </p>
          </div>

          {tenant?.endereco && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Nossa Localização:</h3>
              <p className="text-gray-600">{tenant.endereco}</p>
            </div>
          )}

          {tenant?.email && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Contato:</h3>
              <p className="text-gray-600">{tenant.email}</p>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <CardContent className="p-0 space-y-3">
                <div className="w-12 h-12 bg-[var(--tenant-primary-100)] rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[var(--tenant-primary)]" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
