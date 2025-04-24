"use client"

import { motion } from "framer-motion"
import { type UseFormReturn, useFieldArray } from "react-hook-form"
import type { ContractFormValues } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface MilestonesStepProps {
  form: UseFormReturn<ContractFormValues>
  onNext: () => void
  onPrev: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export function MilestonesStep({ form, onNext, onPrev }: MilestonesStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "milestones.milestones",
  })

  const handleNext = () => {
    form.trigger("milestones").then((isValid) => {
      if (isValid) {
        onNext()
      }
    })
  }

  const addMilestone = () => {
    append({
      title: "",
      description: "",
      amount: 0,
      currency: "XLM",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días en el futuro
    })
  }

  return (
    <Form {...form}>
      <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-electric-blue">Hitos del Proyecto</h2>
          <p className="text-muted-foreground mt-1 text-sm">Define los hitos y pagos para tu contrato.</p>
        </motion.div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-sky-blue/20 bg-dark/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-sky-blue">Hito {index + 1}</h3>
                    {fields.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive/80"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name={`milestones.milestones.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Título</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej: Entrega de diseño inicial"
                              {...field}
                              className="bg-space border-space focus:border-sky-blue text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`milestones.milestones.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe lo que incluye este hito..."
                              className="min-h-16 bg-space border-space focus:border-sky-blue text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name={`milestones.milestones.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">Monto</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  step={0.01}
                                  className="bg-space border-space focus:border-sky-blue text-sm"
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`milestones.milestones.${index}.currency`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">Moneda</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-space border-space focus:border-sky-blue text-sm">
                                    <SelectValue placeholder="Moneda" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-space border-sky-blue/20">
                                  <SelectItem value="XLM">XLM</SelectItem>
                                  <SelectItem value="USDC">USDC</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`milestones.milestones.${index}.deliveryDate`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm">Fecha de Entrega</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal bg-space border-space focus:border-sky-blue text-sm",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: es })
                                    ) : (
                                      <span>Selecciona una fecha</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-space border-sky-blue/20" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <Button
            type="button"
            variant="outline"
            onClick={addMilestone}
            className="w-full border-dashed border-sky-blue/50 bg-dark hover:bg-space"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir Hito
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-between pt-3">
          <Button
            onClick={onPrev}
            variant="outline"
            className="border-sky-blue/50 hover:bg-space"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
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
      </motion.div>
    </Form>
  )
}
