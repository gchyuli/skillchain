"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Play, Shield, Zap, Star, Users, Wallet, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { SkillChainLogo } from "@/components/skillchain-logo"
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal"

export function LandingPage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "Discover, Connect and Collaborate Securely",
      description:
        "A decentralized freelance marketplace built on Stellar blockchain, enabling fast, secure, and transparent service transactions.",
      image: "/placeholder.svg?height=500&width=500&text=Freelance+Marketplace",
    },
    {
      title: "Smart Contracts for Freelancers",
      description:
        "Create secure service agreements with milestone-based payments and automated escrow on the Stellar blockchain.",
      image: "/placeholder.svg?height=500&width=500&text=Smart+Contracts",
    },
    {
      title: "Global Talent Network",
      description: "Connect with skilled professionals worldwide and collaborate without borders or intermediaries.",
      image: "/placeholder.svg?height=500&width=500&text=Global+Network",
    },
  ]

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-sky-blue" />,
      title: "Secure Payments",
      description: "Smart contracts ensure funds are only released when work is completed to satisfaction",
    },
    {
      icon: <Zap className="h-10 w-10 text-sky-blue" />,
      title: "Low Fees",
      description: "Stellar blockchain enables microtransactions with fees as low as 0.00001 XLM",
    },
    {
      icon: <Star className="h-10 w-10 text-sky-blue" />,
      title: "Transparent History",
      description: "All transactions and reviews are permanently recorded on the blockchain",
    },
    {
      icon: <Globe className="h-10 w-10 text-sky-blue" />,
      title: "Global Access",
      description: "Work with talent or clients from anywhere in the world without currency barriers",
    },
    {
      icon: <Users className="h-10 w-10 text-sky-blue" />,
      title: "Dispute Resolution",
      description: "Decentralized arbitration system ensures fair resolution of conflicts",
    },
    {
      icon: <Wallet className="h-10 w-10 text-sky-blue" />,
      title: "Instant Payments",
      description: "Get paid immediately upon work approval with no waiting periods",
    },
  ]

  return (
    <div className="min-h-screen star-bg overflow-hidden">
      <BackgroundEffects variant="dense" />

      {/* Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-deep-space/90 backdrop-blur-md border-b border-sky-blue/10"
        style={{
          background: `rgba(17, 23, 54, ${Math.min(0.8 + scrollY / 1000, 0.95)})`,
          backdropFilter: `blur(${Math.min(10 + scrollY / 100, 20)}px)`,
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SkillChainLogo className="mr-2" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-bold text-electric-blue"
            >
              SkillChain
            </motion.span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {["Features", "How it works", "Testimonials", "FAQ"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-white hover:text-sky-blue transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ y: -3 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="outline"
                className="border-sky-blue/50 text-sky-blue hover:bg-sky-blue/10"
                onClick={() => setIsWalletModalOpen(true)}
              >
                Connect Wallet
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-stellar">
                      {heroSlides[currentSlide].title.split(" ").slice(0, -1).join(" ")}
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-blue to-electric-blue">
                      {heroSlides[currentSlide].title.split(" ").slice(-1)[0]}
                    </span>
                  </h1>
                  <p className="text-lg text-stellar/80 mt-6 mb-8 max-w-lg">{heroSlides[currentSlide].description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-blue to-electric-blue hover:from-electric-blue hover:to-sky-blue text-white text-lg py-6 px-8 rounded-xl shadow-lg shadow-sky-blue/20"
                    onClick={() => setIsWalletModalOpen(true)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-sky-blue/50 text-sky-blue hover:bg-sky-blue/10 text-lg py-6 px-8 rounded-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center mt-12 space-x-8">
                {[
                  { label: "Active Users", value: "40K+" },
                  { label: "Services", value: "20K+" },
                  { label: "Freelancers", value: "7K+" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-sky-blue font-bold text-2xl">{stat.value}</p>
                    <p className="text-sm text-stellar/80">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/20 to-electric-blue/20 rounded-2xl blur-3xl opacity-30"></div>
                <div className="relative bg-deep-space/80 backdrop-blur-md rounded-2xl overflow-hidden border border-sky-blue/20 shadow-xl shadow-sky-blue/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="p-6"
                    >
                      <div className="p-4 bg-gradient-to-r from-sky-blue/10 to-electric-blue/10 border-b border-sky-blue/20 rounded-t-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sky-blue font-bold">Web Development</h3>
                            <p className="text-sm text-stellar/80">by Alex Morgan</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sky-blue font-bold">500 XLM</p>
                            <p className="text-xs text-stellar/80">≈ $150 USD</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="h-40 bg-space/30 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-sky-blue/20 flex items-center justify-center">
                                <Zap className="h-8 w-8 text-sky-blue" />
                              </div>
                              <p className="text-stellar">Full-Stack Web Development</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-stellar/80">Time to delivery</span>
                            <span className="text-white">14 days</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stellar/80">Rating</span>
                            <span className="text-white">★★★★★ (4.9)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-stellar/80">Completed projects</span>
                            <span className="text-white">127</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-sky-blue to-electric-blue hover:from-electric-blue hover:to-sky-blue text-white rounded-lg">
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div
                  className="absolute -top-4 -right-4 bg-deep-space/80 backdrop-blur-md rounded-xl p-4 border border-sky-blue/20 shadow-lg shadow-sky-blue/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-sky-blue mr-2" />
                    <span className="text-sm text-stellar">Blockchain Secured</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-deep-space/80 backdrop-blur-md rounded-xl p-4 border border-sky-blue/20 shadow-lg shadow-sky-blue/10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-sky-blue mr-2 pulse"></div>
                    <span className="text-sm text-stellar">Live on Stellar</span>
                  </div>
                </motion.div>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index ? "bg-sky-blue w-6" : "bg-sky-blue/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <a href="#features" className="flex flex-col items-center text-sky-blue">
            <span className="text-sm mb-1">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </motion.div>
      </section>

      {/* Partners Section */}
      <section className="py-10 border-t border-b border-sky-blue/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Stellar", "Coinbase", "Binance", "Revolut", "Exodus", "Blockchain.com"].map((partner, i) => (
              <motion.div
                key={partner}
                className="text-sky-blue/50 font-bold text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose <span className="text-sky-blue">SkillChain</span>
            </motion.h2>
            <motion.p
              className="text-stellar/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our platform offers unique advantages that traditional freelance marketplaces can't match
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-deep-space/80 backdrop-blur-md rounded-xl p-6 border border-sky-blue/10 hover:border-sky-blue/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 191, 255, 0.3)" }}
              >
                <div className="mb-4 bg-space/30 w-16 h-16 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-sky-blue">{feature.title}</h3>
                <p className="text-stellar/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/20 to-electric-blue/20 blur-3xl opacity-30"></div>
            <div className="relative bg-deep-space/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-sky-blue/10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10 bg-cover bg-center"></div>
              <div className="relative z-10 max-w-3xl">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Join the Future of Work?
                </motion.h2>
                <motion.p
                  className="text-stellar mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Connect your wallet now and start exploring thousands of services or offer your skills to a global
                  audience.
                </motion.p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-gradient-to-r from-sky-blue to-electric-blue hover:from-electric-blue hover:to-sky-blue text-white text-lg py-6 px-8 rounded-xl shadow-lg shadow-sky-blue/20"
                    onClick={() => setIsWalletModalOpen(true)}
                  >
                    Connect Wallet & Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-sky-blue/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <SkillChainLogo className="mr-2" />
                <span className="text-xl font-bold text-electric-blue">SkillChain</span>
              </div>
              <p className="text-stellar/80 mb-4">A decentralized freelance marketplace built on Stellar blockchain.</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Freelancers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Contracts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stellar/80 hover:text-sky-blue">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-sky-blue/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-stellar/60 mb-4 md:mb-0">© 2025 SkillChain. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-stellar/60 hover:text-sky-blue">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-stellar/60 hover:text-sky-blue">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-stellar/60 hover:text-sky-blue">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Connect Modal */}
      <WalletConnectModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </div>
  )
}
