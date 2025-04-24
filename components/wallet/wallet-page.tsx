"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Search,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

// Wallet icons
import StellarIcon from "@/components/wallet/wallet-icons/stellar-icon"
import AlbedoIcon from "@/components/wallet/wallet-icons/albedo-icon"
import FreighterIcon from "@/components/wallet/wallet-icons/freighter-icon"
import LobstrIcon from "@/components/wallet/wallet-icons/lobstr-icon"
import XBullIcon from "@/components/wallet/wallet-icons/xbull-icon"

// Modals
import { SendModal } from "@/components/wallet/send-modal"
import { ReceiveModal } from "@/components/wallet/receive-modal"
import { AddFundsModal } from "@/components/wallet/add-funds-modal"
import { SwapModal } from "@/components/wallet/swap-modal"
import { HistoryModal } from "@/components/wallet/history-modal"

export function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showBalance, setShowBalance] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [modals, setModals] = useState({
    send: false,
    receive: false,
    addFunds: false,
    swap: false,
    history: false,
  })
  const { toast } = useToast()

  // Mock data
  const walletData = {
    address: "GDKIJJIKXLOM2NRMPNQZUUYK24ZPVFC6426GZAEP3KUK6KEJLACCWNMX",
    balances: [
      { asset: "XLM", balance: 2450.75, value: 735.23 },
      { asset: "USDC", balance: 350.0, value: 350.0 },
    ],
    connectedWallet: "Freighter",
    transactions: [
      {
        id: "tx1",
        type: "received",
        amount: 250,
        asset: "XLM",
        from: "Alex Morgan",
        to: "You",
        date: "2023-06-15T14:30:00Z",
        status: "completed",
        memo: "Payment for logo design",
      },
      {
        id: "tx2",
        type: "sent",
        amount: 100,
        asset: "USDC",
        from: "You",
        to: "Sarah Johnson",
        date: "2023-06-10T09:15:00Z",
        status: "completed",
        memo: "Website consultation",
      },
      {
        id: "tx3",
        type: "received",
        amount: 500,
        asset: "XLM",
        from: "Michael Brown",
        to: "You",
        date: "2023-06-05T16:45:00Z",
        status: "completed",
        memo: "Mobile app design milestone 1",
      },
      {
        id: "tx4",
        type: "sent",
        amount: 75,
        asset: "XLM",
        from: "You",
        to: "Emily Davis",
        date: "2023-05-28T11:20:00Z",
        status: "completed",
        memo: "Content writing services",
      },
      {
        id: "tx5",
        type: "received",
        amount: 300,
        asset: "XLM",
        from: "David Wilson",
        to: "You",
        date: "2023-05-20T13:10:00Z",
        status: "completed",
        memo: "Smart contract development",
      },
      {
        id: "tx6",
        type: "sent",
        amount: 50,
        asset: "USDC",
        from: "You",
        to: "Jennifer Lee",
        date: "2023-05-15T10:05:00Z",
        status: "pending",
        memo: "Logo revisions",
      },
    ],
    pendingPayments: [
      {
        id: "pending1",
        amount: 150,
        asset: "XLM",
        from: "Robert Chen",
        date: "2023-06-20T00:00:00Z",
        contract: "Data Analysis Project",
      },
      {
        id: "pending2",
        amount: 200,
        asset: "USDC",
        from: "Maria Garcia",
        date: "2023-06-25T00:00:00Z",
        contract: "Marketing Campaign",
      },
    ],
  }

  // Filter transactions based on search query
  const filteredTransactions = walletData.transactions.filter((tx) => {
    if (!searchQuery) return true

    return (
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.memo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.asset.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Calculate total balance in USD
  const totalBalanceUSD = walletData.balances.reduce((total, balance) => total + balance.value, 0)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.address)
    toast({
      title: "Dirección copiada",
      description: "La dirección de wallet ha sido copiada al portapapeles",
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulación de actualización
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Wallet actualizada",
        description: "Los datos de tu wallet han sido actualizados",
      })
    }, 1500)
  }

  const handleViewOnExplorer = () => {
    // Abrir el explorador de Stellar con la dirección de la wallet
    window.open(`https://stellar.expert/explorer/public/account/${walletData.address}`, "_blank")
  }

  const openModal = (modalName: keyof typeof modals) => {
    setModals({ ...modals, [modalName]: true })
  }

  const closeModal = (modalName: keyof typeof modals) => {
    setModals({ ...modals, [modalName]: false })
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue mb-2">Wallet</h1>
          <p className="text-stellar/80">Manage your assets and transactions</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            className="border-sky-blue/50 text-sky-blue hover:bg-sky-blue/10"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Actualizando..." : "Actualizar"}
          </Button>
          <Button className="gradient-blue" onClick={() => openModal("addFunds")}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir fondos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Wallet Card */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/5 to-electric-blue/5 rounded-2xl"></div>
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-stellar/80 text-sm mb-1">Wallet conectada</p>
                  <div className="flex items-center">
                    {walletData.connectedWallet === "Freighter" ? (
                      <FreighterIcon className="h-6 w-6 mr-2" />
                    ) : walletData.connectedWallet === "Albedo" ? (
                      <AlbedoIcon className="h-6 w-6 mr-2" />
                    ) : walletData.connectedWallet === "LOBSTR" ? (
                      <LobstrIcon className="h-6 w-6 mr-2" />
                    ) : walletData.connectedWallet === "xBull" ? (
                      <XBullIcon className="h-6 w-6 mr-2" />
                    ) : (
                      <StellarIcon className="h-6 w-6 mr-2" />
                    )}
                    <span className="font-medium text-white">{walletData.connectedWallet}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-stellar/80 hover:text-sky-blue hover:bg-space/50"
                          onClick={() => setShowBalance(!showBalance)}
                        >
                          {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showBalance ? "Ocultar" : "Mostrar"} balance</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-stellar/80 text-sm mb-1">Total balance</p>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-white">
                    {showBalance ? `$${totalBalanceUSD.toFixed(2)}` : "••••••"}
                  </h2>
                  <span className="text-sm text-stellar/80 ml-2">USD</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {walletData.balances.map((balance, index) => (
                  <div key={index} className="bg-space/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      {balance.asset === "XLM" ? (
                        <StellarIcon className="h-6 w-6 mr-2" />
                      ) : (
                        <CreditCard className="h-6 w-6 mr-2 text-sky-blue" />
                      )}
                      <span className="font-medium text-white">{balance.asset}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="text-xl font-bold text-white">
                        {showBalance ? balance.balance.toFixed(2) : "••••••"}
                      </p>
                      <p className="text-sm text-stellar/80">
                        {showBalance ? `$${balance.value.toFixed(2)}` : "••••••"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-stellar/80 text-sm mb-1">Wallet Address</p>
                <div className="flex items-center bg-space/30 rounded-lg p-3">
                  <p className="text-sm text-white font-mono flex-1 truncate">{walletData.address}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-stellar/80 hover:text-sky-blue hover:bg-space/50 ml-2"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 gradient-blue" onClick={() => openModal("send")}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
                <Button
                  className="flex-1 bg-space hover:bg-space/80 text-sky-blue"
                  onClick={() => openModal("receive")}
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Receive
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-sky-blue/30 text-sky-blue hover:bg-space/50"
                  onClick={handleViewOnExplorer}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver en explorador
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Transaction History</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sky-blue/30 text-sky-blue hover:bg-space/50"
                  onClick={() => openModal("history")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  See all
                </Button>
              </div>
              <CardDescription className="text-stellar/80">Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="pl-10 bg-space/30 border-space focus:border-sky-blue"
                />
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.slice(0, 5).map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      className="bg-space/30 rounded-lg p-4 hover:bg-space/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-lg mr-3 ${tx.type === "received" ? "bg-green-500/20" : "bg-blue-500/20"}`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDown
                              className={`h-5 w-5 ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`}
                            />
                          ) : (
                            <ArrowUp
                              className={`h-5 w-5 ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-white">
                                {tx.type === "received" ? "Received from" : "Sent to"}{" "}
                                {tx.type === "received" ? tx.from : tx.to}
                              </p>
                              <p className="text-xs text-stellar/80 mt-1">{formatDate(tx.date)}</p>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-medium ${tx.type === "received" ? "text-green-500" : "text-blue-500"}`}
                              >
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
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-stellar/60">No transactions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader>
              <CardTitle className="text-white">Quick actions</CardTitle>
              <CardDescription className="text-stellar/80">Manage your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Send", icon: <Send className="h-5 w-5" />, action: () => openModal("send") },
                  { label: "Receive", icon: <ArrowDown className="h-5 w-5" />, action: () => openModal("receive") },
                  { label: "Swap", icon: <RefreshCw className="h-5 w-5" />, action: () => openModal("swap") },
                  { label: "History", icon: <Clock className="h-5 w-5" />, action: () => openModal("history") },
                ].map((action, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto py-4 border-sky-blue/20 hover:border-sky-blue/50 hover:bg-space/50 flex flex-col items-center justify-center gap-2"
                    onClick={action.action}
                  >
                    <div className="bg-space/50 p-2 rounded-lg">{action.icon}</div>
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connected Wallets */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader>
              <CardTitle className="text-white">Connected wallets</CardTitle>
              <CardDescription className="text-stellar/80">Manage your wallet connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Freighter", icon: <FreighterIcon className="h-6 w-6" />, connected: true },
                  { name: "Albedo", icon: <AlbedoIcon className="h-6 w-6" />, connected: false },
                  { name: "LOBSTR", icon: <LobstrIcon className="h-6 w-6" />, connected: false },
                  { name: "xBull", icon: <XBullIcon className="h-6 w-6" />, connected: false },
                ].map((wallet, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      wallet.connected ? "bg-sky-blue/10 border border-sky-blue/30" : "bg-space/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{wallet.icon}</div>
                      <span className="font-medium text-white">{wallet.name}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        wallet.connected
                          ? "bg-sky-blue/10 text-sky-blue border-sky-blue/30"
                          : "bg-space/50 text-stellar/80 border-space"
                      }
                    >
                      {wallet.connected ? "Conectada" : "Conectar"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader>
              <CardTitle className="text-white">Pending payments</CardTitle>
              <CardDescription className="text-stellar/80">Payments for upcoming contracts</CardDescription>
            </CardHeader>
            <CardContent>
              {walletData.pendingPayments.length > 0 ? (
                <div className="space-y-3">
                  {walletData.pendingPayments.map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      className="bg-space/30 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-white">{payment.contract}</p>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-stellar/80">From: {payment.from}</p>
                        <p className="font-medium text-green-500">
                          +{payment.amount} {payment.asset}
                        </p>
                      </div>
                      <p className="text-xs text-stellar/60 mt-2">Expected: {formatDate(payment.date)}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-stellar/60">There are no pending payments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <SendModal isOpen={modals.send} onClose={() => closeModal("send")} onSuccess={handleRefresh} />

      <ReceiveModal isOpen={modals.receive} onClose={() => closeModal("receive")} walletAddress={walletData.address} />

      <AddFundsModal isOpen={modals.addFunds} onClose={() => closeModal("addFunds")} />

      <SwapModal isOpen={modals.swap} onClose={() => closeModal("swap")} onSuccess={handleRefresh} />

      <HistoryModal
        isOpen={modals.history}
        onClose={() => closeModal("history")}
        transactions={walletData.transactions}
      />
    </div>
  )
}
