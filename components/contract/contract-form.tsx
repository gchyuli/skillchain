"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"

import { Card, CardContent } from "@/components/ui/card"
import { FormStepper } from "@/components/contract/form-stepper"
import { ServiceStep } from "@/components/contract/steps/service-step"
import { MilestonesStep } from "@/components/contract/steps/milestones-step"
import { TermsStep } from "@/components/contract/steps/terms-step"
import { ConfirmationStep } from "@/components/contract/steps/confirmation-step"
import { SuccessStep } from "@/components/contract/steps/success-step"

const steps = [
  { id: "service", label: "Service" },
  { id: "milestones", label: "Milestones" },
  { id: "terms", label: "Terms" },
  { id: "confirmation", label: "Confirmation" },
]

// Schema definitions
const serviceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  deliveryTimeInDays: z
    .number()
    .int()
    .min(1, "Delivery time must be at least 1 day")
    .max(365, "Delivery time cannot exceed 365 days"),
})

const milestoneSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  currency: z.enum(["XLM", "USDC"]),
  deliveryDate: z.date().min(new Date(), "Delivery date must be in the future"),
})

const milestonesSchema = z.object({
  milestones: z.array(milestoneSchema).min(1, "There must be at least one milestone"),
})

const termsSchema = z.object({
  revisions: z
    .number()
    .int()
    .min(0, "Number of revisions cannot be negative")
    .max(10, "Maximum number of revisions is 10"),
  cancellationPolicy: z.enum(["flexible", "moderate", "strict"]),
  additionalTerms: z.string().max(1000, "Additional terms cannot exceed 1000 characters").optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

const confirmationSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  confirmContract: z.boolean().refine((val) => val === true, {
    message: "You must confirm the contract",
  }),
})

const contractFormSchema = z.object({
  service: serviceSchema,
  milestones: milestonesSchema,
  terms: termsSchema,
  confirmation: confirmationSchema,
})

type ContractFormValues = z.infer<typeof contractFormSchema>

export function ContractForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      service: {
        title: "",
        category: "",
        description: "",
        deliveryTimeInDays: 30,
      },
      milestones: {
        milestones: [
          {
            title: "",
            description: "",
            amount: 0,
            currency: "XLM",
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in the future
          },
        ],
      },
      terms: {
        revisions: 2,
        cancellationPolicy: "moderate",
        additionalTerms: "",
        acceptTerms: false,
      },
      confirmation: {
        walletAddress: "",
        confirmContract: false,
      },
    },
    mode: "onChange",
  })

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: ContractFormValues) => {
    setIsSubmitting(true)

    try {
      // Here would be the logic to send the contract to the Stellar blockchain
      console.log("Contract data:", data)

      // Simulate a delay for the demonstration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
    } catch (error) {
      console.error("Error creating contract:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    if (isSuccess) {
      return <SuccessStep />
    }

    switch (currentStep) {
      case 0:
        return <ServiceStep form={form} onNext={nextStep} />
      case 1:
        return <MilestonesStep form={form} onNext={nextStep} onPrev={prevStep} />
      case 2:
        return <TermsStep form={form} onNext={nextStep} onPrev={prevStep} />
      case 3:
        return <ConfirmationStep form={form} onPrev={prevStep} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center mb-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.3,
          }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue text-center">Create Service Contract</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-stellar mt-2 text-center max-w-xl text-sm"
        >
          Define the terms of your service agreement on the Stellar blockchain
        </motion.p>
      </motion.div>

      {!isSuccess && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <FormStepper steps={steps} currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="mt-4 border-sky-blue/10 bg-deep-space/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="p-5"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
