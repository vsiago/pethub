"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, User, LogOut, Bell, HelpCircle, Shield } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center space-x-4">
            <Link href="/lojas" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PetNova Admin</h1>
                <p className="text-xs text-gray-500">Sistema White Label</p>
              </div>
            </Link>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Administrador
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/lojas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Lojas
            </Link>
            <Link href="/usuarios" className="text-gray-500 hover:text-blue-600 transition-colors">
              Usuários
            </Link>
            <Link href="/relatorios" className="text-gray-500 hover:text-blue-600 transition-colors">
              Relatórios
            </Link>
            <Link href="/configuracoes" className="text-gray-500 hover:text-blue-600 transition-colors">
              Configurações
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <HelpCircle className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="hidden md:block text-sm">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
