"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"

import { type ContractFormValues, contractFormSchema } from "@/lib/schema"
import { Card, CardContent } from "@/components/ui/card"
import { FormStepper } from "@/components/form-stepper"
import { ServiceStep } from "@/components/steps/service-step"
import { MilestonesStep } from "@/components/steps/milestones-step"
import { TermsStep } from "@/components/steps/terms-step"
import { ConfirmationStep } from "@/components/steps/confirmation-step"
import { SuccessStep } from "@/components/steps/success-step"

const steps = [
  { id: "service", label: "Servicio" },
  { id: "milestones", label: "Hitos" },
  { id: "terms", label: "Términos" },
  { id: "confirmation", label: "Confirmación" },
]

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
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días en el futuro
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
      // Aquí iría la lógica para enviar el contrato a la blockchain de Stellar
      console.log("Datos del contrato:", data)

      // Simulamos un retraso para la demostración
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
    } catch (error) {
      console.error("Error al crear el contrato:", error)
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
    <div className="w-full">
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
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue text-center">Crear Contrato de Servicio</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-stellar mt-2 text-center max-w-xl text-sm"
        >
          Define los términos de tu acuerdo de servicio en la blockchain de Stellar
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
        <Card className="mt-4 border-sky-blue/20 bg-space/80 backdrop-blur-sm shadow-lg overflow-hidden">
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
