"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useIsMobile } from "@/hooks/use-mobile"
import { PluginRenderer } from "@/plugins/plugin-renderer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [isMobile])

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "transition-transform duration-300 lg:transform-none",
          isMobile && !mobileMenuOpen && "-translate-x-full"
        )}
      >
        <Sidebar
          collapsed={isMobile ? false : sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Header */}
      <Header
        sidebarCollapsed={isMobile ? true : sidebarCollapsed}
        onMenuClick={handleSidebarToggle}
      />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] pt-16 transition-all duration-300",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64",
          isMobile && "pl-0"
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
      <PluginRenderer slot="floating-widget" />
    </div>
  )
}
