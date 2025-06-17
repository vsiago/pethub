"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import type { Tenant } from "@/types/tenant"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ComingSoonSection } from "@/components/coming-soon-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function tenantPage() {
  const params = useParams()
  const tenant = params?.tenant as string
  const [data, setData] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tenant) return

    axios
      .get(`http://localhost:5000/api/tenant/${tenant}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setData(null)
        setLoading(false)
      })
  }, [tenant])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">tenant não encontrada</h1>
          <p className="text-gray-600">A tenant "{tenant}" não existe ou não está disponível.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header tenant={data} />
      <HeroSection tenant={data} />
      <ComingSoonSection />
      <AboutSection tenant={data} />
      <Footer tenant={data} />
    </main>
  )
}
