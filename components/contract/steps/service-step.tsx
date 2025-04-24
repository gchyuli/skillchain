"use client"

import { motion } from "framer-motion"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight } from "lucide-react"

interface ServiceStepProps {
  form: UseFormReturn<any>
  onNext: () => void
}

const SERVICE_CATEGORIES = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "writing", label: "Writing" },
  { value: "translation", label: "Translation" },
  { value: "video", label: "Video & Animation" },
  { value: "audio", label: "Audio & Music" },
  { value: "business", label: "Business" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "other", label: "Other" },
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
          <h2 className="text-xl font-bold text-electric-blue">Service Details</h2>
          <p className="text-muted-foreground mt-1 text-sm">Define the service you'll offer in this contract.</p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={formItemVariants} custom={1}>
          <FormField
            control={form.control}
            name="service.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g.: Professional Logo Design"
                    {...field}
                    className="bg-dark/50 border-space focus:border-sky-blue"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  A clear and concise title that describes your service.
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
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-dark/50 border-space focus:border-sky-blue">
                      <SelectValue placeholder="Select a category" />
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
                <FormDescription className="text-xs">The category that best describes your service.</FormDescription>
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe in detail the service you'll provide..."
                    className="min-h-24 bg-dark/50 border-space focus:border-sky-blue"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Explain in detail what your service includes and what the client can expect.
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
                <FormLabel>Delivery Time (days)</FormLabel>
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
                  The estimated time to complete the entire service.
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
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </Form>
  )
}
