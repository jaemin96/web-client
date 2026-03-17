import type { ComponentType } from "react"
import enabledPlugins from "@/config/plugins.config"
import { AIChatbot } from "@/components/dashboard/ai-chatbot"

export type PluginSlot = "floating-widget" | "sidebar-widget" | "page-section"

export interface PluginDefinition {
  id: string
  slot: PluginSlot
  component: ComponentType
}

const pluginRegistry: PluginDefinition[] = [
  { id: "ai-chatbot", slot: "floating-widget", component: AIChatbot },
]

export const activePlugins = pluginRegistry.filter(
  (p) => (enabledPlugins as readonly string[]).includes(p.id)
)
