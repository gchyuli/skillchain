import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BackgroundEffects } from "@/components/ui/background-effects"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-dark">
      <BackgroundEffects variant="sparse" />
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 pt-16 pl-0 lg:pl-64 min-h-screen">
          <div className="pb-16 md:pb-0">{children}</div>
        </main>
      </div>
    </div>
  )
}
