"use client"

import { motion } from "framer-motion"
import { Menu, X, Bell, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SkillChainLogo } from "@/components/skillchain-logo"

interface HeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-blue/20 bg-dark/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 text-sky-blue hover:bg-space hover:text-electric-blue"
        >
          <motion.div initial={false} animate={{ rotate: isSidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>

        <div className="flex items-center">
          <SkillChainLogo className="h-8 w-8 mr-2" />
          <span className="font-montserrat font-bold text-xl text-electric-blue">SkillChain</span>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-8 bg-space border-space focus:border-sky-blue"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-sky-blue hover:bg-space hover:text-electric-blue"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-sky-blue" />
          </Button>

          <Button variant="ghost" size="icon" className="text-sky-blue hover:bg-space hover:text-electric-blue">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
