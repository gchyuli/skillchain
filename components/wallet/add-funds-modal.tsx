"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, ExternalLink, Info, Landmark, Loader2, Plus, Wallet } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleBankTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulación de procesamiento
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Solicitud enviada",
        description: "Recibirás instrucciones para completar la transferencia bancaria por correo electrónico",
      })
      onClose()
    }, 2000)
  }

  const handleCreditCardSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulación de procesamiento
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Pago procesado",
        description: "Tu compra de XLM ha sido procesada exitosamente",
      })
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-deep-space border-sky-blue/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <Plus className="h-5 w-5 mr-2 text-sky-blue" />
            Add Funds
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-space/50">
              <TabsTrigger value="card" className="data-[state=active]:bg-sky-blue/20">
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="data-[state=active]:bg-sky-blue/20">
                <Landmark className="h-4 w-4 mr-2" />
                Bank
              </TabsTrigger>
              <TabsTrigger value="exchange" className="data-[state=active]:bg-sky-blue/20">
                <Wallet className="h-4 w-4 mr-2" />
                Exchange
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <form onSubmit={handleCreditCardSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto a comprar</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="amount"
                      type="number"
                      min="10"
                      placeholder="0.00"
                      className="bg-space/30 border-space focus:border-sky-blue"
                      required
                    />
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-24 bg-space/30 border-space focus:border-sky-blue">
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent className="bg-deep-space border-sky-blue/20">
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input
                    id="card"
                    placeholder="1234 5678 9012 3456"
                    className="bg-space/30 border-space focus:border-sky-blue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      className="bg-space/30 border-space focus:border-sky-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="bg-space/30 border-space focus:border-sky-blue"
                      required
                    />
                  </div>
                </div>

                <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
                  <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
                  <p>
                    Los pagos con tarjeta tienen una comisión del 2.5%. El procesamiento puede tardar hasta 24 horas.
                  </p>
                </div>

                <Button type="submit" className="w-full gradient-blue" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>Buy XLM</>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="bank" className="mt-4">
              <form onSubmit={handleBankTransfer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-amount">Amount to transfer</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="bank-amount"
                      type="number"
                      min="100"
                      placeholder="0.00"
                      className="bg-space/30 border-space focus:border-sky-blue"
                      required
                    />
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-24 bg-space/30 border-space focus:border-sky-blue">
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent className="bg-deep-space border-sky-blue/20">
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-space/30 border-space focus:border-sky-blue"
                    required
                  />
                </div>

                <div className="bg-space/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Bank transfer process</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-stellar/90">
                    <li>Complete this form with the desired amount</li>
                    <li>You will receive detailed instructions by email</li>
                    <li>Make the transfer from your bank</li>
                    <li>Funds will appear in your wallet within 1-3 business days.</li>
                  </ol>
                </div>

                <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
                  <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
                  <p>Bank transfers have a 1% fee. The minimum amount is 100 USD/EUR.</p>
                </div>

                <Button type="submit" className="w-full gradient-blue" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>Request instructions</>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="exchange" className="mt-4">
              <div className="space-y-4">
                <div className="bg-space/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Transfer from an exchange</h4>
                  <p className="text-sm text-stellar/90 mb-4">
                  You can transfer XLM and other Stellar assets from any exchange that supports the Stellar network.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-stellar/80 mb-1">Tu dirección de Stellar</p>
                      <div className="bg-space/50 rounded-lg p-3 font-mono text-sm text-white break-all">
                        GDKIJJIKXLOM2NRMPNQZUUYK24ZPVFC6426GZAEP3KUK6KEJLACCWNMX
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-stellar/80 mb-1">Memo (optional)</p>
                      <div className="bg-space/50 rounded-lg p-3 font-mono text-sm text-white">
                        No memo is required for this wallet
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-white">Supported exchanges</h4>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {["Binance", "Coinbase", "Kraken", "KuCoin"].map((exchange) => (
                      <Button
                        key={exchange}
                        variant="outline"
                        className="h-auto py-3 border-sky-blue/20 hover:border-sky-blue/50 hover:bg-space/50 flex items-center justify-center"
                        onClick={() => window.open(`https://${exchange.toLowerCase()}.com`, "_blank")}
                      >
                        {exchange}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
                  <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
                  <p>
                  Make sure to only send assets compatible with the Stellar network. Transfers can take
                  between 5 minutes and 1 hour.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
