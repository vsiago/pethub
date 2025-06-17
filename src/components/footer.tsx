"use client"

import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface FooterProps {
  tenant: Tenant | null
}

export function Footer({ tenant }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">{tenant?.nome || "PetShop"}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Cuidando do seu pet com amor e dedicação. Produtos de qualidade e serviços especializados.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <div className="space-y-2 text-sm">
              <Link href="#produtos" className="block text-gray-400 hover:text-white transition-colors">
                Produtos
              </Link>
              <Link href="#servicos" className="block text-gray-400 hover:text-white transition-colors">
                Serviços
              </Link>
              <Link href="#sobre" className="block text-gray-400 hover:text-white transition-colors">
                Sobre
              </Link>
              <Link href="/login" className="block text-gray-400 hover:text-white transition-colors">
                Área do Cliente
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-3 text-sm">
              {tenant?.telefone && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{tenant.telefone}</span>
                </div>
              )}
              {tenant?.email && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{tenant.email}</span>
                </div>
              )}
              {tenant?.endereco && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{tenant.endereco}</span>
                </div>
              )}
            </div>
          </div>

          {/* Em Breve */}
          <div className="space-y-4">
            <h3 className="font-semibold">Em Breve</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>🚀 App Mobile</p>
              <p>📱 Agendamento Online</p>
              <p>🚚 Entrega Express</p>
              <p>💳 Programa de Fidelidade</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 {tenant?.nome || "PetShop"}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
