import { cn } from "@/lib/utils"

interface SkillChainLogoProps {
  className?: string
  variant?: "default" | "small" | "large"
}

export function SkillChainLogo({ className, variant = "default" }: SkillChainLogoProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-10 h-10",
    large: "w-16 h-16",
  }

  return (
    <div className={cn("relative", sizeClasses[variant], className)}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagon border */}
        <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" stroke="#00BFFF" strokeWidth="3" fill="none" />

        {/* Handshake */}
        <path
          d="M30 50C35 45 40 45 45 50C50 55 55 55 60 50C65 45 70 45 75 50"
          stroke="#00BFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30 60C35 55 40 55 45 60C50 65 55 65 60 60C65 55 70 55 75 60"
          stroke="#00BFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Vertical connection */}
        <path d="M50 30V40" stroke="#00BFFF" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="25" r="5" fill="#00BFFF" />

        {/* Star */}
        <path d="M75 30L77 25L79 30L84 32L79 34L77 39L75 34L70 32L75 30Z" fill="#00BFFF" />
      </svg>
    </div>
  )
}
