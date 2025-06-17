"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Heart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Tenant } from "@/types/tenant"

interface TenantLoginFormProps {
  tenant: Tenant
}

export function TenantLoginForm({ tenant }: TenantLoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get("registered") === "true"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Fazer login na API
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        senha: password,
      })

      const { token, user } = response.data

      // Salvar token no localStorage
      localStorage.setItem(`auth_${tenant.slug}`, "true")
      localStorage.setItem(`token_${tenant.slug}`, token)
      localStorage.setItem(`user_${tenant.slug}`, JSON.stringify(user))

      // Redirecionar para a página apropriada com base no tipo de usuário
      if (user.role === "admin") {
        router.push(`/${tenant.slug}/dashboard`)
      } else {
        router.push(`/${tenant.slug}/account`)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciais inválidas. Tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--tenant-primary)] to-[var(--tenant-primary)]">
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto">
          <Link
            href={`/${tenant.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-[var(--tenant-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para {tenant.nome}
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center tenant-bg-primary shadow-lg">
                {tenant.logo ? (
                  <img
                    src={tenant.logo || "/placeholder.svg"}
                    alt={tenant.nome}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Heart className="w-8 h-8 text-white fill-current" />
                )}
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl font-bold ">Entrar</CardTitle>
              <CardDescription className="text-center">
                Acesse sua conta em <span className="font-medium text-[var(--tenant-primary)]">{tenant.nome}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {justRegistered && (
              <Alert className="bg-green-50 text-green-700 border-green-200">
                <AlertDescription>Conta criada com sucesso! Faça login para continuar.</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-[var(--tenant-primary)]"
                    style={{ accentColor: "var(--tenant-primary)" }}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Lembrar de mim
                  </Label>
                </div>
                <Link
                  href={`/${tenant.slug}/forgot-password`}
                  className="text-sm text-[var(--tenant-primary)] hover:text-[var(--tenant-primary-600)]"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full tenant-bg-primary tenant-hover-bg-primary-600 text-white bg-[var(--tenant-primary)] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" type="button" asChild>
              <Link href={`/${tenant.slug}/register`}>Criar uma conta</Link>
            </Button>
          </CardContent>

          <CardFooter>
            <div className="text-center text-sm text-gray-600 w-full">
              Não tem uma conta?{" "}
              <Link
                href={`/${tenant.slug}/register`}
                className="text-[var(--tenant-primary)] hover:text-[var(--tenant-primary-600)] font-medium"
              >
                Criar conta
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
