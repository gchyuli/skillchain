"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Filter, MessageSquare, MoreHorizontal, Search, Star, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for connections
const CONNECTIONS = [
  {
    id: "conn1",
    name: "Alex Morgan",
    avatar: "/placeholder.svg?height=80&width=80&text=AM",
    role: "Web Developer",
    skills: ["React", "Next.js", "Tailwind CSS"],
    rating: "4.9",
    reviews: 27,
    status: "connected",
    lastActive: "2 hours ago",
    location: "New York, USA",
  },
  {
    id: "conn2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80&text=SJ",
    role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Sketch"],
    rating: "4.8",
    reviews: 19,
    status: "connected",
    lastActive: "1 day ago",
    location: "London, UK",
  },
  {
    id: "conn3",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=80&width=80&text=MB",
    role: "Mobile Developer",
    skills: ["React Native", "Flutter", "Swift"],
    rating: "4.7",
    reviews: 15,
    status: "connected",
    lastActive: "3 days ago",
    location: "Berlin, Germany",
  },
  {
    id: "conn4",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=80&width=80&text=ED",
    role: "Content Writer",
    skills: ["Copywriting", "SEO", "Editing"],
    rating: "4.6",
    reviews: 12,
    status: "pending",
    lastActive: "5 days ago",
    location: "Toronto, Canada",
  },
  {
    id: "conn5",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=80&width=80&text=DW",
    role: "Blockchain Developer",
    skills: ["Solidity", "Ethereum", "Smart Contracts"],
    rating: "4.9",
    reviews: 23,
    status: "pending",
    lastActive: "1 week ago",
    location: "Singapore",
  },
  {
    id: "conn6",
    name: "Jennifer Lee",
    avatar: "/placeholder.svg?height=80&width=80&text=JL",
    role: "Graphic Designer",
    skills: ["Photoshop", "Illustrator", "InDesign"],
    rating: "4.8",
    reviews: 18,
    status: "connected",
    lastActive: "2 weeks ago",
    location: "Sydney, Australia",
  },
  {
    id: "conn7",
    name: "Robert Chen",
    avatar: "/placeholder.svg?height=80&width=80&text=RC",
    role: "Data Scientist",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    rating: "4.7",
    reviews: 14,
    status: "connected",
    lastActive: "3 weeks ago",
    location: "Tokyo, Japan",
  },
  {
    id: "conn8",
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=80&width=80&text=MG",
    role: "Marketing Specialist",
    skills: ["Social Media", "Content Strategy", "SEO"],
    rating: "4.6",
    reviews: 11,
    status: "pending",
    lastActive: "1 month ago",
    location: "Barcelona, Spain",
  },
]

export function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
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

  // Filter connections based on tab and search query
  const filteredConnections = CONNECTIONS.filter((connection) => {
    // Filter by search query
    if (
      searchQuery &&
      !connection.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !connection.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !connection.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by tab
    if (activeTab === "connected" && connection.status !== "connected") {
      return false
    }
    if (activeTab === "pending" && connection.status !== "pending") {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue mb-2">Connections</h1>
          <p className="text-stellar/80">Manage your professional network</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            className="border-sky-blue/50 text-sky-blue hover:bg-sky-blue/10 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button className="gradient-blue">
            <UserPlus className="h-4 w-4 mr-2" />
            Find Connections
          </Button>
        </div>
      </div>

      {/* Filters - Mobile */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-dark/90 backdrop-blur-md z-50 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-4">
            {/* Filter options would go here */}
            <Button className="w-full gradient-blue" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Search and Tabs */}
      <div className="bg-space/50 backdrop-blur-sm rounded-lg border border-sky-blue/10 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connections..."
              className="pl-10 bg-dark/50 border-space focus:border-sky-blue"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select className="bg-dark/50 border-space text-white rounded-md px-2 py-2 text-sm focus:border-sky-blue focus:outline-none">
              <option value="recent">Recently Active</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-dark/50 p-1 w-max min-w-full">
              <TabsTrigger value="all" className="data-[state=active]:bg-sky-blue data-[state=active]:text-dark">
                All Connections
              </TabsTrigger>
              <TabsTrigger value="connected" className="data-[state=active]:bg-sky-blue data-[state=active]:text-dark">
                Connected
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-sky-blue data-[state=active]:text-dark">
                Pending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Connections Grid */}
      {filteredConnections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-deep-space/80 backdrop-blur-md border-sky-blue/10 hover:border-sky-blue/30 transition-all hover-effect h-full">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-sky-blue/10 flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-space">
                        <img src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{connection.name}</h3>
                        <p className="text-xs text-stellar/80">{connection.role}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-stellar/80 hover:text-sky-blue">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-space border-sky-blue/20">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/chat?user=${connection.id}`} className="flex items-center w-full">
                            Send Message
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Create Contract</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Connection</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{connection.rating}</span>
                      </div>
                      <span className="text-xs text-stellar/60">({connection.reviews} reviews)</span>
                      <div className="ml-auto text-xs text-stellar/60">{connection.lastActive}</div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-stellar/80 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {connection.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-space/50 text-stellar border-sky-blue/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-stellar/80 mb-4">
                      <span className="inline-flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {connection.location}
                      </span>
                    </div>

                    {/* Fix the button layout to prevent overlapping */}
                    <div className="flex gap-2 mt-2">
                      {connection.status === "connected" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-sky-blue/30 text-sky-blue hover:bg-space/50 h-9 px-2 whitespace-nowrap"
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="whitespace-nowrap">Message</span>
                          </Button>
                          <Button size="sm" className="flex-1 gradient-blue h-9 px-2 whitespace-nowrap">
                            <FileText className="h-4 w-4 mr-1" />
                            <span className="whitespace-nowrap">Contract</span>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 h-9 px-2 whitespace-nowrap"
                          >
                            <X className="h-4 w-4 mr-1" />
                            <span className="whitespace-nowrap">Decline</span>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9 px-2 whitespace-nowrap"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            <span className="whitespace-nowrap">Accept</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-sky-blue text-6xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-white mb-2">No connections found</h3>
          <p className="text-stellar/80 mb-6">Try adjusting your search or filters</p>
          <Button onClick={() => setSearchQuery("")} variant="outline" className="border-sky-blue/50 text-sky-blue">
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}

// Import for the MapPin and FileText icons
import { MapPin, FileText } from "lucide-react"
