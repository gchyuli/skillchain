"use client"

import { motion } from "framer-motion"
import type { UseFormReturn } from "react-hook-form"
import type { ContractFormValues } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight } from "lucide-react"

interface ServiceStepProps {
  form: UseFormReturn<ContractFormValues>
  onNext: () => void
}

const SERVICE_CATEGORIES = [
  { value: "design", label: "Diseño" },
  { value: "development", label: "Desarrollo" },
  { value: "marketing", label: "Marketing" },
  { value: "writing", label: "Redacción" },
  { value: "translation", label: "Traducción" },
  { value: "video", label: "Video y Animación" },
  { value: "audio", label: "Audio y Música" },
  { value: "business", label: "Negocios" },
  { value: "lifestyle", label: "Estilo de Vida" },
  { value: "other", label: "Otro" },
]

const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
}

export function ServiceStep({ form, onNext }: ServiceStepProps) {
  const handleNext = () => {
    form.trigger("service").then((isValid) => {
      if (isValid) {
        onNext()
      }
    })
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={0}>
          <h2 className="text-xl font-bold text-electric-blue">Detalles del Servicio</h2>
          <p className="text-muted-foreground mt-1 text-sm">Define el servicio que ofrecerás en este contrato.</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={1}>
          <FormField
            control={form.control}
            name="service.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del Servicio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Diseño de Logotipo Profesional"
                    {...field}
                    className="bg-dark/50 border-space focus:border-sky-blue"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Un título claro y conciso que describa tu servicio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={2}>
          <FormField
            control={form.control}
            name="service.category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-dark/50 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-space border-sky-blue/20">
                    {SERVICE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">La categoría que mejor describe tu servicio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={3}>
          <FormField
            control={form.control}
            name="service.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe detalladamente el servicio que ofrecerás..."
                    className="min-h-24 bg-dark/50 border-space focus:border-sky-blue"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Explica en detalle lo que incluye tu servicio y lo que el cliente puede esperar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={4}>
          <FormField
            control={form.control}
            name="service.deliveryTimeInDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiempo de Entrega (días)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    className="bg-dark/50 border-space focus:border-sky-blue"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  El tiempo estimado para completar todo el servicio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={formItemVariants}
          custom={5}
          className="flex justify-end pt-4"
        >
          <Button
            onClick={handleNext}
            className="gradient-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </Form>
  )
}
