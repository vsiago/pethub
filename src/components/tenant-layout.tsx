"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  Bell,
  Settings,
  ExternalLink,
  User,
  LogOut,
  Menu,
  BarChart3,
  Store,
  FolderOpen,
  ShoppingCart,
  Scissors,
  FileText,
  CreditCard,
  Palette,
  Shield,
  Package,
  Users,
} from "lucide-react"
import type { Tenant } from "@/types/tenant"
import { cn } from "@/lib/utils"

interface TenantLayoutProps {
  tenant: Tenant
  children: React.ReactNode
  title?: string
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Loja",
    icon: Store,
    children: [
      { name: "Visão Geral", href: "/shop", icon: Store },
      { name: "Categorias", href: "/shop/categories", icon: FolderOpen },
      { name: "Produtos", href: "/shop/products", icon: Package },
      { name: "Pedidos", href: "/shop/orders", icon: ShoppingCart },
    ],
  },
  {
    name: "Serviços",
    href: "/services",
    icon: Scissors,
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    name: "Relatórios",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Financeiro",
    href: "/finance",
    icon: CreditCard,
  },
  {
    name: "Configurações",
    icon: Settings,
    children: [
      { name: "Geral", href: "/settings", icon: Settings },
      { name: "Aparência", href: "/settings/appearance", icon: Palette },
      { name: "Usuários", href: "/settings/users", icon: Shield },
    ],
  },
]

export function TenantLayout({ tenant, children, title }: TenantLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem(`auth_${tenant.slug}`)
    localStorage.removeItem(`token_${tenant.slug}`)
    localStorage.removeItem(`user_${tenant.slug}`)
    window.location.href = `/${tenant.slug}/login`
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--tenant-primary)]">
            {tenant.logo ? (
              <img
                src={tenant.logo}
                alt={tenant.nome}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-xs font-bold">
                {getInitials(tenant.nome)}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{tenant.nome}</h2>
            <p className="text-xs text-gray-500">Painel Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1">
                <div className="px-2 py-2 text-sm font-medium text-gray-700 flex items-center">
                  <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                  {item.name}
                </div>
                <div className="ml-8 space-y-1">
                  {item.children.map((child) => {
                    const isActive = pathname === `/${tenant.slug}${child.href}`
                    return (
                      <Link
                        key={child.name}
                        href={`/${tenant.slug}${child.href}`}
                        className={cn(
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "tenant-bg-primary text-white"
                            : "text-gray-700 hover:bg-[var(--tenant-primary-100)]/40 hover:text-[var--tenant-bg-primary-900]",
                        )}
                      >
                        <child.icon
                          className={cn("mr-3 h-4 w-4 flex-shrink-0", isActive ? "text-white" : "text-gray-400")}
                        />
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }

          const isActive = pathname === `/${tenant.slug}${item.href}`
          return (
            <Link
              key={item.name}
              href={`/${tenant.slug}${item.href}`}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "tenant-bg-primary text-white"
                  : "text-gray-700 hover:bg-[var(--tenant-primary-100)]/40 hover:text-[var--tenant-bg-primary-900]",
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5 flex-shrink-0", isActive ? "text-white" : "text-gray-400")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              <span className="truncate">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${tenant.slug}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Loja
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${tenant.slug}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex min-h-0 flex-1 flex-col border-r bg-white">
          <SidebarContent />
        </div>
      </div>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64 flex flex-col flex-1">
        <header className="bg-white border-b lg:border-l-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex-1 lg:flex-none">
                <h1 className="text-xl font-semibold text-gray-900">{title || "Dashboard"}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[var(--tenant-primary-900)]/20 text-[var(--tenant-primary-900)] hover:bg-[var(--tenant-primary)] hover:text-black"
                >
                  <Link href={`/${tenant.slug}`}>
                    <ExternalLink className="w-4 h-4 mr-2 " />
                    Ver Loja
                  </Link>
                </Button>

                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4 hover:bg-[var(--tenant-primary-900)]" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 hover:bg-[var(--tenant-primary-900)]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/${tenant.slug}/settings`}>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
