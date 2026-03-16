"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useThemeColors } from "@/contexts/theme-context"
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Loader2,
  Palette,
  Check,
} from "lucide-react"

function getUIMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

interface ThemeColors {
  primary?: string | null
  secondary?: string | null
  accent?: string | null
  background?: string | null
  foreground?: string | null
  card?: string | null
  border?: string | null
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { setColors } = useThemeColors()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onToolCall({ toolCall }) {
      if (toolCall.dynamic) return

      if (toolCall.toolName === "setThemeColors") {
        const colors = toolCall.args as ThemeColors
        
        // Apply theme colors
        const themeUpdate: Record<string, string> = {}
        if (colors.primary) themeUpdate.primary = colors.primary
        if (colors.secondary) themeUpdate.secondary = colors.secondary
        if (colors.accent) themeUpdate.accent = colors.accent
        if (colors.background) themeUpdate.background = colors.background
        if (colors.foreground) themeUpdate.foreground = colors.foreground
        if (colors.card) themeUpdate.card = colors.card
        if (colors.border) themeUpdate.border = colors.border
        
        if (Object.keys(themeUpdate).length > 0) {
          setColors(themeUpdate)
        }
      }
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen && "rotate-90"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[380px] transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[500px] shadow-2xl border-border/50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b bg-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me to customize your theme</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[240px]">
                    Hi! I can help you customize your dashboard theme. Try asking me to change colors!
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {["Ocean theme", "Sunset colors", "Forest green", "Purple vibes"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          sendMessage({ text: `Change my theme to ${suggestion.toLowerCase()}` })
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const text = getUIMessageText(message)
                const isUser = message.role === "user"
                
                // Check for tool calls in parts
                const toolCalls = message.parts?.filter(
                  (p) => p.type === "tool-invocation"
                )

                return (
                  <div key={message.id} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={cn(
                        isUser ? "bg-secondary" : "bg-primary text-primary-foreground"
                      )}>
                        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("flex flex-col gap-1 max-w-[280px]", isUser && "items-end")}>
                      {text && (
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2 text-sm",
                            isUser
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted rounded-bl-md"
                          )}
                        >
                          {text}
                        </div>
                      )}
                      {toolCalls?.map((tc: { type: string; toolInvocation?: { toolCallId: string; toolName: string; state: string } }) => {
                        if (tc.type !== "tool-invocation") return null
                        const invocation = tc.toolInvocation
                        if (!invocation) return null
                        
                        return (
                          <div
                            key={invocation.toolCallId}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-xs"
                          >
                            {invocation.state === "output-available" ? (
                              <>
                                <Check className="h-3 w-3 text-primary" />
                                <span className="text-primary">Theme updated</span>
                              </>
                            ) : (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Applying theme...</span>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}
