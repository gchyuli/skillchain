"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface TermsStepProps {
  form: UseFormReturn<any>
  onNext: () => void
  onPrev: () => void
}

const CANCELLATION_POLICIES = [
  {
    value: "flexible",
    label: "Flexible",
    description: "100% refund if canceled before the first milestone, 50% after.",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "75% refund if canceled before the first milestone, 25% after.",
  },
  {
    value: "strict",
    label: "Strict",
    description: "50% refund if canceled before the first milestone, no refund after.",
  },
]

export function TermsStep({ form, onNext, onPrev }: TermsStepProps) {
  const handleNext = () => {
    form.trigger("terms").then((isValid) => {
      if (isValid) {
        onNext()
      }
    })
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-electric-blue">Terms and Conditions</h2>
          <p className="text-muted-foreground mt-1">Define the terms of your service contract.</p>
        </div>

        <FormField
          control={form.control}
          name="terms.revisions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Revisions</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  className="bg-dark/50 border-space focus:border-sky-blue"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Number of revisions included in the service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms.cancellationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cancellation Policy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-dark/50 border-space focus:border-sky-blue">
                    <SelectValue placeholder="Select a policy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-space border-sky-blue/20">
                  {CANCELLATION_POLICIES.map((policy) => (
                    <SelectItem key={policy.value} value={policy.value}>
                      {policy.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {CANCELLATION_POLICIES.find((p) => p.value === form.watch("terms.cancellationPolicy"))?.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms.additionalTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Terms (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional terms you want to include in the contract..."
                  className="min-h-32 bg-dark/50 border-space focus:border-sky-blue"
                  {...field}
                />
              </FormControl>
              <FormDescription>You can specify any additional terms not covered by the fields above.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms.acceptTerms"
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
                <FormLabel>I accept SkillChain's terms and conditions</FormLabel>
                <FormDescription>
                  By checking this box, you confirm that you have read and accept SkillChain's terms and conditions for
                  service contracts.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button onClick={onPrev} variant="outline" className="border-sky-blue/50 hover:bg-space">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} className="gradient-blue">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Form>
  )
}
