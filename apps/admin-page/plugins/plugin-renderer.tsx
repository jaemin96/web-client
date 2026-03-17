"use client"
import { activePlugins, type PluginSlot } from "@/plugins"

export function PluginRenderer({ slot }: { slot: PluginSlot }) {
  const slotPlugins = activePlugins.filter((p) => p.slot === slot)
  if (slotPlugins.length === 0) return null
  return (
    <>
      {slotPlugins.map(({ id, component: Component }) => (
        <Component key={id} />
      ))}
    </>
  )
}
