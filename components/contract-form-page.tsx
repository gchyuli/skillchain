"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ContractForm } from "@/components/contract-form"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BackgroundEffects } from "@/components/ui/background-effects"

export function ContractFormPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-dark overflow-hidden">
      <BackgroundEffects />

      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 relative">
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 bottom-0 left-0 z-30 w-64 md:w-72"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-0 md:ml-72" : "ml-0"}`}>
          <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <ContractForm />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
