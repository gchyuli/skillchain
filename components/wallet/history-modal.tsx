"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, Clock, Download, ExternalLink, Filter, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: any[]
}

export function HistoryModal({ isOpen, onClose, transactions }: HistoryModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    asset: "all",
    dateRange: "all",
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        tx.from.toLowerCase().includes(searchLower) ||
        tx.to.toLowerCase().includes(searchLower) ||
        (tx.memo && tx.memo.toLowerCase().includes(searchLower)) ||
        tx.asset.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    // Type filter
    if (filters.type !== "all" && tx.type !== filters.type) return false

    // Status filter
    if (filters.status !== "all" && tx.status !== filters.status) return false

    // Asset filter
    if (filters.asset !== "all" && tx.asset !== filters.asset) return false

    // Date range filter
    if (filters.dateRange !== "all") {
      const txDate = new Date(tx.date)
      const now = new Date()

      if (filters.dateRange === "today") {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (txDate < today) return false
      } else if (filters.dateRange === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        if (txDate < weekAgo) return false
      } else if (filters.dateRange === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        if (txDate < monthAgo) return false
      }
    }

    return true
  })

  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Fecha", "Tipo", "Monto", "Activo", "De", "Para", "Estado", "Memo"]
    const csvRows = [headers]

    filteredTransactions.forEach((tx) => {
      const row = [
        formatDate(tx.date),
        tx.type === "received" ? "Received" : "Sent",
        tx.amount,
        tx.asset,
        tx.from,
        tx.to,
        tx.status === "completed" ? "Completed" : "Pending",
        tx.memo || "",
      ]
      csvRows.push(row)
    })

    // Convert to CSV string
    const csvContent = csvRows.map((row) => row.join(",")).join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "skillchain-transactions.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-deep-space border-sky-blue/20 sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-sky-blue" />
              Transaction History
            </DialogTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-sky-blue/30 text-sky-blue hover:bg-space/50"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center space-x-2 my-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="pl-10 bg-space/30 border-space focus:border-sky-blue"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-sky-blue/30 text-sky-blue hover:bg-space/50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-deep-space border-sky-blue/20">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Filter transactions</h4>

                <div className="space-y-2">
                  <Label htmlFor="type-filter">Type</Label>
                  <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                    <SelectTrigger id="type-filter" className="bg-space/30 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent className="bg-deep-space border-sky-blue/20">
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger id="status-filter" className="bg-space/30 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent className="bg-deep-space border-sky-blue/20">
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asset-filter">Active</Label>
                  <Select value={filters.asset} onValueChange={(value) => setFilters({ ...filters, asset: value })}>
                    <SelectTrigger id="asset-filter" className="bg-space/30 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Todos los activos" />
                    </SelectTrigger>
                    <SelectContent className="bg-deep-space border-sky-blue/20">
                      <SelectItem value="all">All active</SelectItem>
                      <SelectItem value="XLM">XLM</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-filter">Period</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
                  >
                    <SelectTrigger id="date-filter" className="bg-space/30 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Cualquier fecha" />
                    </SelectTrigger>
                    <SelectContent className="bg-deep-space border-sky-blue/20">
                      <SelectItem value="all">Any date</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      type: "all",
                      status: "all",
                      asset: "all",
                      dateRange: "all",
                    })
                  }
                >
                  Reset filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="bg-space/30 rounded-lg p-4 hover:bg-space/50 transition-colors">
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-lg mr-3 ${tx.type === "received" ? "bg-green-500/20" : "bg-blue-500/20"}`}
                    >
                      {tx.type === "received" ? (
                        <ArrowDown
                          className={`h-5 w-5 ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`}
                        />
                      ) : (
                        <ArrowUp className={`h-5 w-5 ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">
                            {tx.type === "received" ? "Recibido de" : "Enviado a"}{" "}
                            {tx.type === "received" ? tx.from : tx.to}
                          </p>
                          <p className="text-xs text-stellar/80 mt-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(tx.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`}>
                            {tx.type === "received" ? "+" : "-"}
                            {tx.amount} {tx.asset}
                          </p>
                          <Badge
                            variant="outline"
                            className={`mt-1 ${
                              tx.status === "completed"
                                ? "bg-green-500/10 text-green-500 border-green-500/30"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                            }`}
                          >
                            {tx.status === "completed" ? "Completado" : "Pendiente"}
                          </Badge>
                        </div>
                      </div>
                      {tx.memo && (
                        <p className="text-sm text-stellar/80 mt-2 bg-space/50 p-2 rounded">Memo: {tx.memo}</p>
                      )}
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-sky-blue hover:bg-sky-blue/10">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in explorer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stellar/60">No transactions found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
