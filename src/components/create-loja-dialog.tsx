"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Check, X, Loader2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tenant } from "@/types/tenant"

interface CreateLojaDialogProps {
  onLojaCreated: (loja: Tenant) => void
  trigger?: React.ReactNode
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

const steps = [
  { title: "Básico", description: "Nome e URL da loja" },
  { title: "Visual", description: "Logo e cor principal" },
  { title: "Contato", description: "Dados de contato e admin" },
]

export function CreateLojaDialog({ onLojaCreated, trigger }: CreateLojaDialogProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Step 1 - Básico
  const [nome, setNome] = useState("")
  const [slug, setSlug] = useState("")
  const [descricao, setDescricao] = useState("")
  const [customSlug, setCustomSlug] = useState(false)
  const [slugDisponivel, setSlugDisponivel] = useState<null | boolean>(null)
  const [checkingSlug, setCheckingSlug] = useState(false)

  // Step 2 - Visual
  const [logo, setLogo] = useState("")
  const [corPrimaria, setCorPrimaria] = useState("#ff4081")

  // Step 3 - Contato & Admin
  const [endereco, setEndereco] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [adminNome, setAdminNome] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminSenha, setAdminSenha] = useState("")

  // Slug automático
  useEffect(() => {
    if (!customSlug && nome) {
      setSlug(slugify(nome))
    }
  }, [nome, customSlug])

  // Verifica disponibilidade do slug
  useEffect(() => {
    if (!slug) {
      setSlugDisponivel(null)
      return
    }

    setCheckingSlug(true)
    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:5000/api/tenant/check-slug?slug=${slug}`)
        .then((res) => {
          setSlugDisponivel(res.data.disponivel)
          setCheckingSlug(false)
        })
        .catch(() => {
          setSlugDisponivel(false)
          setCheckingSlug(false)
        })
    }, 500)

    return () => clearTimeout(timer)
  }, [slug])

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(nome.trim() && slug.trim() && slugDisponivel === true)
      case 1:
        return !!corPrimaria
      case 2:
        return !!(email.trim() && adminNome.trim() && adminEmail.trim() && adminSenha.trim())
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

 const handleSubmit = async () => {
  if (!validateStep(2)) return

  setIsLoading(true)
  setError("")

  try {
    const requestData = {
      nome: nome.trim(),
      slug,
      email: adminEmail.trim(),
      senha: adminSenha,
      nomeAdmin: adminNome.trim(),
      descricao: descricao.trim() || undefined,
      endereco: endereco.trim() || undefined,
      telefone: telefone.trim() || undefined,
      cores: {
        primaria: corPrimaria,
      },
      logo: logo || undefined,
    }

    const res = await axios.post("http://localhost:5000/api/tenant", requestData)
    onLojaCreated(res.data.tenant)
    resetForm()
    setOpen(false)
  } catch (err: any) {
    setError(err.response?.data?.error || "Erro ao criar loja. Tente novamente.")
  } finally {
    setIsLoading(false)
  }
}

  const resetForm = () => {
    setCurrentStep(0)
    setNome("")
    setSlug("")
    setDescricao("")
    setCustomSlug(false)
    setSlugDisponivel(null)
    setLogo("")
    setCorPrimaria("#ff4081")
    setEndereco("")
    setTelefone("")
    setEmail("")
    setAdminNome("")
    setAdminEmail("")
    setAdminSenha("")
    setError("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Criar Loja
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-xl">Criar Nova Loja</DialogTitle>

          {/* Indicador de progresso simples */}
          <div className="flex items-center justify-center space-x-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    index === currentStep
                      ? "bg-blue-600 text-white"
                      : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500",
                  )}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-8 h-0.5 mx-1", index < currentStep ? "bg-green-500" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {/* Step 1 - Informações Básicas */}
          {currentStep === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Loja</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="PetShop da Maria"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL da Loja</Label>
                <div className="relative">
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value.toLowerCase())
                      setCustomSlug(true)
                    }}
                    placeholder="petshop-da-maria"
                    className={cn(
                      slugDisponivel === false && "border-red-500",
                      slugDisponivel === true && "border-green-500",
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingSlug && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                    {!checkingSlug && slugDisponivel === true && <Check className="w-4 h-4 text-green-500" />}
                    {!checkingSlug && slugDisponivel === false && <X className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                {slugDisponivel === false && <p className="text-xs text-red-600">Nome já está em uso</p>}
                {slugDisponivel === true && <p className="text-xs text-green-600">Nome disponível</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva sua loja..."
                  rows={2}
                />
              </div>
            </>
          )}

          {/* Step 2 - Identidade Visual */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo (opcional)</Label>
                <Input
                  id="logo"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label>Cor Principal</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={corPrimaria}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={corPrimaria}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                    className="flex-1 text-sm"
                  />
                </div>
                <div className="mt-3 p-3 border rounded-lg bg-gray-50">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: corPrimaria }}
                    />
                    <span className="text-sm">Esta cor será usada em toda a loja</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3 - Contato & Admin */}
          {currentStep === 2 && (
            <>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Contato da Loja</h4>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@loja.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone (opcional)</Label>
                    <Input
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Cidade (opcional)</Label>
                    <Input
                      id="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="São Paulo, SP"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t">
                <h4 className="text-sm font-medium text-gray-900">Administrador</h4>

                <div className="space-y-2">
                  <Label htmlFor="admin-nome">Nome</Label>
                  <Input
                    id="admin-nome"
                    value={adminNome}
                    onChange={(e) => setAdminNome(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-senha">Senha</Label>
                  <Input
                    id="admin-senha"
                    type="password"
                    value={adminSenha}
                    onChange={(e) => setAdminSenha(e.target.value)}
                    placeholder="Senha segura"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? () => setOpen(false) : handlePrevious}
            disabled={isLoading}
          >
            {currentStep === 0 ? (
              "Cancelar"
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar
              </>
            )}
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!validateStep(currentStep) || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!validateStep(currentStep) || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Loja"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
