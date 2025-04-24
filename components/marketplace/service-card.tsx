"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ServiceCardProps {
  service: {
    id: string
    title: string
    category: string
    price: number
    currency: string
    rating: string
    reviews: number
    image: string
    seller: {
      name: string
      avatar: string
      rating: string
    }
    tags: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-space/50 backdrop-blur-sm rounded-lg overflow-hidden border border-sky-blue/10 hover:border-sky-blue/30 transition-all hover-effect"
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-40 object-cover" />
        <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-sky-blue">
          {service.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={service.seller.avatar || "/placeholder.svg"}
            alt={service.seller.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-stellar/80">{service.seller.name}</span>
          <div className="ml-auto flex items-center text-xs">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span>{service.seller.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-white mb-1 line-clamp-2">{service.title}</h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {service.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-dark/50 text-stellar/80 rounded-full px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-sm mb-3">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span className="text-white">{service.rating}</span>
          </div>
          <span className="mx-1 text-stellar/60">•</span>
          <span className="text-stellar/80">{service.reviews} reviews</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sky-blue font-bold">
              {service.price} {service.currency}
            </div>
            <div className="text-xs text-stellar/60">
              ≈ ${(service.currency === "XLM" ? service.price * 0.3 : service.price).toFixed(2)} USD
            </div>
          </div>

          <Link href={`/dashboard/create-contract?service=${service.id}`}>
            <Button size="sm" className="gradient-blue">
              Hire
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
