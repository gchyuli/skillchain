import { z } from "zod"

// Esquema para la selección de servicio
export const serviceSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(1000, "La descripción no puede exceder 1000 caracteres"),
  deliveryTimeInDays: z
    .number()
    .int()
    .min(1, "El tiempo de entrega debe ser al menos 1 día")
    .max(365, "El tiempo de entrega no puede exceder 365 días"),
})

// Esquema para un hito individual
export const milestoneSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  amount: z.number().min(1, "El monto debe ser mayor a 0"),
  currency: z.enum(["XLM", "USDC"]),
  deliveryDate: z.date().min(new Date(), "La fecha de entrega debe ser en el futuro"),
})

// Esquema para la lista de hitos
export const milestonesSchema = z.object({
  milestones: z.array(milestoneSchema).min(1, "Debe haber al menos un hito"),
})

// Esquema para los términos del contrato
export const termsSchema = z.object({
  revisions: z
    .number()
    .int()
    .min(0, "El número de revisiones no puede ser negativo")
    .max(10, "El número máximo de revisiones es 10"),
  cancellationPolicy: z.enum(["flexible", "moderate", "strict"]),
  additionalTerms: z.string().max(1000, "Los términos adicionales no pueden exceder 1000 caracteres").optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
})

// Esquema para la confirmación del contrato
export const confirmationSchema = z.object({
  walletAddress: z.string().min(1, "La dirección de la wallet es requerida"),
  confirmContract: z.boolean().refine((val) => val === true, {
    message: "Debes confirmar el contrato",
  }),
})

// Esquema completo del formulario
export const contractFormSchema = z.object({
  service: serviceSchema,
  milestones: milestonesSchema,
  terms: termsSchema,
  confirmation: confirmationSchema,
})

// Tipo para el formulario completo
export type ContractFormValues = z.infer<typeof contractFormSchema>

// Tipos para cada paso
export type ServiceFormValues = z.infer<typeof serviceSchema>
export type MilestonesFormValues = z.infer<typeof milestonesSchema>
export type TermsFormValues = z.infer<typeof termsSchema>
export type ConfirmationFormValues = z.infer<typeof confirmationSchema>
