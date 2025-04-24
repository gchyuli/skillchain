"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Home, MessageSquare, ShoppingBag, Users, Wallet, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavigation({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Close mobile nav when route changes
    if (isOpen) {
      onClose()
    }
  }, [pathname, isOpen, onClose])

  // Prevent rendering during SSR to avoid hydration mismatch
  if (!mounted) return null

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Marketplace",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
      current: pathname === "/dashboard/marketplace",
    },
    {
      name: "Create Contract",
      href: "/dashboard/create-contract",
      icon: FileText,
      current: pathname === "/dashboard/create-contract",
    },
    {
      name: "Messages",
      href: "/dashboard/chat",
      icon: MessageSquare,
      current: pathname === "/dashboard/chat",
      badge: "3",
    },
    {
      name: "Connections",
      href: "/dashboard/connections",
      icon: Users,
      current: pathname === "/dashboard/connections",
    },
    {
      name: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
      current: pathname === "/dashboard/wallet",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Mobile menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-[280px] bg-deep-space/95 backdrop-blur-md border-l border-sky-blue/10 z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-sky-blue/10">
              <h2 className="text-lg font-bold text-electric-blue">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-stellar/80 hover:text-sky-blue">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="py-4 px-2">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} className="block">
                    <div
                      className={cn(
                        "flex items-center px-4 py-3 rounded-md",
                        item.current
                          ? "bg-space/50 text-sky-blue"
                          : "text-muted-foreground hover:bg-space/30 hover:text-stellar",
                      )}
                    >
                      <item.icon
                        className={cn("h-5 w-5 mr-3", item.current ? "text-sky-blue" : "text-muted-foreground")}
                      />
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <div className="ml-auto bg-sky-blue text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 px-4">
                <div className="p-4 rounded-lg bg-space/30 border border-sky-blue/10">
                  <h3 className="text-sm font-medium text-white mb-2">Need Help?</h3>
                  <p className="text-xs text-stellar/80 mb-3">
                    Check our documentation or contact support for assistance.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-sky-blue/30 text-sky-blue">
                    Support Center
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
