"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, ShoppingCart, Heart } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface HeaderProps {
  tenant: Tenant | null
}

export function Header({ tenant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${tenant?.slug}`} className="flex items-center space-x-2">
          <div style={{ background: tenant?.cores?.primaria}} className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="text-xl font-bold text-gray-900">{tenant?.nome || "PetShop"}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#produtos" className="text-gray-600 hover:text-orange-500 transition-colors">
            Produtos
          </Link>
          <Link href="#servicos" className="text-gray-600 hover:text-orange-500 transition-colors">
            Serviços
          </Link>
          <Link href="#sobre" className="text-gray-600 hover:text-orange-500 transition-colors">
            Sobre
          </Link>
          <Link href="#contato" className="text-gray-600 hover:text-orange-500 transition-colors">
            Contato
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${tenant?.slug}/login`}>
              <User className="w-4 h-4 mr-2" />
              Entrar
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Link
                href="#produtos"
                className="text-lg font-medium text-gray-600 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Produtos
              </Link>
              <Link
                href="#servicos"
                className="text-lg font-medium text-gray-600 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                className="text-lg font-medium text-gray-600 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className="text-lg font-medium text-gray-600 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>
              <div className="pt-4 border-t space-y-2">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/login">
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
