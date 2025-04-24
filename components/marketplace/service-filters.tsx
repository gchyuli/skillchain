"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function ServiceFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "SEO",
    "Video Editing",
    "Social Media",
  ]

  const deliveryTimes = [
    { value: "1", label: "24 hours" },
    { value: "3", label: "Up to 3 days" },
    { value: "7", label: "Up to 7 days" },
    { value: "14", label: "Up to 14 days" },
    { value: "30", label: "Up to 30 days" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-stellar/80">
            <span>{priceRange[0]} XLM</span>
            <span>{priceRange[1]} XLM</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Seller Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                id={`rating-${rating}`}
                checked={ratingFilter === rating}
                onCheckedChange={(checked) => {
                  setRatingFilter(checked ? rating : null)
                }}
                className="data-[state=checked]:bg-sky-blue data-[state=checked]:border-sky-blue"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-stellar/80 cursor-pointer">
                {rating}+ stars
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Delivery Time</h3>
        <div className="space-y-2">
          {deliveryTimes.map((time) => (
            <div key={time.value} className="flex items-center">
              <Checkbox
                id={`time-${time.value}`}
                className="data-[state=checked]:bg-sky-blue data-[state=checked]:border-sky-blue"
              />
              <label htmlFor={`time-${time.value}`} className="ml-2 text-sm text-stellar/80 cursor-pointer">
                {time.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Skills</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center">
              <Checkbox
                id={`skill-${skill}`}
                className="data-[state=checked]:bg-sky-blue data-[state=checked]:border-sky-blue"
              />
              <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-stellar/80 cursor-pointer">
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full gradient-blue">Apply Filters</Button>
    </div>
  )
}
