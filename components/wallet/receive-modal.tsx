"use client"

import { useState } from "react"
import { Copy, Download, QrCode } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import QRCode from "react-qr-code"

interface ReceiveModalProps {
  isOpen: boolean
  onClose: () => void
  walletAddress: string
}

export function ReceiveModal({ isOpen, onClose, walletAddress }: ReceiveModalProps) {
  const [activeTab, setActiveTab] = useState("stellar")
  const { toast } = useToast()

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address copied",
      description: "Wallet address has been copied to clipboard",
    })
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code-canvas") as HTMLCanvasElement
    if (!canvas) return

    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas2 = document.createElement("canvas")
    const ctx = canvas2.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas2.width = img.width
      canvas2.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas2.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "skillchain-wallet-qr.png"
      downloadLink.href = pngFile
      downloadLink.click()

      toast({
        title: "QR downloaded",
        description: "QR code has been successfully downloaded",
      })
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-deep-space border-sky-blue/20 sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <QrCode className="h-5 w-5 mr-2 text-sky-blue" />
            Receive Funds
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="stellar" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-space/50">
              <TabsTrigger value="stellar" className="data-[state=active]:bg-sky-blue/20">
                Stellar Network
              </TabsTrigger>
              <TabsTrigger value="qr" className="data-[state=active]:bg-sky-blue/20">
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stellar" className="mt-4">
              <div className="space-y-4">
                <div className="bg-space/30 rounded-lg p-4">
                  <p className="text-sm text-stellar/80 mb-2">Your Stellar Address</p>
                  <div className="flex items-center bg-space/50 rounded-lg p-3">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm text-white font-mono mr-2 break-all">{walletAddress}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-stellar/80 hover:text-sky-blue hover:bg-space/50 flex-shrink-0"
                        onClick={handleCopyAddress}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-4 text-sm text-stellar/90">
                <h4 className="font-medium text-white mb-2">Instructions</h4>
                <ul className="space-y-2">
                  {/* Custom bullet styling */}
                  <li className="flex items-start">
                    <span className="text-sky-blue mr-2 text-lg leading-tight">•</span>
                    <span>Use this address to receive XLM and other Stellar assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-blue mr-2 text-lg leading-tight">•</span>
                    <span>Make sure the sender is sending assets compatible with the Stellar network</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-blue mr-2 text-lg leading-tight">•</span>
                    <span>Share this address with the person who will send you funds</span>
                  </li>
                </ul>
              </div>
              </div>
            </TabsContent>

            <TabsContent value="qr" className="mt-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <QRCode id="qr-code" value={walletAddress} size={200} level="H" className="h-48 w-48" />
                  <canvas id="qr-code-canvas" className="hidden"></canvas>
                </div>

                <p className="text-sm text-stellar/80 text-center">
                  Scan this QR code to receive funds in your wallet
                </p>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="border-sky-blue/30 text-sky-blue hover:bg-space/50"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </Button>

                  <Button
                    variant="outline"
                    className="border-sky-blue/30 text-sky-blue hover:bg-space/50"
                    onClick={downloadQRCode}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}