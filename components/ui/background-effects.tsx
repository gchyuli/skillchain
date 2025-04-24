"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BackgroundEffectsProps {
  variant?: "default" | "dense" | "sparse"
}

export function BackgroundEffects({ variant = "default" }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particles
    const particles: Particle[] = []
    const particleCount =
      variant === "dense"
        ? Math.min(width, height) / 5
        : variant === "sparse"
          ? Math.min(width, height) / 20
          : Math.min(width, height) / 10

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulse: boolean

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = Math.random() > 0.5 ? "#00BFFF" : "#005CFF"
        this.opacity = Math.random() * 0.5
        this.pulse = Math.random() > 0.8
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > width) this.speedX *= -1
        if (this.y < 0 || this.y > height) this.speedY *= -1

        // Pulsing effect for some particles
        if (this.pulse) {
          this.opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.2
        }
      }

      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw radial gradient background
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5,
      )
      gradient.addColorStop(0, "rgba(27, 31, 59, 0.2)")
      gradient.addColorStop(1, "rgba(10, 15, 44, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw lines between nearby particles
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - distance / 100)})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [variant])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-dark/10 to-dark/80 pointer-events-none z-0" />

      {/* Decorative elements */}
      <motion.div
        className="fixed top-20 right-10 w-1 h-1 rounded-full bg-stellar z-0"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="fixed top-40 left-20 w-2 h-2 rounded-full bg-sky-blue z-0"
        animate={{
          opacity: [0.1, 0.5, 0.1],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="fixed bottom-32 right-32 w-1.5 h-1.5 rounded-full bg-electric-blue z-0"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}
