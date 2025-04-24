"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface ConfirmationStepProps {
  form: UseFormReturn<any>
  onPrev: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export function ConfirmationStep({ form, onPrev, onSubmit, isSubmitting }: ConfirmationStepProps) {
  const formValues = form.getValues()

  const handleSubmit = () => {
    form.trigger("confirmation").then((isValid) => {
      if (isValid) {
        onSubmit(form.getValues())
      }
    })
  }

  // Function to convert between XLM and USDC (simplified for demonstration)
  const convertCurrency = (amount: number, from: string, to: string) => {
    // Fictional exchange rate: 1 XLM = 0.15 USDC
    const xlmToUsdc = 0.15

    if (from === to) return amount

    if (from === "XLM" && to === "USDC") {
      return amount * xlmToUsdc
    } else {
      return amount / xlmToUsdc
    }
  }

  // Calculate the total contract amount
  const totalAmount = formValues.milestones.milestones.reduce((sum: number, milestone: any) => {
    return sum + milestone.amount
  }, 0)

  const totalInXLM = formValues.milestones.milestones.reduce((sum: number, milestone: any) => {
    return sum + (milestone.currency === "XLM" ? milestone.amount : convertCurrency(milestone.amount, "USDC", "XLM"))
  }, 0)

  const totalInUSDC = formValues.milestones.milestones.reduce((sum: number, milestone: any) => {
    return sum + (milestone.currency === "USDC" ? milestone.amount : convertCurrency(milestone.amount, "XLM", "USDC"))
  }, 0)

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-electric-blue">Contract Confirmation</h2>
          <p className="text-muted-foreground mt-1">
            Review and confirm your contract details before submitting to the blockchain.
          </p>
        </div>

        <Card className="border-sky-blue/20 bg-dark/50">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-sky-blue">Service Summary</h3>
              <Separator className="my-2 bg-space" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Title:</p>
                  <p className="font-medium">{formValues.service.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category:</p>
                  <p className="font-medium">{formValues.service.category}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Description:</p>
                  <p className="font-medium">{formValues.service.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Time:</p>
                  <p className="font-medium">{formValues.service.deliveryTimeInDays} days</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sky-blue">Milestones and Payments</h3>
              <Separator className="my-2 bg-space" />
              <div className="space-y-3">
                {formValues.milestones.milestones.map((milestone: any, index: number) => (
                  <div key={index} className="p-3 border border-space rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="font-semibold text-stellar">
                        {milestone.amount} {milestone.currency}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Delivery date: {format(milestone.deliveryDate, "PPP")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 border border-sky-blue/30 rounded-md bg-space">
                <div className="flex justify-between">
                  <p className="font-medium">Total:</p>
                  <div className="text-right">
                    <p className="font-semibold text-stellar">{totalInXLM.toFixed(2)} XLM</p>
                    <p className="text-sm text-muted-foreground">≈ {totalInUSDC.toFixed(2)} USDC</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-sky-blue">Terms</h3>
              <Separator className="my-2 bg-space" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Revisions:</p>
                  <p className="font-medium">{formValues.terms.revisions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cancellation Policy:</p>
                  <p className="font-medium capitalize">{formValues.terms.cancellationPolicy}</p>
                </div>
                {formValues.terms.additionalTerms && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Additional Terms:</p>
                    <p className="font-medium">{formValues.terms.additionalTerms}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="confirmation.walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stellar Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="G..." {...field} className="bg-dark/50 border-space focus:border-sky-blue" />
              </FormControl>
              <FormDescription>Your Stellar wallet address to sign the contract.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmation.confirmContract"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-space p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-sky-blue data-[state=checked]:border-sky-blue"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I confirm that I want to create this contract on the Stellar blockchain</FormLabel>
                <FormDescription>
                  By checking this box, you confirm that the contract details are correct and that you want to create
                  this contract on the Stellar blockchain. This action cannot be undone.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button
            onClick={onPrev}
            variant="outline"
            className="border-sky-blue/50 hover:bg-space"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleSubmit} className="gradient-blue" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating contract...
              </>
            ) : (
              "Create Contract"
            )}
          </Button>
        </div>
      </div>
    </Form>
  )
}
