"use client"

import { Check, CircleDashed } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
}

interface FormStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function FormStepper({ steps, currentStep, onStepClick }: FormStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative w-full">
            {/* Línea conectora */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: index < currentStep ? 1 : 0,
                  backgroundColor: index < currentStep ? "#00BFFF" : "#1B1F3B",
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute top-4 left-1/2 w-full h-0.5 origin-left"
                style={{ backgroundColor: index < currentStep ? "#00BFFF" : "#1B1F3B" }}
              />
            )}

            {/* Círculo del paso */}
            <motion.button
              onClick={() => onStepClick?.(index)}
              disabled={index > currentStep}
              whileHover={{ scale: index <= currentStep ? 1.1 : 1 }}
              whileTap={{ scale: index <= currentStep ? 0.95 : 1 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { delay: index * 0.1, duration: 0.3 },
              }}
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                index < currentStep
                  ? "bg-sky-blue border-sky-blue text-dark"
                  : index === currentStep
                    ? "bg-space border-sky-blue text-sky-blue"
                    : "bg-space border-space text-muted-foreground",
              )}
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                <CircleDashed className="w-4 h-4" />
              )}
            </motion.button>

            {/* Etiqueta del paso */}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 + 0.2, duration: 0.3 },
              }}
              className={cn(
                "mt-2 text-xs font-medium",
                index <= currentStep ? "text-sky-blue" : "text-muted-foreground",
              )}
            >
              {step.label}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}
