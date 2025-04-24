"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Filter, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceCard } from "@/components/marketplace/service-card"
import { ServiceFilters } from "@/components/marketplace/service-filters"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for services
const SERVICES = Array.from({ length: 20 }).map((_, i) => ({
  id: `service-${i}`,
  title: [
    "Web Development",
    "Mobile App Design",
    "Logo Creation",
    "Content Writing",
    "SEO Optimization",
    "UI/UX Design",
    "Video Editing",
    "Social Media Management",
  ][i % 8],
  category: ["Design", "Development", "Marketing", "Writing", "Video", "Business"][i % 6],
  price: Math.floor(Math.random() * 900) + 100,
  currency: Math.random() > 0.5 ? "XLM" : "USDC",
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 100) + 1,
  image: `/placeholder.svg?height=200&width=300&text=Service+${i}`,
  seller: {
    name: ["Alex Morgan", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"][i % 5],
    avatar: `/placeholder.svg?height=40&width=40&text=${i}`,
    rating: (Math.random() * 1 + 4).toFixed(1),
  },
  tags: [
    ["React", "Next.js", "Tailwind"],
    ["UI/UX", "Figma", "Design"],
    ["Content", "SEO", "Writing"],
    ["Mobile", "React Native", "iOS"],
    ["Marketing", "Social Media", "Ads"],
  ][i % 5],
}))

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "marketing", label: "Marketing" },
  { id: "writing", label: "Writing" },
  { id: "video", label: "Video" },
  { id: "business", label: "Business" },
]

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
]

export function MarketplacePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<typeof SERVICES>([])
  const [showFilters, setShowFilters] = useState(false)

  const category = searchParams.get("category") || "all"
  const query = searchParams.get("q") || ""
  const sort = searchParams.get("sort") || "relevance"

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      let filteredServices = [...SERVICES]

      // Apply category filter
      if (category !== "all") {
        filteredServices = filteredServices.filter(
          (service) => service.category.toLowerCase() === category.toLowerCase(),
        )
      }

      // Apply search query
      if (query) {
        filteredServices = filteredServices.filter(
          (service) =>
            service.title.toLowerCase().includes(query.toLowerCase()) ||
            service.category.toLowerCase().includes(query.toLowerCase()) ||
            service.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
        )
      }

      // Apply sorting
      if (sort === "price-asc") {
        filteredServices.sort((a, b) => a.price - b.price)
      } else if (sort === "price-desc") {
        filteredServices.sort((a, b) => b.price - a.price)
      } else if (sort === "rating") {
        filteredServices.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
      }

      setServices(filteredServices)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [category, query, sort])

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    router.push(`/dashboard/marketplace?${newParams.toString()}`)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get("query") as string
    updateParams({ q: query })
  }

  const handleCategoryChange = (value: string) => {
    updateParams({ category: value })
  }

  const handleSortChange = (value: string) => {
    updateParams({ sort: value })
  }

  const clearFilters = () => {
    router.push("/dashboard/marketplace")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-electric-blue mb-2">Service Marketplace</h1>
          <p className="text-stellar/80">Find the perfect service for your project</p>
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

          <Button className="gradient-blue">Create a Service</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ServiceFilters />
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
            <ServiceFilters />
            <div className="mt-6 flex space-x-2">
              <Button className="w-full gradient-blue" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1">
          {/* Search and Sort */}
          <div className="bg-space/50 backdrop-blur-sm rounded-lg border border-sky-blue/10 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="query"
                  defaultValue={query}
                  placeholder="Search services..."
                  className="pl-10 bg-dark/50 border-space focus:border-sky-blue"
                />
              </form>

              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-dark/50 border-space text-white rounded-md px-2 py-2 text-sm focus:border-sky-blue focus:outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <Tabs value={category} onValueChange={handleCategoryChange}>
                <TabsList className="bg-dark/50 p-1">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="data-[state=active]:bg-sky-blue data-[state=active]:text-dark"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {(query || category !== "all") && (
              <div className="mt-4 flex items-center">
                <div className="text-sm text-stellar/80 mr-2">Active filters:</div>
                {query && (
                  <div className="bg-space rounded-full px-3 py-1 text-xs flex items-center mr-2">
                    Search: {query}
                    <button onClick={() => updateParams({ q: "" })} className="ml-2 text-stellar/60 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {category !== "all" && (
                  <div className="bg-space rounded-full px-3 py-1 text-xs flex items-center mr-2">
                    Category: {CATEGORIES.find((c) => c.id === category)?.label}
                    <button
                      onClick={() => updateParams({ category: "all" })}
                      className="ml-2 text-stellar/60 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <button onClick={clearFilters} className="text-xs text-sky-blue hover:underline">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="marketplace-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-space/50 rounded-lg overflow-hidden border border-sky-blue/10">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <motion.div
              className="marketplace-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="text-sky-blue text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No services found</h3>
              <p className="text-stellar/80 mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline" className="border-sky-blue/50 text-sky-blue">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
