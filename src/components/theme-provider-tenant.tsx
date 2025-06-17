"use client"

import type React from "react"

import { useEffect } from "react"
import type { Tenant } from "@/types/tenant"

interface TenantThemeProviderProps {
  tenant: Tenant | null
  children: React.ReactNode
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 255, g: 64, b: 129 } // fallback para #ff4081
}

function generateColorVariants(primaryColor: string) {
  const rgb = hexToRgb(primaryColor)

  return {
    "--tenant-primary": primaryColor,
    "--tenant-primary-rgb": `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    "--tenant-primary-50": `rgb(${Math.min(255, rgb.r + 40)}, ${Math.min(255, rgb.g + 40)}, ${Math.min(255, rgb.b + 40)})`,
    "--tenant-primary-100": `rgb(${Math.min(255, rgb.r + 30)}, ${Math.min(255, rgb.g + 30)}, ${Math.min(255, rgb.b + 30)})`,
    "--tenant-primary-200": `rgb(${Math.min(255, rgb.r + 20)}, ${Math.min(255, rgb.g + 20)}, ${Math.min(255, rgb.b + 20)})`,
    "--tenant-primary-500": primaryColor,
    "--tenant-primary-600": `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`,
    "--tenant-primary-700": `rgb(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)})`,
    "--tenant-primary-800": `rgb(${Math.max(0, rgb.r - 60)}, ${Math.max(0, rgb.g - 60)}, ${Math.max(0, rgb.b - 60)})`,
    "--tenant-primary-900": `rgb(${Math.max(0, rgb.r - 80)}, ${Math.max(0, rgb.g - 80)}, ${Math.max(0, rgb.b - 80)})`,
  }
}

export function TenantThemeProvider({ tenant, children }: TenantThemeProviderProps) {
  useEffect(() => {
    const primaryColor = tenant?.cores?.primaria || "#ff4081"
    const colorVariants = generateColorVariants(primaryColor)

    // Aplica as variáveis CSS no root
    const root = document.documentElement
    Object.entries(colorVariants).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Cleanup quando o componente desmonta
    return () => {
      Object.keys(colorVariants).forEach((property) => {
        root.style.removeProperty(property)
      })
    }
  }, [tenant?.cores?.primaria])

  return <div className="tenant-theme">{children}</div>
}
