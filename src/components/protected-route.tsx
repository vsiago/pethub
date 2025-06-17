"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  tenantSlug: string
}

export function ProtectedRoute({ children, tenantSlug }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simular verificação de autenticação
    // Em um app real, você verificaria o token JWT, session, etc.
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem(`auth_${tenantSlug}`) === "true"

      if (!isLoggedIn) {
        router.push(`/${tenantSlug}/login`)
        return
      }

      setIsAuthenticated(true)
    }

    checkAuth()
  }, [tenantSlug, router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
