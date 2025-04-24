"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Home, FileCodeIcon as FileContract, Users, Wallet, BarChart3, Settings, HelpCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

function SidebarItem({ icon, label, active, badge }: SidebarItemProps) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={cn(
        "flex items-center px-4 py-3 rounded-lg cursor-pointer group",
        active ? "bg-space text-sky-blue" : "text-muted-foreground hover:bg-space/50 hover:text-stellar",
      )}
    >
      <div className="mr-3 text-sky-blue group-hover:text-electric-blue">{icon}</div>
      <span className="font-medium">{label}</span>
      {badge && (
        <div className="ml-auto bg-sky-blue text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
      {active && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute left-0 w-1 h-8 bg-electric-blue rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  )
}

export function Sidebar() {
  return (
    <div className="h-full bg-dark/90 backdrop-blur-md border-r border-sky-blue/20 overflow-y-auto">
      <div className="py-6 px-3 space-y-1">
        <SidebarItem icon={<Home className="h-5 w-5" />} label="Inicio" />
        <SidebarItem icon={<FileContract className="h-5 w-5" />} label="Contratos" active badge={3} />
        <SidebarItem icon={<Users className="h-5 w-5" />} label="Conexiones" />
        <SidebarItem icon={<Wallet className="h-5 w-5" />} label="Wallet" />
        <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Estadísticas" />
      </div>

      <div className="px-3 py-4">
        <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Favoritos</h3>
        <div className="mt-2 space-y-1">
          <SidebarItem icon={<Star className="h-5 w-5" />} label="Diseño Web" />
          <SidebarItem icon={<Star className="h-5 w-5" />} label="Desarrollo Móvil" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-sky-blue/10">
        <div className="py-4 px-3 space-y-1">
          <SidebarItem icon={<Settings className="h-5 w-5" />} label="Configuración" />
          <SidebarItem icon={<HelpCircle className="h-5 w-5" />} label="Ayuda" />
        </div>
      </div>
    </div>
  )
}
