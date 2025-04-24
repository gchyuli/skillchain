"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Info, Loader2, Send, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StellarIcon from "@/components/wallet/wallet-icons/stellar-icon"

interface SendModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function SendModal({ isOpen, onClose, onSuccess }: SendModalProps) {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    asset: "XLM",
    memo: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAssetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, asset: value }))
  }

  const validateStep1 = () => {
    if (!formData.recipient) {
      toast({
        title: "Address required",
        description: "Please enter a valid wallet address",
        variant: "destructive",
      })
      return false
    }

    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2) {
      handleSend()
    }
  }

  const handleSend = () => {
    setIsProcessing(true)

    // Transaction simulation
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)

      // Success notification
      toast({
        title: "Transaction sent",
        description: `You have successfully sent ${formData.amount} ${formData.asset}`,
      })

      // Reset after a few seconds
      setTimeout(() => {
        if (onSuccess) onSuccess()
        handleClose()
      }, 3000)
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      recipient: "",
      amount: "",
      asset: "XLM",
      memo: "",
    })
    onClose()
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          placeholder="G..."
          className="bg-space/30 border-space focus:border-sky-blue"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.000001"
            placeholder="0.00"
            className="bg-space/30 border-space focus:border-sky-blue"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="asset">Asset</Label>
          <Select value={formData.asset} onValueChange={handleAssetChange}>
            <SelectTrigger id="asset" className="bg-space/30 border-space focus:border-sky-blue">
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent className="bg-deep-space border-sky-blue/20">
              <SelectItem value="XLM">
                <div className="flex items-center">
                  <StellarIcon className="h-4 w-4 mr-2" />
                  <span>XLM</span>
                </div>
              </SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="memo">Memo (optional)</Label>
        <Textarea
          id="memo"
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          placeholder="Add a message or reference..."
          className="bg-space/30 border-space focus:border-sky-blue resize-none h-20"
        />
      </div>

      <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
        <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
        <p>Make sure to verify the recipient's address. Blockchain transactions are irreversible.</p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-space/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">Confirm Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-stellar/80">Recipient</span>
            <span className="text-white font-mono text-sm truncate max-w-[200px]">{formData.recipient}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-stellar/80">Amount</span>
            <span className="text-white font-medium">
              {formData.amount} {formData.asset}
            </span>
          </div>

          {formData.memo && (
            <div className="flex justify-between">
              <span className="text-stellar/80">Memo</span>
              <span className="text-white">{formData.memo}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-stellar/80">Network Fee</span>
            <span className="text-white">0.00001 XLM</span>
          </div>

          <div className="border-t border-space pt-2 mt-2 flex justify-between">
            <span className="text-stellar/80">Total</span>
            <span className="text-white font-medium">
              {formData.asset === "XLM" ? (Number(formData.amount) + 0.00001).toFixed(6) : formData.amount}{" "}
              {formData.asset}
              {formData.asset !== "XLM" && " + 0.00001 XLM"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
        <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
        <p>By confirming this transaction, you are authorizing an irreversible transfer of funds on the Stellar network.</p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-green-500" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Transaction Sent!</h3>
      <p className="text-stellar/80 text-center mb-6">
        You have successfully sent {formData.amount} {formData.asset}
      </p>

      <Button variant="outline" className="border-sky-blue/30 text-sky-blue hover:bg-space/50">
        View in Explorer <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-deep-space border-sky-blue/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <Send className="h-5 w-5 mr-2 text-sky-blue" />
            {step === 3 ? "Transaction Complete" : "Send Funds"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step !== 3 && (
            <div className="flex items-center mb-6">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-sky-blue" : "bg-space"}`}
              >
                {step > 1 ? "✓" : "1"}
              </div>
              <div className={`h-0.5 flex-1 mx-2 ${step >= 2 ? "bg-sky-blue" : "bg-space"}`}></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-sky-blue" : "bg-space"}`}
              >
                {step > 2 ? "✓" : "2"}
              </div>
            </div>
          )}

          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </motion.div>
        </div>

        {step !== 3 && (
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-sky-blue/30 text-stellar/80 hover:bg-space/50"
            >
              Cancel
            </Button>
            <Button onClick={handleNextStep} disabled={isProcessing} className="gradient-blue">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  {step === 1 ? "Continue" : "Confirm Send"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}