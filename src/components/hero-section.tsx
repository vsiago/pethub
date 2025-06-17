"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Tenant } from "@/types/tenant"
import { hexToRgba } from "./colors"
import Image from "next/image"

interface HeroSectionProps {
  tenant: Tenant | null
}

export function HeroSection({ tenant }: HeroSectionProps) {
  const corPrimaria = tenant?.cores?.primaria ?? "#FFA500"

  return (
    <section
      style={{
        background: `linear-gradient(to bottom right, ${corPrimaria}20, white)`
      }}
      className="relative overflow-hidden"
    >

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Tudo para o seu <span style={{ color: corPrimaria }}>pet</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {tenant?.descricao ||
                  "Produtos de qualidade, serviços especializados e muito amor para cuidar do seu melhor amigo."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                style={{
                  backgroundColor: tenant?.cores?.primaria,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hexToRgba(tenant?.cores?.primaria as string, 0.8)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = tenant?.cores?.primaria ?? "#000000"
                }}
                className="text-white transition-colors duration-200 cursor-pointer"
              >
                Ver Produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Agendar Serviço
              </Button>
            </div>

            {tenant?.telefone && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📞 {tenant.telefone}</span>
                {tenant.endereco && <span>📍 {tenant.endereco}</span>}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            <div
              style={{
                background: `linear-gradient(to right, ${corPrimaria}, ${corPrimaria})`
              }}
              className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-75"
            ></div>
            <div className="relative">
              <Image
                src="/dog-feliz.png"
                alt="Cachorro feliz"
                width={600}
                height={600}
                className="w-full h-auto max-w-lg mx-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
