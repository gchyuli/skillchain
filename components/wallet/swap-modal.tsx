"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, ArrowRight, Check, Info, Loader2, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StellarIcon from "@/components/wallet/wallet-icons/stellar-icon"

interface SwapModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function SwapModal({ isOpen, onClose, onSuccess }: SwapModalProps) {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fromAsset: "XLM",
    toAsset: "USDC",
    fromAmount: "",
    toAmount: "",
  })
  const { toast } = useToast()

  // Simulated exchange rates
  const exchangeRates = {
    "XLM-USDC": 0.3,
    "USDC-XLM": 3.33,
  }

  const handleFromAssetChange = (value: string) => {
    const newFromAsset = value
    let newToAsset = formData.toAsset

    // Prevent same asset selection
    if (newFromAsset === newToAsset) {
      newToAsset = newFromAsset === "XLM" ? "USDC" : "XLM"
    }

    setFormData((prev) => ({
      ...prev,
      fromAsset: newFromAsset,
      toAsset: newToAsset,
      toAmount: calculateToAmount(prev.fromAmount, newFromAsset, newToAsset),
    }))
  }

  const handleToAssetChange = (value: string) => {
    const newToAsset = value
    let newFromAsset = formData.fromAsset

    // Prevent same asset selection
    if (newToAsset === newFromAsset) {
      newFromAsset = newToAsset === "XLM" ? "USDC" : "XLM"
    }

    setFormData((prev) => ({
      ...prev,
      toAsset: newToAsset,
      fromAsset: newFromAsset,
      toAmount: calculateToAmount(prev.fromAmount, newFromAsset, newToAsset),
    }))
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      fromAmount: value,
      toAmount: calculateToAmount(value, prev.fromAsset, prev.toAsset),
    }))
  }

  const calculateToAmount = (fromAmount: string, fromAsset: string, toAsset: string) => {
    if (!fromAmount || isNaN(Number(fromAmount))) return ""

    const amount = Number(fromAmount)
    const rate = getExchangeRate(fromAsset, toAsset)

    return (amount * rate).toFixed(6)
  }

  const getExchangeRate = (fromAsset: string, toAsset: string) => {
    const key = `${fromAsset}-${toAsset}`
    return exchangeRates[key as keyof typeof exchangeRates] || 1
  }

  const swapAssets = () => {
    const { fromAsset, toAsset, fromAmount } = formData

    setFormData({
      fromAsset: toAsset,
      toAsset: fromAsset,
      fromAmount: formData.toAmount,
      toAmount: fromAmount,
    })
  }

  const validateStep1 = () => {
    if (!formData.fromAmount || isNaN(Number(formData.fromAmount)) || Number(formData.fromAmount) <= 0) {
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
      handleSwap()
    }
  }

  const handleSwap = () => {
    setIsProcessing(true)

    // Swap simulation
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)

      // Notify success
      toast({
        title: "Swap completed",
        description: `You have swapped ${formData.fromAmount} ${formData.fromAsset} for ${formData.toAmount} ${formData.toAsset}`,
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
      fromAsset: "XLM",
      toAsset: "USDC",
      fromAmount: "",
      toAmount: "",
    })
    onClose()
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fromAmount">From</Label>
          <div className="flex space-x-2">
            <Input
              id="fromAmount"
              value={formData.fromAmount}
              onChange={handleFromAmountChange}
              type="number"
              min="0"
              step="0.000001"
              placeholder="0.00"
              className="bg-space/30 border-space focus:border-sky-blue"
            />
            <Select value={formData.fromAsset} onValueChange={handleFromAssetChange}>
              <SelectTrigger className="w-24 bg-space/30 border-space focus:border-sky-blue">
                <SelectValue placeholder="Asset" />
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

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={swapAssets}
            className="rounded-full bg-space/50 hover:bg-sky-blue/20 text-sky-blue"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="toAmount">To</Label>
          <div className="flex space-x-2">
            <Input
              id="toAmount"
              value={formData.toAmount}
              readOnly
              placeholder="0.00"
              className="bg-space/30 border-space focus:border-sky-blue"
            />
            <Select value={formData.toAsset} onValueChange={handleToAssetChange}>
              <SelectTrigger className="w-24 bg-space/30 border-space focus:border-sky-blue">
                <SelectValue placeholder="Asset" />
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
      </div>

      <div className="bg-space/30 rounded-lg p-4">
        <div className="flex justify-between text-sm">
          <span className="text-stellar/80">Exchange rate</span>
          <span className="text-white">
            1 {formData.fromAsset} = {getExchangeRate(formData.fromAsset, formData.toAsset)} {formData.toAsset}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-stellar/80">Fee</span>
          <span className="text-white">0.1%</span>
        </div>
      </div>

      <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
        <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
        <p>
          Swaps are executed at the current market rate. The price may vary slightly due to market volatility.
        </p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-space/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">Confirm swap</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-stellar/80 text-sm">From</p>
              <p className="text-white font-medium text-lg">
                {formData.fromAmount} {formData.fromAsset}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-sky-blue" />
            <div className="text-right">
              <p className="text-stellar/80 text-sm">To</p>
              <p className="text-white font-medium text-lg">
                {formData.toAmount} {formData.toAsset}
              </p>
            </div>
          </div>

          <div className="border-t border-space pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stellar/80">Exchange rate</span>
              <span className="text-white">
                1 {formData.fromAsset} = {getExchangeRate(formData.fromAsset, formData.toAsset)} {formData.toAsset}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stellar/80">Fee</span>
              <span className="text-white">
                {(Number(formData.fromAmount) * 0.001).toFixed(6)} {formData.fromAsset}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stellar/80">Network fee</span>
              <span className="text-white">0.00001 XLM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-3 text-sm text-stellar/90 flex items-start">
        <Info className="h-5 w-5 text-sky-blue mr-2 flex-shrink-0 mt-0.5" />
        <p>By confirming this swap, you're authorizing an irreversible transaction on the Stellar network.</p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-green-500" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Swap completed!</h3>
      <p className="text-stellar/80 text-center mb-2">
        You have swapped {formData.fromAmount} {formData.fromAsset} for {formData.toAmount} {formData.toAsset}
      </p>
      <p className="text-sm text-stellar/60 mb-6">The transaction has been confirmed on the Stellar network</p>

      <Button variant="outline" className="border-sky-blue/30 text-sky-blue hover:bg-space/50">
        View transaction details
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-deep-space border-sky-blue/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center">
            <RefreshCw className="h-5 w-5 mr-2 text-sky-blue" />
            {step === 3 ? "Swap completed" : "Asset swap"}
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

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
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
                  {step === 1 ? "Continue" : "Confirm swap"}
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