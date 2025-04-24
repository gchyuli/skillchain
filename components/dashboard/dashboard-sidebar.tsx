"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Home, MessageSquare, ShoppingBag, Users, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

function SidebarItem({ href, icon, label, active, badge }: SidebarItemProps) {
  return (
    <Link href={href} className="block">
      <motion.div
        className={cn(
          "flex items-center px-4 py-3 rounded-md cursor-pointer group relative",
          active ? "bg-space/30 text-sky-blue" : "text-muted-foreground hover:bg-space/20 hover:text-stellar",
        )}
        whileHover={{ x: 5 }}
      >
        <div className={cn("mr-3", active ? "text-sky-blue" : "text-muted-foreground group-hover:text-sky-blue")}>
          {icon}
        </div>
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
    </Link>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed top-16 bottom-0 left-0 w-64 hidden lg:block bg-deep-space/90 backdrop-blur-md border-r border-sky-blue/10 overflow-y-auto z-30">
      <div className="py-6 px-3 space-y-1">
        <SidebarItem
          href="/dashboard/marketplace"
          icon={<ShoppingBag className="h-5 w-5" />}
          label="Marketplace"
          active={pathname.startsWith("/dashboard/marketplace")}
        />
        <SidebarItem
          href="/dashboard/create-contract"
          icon={<FileText className="h-5 w-5" />}
          label="Create Contract"
          active={pathname === "/dashboard/create-contract"}
        />
        <SidebarItem
          href="/dashboard/chat"
          icon={<MessageSquare className="h-5 w-5" />}
          label="Messages"
          active={pathname === "/dashboard/chat"}
          badge={3}
        />
        <SidebarItem
          href="/dashboard/connections"
          icon={<Users className="h-5 w-5" />}
          label="Connections"
          active={pathname === "/dashboard/connections"}
        />
        <SidebarItem
          href="/dashboard/wallet"
          icon={<Wallet className="h-5 w-5" />}
          label="Wallet"
          active={pathname === "/dashboard/wallet"}
        />
      </div>
    </div>
  )
}
