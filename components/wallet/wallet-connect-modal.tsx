"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SkillChainLogo } from "@/components/skillchain-logo"
import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

const wallets = [
  {
    id: "albedo",
    name: "Albedo",
    icon: "https://albedo.link/img/logo-white.svg",
    description: "Browser extension wallet",
  },
  {
    id: "freighter",
    name: "Freighter",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Browser extension wallet",
  },
  {
    id: "lobstr",
    name: "LOBSTR",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Mobile wallet",
  },
  {
    id: "xbull",
    name: "xBull",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Browser extension wallet",
  },
]

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connectingStep, setConnectingStep] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  const handleConnect = (walletId: string) => {
    setConnecting(walletId)
    setConnectingStep(1)

    // Simulate connection process
    setTimeout(() => {
      setConnectingStep(2)
      setTimeout(() => {
        setConnectingStep(3)
        setTimeout(() => {
          // Success - redirect to dashboard
          toast({
            title: "Wallet connected successfully",
            description: "Welcome to SkillChain!",
          })
          onClose()
          router.push("/dashboard")
        }, 1000)
      }, 1500)
    }, 1500)
  }

  const renderConnectingSteps = () => {
    const wallet = wallets.find((w) => w.id === connecting)
    if (!wallet) return null

    return (
      <div className="p-6">
        <button
          onClick={() => {
            setConnecting(null)
            setConnectingStep(0)
          }}
          className="absolute top-4 right-4 text-stellar/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connecting to {wallet.name}</h3>
          <p className="text-stellar/80 mb-6">Please approve the connection request in your wallet</p>

          <div className="w-full max-w-xs space-y-4 mb-6">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${connectingStep >= 1 ? "bg-sky-blue" : "bg-space"}`}
              >
                {connectingStep >= 1 ? "✓" : "1"}
              </div>
              <div className={`h-0.5 flex-1 mx-2 ${connectingStep >= 2 ? "bg-sky-blue" : "bg-space"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${connectingStep >= 2 ? "bg-sky-blue" : "bg-space"}`}
              >
                {connectingStep >= 2 ? "✓" : "2"}
              </div>
              <div className={`h-0.5 flex-1 mx-2 ${connectingStep >= 3 ? "bg-sky-blue" : "bg-space"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${connectingStep >= 3 ? "bg-sky-blue" : "bg-space"}`}
              >
                {connectingStep >= 3 ? "✓" : "3"}
              </div>
            </div>
            <div className="flex justify-between text-xs text-stellar/80">
              <span>Initializing</span>
              <span>Connecting</span>
              <span>Authorizing</span>
            </div>
          </div>

          {connectingStep < 3 && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-sky-blue animate-spin" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-space border-sky-blue/20 sm:max-w-md">
        <AnimatePresence mode="wait">
          {connecting ? (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderConnectingSteps()}
            </motion.div>
          ) : (
            <motion.div
              key="wallets"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <SkillChainLogo className="h-12 w-12" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white">Connect Your Wallet</DialogTitle>
                <p className="text-stellar/80 mt-2">Connect your Stellar wallet to access the SkillChain marketplace</p>
              </DialogHeader>

              <div className="grid gap-4 py-6">
                {wallets.map((wallet) => (
                  <Button
                    key={wallet.id}
                    variant="outline"
                    className="flex items-center justify-between p-4 h-auto border-sky-blue/20 hover:border-sky-blue/50 hover:bg-space/80"
                    onClick={() => handleConnect(wallet.id)}
                  >
                    <div className="flex items-center">
                      <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="w-8 h-8 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-white">{wallet.name}</div>
                        <div className="text-xs text-stellar/80">{wallet.description}</div>
                      </div>
                    </div>
                    <div className="text-sky-blue">Connect</div>
                  </Button>
                ))}
              </div>

              <div className="text-center text-xs text-stellar/60">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
