"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Paperclip, MoreVertical, Phone, Video, Search, Filter, ChevronDown, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for chats
const CHATS = [
  {
    id: "chat1",
    name: "Alex Morgan",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
    lastMessage: "I've reviewed your proposal and it looks great!",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "chat2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    lastMessage: "When can we schedule a call to discuss the details?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "chat3",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    lastMessage: "The payment has been sent. Please check your wallet.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "chat4",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    lastMessage: "I need some revisions on the logo design.",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: "chat5",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    lastMessage: "Thanks for the quick response!",
    time: "Tuesday",
    unread: 0,
    online: true,
  },
  {
    id: "chat6",
    name: "Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
    lastMessage: "The contract looks good. I'll sign it today.",
    time: "Wednesday",
    unread: 1,
    online: false,
  },
]

// Mock data for messages
const MESSAGES = [
  {
    id: "msg1",
    sender: "other",
    text: "Hi there! I'm interested in your web development services.",
    time: "10:00 AM",
    read: true,
  },
  {
    id: "msg2",
    sender: "me",
    text: "Hello! Thanks for reaching out. I'd be happy to help with your web development needs. What kind of project do you have in mind?",
    time: "10:05 AM",
    read: true,
  },
  {
    id: "msg3",
    sender: "other",
    text: "I need an e-commerce website for my small business. Something modern and user-friendly.",
    time: "10:10 AM",
    read: true,
  },
  {
    id: "msg4",
    sender: "me",
    text: "That sounds like a great project! I have experience building e-commerce sites with various platforms. Do you have any specific features in mind?",
    time: "10:15 AM",
    read: true,
  },
  {
    id: "msg5",
    sender: "other",
    text: "I'd like product listings, shopping cart, secure checkout, and maybe a blog section. Also, it needs to be mobile-friendly.",
    time: "10:20 AM",
    read: true,
  },
  {
    id: "msg6",
    sender: "me",
    text: "I can definitely include all those features. Mobile responsiveness is standard in all my projects. Would you like to see some examples of my previous work?",
    time: "10:25 AM",
    read: true,
  },
  {
    id: "msg7",
    sender: "other",
    text: "Yes, that would be great! Also, what's your typical timeline for a project like this?",
    time: "10:30 AM",
    read: false,
  },
]

export function ChatInterface() {
  const [activeChat, setActiveChat] = useState(CHATS[0])
  const [messages, setMessages] = useState(MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showMobileChats, setShowMobileChats] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: `msg${messages.length + 1}`,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate reply
    setIsTyping(true)
    setTimeout(() => {
      const replyMsg = {
        id: `msg${messages.length + 2}`,
        sender: "other",
        text: "Thanks for the information! I'll review it and get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }
      setMessages((prev) => [...prev, replyMsg])
      setIsTyping(false)
    }, 3000)
  }

  const filteredChats = CHATS.filter((chat) => {
    // Filter by search query
    if (searchQuery && !chat.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by tab
    if (activeTab === "unread" && chat.unread === 0) {
      return false
    }
    if (activeTab === "active" && !chat.online) {
      return false
    }

    return true
  })

  return (
    <div className="h-[calc(100vh-64px)] flex bg-deep-space">
      {/* Mobile chat list toggle */}
      {isMobile && !showMobileChats && (
        <div className="fixed top-20 left-4 z-30">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileChats(true)}
            className="bg-space/80 border-sky-blue/20 text-sky-blue"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Back button in chat view on mobile */}
      {isMobile && !showMobileChats && (
        <div className="fixed top-20 left-4 z-30">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileChats(true)}
            className="bg-space/80 border-sky-blue/20 text-sky-blue"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Chat list sidebar */}
      <AnimatePresence>
        {(showMobileChats || !isMobile) && (
          <motion.div
            className={`${
              isMobile ? "fixed inset-0 z-20 w-full" : "w-80"
            } futuristic-panel border-0 border-r border-sky-blue/10`}
            initial={isMobile ? { x: -280 } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -280 } : false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-3 border-b border-sky-blue/10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-white">Messages</h2>
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileChats(false)}
                    className="text-stellar/80 hover:text-sky-blue hover:bg-space/50"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-stellar/80 hover:text-sky-blue hover:bg-space/50"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter messages</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 h-8 bg-space/50 border-space focus:border-sky-blue text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-space/50 w-full h-8">
                  <TabsTrigger
                    value="all"
                    className="text-xs flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-xs flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark"
                  >
                    Unread
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="text-xs flex-1 data-[state=active]:bg-sky-blue data-[state=active]:text-dark"
                  >
                    Active
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <ScrollArea className="h-[calc(100%-130px)]">
              <div className="p-2">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      className={`p-2 rounded-lg mb-1.5 cursor-pointer transition-colors ${
                        activeChat.id === chat.id ? "bg-space/80 border border-sky-blue/20" : "hover:bg-space/50"
                      }`}
                      onClick={() => {
                        setActiveChat(chat)
                        setShowMobileChats(false)
                      }}
                      whileHover={{ x: 3 }}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <Avatar className="h-8 w-8 border border-dark">
                            <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                          </Avatar>
                          {chat.online && (
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-dark"></span>
                          )}
                        </div>
                        <div className="ml-2 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm text-white truncate">{chat.name}</span>
                            <span className="text-xs text-stellar/60">{chat.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center w-full">
                              <p className="text-xs text-stellar/80 truncate max-w-[85%]">{chat.lastMessage}</p>
                              {chat.lastMessage.length > 20 && (
                                <span className="text-xs text-stellar/60 ml-1">...</span>
                              )}
                            </div>
                            {chat.unread > 0 && (
                              <span className="ml-1 bg-sky-blue text-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-stellar/60">
                    <p>No conversations found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat area */}
      <div className={`flex-1 flex flex-col ${isMobile && showMobileChats ? "hidden" : "block"}`}>
        {/* Chat header */}
        <div className="h-12 border-b border-sky-blue/10 flex items-center justify-between px-3 glass-panel">
          <div className="flex items-center">
            <Avatar className="h-7 w-7 mr-2">
              <img src={activeChat.avatar || "/placeholder.svg"} alt={activeChat.name} />
            </Avatar>
            <div>
              <h3 className="font-medium text-sm text-white">{activeChat.name}</h3>
              <p className="text-xs text-stellar/60">
                {activeChat.online ? (
                  <span className="flex items-center">
                    <span className="h-1 w-1 rounded-full bg-green-500 mr-1"></span>
                    Online
                  </span>
                ) : (
                  "Offline"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-stellar/80 hover:text-sky-blue hover:bg-space/50"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-stellar/80 hover:text-sky-blue hover:bg-space/50"
            >
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-stellar/80 hover:text-sky-blue hover:bg-space/50"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-space border-sky-blue/20">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-deep-space">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "other" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 hidden sm:block">
                    <img src={activeChat.avatar || "/placeholder.svg"} alt={activeChat.name} />
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 py-2 ${
                    message.sender === "me"
                      ? "gradient-purple-blue text-white rounded-br-sm"
                      : "glass-panel text-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm break-words">{message.text}</p>
                  <div className={`text-xs mt-1 flex items-center ${message.sender === "me" ? "justify-end" : ""}`}>
                    <span className={message.sender === "me" ? "text-white/70" : "text-stellar/60"}>
                      {message.time}
                    </span>
                    {message.sender === "me" && (
                      <span className="ml-1 text-white/70">
                        {message.read ? <span className="text-sky-blue">✓✓</span> : <span>✓</span>}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2 mt-1 hidden sm:block">
                  <img src={activeChat.avatar || "/placeholder.svg"} alt={activeChat.name} />
                </Avatar>
                <div className="glass-panel rounded-lg px-3 py-2 rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-3 border-t border-sky-blue/10 glass-panel">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-stellar/80 hover:text-sky-blue hover:bg-space/50"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-8 bg-space/50 border-space focus:border-sky-blue text-sm"
            />

            <Button type="submit" size="sm" disabled={!newMessage.trim()} className="gradient-purple-blue h-8 w-8 p-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
