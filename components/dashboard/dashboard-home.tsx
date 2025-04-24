"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BarChart2,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Search,
  Wallet,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function DashboardHomePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mock data
  const stats = [
    {
      title: "Active Contracts",
      value: "5",
      change: "+2",
      icon: <FileText className="h-5 w-5 text-sky-blue" />,
      link: "/dashboard/contracts",
    },
    {
      title: "Total Earnings",
      value: "2,450 XLM",
      change: "+350 XLM",
      icon: <DollarSign className="h-5 w-5 text-sky-blue" />,
      link: "/dashboard/wallet",
    },
    {
      title: "Messages",
      value: "12",
      change: "+3",
      icon: <MessageSquare className="h-5 w-5 text-sky-blue" />,
      link: "/dashboard/chat",
    },
    {
      title: "Connections",
      value: "28",
      change: "+5",
      icon: <Users className="h-5 w-5 text-sky-blue" />,
      link: "/dashboard/connections",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "contract",
      title: "Web Development Contract",
      description: "Contract signed with Alex Morgan",
      time: "2 hours ago",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      description: "250 XLM from Logo Design project",
      time: "Yesterday",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "Sarah Johnson sent you a message",
      time: "Yesterday",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      description: "Michael Brown gave you a 5-star review",
      time: "2 days ago",
      icon: <Star className="h-5 w-5" />,
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Mobile App UI Design",
      client: "Emily Davis",
      deadline: "Tomorrow",
      progress: 85,
    },
    {
      id: 2,
      title: "Website Redesign",
      client: "David Wilson",
      deadline: "In 3 days",
      progress: 60,
    },
    {
      id: 3,
      title: "Logo Design",
      client: "Jennifer Lee",
      deadline: "In 5 days",
      progress: 30,
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "incoming",
      amount: "+500 XLM",
      description: "Payment for UI Design",
      time: "Today",
      status: "completed",
    },
    {
      id: 2,
      type: "outgoing",
      amount: "-50 XLM",
      description: "Network fee",
      time: "Yesterday",
      status: "completed",
    },
    {
      id: 3,
      type: "incoming",
      amount: "+250 XLM",
      description: "Milestone payment",
      time: "3 days ago",
      status: "pending",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue mb-1">Dashboard</h1>
          <p className="text-stellar/80 text-sm">Welcome back! Here's an overview of your activity</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button className="gradient-blue h-9 w-full md:w-auto">
            <Link href="/dashboard/create-contract" className="flex items-center">
              Create Contract
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={stat.link}>
              <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10 hover:border-sky-blue/30 transition-all hover-effect">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-stellar/80 text-sm">{stat.title}</p>
                      <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-xs text-sky-blue mt-1">{stat.change} this week</p>
                    </div>
                    <div className="bg-space/50 p-2 rounded-lg">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader className="pb-0">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-space/50 w-full overflow-x-auto flex-nowrap">
                  <TabsTrigger
                    value="overview"
                    className="flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark whitespace-nowrap"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="earnings"
                    className="flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark whitespace-nowrap"
                  >
                    Earnings
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark whitespace-nowrap"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="overview" className="mt-0">
                <div className="h-[250px] flex items-center justify-center bg-space/30 rounded-lg mb-4">
                  <div className="text-center">
                    <BarChart2 className="h-16 w-16 text-sky-blue/30 mx-auto mb-4" />
                    <p className="text-stellar">Activity Overview Chart</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Completed", value: "12", icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
                    { label: "In Progress", value: "5", icon: <Clock className="h-4 w-4 text-yellow-500" /> },
                    { label: "Upcoming", value: "3", icon: <Calendar className="h-4 w-4 text-sky-blue" /> },
                  ].map((item, i) => (
                    <div key={i} className="bg-space/30 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-stellar/80 text-sm">{item.label}</p>
                        {item.icon}
                      </div>
                      <p className="text-xl font-bold text-white mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="earnings" className="mt-0">
                <div className="h-[250px] flex items-center justify-center bg-space/30 rounded-lg mb-4">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-sky-blue/30 mx-auto mb-4" />
                    <p className="text-stellar">Earnings Chart</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "This Month", value: "850 XLM", change: "+12%" },
                    { label: "Last Month", value: "760 XLM", change: "+8%" },
                    { label: "Total", value: "2,450 XLM", change: "" },
                  ].map((item, i) => (
                    <div key={i} className="bg-space/30 rounded-lg p-3">
                      <p className="text-stellar/80 text-sm">{item.label}</p>
                      <p className="text-xl font-bold text-white mt-1">{item.value}</p>
                      {item.change && <p className="text-xs text-green-500 mt-1">{item.change}</p>}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="activity" className="mt-0">
                <div className="space-y-3">
                  {recentActivity.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="bg-space/30 rounded-lg p-3">
                      <div className="flex items-start">
                        <div className="bg-space p-2 rounded-lg mr-3">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{activity.title}</p>
                          <p className="text-xs text-stellar/80">{activity.description}</p>
                        </div>
                        <p className="text-xs text-stellar/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader className="py-3 px-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-sky-blue h-8 px-2">
                  View All
                </Button>
              </div>
              <CardDescription className="text-stellar/80 text-xs">
                Your latest interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start p-2 rounded-lg hover:bg-space/30 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ x: 3 }}
                  >
                    <div className="bg-space p-2 rounded-lg mr-3">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm">{activity.title}</p>
                      <p className="text-xs text-stellar/80 truncate">{activity.description}</p>
                    </div>
                    <p className="text-xs text-stellar/60 whitespace-nowrap">{activity.time}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Only show on desktop or as a separate section on mobile */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader className="py-3 px-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg">Upcoming Deadlines</CardTitle>
                <Button variant="ghost" size="sm" className="text-sky-blue h-8 px-2">
                  View All
                </Button>
              </div>
              <CardDescription className="text-stellar/80 text-xs">Projects that need your attention</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="bg-space/30 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">{deadline.title}</p>
                        <p className="text-xs text-stellar/80">Client: {deadline.client}</p>
                      </div>
                      <div className="bg-space px-2 py-1 rounded text-xs text-sky-blue ml-2 whitespace-nowrap">
                        {deadline.deadline}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-stellar/80">Progress</span>
                        <span className="text-white">{deadline.progress}%</span>
                      </div>
                      <Progress value={deadline.progress} className="h-1.5 bg-space" indicatorClassName="bg-sky-blue" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader className="py-3 px-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-sky-blue h-8 px-2">
                  <Link href="/dashboard/wallet">View All</Link>
                </Button>
              </div>
              <CardDescription className="text-stellar/80 text-xs">Your latest wallet activity</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center p-2 rounded-lg hover:bg-space/30 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg mr-3 ${
                        transaction.type === "incoming" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "incoming" ? (
                        <ArrowUpRight className={`h-4 w-4 text-green-500`} />
                      ) : (
                        <ArrowUpRight className={`h-4 w-4 text-red-500 transform rotate-180`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-white text-sm">{transaction.amount}</p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "outline"}
                          className={`text-xs ${
                            transaction.status === "completed"
                              ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                              : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-stellar/80 truncate">{transaction.description}</p>
                        <p className="text-xs text-stellar/60 ml-2">{transaction.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-stellar/80 text-xs">Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Create Contract",
                    icon: <FileText className="h-4 w-4" />,
                    link: "/dashboard/create-contract",
                  },
                  { label: "Browse Services", icon: <Search className="h-4 w-4" />, link: "/dashboard/marketplace" },
                  { label: "Messages", icon: <MessageSquare className="h-4 w-4" />, link: "/dashboard/chat" },
                  { label: "My Wallet", icon: <Wallet className="h-4 w-4" />, link: "/dashboard/wallet" },
                ].map((action, i) => (
                  <Link href={action.link} key={i}>
                    <Button
                      variant="outline"
                      className="w-full h-auto py-3 border-sky-blue/20 hover:border-sky-blue/50 hover:bg-space/50 flex flex-col items-center justify-center gap-2"
                    >
                      <div className="bg-space/50 p-2 rounded-lg">{action.icon}</div>
                      <span className="text-xs whitespace-nowrap">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
