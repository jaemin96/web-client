"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useThemeColors } from "@/contexts/theme-context"
import { MessageCircle, X, Send, Sparkles, User, Loader2, Palette } from "lucide-react"

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
  })

  // messages에서 tool output 감지 → 테마 적용
  useEffect(() => {
    for (const msg of messages) {
      if (msg.role !== "assistant") continue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const part of (msg.parts ?? []) as any[]) {
        if (part.type !== "tool-setThemeColors") continue
        if (part.state !== "output-available") continue

        const colors: ThemeColors = part.output?.colors ?? {}
        const update: Record<string, string> = {}
        if (colors.primary) update.primary = colors.primary
        if (colors.secondary) update.secondary = colors.secondary
        if (colors.accent) update.accent = colors.accent
        if (colors.background) update.background = colors.background
        if (colors.foreground) update.foreground = colors.foreground
        if (colors.card) update.card = colors.card
        if (colors.border) update.border = colors.border
        if (Object.keys(update).length > 0) setColors(update)
      }
    }
  }, [messages, setColors])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen && "rotate-90"
        )}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

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
              <p className="text-xs text-muted-foreground">테마를 자유롭게 바꿔보세요</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0 p-4" ref={scrollRef}>
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[240px]">
                    어떤 느낌의 테마로 바꿀지 자유롭게 말해보세요!
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {["더 푸르게", "네온 그린", "미니멀하게", "따뜻한 느낌"].map((s) => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => sendMessage({ text: s })}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const parts: any[] = message.parts ?? []

                // parts가 없는 경우 content 필드로 폴백
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rawContent = (message as any).content
                const fallbackText = typeof rawContent === "string" ? rawContent : null

                const textParts = parts.filter((p) => p.type === "text" && p.text)
                const toolParts = parts.filter((p) => p.type === "tool-setThemeColors")
                const hasContent = textParts.length > 0 || toolParts.length > 0 || fallbackText

                if (!hasContent) return null

                return (
                  <div key={message.id} className={cn("flex gap-3", isUser && "flex-row-reverse")}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={cn(isUser ? "bg-secondary" : "bg-primary text-primary-foreground")}>
                        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("flex flex-col gap-1 max-w-[280px]", isUser && "items-end")}>
                      {(textParts.length > 0 ? textParts : fallbackText ? [{ text: fallbackText }] : []).map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (part: any, i: number) => (
                          <div
                            key={i}
                            className={cn(
                              "rounded-2xl px-4 py-2 text-sm",
                              isUser
                                ? "bg-primary text-primary-foreground rounded-br-md"
                                : "bg-muted rounded-bl-md"
                            )}
                          >
                            {part.text}
                          </div>
                        )
                      )}
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {toolParts.some((p: any) => p.state !== "output-available") && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-xs">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>테마 적용 중...</span>
                        </div>
                      )}
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
                placeholder="어떤 느낌으로 바꿀까요?"
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}
