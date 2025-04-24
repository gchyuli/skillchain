"use client"

import type { UseFormReturn } from "react-hook-form"
import type { ContractFormValues } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface TermsStepProps {
  form: UseFormReturn<ContractFormValues>
  onNext: () => void
  onPrev: () => void
}

const CANCELLATION_POLICIES = [
  {
    value: "flexible",
    label: "Flexible",
    description: "Reembolso del 100% si se cancela antes del primer hito, 50% después.",
  },
  {
    value: "moderate",
    label: "Moderada",
    description: "Reembolso del 75% si se cancela antes del primer hito, 25% después.",
  },
  {
    value: "strict",
    label: "Estricta",
    description: "Reembolso del 50% si se cancela antes del primer hito, sin reembolso después.",
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
          <h2 className="text-2xl font-bold text-electric-blue">Términos y Condiciones</h2>
          <p className="text-muted-foreground mt-1">Define los términos de tu contrato de servicio.</p>
        </div>

        <FormField
          control={form.control}
          name="terms.revisions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Revisiones</FormLabel>
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
              <FormDescription>Número de revisiones incluidas en el servicio.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms.cancellationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Política de Cancelación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-dark/50 border-space focus:border-sky-blue">
                    <SelectValue placeholder="Selecciona una política" />
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
              <FormLabel>Términos Adicionales (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Añade cualquier término adicional que quieras incluir en el contrato..."
                  className="min-h-32 bg-dark/50 border-space focus:border-sky-blue"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes especificar cualquier término adicional que no esté cubierto por los campos anteriores.
              </FormDescription>
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
                <FormLabel>Acepto los términos y condiciones de SkillChain</FormLabel>
                <FormDescription>
                  Al marcar esta casilla, confirmas que has leído y aceptas los términos y condiciones de SkillChain
                  para contratos de servicios.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button onClick={onPrev} variant="outline" className="border-sky-blue/50 hover:bg-space">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button onClick={handleNext} className="gradient-blue">
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Form>
  )
}
