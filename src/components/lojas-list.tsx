"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, ExternalLink, Settings, Trash2, Eye, Store, Package } from "lucide-react"
import type { Tenant } from "@/types/tenant"

interface LojasListProps {
  lojas: Tenant[]
  onLojaDeleted: (lojaId: string) => void
  onRefresh: () => void
}

export function LojasList({ lojas, onLojaDeleted, onRefresh }: LojasListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"nome" | "data">("nome")

  const filteredLojas = lojas.filter(
    (loja) =>
      loja.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loja.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedLojas = [...filteredLojas].sort((a, b) => {
    if (sortBy === "nome") {
      return a.nome.localeCompare(b.nome)
    }
    return 0 // Por data seria necessário ter o campo de data de criação
  })

  if (lojas.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma loja cadastrada</h3>
        <p className="text-gray-600 mb-6">Comece criando a primeira loja do sistema white label.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar lojas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loja</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cor Principal</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLojas.map((loja) => (
              <TableRow key={loja._id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                      {loja.logo ? (
                        <img
                          src={loja.logo || "/placeholder.svg"}
                          alt={loja.nome}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <Store className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{loja.nome}</p>
                      {loja.email && <p className="text-sm text-gray-500">{loja.email}</p>}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Link
                    href={`/${loja.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-mono text-sm"
                    target="_blank"
                  >
                    /{loja.slug}
                  </Link>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{Array.isArray(loja.produtos) ? loja.produtos.length : 0}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Ativa
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: loja.cores?.primaria || "#ff4081" }}
                    />
                    <span className="text-sm font-mono">{loja.cores?.primaria || "#ff4081"}</span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/${loja.slug}`} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver Loja
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${loja.slug}/dashboard`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredLojas.length === 0 && searchTerm && (
        <div className="p-8 text-center">
          <p className="text-gray-500">Nenhuma loja encontrada para "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
